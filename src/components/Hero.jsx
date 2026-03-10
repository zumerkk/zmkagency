import React from 'react';
import '../styles/Hero.css';
import { motion } from 'framer-motion';
import heroBg from '../assets/hero-bg.png';

const Hero = ({ t, onCtaClick }) => {
    return (
        <section className="hero">
            <div className="hero-bg-container">
                <motion.img
                    src={heroBg}
                    alt="ZMK Agency Kırıkkale Dijital Reklam Ajansı"
                    className="hero-bg-image"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <div className="hero-overlay"></div>
            </div>

            <div className="hero-content container">
                <h1 className="hero-title">
                    <motion.span
                        className="block-reveal"
                        initial={{ y: 100, opacity: 0, rotateX: 20 }}
                        animate={{ y: 0, opacity: 1, rotateX: 0 }}
                        transition={{ duration: 0.8, ease: "circOut" }}
                    >
                        {t.title1}
                    </motion.span>
                    <br />
                    <motion.span
                        className="block-reveal"
                        initial={{ y: 100, opacity: 0, rotateX: 20 }}
                        animate={{ y: 0, opacity: 1, rotateX: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
                    >
                        {t.title2}
                    </motion.span>
                </h1>
                <motion.p
                    className="hero-subtitle"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {t.subtitle}
                </motion.p>
                <div className="hero-actions">
                    <motion.button
                        onClick={onCtaClick}
                        className="btn-primary"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {t.ctaPrimary}
                    </motion.button>
                    <motion.a
                        href="https://wa.me/905000000000?text=Merhaba,%20dijital%20dönüşüm%20için%20bilgi%20almak%20istiyorum."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {t.ctaSecondary}
                    </motion.a>
                </div>

                {t.microStats && (
                    <motion.div
                        className="hero-micro-stats"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        {t.microStats.map((stat, idx) => (
                            <span key={idx} className="micro-stat-item">
                                <svg className="stat-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                {stat}
                            </span>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default React.memo(Hero);
