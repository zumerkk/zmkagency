import { Router } from 'express';
import { db } from '../index.js';

const router = Router();

// Dashboard overview stats
router.get('/', async (req, res) => {
    try {
        // Get counts
        const [clientsSnap, projectsSnap, quotesSnap, paymentsSnap] = await Promise.all([
            db.collection('clients').get(),
            db.collection('projects').get(),
            db.collection('quotes').get(),
            db.collection('payment_plans').get(),
        ]);

        const clients = clientsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        const projects = projectsSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        const quotes = quotesSnap.docs.map(d => ({ id: d.id, ...d.data() }));
        const payments = paymentsSnap.docs.map(d => ({ id: d.id, ...d.data() }));

        const now = new Date();
        const sevenDaysLater = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        // Overdue payments
        const overduePayments = [];
        const upcomingPayments = [];

        payments.forEach(plan => {
            (plan.installments || []).forEach(inst => {
                if (!inst.paid) {
                    const dueDate = new Date(inst.dueDate);
                    if (dueDate < now) {
                        overduePayments.push({
                            planId: plan.id,
                            clientName: plan.clientName,
                            amount: inst.amount,
                            dueDate: inst.dueDate,
                            currency: plan.currency,
                        });
                    } else if (dueDate <= sevenDaysLater) {
                        upcomingPayments.push({
                            planId: plan.id,
                            clientName: plan.clientName,
                            amount: inst.amount,
                            dueDate: inst.dueDate,
                            currency: plan.currency,
                        });
                    }
                }
            });
        });

        const totalReceivable = payments.reduce((sum, p) => sum + (p.remainingTotal || 0), 0);
        const totalReceived = payments.reduce((sum, p) => sum + (p.paidTotal || 0), 0);

        res.json({
            stats: {
                totalClients: clients.length,
                activeClients: clients.filter(c => c.status === 'Aktif').length,
                potentialClients: clients.filter(c => c.status === 'Potansiyel').length,
                activeProjects: projects.filter(p => p.status === 'Devam Ediyor').length,
                totalProjects: projects.length,
                totalQuotes: quotes.length,
                pendingQuotes: quotes.filter(q => q.status === 'Taslak' || q.status === 'Gönderildi').length,
                totalReceivable,
                totalReceived,
                overdueCount: overduePayments.length,
            },
            overduePayments: overduePayments.slice(0, 10),
            upcomingPayments: upcomingPayments.slice(0, 10),
            recentClients: clients.slice(0, 5),
            recentQuotes: quotes.slice(0, 5),
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
