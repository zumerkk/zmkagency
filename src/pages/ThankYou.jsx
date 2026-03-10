import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useWindowSize } from 'react-use'; // You might need to install 'react-use' or implement a hook, but basic confetti works without size too usually or defaults to window. Assuming standard window usage or just removing size prop if strict.
// Actually standard react-confetti uses window size by default or we can pass width/height.
// To serve as a conversion point, we can trigger a GTM event here on mount.

const ThankYou = () => {
    const navigate = useNavigate();
    const { width, height } = { width: window.innerWidth, height: window.innerHeight };

    useEffect(() => {
        // Trigger GTM Conversion Event
        if (window.dataLayer) {
            window.dataLayer.push({
                'event': 'conversion_lead',
                'conversion_type': 'contact_form'
            });
        }
    }, []);

    return (
        <section className="thank-you-page" style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#000',
            color: '#fff',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{ zIndex: 10, maxWidth: '600px', padding: '20px' }}
            >
                <div style={{ marginBottom: '30px', display: 'inline-block', padding: '20px', background: 'rgba(74, 222, 128, 0.1)', borderRadius: '50%' }}>
                    <CheckCircle size={64} color="#4ade80" />
                </div>

                <h1 style={{ fontSize: '3rem', marginBottom: '20px', background: 'linear-gradient(to right, #4ade80, #22c55e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Tebrikler!
                </h1>

                <p style={{ fontSize: '1.2rem', color: '#ccc', marginBottom: '40px', lineHeight: '1.6' }}>
                    Başvurunuz başarıyla alındı. Uzman ekibimiz analizini hazırlayıp sizinle iletişime geçecek.
                </p>

                <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '30px',
                    borderRadius: '16px',
                    marginBottom: '40px',
                    border: '1px solid rgba(255,255,255,0.1)'
                }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff' }}>Biz size dönüş yapana kadar:</h3>
                    <p style={{ color: '#aaa', marginBottom: '20px' }}>2026 yılı için hazırladığımız dijital büyüme rehberine göz atmak ister misiniz?</p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/magazine')}
                        style={{
                            padding: '12px 24px',
                            background: 'var(--text-accent, #25D366)',
                            color: '#000',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                    >
                        Ücretsiz Rehberleri Oku <ArrowRight size={18} />
                    </motion.button>
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/')}
                    style={{
                        padding: '12px 24px',
                        background: 'transparent',
                        color: '#fff',
                        border: '1px solid rgba(255,255,255,0.2)',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    Ana Sayfaya Dön
                </motion.button>
            </motion.div>

            {/* Background Gradients */}
            <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(74,222,128,0.2) 0%, transparent 70%)', filter: 'blur(60px)' }}></div>
            <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(74,222,128,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }}></div>
        </section>
    );
};

export default ThankYou;
