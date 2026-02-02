import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import '../styles/Pricing.css'; // Reusing premium styles

const NotFound = () => {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000',
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(0,102,255,0.15), transparent 60%)',
            color: '#fff',
            textAlign: 'center',
            padding: '20px'
        }}>
            <motion.h1
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                    fontSize: '8rem',
                    fontWeight: '900',
                    margin: 0,
                    background: 'linear-gradient(135deg, #fff 0%, #666 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}
            >
                404
            </motion.h1>

            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ fontSize: '2rem', marginBottom: '10px' }}
            >
                Kayıp Mı Oldunuz?
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                style={{ color: '#888', maxWidth: '400px', marginBottom: '40px', lineHeight: '1.6' }}
            >
                Aradığınız sayfa silinmiş, taşınmış veya hiç var olmamış olabilir. Endişelenmeyin, sizi eve bırakalım.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                <Link to="/" className="pricing-cta" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: '#fff',
                    color: '#000',
                    textDecoration: 'none',
                    padding: '15px 30px'
                }}>
                    <Home size={20} /> Ana Sayfaya Dön
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
