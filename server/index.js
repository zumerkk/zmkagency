import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import dotenv from 'dotenv';

// Routes
import clientsRouter from './routes/clients.js';
import servicesRouter from './routes/services.js';
import projectsRouter from './routes/projects.js';
import quotesRouter from './routes/quotes.js';
import contractsRouter from './routes/contracts.js';
import paymentsRouter from './routes/payments.js';
import templatesRouter from './routes/templates.js';
import documentsRouter from './routes/documents.js';
import dashboardRouter from './routes/dashboard.js';

// Middleware
import { authMiddleware } from './middleware/auth.js';
import { auditLog } from './middleware/auditLog.js';
import { apiLimiter, loginLimiter } from './middleware/rateLimiter.js';

dotenv.config();

// Initialize Firebase Admin
if (!getApps().length) {
    // Use service account if available, otherwise use application default credentials
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        initializeApp({ credential: cert(serviceAccount) });
    } else {
        // For local dev - uses GOOGLE_APPLICATION_CREDENTIALS env var or emulator
        initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID || 'zmkagency' });
    }
}

export const db = getFirestore();
export const adminAuth = getAuth();

const app = express();
const PORT = process.env.PORT || 3001;

// Core middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting
app.use('/api/', apiLimiter);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Protected admin routes
app.use('/api/clients', authMiddleware, auditLog, clientsRouter);
app.use('/api/services', authMiddleware, auditLog, servicesRouter);
app.use('/api/projects', authMiddleware, auditLog, projectsRouter);
app.use('/api/quotes', authMiddleware, auditLog, quotesRouter);
app.use('/api/contracts', authMiddleware, auditLog, contractsRouter);
app.use('/api/payments', authMiddleware, auditLog, paymentsRouter);
app.use('/api/templates', authMiddleware, auditLog, templatesRouter);
app.use('/api/documents', authMiddleware, documentsRouter);
app.use('/api/dashboard', authMiddleware, dashboardRouter);

// Error handler
app.use((err, req, res, _next) => {
    console.error('Server Error:', err);
    res.status(err.status || 500).json({
        error: err.message || 'Sunucu hatası',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

app.listen(PORT, () => {
    console.log(`🚀 ZMK Admin API running on port ${PORT}`);
});

export default app;
