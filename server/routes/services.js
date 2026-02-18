import { Router } from 'express';
import { db } from '../index.js';

const router = Router();
const COLLECTION = 'services';

// GET all services
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection(COLLECTION).orderBy('order', 'asc').get();
        const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.json(services);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create service
router.post('/', async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            description: req.body.description || '',
            scope: req.body.scope || '',
            duration: req.body.duration || '',
            unitPrice: Number(req.body.unitPrice) || 0,
            currency: req.body.currency || 'TRY',
            kdvRate: Number(req.body.kdvRate) || 20,
            options: req.body.options || [],
            category: req.body.category || 'Genel',
            order: Number(req.body.order) || 0,
            isActive: true,
            createdAt: new Date().toISOString(),
        };
        const docRef = await db.collection(COLLECTION).add(data);
        res.status(201).json({ id: docRef.id, ...data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update service
router.put('/:id', async (req, res) => {
    try {
        const updates = { ...req.body, updatedAt: new Date().toISOString() };
        delete updates.id;
        await db.collection(COLLECTION).doc(req.params.id).update(updates);
        const updated = await db.collection(COLLECTION).doc(req.params.id).get();
        res.json({ id: updated.id, ...updated.data() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE service
router.delete('/:id', async (req, res) => {
    try {
        await db.collection(COLLECTION).doc(req.params.id).delete();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
