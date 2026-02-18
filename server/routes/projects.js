import { Router } from 'express';
import { db } from '../index.js';

const router = Router();
const COLLECTION = 'projects';

// GET all projects (optionally filtered by clientId)
router.get('/', async (req, res) => {
    try {
        const { clientId, status } = req.query;
        let query = db.collection(COLLECTION).orderBy('createdAt', 'desc');

        const snapshot = await query.get();
        let projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (clientId) projects = projects.filter(p => p.clientId === clientId);
        if (status && status !== 'all') projects = projects.filter(p => p.status === status);

        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET single project
router.get('/:id', async (req, res) => {
    try {
        const doc = await db.collection(COLLECTION).doc(req.params.id).get();
        if (!doc.exists) return res.status(404).json({ error: 'Proje bulunamadı' });
        res.json({ id: doc.id, ...doc.data() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create project
router.post('/', async (req, res) => {
    try {
        const data = {
            clientId: req.body.clientId,
            clientName: req.body.clientName || '',
            name: req.body.name,
            description: req.body.description || '',
            startDate: req.body.startDate || '',
            endDate: req.body.endDate || '',
            status: req.body.status || 'Planlandı', // Planlandı, Devam Ediyor, Teslim Edildi
            checklist: req.body.checklist || [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        const docRef = await db.collection(COLLECTION).add(data);
        res.status(201).json({ id: docRef.id, ...data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update project
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

// DELETE project
router.delete('/:id', async (req, res) => {
    try {
        await db.collection(COLLECTION).doc(req.params.id).delete();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
