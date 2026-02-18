import rateLimit from 'express-rate-limit';

// General API rate limiter
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // limit each IP to 200 requests per window
    message: { error: 'Çok fazla istek gönderildi, lütfen bekleyin.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Login-specific stricter limiter
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, // 10 login attempts per 15 min
    message: { error: 'Çok fazla giriş denemesi. 15 dakika bekleyin.' },
    standardHeaders: true,
    legacyHeaders: false,
});
