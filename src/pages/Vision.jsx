import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SEO from '../components/SEO';
import Clients from '../components/Clients';
import CareerTeaser from '../components/CareerTeaser';
import '../styles/Vision.css';

const Vision = ({ t }) => {
    const vision = t.vision;
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <>
            <SEO
                title={`${vision.title} | ZMK Agency`}
                description={vision.subtitle}
            />

            <div className="vision-page">
                {/* Background Atmosphere */}
                <div className="bg-glow bg-glow-top"></div>

                {/* Manifesto Header */}
                <section className="manifesto-section">
                    <div className="container manifesto-container">
                        <motion.h1
                            className="manifesto-title"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        >
                            {vision.title}
                        </motion.h1>
                        <motion.p
                            className="manifesto-text"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        >
                            {vision.subtitle}
                        </motion.p>
                    </div>
                </section>

                {/* The Core Beliefs (Manifesto Text) */}
                <section className="container" style={{ paddingBottom: '100px' }}>
                    <div className="glass-panel" style={{ padding: '60px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                            <p style={{ fontSize: '1.5rem', lineHeight: '1.8', marginBottom: '30px', color: '#ccc' }}>
                                {vision.p1}
                            </p>
                            <p style={{ fontSize: '1.5rem', lineHeight: '1.8', color: '#fff', fontWeight: '500' }}>
                                {vision.p2}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats / Impact */}
                <section className="container">
                    <div className="vision-stats">
                        <motion.div
                            className="stat-card"
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="stat-number">∞</span>
                            <span className="stat-label">{vision.stat1}</span>
                        </motion.div>
                        <motion.div
                            className="stat-card"
                            whileHover={{ scale: 1.05 }}
                            transition={{ delay: 0.1 }}
                        >
                            <span className="stat-number">Global</span>
                            <span className="stat-label">{vision.stat2}</span>
                        </motion.div>
                        <motion.div
                            className="stat-card"
                            whileHover={{ scale: 1.05 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="stat-number">%100</span>
                            <span className="stat-label">Kırıkkale Dominasyonu</span>
                        </motion.div>
                    </div>
                </section>

                {/* Our DNA */}
                <section className="dna-section">
                    <div className="container">
                        <h2 className="section-title" style={{ textAlign: 'center' }}>Ajans DNA'sı</h2>
                        <div className="dna-grid">
                            <div className="dna-item">
                                <span className="dna-icon">💎</span>
                                <h3 className="dna-title">Premium Standart</h3>
                                <p className="dna-desc">Ortalama işler bizim için yok hükmündedir. Her pikselde mükemmellik ararız.</p>
                            </div>
                            <div className="dna-item">
                                <span className="dna-icon">🚀</span>
                                <h3 className="dna-title">Hız ve Performans</h3>
                                <p className="dna-desc">Dijital dünyada yavaş olan kaybeder. En son teknolojileri kullanırız.</p>
                            </div>
                            <div className="dna-item">
                                <span className="dna-icon">🤝</span>
                                <h3 className="dna-title">Şeffaf Ortaklık</h3>
                                <p className="dna-desc">Gizli maliyetler yok. Kırıkkale esnafıyla el sıkışarak, güvenle çalışırız.</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-glow bg-glow-bottom"></div>
                </section>

                <div style={{ padding: '80px 0' }}>
                    <Clients t={t.clients} />
                </div>

                <CareerTeaser t={t} />
            </div>
        </>
    );
};

export default Vision;
