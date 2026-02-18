import { db } from '../index.js';

export const auditLog = async (req, res, next) => {
    // Only log mutating operations
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
        const originalJson = res.json.bind(res);
        res.json = (body) => {
            // Log after response is sent
            const logEntry = {
                userId: req.user?.uid || 'unknown',
                userEmail: req.user?.email || 'unknown',
                action: req.method,
                resource: req.originalUrl,
                timestamp: new Date().toISOString(),
                statusCode: res.statusCode,
                ip: req.ip,
                userAgent: req.get('User-Agent') || '',
            };

            // Fire and forget — don't block response
            db.collection('audit_logs').add(logEntry).catch(err => {
                console.error('Audit log error:', err.message);
            });

            return originalJson(body);
        };
    }
    next();
};
