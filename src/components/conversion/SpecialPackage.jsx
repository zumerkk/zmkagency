import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../../styles/SpecialPackage.css';

const SpecialPackage = ({ t }) => {
    if (!t) return null;

    return (
        <section className="special-package-section">
            <div className="container">
                <motion.div 
                    className="sp-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="sp-card-content">
                        <div className="sp-badge-wrapper">
                            <span className="sp-badge">{t.badge}</span>
                        </div>
                        <h2 className="sp-title">{t.title}</h2>
                        <h3 className="sp-subtitle">{t.subtitle}</h3>
                        <p className="sp-desc">{t.description}</p>
                        
                        <div className="sp-price-wrap">
                            <span className="sp-currency">{t.currency}</span>
                            <span className="sp-price">{t.price}</span>
                            <span className="sp-period">{t.period}</span>
                        </div>

                        <div className="sp-features">
                            {t.features && t.features.map((feature, idx) => (
                                <motion.div 
                                    className="sp-feature-item" 
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                >
                                    {feature}
                                </motion.div>
                            ))}
                        </div>

                        <div className="sp-cta-group">
                            <a href="https://wa.me/905456789012" target="_blank" rel="noopener noreferrer" className="sp-btn-primary">
                                {t.cta}
                            </a>
                            <Link to="/pricing" className="sp-btn-secondary">
                                {t.secondaryCta}
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SpecialPackage;
