import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../../styles/SpecialPackage.css';

const SpecialPackage = ({ t }) => {
    if (!t) return null;

    return (
        <section className="apple-sp">
            <div className="apple-sp-inner">
                <motion.div 
                    className="apple-sp-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <p className="apple-sp-badge">{t.badge}</p>
                    <h2 className="apple-sp-title">{t.title}</h2>
                    <h3 className="apple-sp-subtitle">{t.subtitle}</h3>
                    <p className="apple-sp-desc">{t.description}</p>
                    
                    <div className="apple-sp-features">
                        {t.features && t.features.map((feature, idx) => (
                            <motion.div 
                                className="apple-sp-feature" 
                                key={idx}
                                initial={{ opacity: 0, x: -15 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: idx * 0.06 }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#30d158" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                {feature}
                            </motion.div>
                        ))}
                    </div>

                    <div className="apple-sp-actions">
                        <a href="https://wa.me/905413812114" target="_blank" rel="noopener noreferrer" className="apple-sp-cta-primary">
                            {t.cta}
                            <span>→</span>
                        </a>
                        <Link to="/hizmetler" className="apple-sp-cta-ghost">
                            {t.secondaryCta}
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SpecialPackage;
