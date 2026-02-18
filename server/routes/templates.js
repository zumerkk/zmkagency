import { Router } from 'express';
import { db } from '../index.js';

const router = Router();
const COLLECTION = 'settings';

// GET all templates/settings
router.get('/', async (req, res) => {
    try {
        const snapshot = await db.collection(COLLECTION).get();
        const settings = {};
        snapshot.docs.forEach(doc => {
            settings[doc.id] = doc.data();
        });
        res.json(settings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET specific template
router.get('/:key', async (req, res) => {
    try {
        const doc = await db.collection(COLLECTION).doc(req.params.key).get();
        if (!doc.exists) return res.status(404).json({ error: 'Şablon bulunamadı' });
        res.json({ id: doc.id, ...doc.data() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update template/setting
router.put('/:key', async (req, res) => {
    try {
        await db.collection(COLLECTION).doc(req.params.key).set({
            ...req.body,
            updatedAt: new Date().toISOString(),
        }, { merge: true });
        const updated = await db.collection(COLLECTION).doc(req.params.key).get();
        res.json({ id: updated.id, ...updated.data() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
