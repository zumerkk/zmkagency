import { Router } from 'express';
import { db } from '../index.js';

const router = Router();
const COLLECTION = 'contracts';

// GET all contracts
router.get('/', async (req, res) => {
    try {
        const { clientId } = req.query;
        const snapshot = await db.collection(COLLECTION).orderBy('createdAt', 'desc').get();
        let contracts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (clientId) contracts = contracts.filter(c => c.clientId === clientId);
        res.json(contracts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET single contract
router.get('/:id', async (req, res) => {
    try {
        const doc = await db.collection(COLLECTION).doc(req.params.id).get();
        if (!doc.exists) return res.status(404).json({ error: 'Sözleşme bulunamadı' });
        res.json({ id: doc.id, ...doc.data() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update contract (creates new version)
router.put('/:id', async (req, res) => {
    try {
        const doc = await db.collection(COLLECTION).doc(req.params.id).get();
        if (!doc.exists) return res.status(404).json({ error: 'Sözleşme bulunamadı' });

        const current = doc.data();
        const newVersion = (current.version || 1) + 1;

        // Save current version to versions array
        const versions = current.versions || [];
        versions.push({
            version: current.version,
            data: { ...current },
            savedAt: new Date().toISOString(),
        });

        const updates = {
            ...req.body,
            version: newVersion,
            versions,
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

// POST duplicate contract
router.post('/:id/duplicate', async (req, res) => {
    try {
        const doc = await db.collection(COLLECTION).doc(req.params.id).get();
        if (!doc.exists) return res.status(404).json({ error: 'Sözleşme bulunamadı' });

        const original = doc.data();
        const year = new Date().getFullYear();
        const snapshot = await db.collection(COLLECTION).where('year', '==', year).get();
        const count = snapshot.size + 1;
        const contractNumber = `ZMK-SZL-${year}-${String(count).padStart(4, '0')}`;

        const data = {
            ...original,
            contractNumber,
            status: 'Taslak',
            version: 1,
            versions: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        const docRef = await db.collection(COLLECTION).add(data);
        res.status(201).json({ id: docRef.id, ...data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE contract
router.delete('/:id', async (req, res) => {
    try {
        await db.collection(COLLECTION).doc(req.params.id).delete();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
