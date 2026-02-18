import { Router } from 'express';
import { db } from '../index.js';

const router = Router();

// GET all payments (with filters)
router.get('/', async (req, res) => {
    try {
        const { clientId, status, from, to } = req.query;
        const snapshot = await db.collection('payment_plans').orderBy('createdAt', 'desc').get();
        let plans = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (clientId) plans = plans.filter(p => p.clientId === clientId);
        if (status === 'overdue') {
            const now = new Date().toISOString();
            plans = plans.filter(p =>
                p.installments?.some(i => !i.paid && i.dueDate < now)
            );
        }

        res.json(plans);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET single payment plan
router.get('/:id', async (req, res) => {
    try {
        const doc = await db.collection('payment_plans').doc(req.params.id).get();
        if (!doc.exists) return res.status(404).json({ error: 'Ödeme planı bulunamadı' });
        res.json({ id: doc.id, ...doc.data() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create payment plan
router.post('/', async (req, res) => {
    try {
        const totalAmount = Number(req.body.totalAmount) || 0;
        const installmentCount = Number(req.body.installmentCount) || 1;
        const installmentAmount = totalAmount / installmentCount;

        const installments = [];
        for (let i = 0; i < installmentCount; i++) {
            const dueDate = new Date();
            dueDate.setMonth(dueDate.getMonth() + i);
            installments.push({
                number: i + 1,
                amount: Math.round(installmentAmount * 100) / 100,
                dueDate: req.body.installments?.[i]?.dueDate || dueDate.toISOString().split('T')[0],
                paid: false,
                paidAmount: 0,
                paidDate: null,
            });
        }

        const data = {
            clientId: req.body.clientId,
            clientName: req.body.clientName || '',
            contractId: req.body.contractId || null,
            quoteId: req.body.quoteId || null,
            referenceNumber: req.body.referenceNumber || '',
            totalAmount,
            paidTotal: 0,
            remainingTotal: totalAmount,
            currency: req.body.currency || 'TRY',
            paymentType: req.body.paymentType || 'Taksit', // Peşin, Taksit, Aylık
            installments,
            status: 'Aktif', // Aktif, Tamamlandı
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const docRef = await db.collection('payment_plans').add(data);
        res.status(201).json({ id: docRef.id, ...data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST record payment (tahsilat)
router.post('/:id/pay', async (req, res) => {
    try {
        const { installmentNumber, amount, date } = req.body;
        const doc = await db.collection('payment_plans').doc(req.params.id).get();
        if (!doc.exists) return res.status(404).json({ error: 'Ödeme planı bulunamadı' });

        const plan = doc.data();
        const installments = plan.installments || [];
        const idx = installments.findIndex(i => i.number === installmentNumber);
        if (idx === -1) return res.status(400).json({ error: 'Taksit bulunamadı' });

        installments[idx].paid = true;
        installments[idx].paidAmount = Number(amount) || installments[idx].amount;
        installments[idx].paidDate = date || new Date().toISOString().split('T')[0];

        const paidTotal = installments.reduce((sum, i) => sum + (i.paidAmount || 0), 0);
        const remainingTotal = plan.totalAmount - paidTotal;
        const allPaid = installments.every(i => i.paid);

        await db.collection('payment_plans').doc(req.params.id).update({
            installments,
            paidTotal,
            remainingTotal,
            status: allPaid ? 'Tamamlandı' : 'Aktif',
            updatedAt: new Date().toISOString(),
        });

        const updated = await db.collection('payment_plans').doc(req.params.id).get();
        res.json({ id: updated.id, ...updated.data() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update payment plan
router.put('/:id', async (req, res) => {
    try {
        const updates = { ...req.body, updatedAt: new Date().toISOString() };
        delete updates.id;
        await db.collection('payment_plans').doc(req.params.id).update(updates);
        const updated = await db.collection('payment_plans').doc(req.params.id).get();
        res.json({ id: updated.id, ...updated.data() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE payment plan
router.delete('/:id', async (req, res) => {
    try {
        await db.collection('payment_plans').doc(req.params.id).delete();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
