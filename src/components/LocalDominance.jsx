/* LocalDominance.jsx (Apex Edition) */
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Store, TrendingUp, CheckCircle } from 'lucide-react';
import '../styles/LocalDominance.css';

const LocalDominance = ({ t, onCtaClick }) => {
    return (
        <section className="local-dominance-section">
            <div className="container">
                <div className="local-grid">
                    {/* Text Side */}
                    <div className="local-text">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="badge-local"
                        >
                            <MapPin size={14} /> {t.badge}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            {t.title}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {t.subtitle}
                        </motion.p>

                        <div className="local-features">
                            {t.features.map((feature, i) => (
                                <motion.div
                                    key={i}
                                    className="local-feature-item"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                >
                                    <CheckCircle size={20} className="check-icon" />
                                    <span>{feature}</span>
                                </motion.div>
                            ))}
                        </div>

                        <motion.button
                            className="cta-local"
                            onClick={onCtaClick}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            {t.cta}
                        </motion.button>
                    </div>

                    {/* Visual Side (Simulated Map/Rankings) */}
                    <div className="local-visual">
                        <div className="map-card-stack">
                            <motion.div
                                className="map-card primary"
                                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="card-header-sim">
                                    <div className="circle"></div>
                                    <div className="bar"></div>
                                </div>
                                <div className="map-sim">
                                    <span className="pin center"><Store size={24} /></span>
                                    <span className="pin p1"></span>
                                    <span className="pin p2"></span>
                                </div>
                                <div className="stats-sim">
                                    <div className="stat-box">
                                        <span className="label">Görüntülenme</span>
                                        <span className="value success">▲ %450</span>
                                    </div>
                                    <div className="stat-box">
                                        <span className="label">Rota Tarifi</span>
                                        <span className="value success">▲ %320</span>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                className="review-card-float"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <div className="stars">★★★★★</div>
                                <p>"Müşterilerimiz bizi artık kolayca buluyor!"</p>
                                <span>- Memnun Esnaf</span>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LocalDominance;
