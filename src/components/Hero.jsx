import React, { useEffect, useRef } from 'react';
import '../styles/Hero.css';
import { motion } from 'framer-motion';

const Hero = ({ t, onCtaClick }) => {
    const heroRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!heroRef.current) return;
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;
            const opacity = Math.max(0, 1 - scrolled / 700);
            heroRef.current.style.transform = `translateY(${rate}px)`;
            heroRef.current.style.opacity = opacity;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="apple-hero" aria-label="Ana bölüm">
            {/* Cinematic ambient layers */}
            <div className="apple-hero-ambient">
                <div className="apple-hero-orb orb-1"></div>
                <div className="apple-hero-orb orb-2"></div>
                <div className="apple-hero-orb orb-3"></div>
            </div>

            <div className="apple-hero-content" ref={heroRef}>
                <motion.div
                    className="apple-hero-badge"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="badge-dot"></span>
                    Kırıkkale'nin #1 Dijital Ajansı
                </motion.div>

                <motion.h1
                    className="apple-hero-h1"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.15 }}
                >
                    <span className="hero-line-1">{t.title1}</span>
                    <span className="hero-line-2">{t.title2}</span>
                </motion.h1>

                <motion.p
                    className="apple-hero-sub"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {t.subtitle}
                </motion.p>

                <motion.div
                    className="apple-hero-actions"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <button onClick={onCtaClick} className="hero-btn-primary" aria-label="Ücretsiz analiz al">
                        {t.ctaPrimary}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </button>
                    <a
                        href="https://wa.me/905413812114?text=Merhaba,%20dijital%20dönüşüm%20için%20bilgi%20almak%20istiyorum."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-btn-secondary"
                        aria-label="WhatsApp ile iletişime geç"
                    >
                        {t.ctaSecondary}
                    </a>
                </motion.div>

                {t.microStats && (
                    <motion.div
                        className="apple-hero-proof"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                    >
                        {t.microStats.map((stat, idx) => (
                            <div key={idx} className="hero-proof-item">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#30d158" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                <span>{stat}</span>
                            </div>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* Scroll cue */}
            <motion.div
                className="hero-scroll-cue"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <span>Keşfet</span>
                <div className="scroll-cue-line"></div>
            </motion.div>
        </section>
    );
};

export default React.memo(Hero);
