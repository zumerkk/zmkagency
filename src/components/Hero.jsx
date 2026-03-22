import React from 'react';
import '../styles/Hero.css';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = ({ t, onCtaClick }) => {
    return (
        <section className="apple-hero">
            {/* Subtle ambient glow */}
            <div className="apple-hero-glow"></div>

            <div className="apple-hero-content">
                <motion.p
                    className="apple-hero-eyebrow"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    ZMK Agency — Kırıkkale
                </motion.p>

                <motion.h1
                    className="apple-hero-h1"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    <span className="apple-hero-white">{t.title1}</span>
                    <br />
                    <span className="apple-hero-gradient">{t.title2}</span>
                </motion.h1>

                <motion.p
                    className="apple-hero-sub"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                >
                    {t.subtitle}
                </motion.p>

                <motion.div
                    className="apple-hero-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <button onClick={onCtaClick} className="apple-cta-primary">
                        {t.ctaPrimary}
                        <span className="apple-cta-arrow">→</span>
                    </button>
                    <a
                        href="https://wa.me/905413812114?text=Merhaba,%20dijital%20dönüşüm%20için%20bilgi%20almak%20istiyorum."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="apple-cta-ghost"
                    >
                        {t.ctaSecondary}
                    </a>
                </motion.div>

                {t.microStats && (
                    <motion.div
                        className="apple-hero-stats"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        {t.microStats.map((stat, idx) => (
                            <span key={idx} className="apple-hero-stat">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                                {stat}
                            </span>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="apple-hero-scroll"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                <div className="apple-scroll-line"></div>
            </motion.div>
        </section>
    );
};

export default React.memo(Hero);
