import { Router } from 'express';
import { db } from '../index.js';
import { generateQuoteDocx, generateContractDocx, generateClientFileDocx } from '../generators/docxGenerator.js';
import { generateQuotePdf, generateContractPdf, generateClientFilePdf } from '../generators/pdfGenerator.js';
import { generatePaymentsXlsx, generateQuoteXlsx } from '../generators/xlsxGenerator.js';

const router = Router();

// GET /api/documents/quote/:id?format=docx|pdf|xlsx
router.get('/quote/:id', async (req, res) => {
    try {
        const format = req.query.format || 'pdf';
        const doc = await db.collection('quotes').doc(req.params.id).get();
        if (!doc.exists) return res.status(404).json({ error: 'Teklif bulunamadı' });

        const quote = { id: doc.id, ...doc.data() };
        let client = null;
        if (quote.clientId) {
            const clientDoc = await db.collection('clients').doc(quote.clientId).get();
            if (clientDoc.exists) client = { id: clientDoc.id, ...clientDoc.data() };
        }

        const filename = `ZMK_Teklif_${quote.quoteNumber}`;

        if (format === 'docx') {
            const buffer = await generateQuoteDocx(quote, client);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}.docx"`);
            return res.send(buffer);
        }

        if (format === 'xlsx') {
            const buffer = await generateQuoteXlsx(quote, client);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}.xlsx"`);
            return res.send(Buffer.from(buffer));
        }

        // Default: PDF
        const buffer = await generateQuotePdf(quote, client);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}.pdf"`);
        return res.send(buffer);
    } catch (err) {
        console.error('Document generation error:', err);
        res.status(500).json({ error: err.message });
    }
});

// GET /api/documents/contract/:id?format=docx|pdf
router.get('/contract/:id', async (req, res) => {
    try {
        const format = req.query.format || 'pdf';
        const doc = await db.collection('contracts').doc(req.params.id).get();
        if (!doc.exists) return res.status(404).json({ error: 'Sözleşme bulunamadı' });

        const contract = { id: doc.id, ...doc.data() };
        let client = null;
        if (contract.clientId) {
            const clientDoc = await db.collection('clients').doc(contract.clientId).get();
            if (clientDoc.exists) client = { id: clientDoc.id, ...clientDoc.data() };
        }

        const filename = `ZMK_Sozlesme_${contract.contractNumber}_v${contract.version}`;

        if (format === 'docx') {
            const buffer = await generateContractDocx(contract, client);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}.docx"`);
            return res.send(buffer);
        }

        // Default: PDF
        const buffer = await generateContractPdf(contract, client);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}.pdf"`);
        return res.send(buffer);
    } catch (err) {
        console.error('Document generation error:', err);
        res.status(500).json({ error: err.message });
    }
});

// GET /api/documents/client-file/:id?format=docx|pdf
router.get('/client-file/:id', async (req, res) => {
    try {
        const format = req.query.format || 'pdf';
        const clientDoc = await db.collection('clients').doc(req.params.id).get();
        if (!clientDoc.exists) return res.status(404).json({ error: 'Müşteri bulunamadı' });

        const client = { id: clientDoc.id, ...clientDoc.data() };

        // Fetch related data
        const [projectsSnap, quotesSnap, contractsSnap] = await Promise.all([
            db.collection('projects').where('clientId', '==', req.params.id).get(),
            db.collection('quotes').where('clientId', '==', req.params.id).get(),
            db.collection('contracts').where('clientId', '==', req.params.id).get(),
        ]);

        const projects = projectsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        const quotes = quotesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        const contracts = contractsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        const filename = `ZMK_Musteri_${client.companyName.replace(/\s+/g, '_')}`;

        if (format === 'docx') {
            const buffer = await generateClientFileDocx(client, projects, quotes, contracts);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}.docx"`);
            return res.send(buffer);
        }

        // Default: PDF
        const buffer = await generateClientFilePdf(client, projects, quotes);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}.pdf"`);
        return res.send(buffer);
    } catch (err) {
        console.error('Document generation error:', err);
        res.status(500).json({ error: err.message });
    }
});

// GET /api/documents/payments?format=xlsx&clientId=xxx
router.get('/payments', async (req, res) => {
    try {
        const { clientId } = req.query;
        const snapshot = await db.collection('payment_plans').get();
        let plans = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
        if (clientId) plans = plans.filter(p => p.clientId === clientId);

        const now = new Date();
        const monthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        const filename = `ZMK_Odemeler_${monthStr}`;

        const buffer = await generatePaymentsXlsx(plans);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}.xlsx"`);
        return res.send(Buffer.from(buffer));
    } catch (err) {
        console.error('Document generation error:', err);
        res.status(500).json({ error: err.message });
    }
});

export default router;
