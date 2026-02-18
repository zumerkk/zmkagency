import { Router } from 'express';
import { db } from '../index.js';

const router = Router();
const COLLECTION = 'quotes';

// Helper: generate quote number
async function generateQuoteNumber() {
    const year = new Date().getFullYear();
    const snapshot = await db.collection(COLLECTION)
        .where('year', '==', year)
        .get();
    const count = snapshot.size + 1;
    return `ZMK-${year}-${String(count).padStart(4, '0')}`;
}

// GET all quotes
router.get('/', async (req, res) => {
    try {
        const { clientId } = req.query;
        const snapshot = await db.collection(COLLECTION).orderBy('createdAt', 'desc').get();
        let quotes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (clientId) quotes = quotes.filter(q => q.clientId === clientId);
        res.json(quotes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET single quote
router.get('/:id', async (req, res) => {
    try {
        const doc = await db.collection(COLLECTION).doc(req.params.id).get();
        if (!doc.exists) return res.status(404).json({ error: 'Teklif bulunamadı' });
        res.json({ id: doc.id, ...doc.data() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create quote
router.post('/', async (req, res) => {
    try {
        const quoteNumber = await generateQuoteNumber();
        const items = (req.body.items || []).map(item => ({
            serviceId: item.serviceId || '',
            serviceName: item.serviceName || '',
            description: item.description || '',
            quantity: Number(item.quantity) || 1,
            unitPrice: Number(item.unitPrice) || 0,
            kdvRate: Number(item.kdvRate) || 20,
            total: (Number(item.quantity) || 1) * (Number(item.unitPrice) || 0),
        }));

        const subtotal = items.reduce((sum, i) => sum + i.total, 0);
        const kdvTotal = items.reduce((sum, i) => sum + (i.total * i.kdvRate / 100), 0);
        const grandTotal = subtotal + kdvTotal;

        const data = {
            quoteNumber,
            year: new Date().getFullYear(),
            clientId: req.body.clientId,
            clientName: req.body.clientName || '',
            items,
            subtotal,
            kdvTotal,
            grandTotal,
            currency: req.body.currency || 'TRY',
            paymentTerms: req.body.paymentTerms || '',
            validUntil: req.body.validUntil || '',
            status: 'Taslak', // Taslak, Gönderildi, Kabul Edildi, Reddedildi
            convertedToContract: false,
            contractId: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const docRef = await db.collection(COLLECTION).add(data);
        res.status(201).json({ id: docRef.id, ...data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update quote
router.put('/:id', async (req, res) => {
    try {
        const items = (req.body.items || []).map(item => ({
            serviceId: item.serviceId || '',
            serviceName: item.serviceName || '',
            description: item.description || '',
            quantity: Number(item.quantity) || 1,
            unitPrice: Number(item.unitPrice) || 0,
            kdvRate: Number(item.kdvRate) || 20,
            total: (Number(item.quantity) || 1) * (Number(item.unitPrice) || 0),
        }));

        const subtotal = items.reduce((sum, i) => sum + i.total, 0);
        const kdvTotal = items.reduce((sum, i) => sum + (i.total * i.kdvRate / 100), 0);
        const grandTotal = subtotal + kdvTotal;

        const updates = {
            ...req.body,
            items,
            subtotal,
            kdvTotal,
            grandTotal,
            updatedAt: new Date().toISOString(),
        };
        delete updates.id;

        await db.collection(COLLECTION).doc(req.params.id).update(updates);
        const updated = await db.collection(COLLECTION).doc(req.params.id).get();
        res.json({ id: updated.id, ...updated.data() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST duplicate quote
router.post('/:id/duplicate', async (req, res) => {
    try {
        const doc = await db.collection(COLLECTION).doc(req.params.id).get();
        if (!doc.exists) return res.status(404).json({ error: 'Teklif bulunamadı' });

        const original = doc.data();
        const quoteNumber = await generateQuoteNumber();

        const data = {
            ...original,
            quoteNumber,
            status: 'Taslak',
            convertedToContract: false,
            contractId: null,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const docRef = await db.collection(COLLECTION).add(data);
        res.status(201).json({ id: docRef.id, ...data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST convert quote to contract
router.post('/:id/convert', async (req, res) => {
    try {
        const doc = await db.collection(COLLECTION).doc(req.params.id).get();
        if (!doc.exists) return res.status(404).json({ error: 'Teklif bulunamadı' });

        const quote = doc.data();

        // Generate contract number
        const year = new Date().getFullYear();
        const contractSnap = await db.collection('contracts').where('year', '==', year).get();
        const contractCount = contractSnap.size + 1;
        const contractNumber = `ZMK-SZL-${year}-${String(contractCount).padStart(4, '0')}`;

        const contractData = {
            contractNumber,
            year,
            quoteId: req.params.id,
            quoteNumber: quote.quoteNumber,
            clientId: quote.clientId,
            clientName: quote.clientName,
            items: quote.items,
            subtotal: quote.subtotal,
            kdvTotal: quote.kdvTotal,
            grandTotal: quote.grandTotal,
            currency: quote.currency,
            paymentTerms: quote.paymentTerms || '',
            duration: req.body.duration || '',
            startDate: req.body.startDate || '',
            endDate: req.body.endDate || '',
            paymentPlan: req.body.paymentPlan || 'Peşin',
            status: 'Taslak', // Taslak, Aktif, Tamamlandı, İptal
            version: 1,
            versions: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const contractRef = await db.collection('contracts').add(contractData);

        // Update quote
        await db.collection(COLLECTION).doc(req.params.id).update({
            convertedToContract: true,
            contractId: contractRef.id,
            status: 'Kabul Edildi',
            updatedAt: new Date().toISOString(),
        });

        res.status(201).json({ id: contractRef.id, ...contractData });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE quote
router.delete('/:id', async (req, res) => {
    try {
        await db.collection(COLLECTION).doc(req.params.id).delete();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
