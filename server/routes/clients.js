import { Router } from 'express';
import { db } from '../index.js';

const router = Router();
const COLLECTION = 'clients';

// GET all clients
router.get('/', async (req, res) => {
    try {
        const { status, search } = req.query;
        let ref = db.collection(COLLECTION).orderBy('createdAt', 'desc');

        const snapshot = await ref.get();
        let clients = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        if (status && status !== 'all') {
            clients = clients.filter(c => c.status === status);
        }
        if (search) {
            const s = search.toLowerCase();
            clients = clients.filter(c =>
                c.companyName?.toLowerCase().includes(s) ||
                c.contactName?.toLowerCase().includes(s) ||
                c.email?.toLowerCase().includes(s)
            );
        }

        res.json(clients);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET single client
router.get('/:id', async (req, res) => {
    try {
        const doc = await db.collection(COLLECTION).doc(req.params.id).get();
        if (!doc.exists) return res.status(404).json({ error: 'Müşteri bulunamadı' });
        res.json({ id: doc.id, ...doc.data() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST create client
router.post('/', async (req, res) => {
    try {
        const data = {
            companyName: req.body.companyName || '',
            taxOffice: req.body.taxOffice || '',
            taxNumber: req.body.taxNumber || '',
            contactName: req.body.contactName || '',
            phone: req.body.phone || '',
            email: req.body.email || '',
            address: req.body.address || '',
            website: req.body.website || '',
            sector: req.body.sector || '',
            status: req.body.status || 'Aktif',
            notes: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        const docRef = await db.collection(COLLECTION).add(data);
        res.status(201).json({ id: docRef.id, ...data });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT update client
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body, updatedAt: new Date().toISOString() };
        delete updates.id;
        await db.collection(COLLECTION).doc(id).update(updates);
        const updated = await db.collection(COLLECTION).doc(id).get();
        res.json({ id: updated.id, ...updated.data() });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE client
router.delete('/:id', async (req, res) => {
    try {
        await db.collection(COLLECTION).doc(req.params.id).delete();
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST add note to client
router.post('/:id/notes', async (req, res) => {
    try {
        const { id } = req.params;
        const note = {
            text: req.body.text,
            type: req.body.type || 'note', // note, call, meeting, email
            createdAt: new Date().toISOString(),
            createdBy: req.user.email,
        };
        const doc = await db.collection(COLLECTION).doc(id).get();
        const notes = doc.data().notes || [];
        notes.unshift(note);
        await db.collection(COLLECTION).doc(id).update({ notes, updatedAt: new Date().toISOString() });
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
