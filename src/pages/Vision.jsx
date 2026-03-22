import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Clients from '../components/Clients';
import CareerTeaser from '../components/CareerTeaser';
import '../styles/Vision.css';

const Vision = ({ t }) => {
    const vision = t.vision;

    return (
        <>
            <SEO
                title={`${vision.title} | ZMK Agency`}
                description={vision.subtitle}
            />

            <div className="apple-vision">
                {/* ═══ MANIFESTO HERO ═══ */}
                <section className="av-manifesto">
                    <div className="av-manifesto-inner">
                        <motion.p
                            className="av-eyebrow"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            Vizyon
                        </motion.p>
                        <motion.h1
                            className="av-h1"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                        >
                            {vision.title}
                        </motion.h1>
                        <motion.p
                            className="av-subtitle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            {vision.subtitle}
                        </motion.p>
                    </div>
                </section>

                {/* ═══ CORE TEXT ═══ */}
                <section className="av-core">
                    <div className="av-core-inner">
                        <motion.p
                            className="av-core-p1"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                        >
                            {vision.p1}
                        </motion.p>
                        <motion.p
                            className="av-core-p2"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                        >
                            {vision.p2}
                        </motion.p>
                    </div>
                </section>

                {/* ═══ STATS ═══ */}
                <section className="av-stats">
                    <div className="av-stats-inner">
                        <motion.div
                            className="av-stat-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <span className="av-stat-num">∞</span>
                            <span className="av-stat-label">{vision.stat1}</span>
                        </motion.div>
                        <motion.div
                            className="av-stat-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            <span className="av-stat-num">Global</span>
                            <span className="av-stat-label">{vision.stat2}</span>
                        </motion.div>
                        <motion.div
                            className="av-stat-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="av-stat-num">%100</span>
                            <span className="av-stat-label">Kırıkkale Dominasyonu</span>
                        </motion.div>
                    </div>
                </section>

                {/* ═══ DNA ═══ */}
                <section className="av-dna">
                    <div className="av-dna-inner">
                        <p className="av-eyebrow" style={{ textAlign: 'center', marginBottom: 12 }}>DNA</p>
                        <h2 className="av-section-h2">Ajans DNA'sı</h2>
                        <div className="av-dna-grid">
                            <motion.div
                                className="av-dna-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <span className="av-dna-icon">◈</span>
                                <h3>Premium Standart</h3>
                                <p>Ortalama işler bizim için yok hükmündedir. Her pikselde mükemmellik ararız.</p>
                            </motion.div>
                            <motion.div
                                className="av-dna-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.08 }}
                            >
                                <span className="av-dna-icon">⬡</span>
                                <h3>Hız ve Performans</h3>
                                <p>Dijital dünyada yavaş olan kaybeder. En son teknolojileri kullanırız.</p>
                            </motion.div>
                            <motion.div
                                className="av-dna-card"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.16 }}
                            >
                                <span className="av-dna-icon">◉</span>
                                <h3>Şeffaf Ortaklık</h3>
                                <p>Gizli maliyetler yok. Kırıkkale esnafıyla el sıkışarak, güvenle çalışırız.</p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* ═══ CLIENTS ═══ */}
                <div style={{ padding: '60px 0' }}>
                    <Clients t={t.clients} />
                </div>

                {/* ═══ CAREER ═══ */}
                <CareerTeaser t={t} />
            </div>
        </>
    );
};

export default Vision;
