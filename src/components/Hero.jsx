import React, { useEffect, useMemo, useRef, useState } from 'react';
import '../styles/Hero.css';
import { motion } from 'framer-motion';

const Hero = ({ t, onCtaClick }) => {
    const heroRef = useRef(null);
    const contentRef = useRef(null);
    const spotlightRef = useRef(null);
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);
    const particles = useMemo(() => Array.from({ length: 20 }, (_, i) => {
        const seed = i + 1;
        const pseudoRandom = (multiplier) => {
            const value = Math.sin(seed * multiplier) * 10000;
            return value - Math.floor(value);
        };

        return {
            left: `${pseudoRandom(12.9898) * 100}%`,
            top: `${pseudoRandom(78.233) * 100}%`,
            animationDelay: `${pseudoRandom(37.719) * 8}s`,
            animationDuration: `${6 + pseudoRandom(21.131) * 8}s`,
            width: `${1 + pseudoRandom(91.17) * 2}px`,
            height: `${1 + pseudoRandom(45.53) * 2}px`,
        };
    }), []);

    // Parallax on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (!contentRef.current) return;
            const scrolled = window.scrollY;
            const rate = scrolled * 0.35;
            const opacity = Math.max(0, 1 - scrolled / 600);
            contentRef.current.style.transform = `translateY(${rate}px) scale(${1 - scrolled * 0.0002})`;
            contentRef.current.style.opacity = opacity;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Mouse-following spotlight
    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;
        const handleMouse = (e) => {
            if (!spotlightRef.current) return;
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(41,151,255,0.04), transparent 70%)`;
        };
        hero.addEventListener('mousemove', handleMouse);
        return () => hero.removeEventListener('mousemove', handleMouse);
    }, []);

    // Animated counters
    useEffect(() => {
        const duration = 2000;
        const targets = [150, 98, 24];
        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            setCount1(Math.round(targets[0] * ease));
            setCount2(Math.round(targets[1] * ease));
            setCount3(Math.round(targets[2] * ease));
            if (progress >= 1) clearInterval(interval);
        }, 16);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="apple-hero" ref={heroRef} aria-label="Ana bölüm">
            {/* Mouse-tracking spotlight */}
            <div className="hero-spotlight" ref={spotlightRef}></div>

            {/* Cinematic ambient orbs */}
            <div className="apple-hero-ambient">
                <div className="apple-hero-orb orb-1"></div>
                <div className="apple-hero-orb orb-2"></div>
                <div className="apple-hero-orb orb-3"></div>
            </div>

            {/* Floating particles */}
            <div className="hero-particles">
                {particles.map((style, i) => (
                    <div key={i} className="hero-particle" style={style}></div>
                ))}
            </div>

            <div className="apple-hero-content" ref={contentRef}>
                {/* Live badge with pulse */}
                <motion.div
                    className="hero-live-badge"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <span className="live-dot"></span>
                    Kırıkkale Yazılım • Reklam • SEO
                </motion.div>

                <motion.h1
                    className="apple-hero-h1"
                    initial={{ opacity: 0, y: 80 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <span className="hero-line-1">{t.title1}</span>
                    <span className="hero-line-2">{t.title2}</span>
                </motion.h1>

                <motion.p
                    className="apple-hero-sub"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    {t.subtitle}
                </motion.p>

                <motion.div
                    className="apple-hero-actions"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <button onClick={onCtaClick} className="hero-btn-primary" aria-label="Ücretsiz analiz al">
                        <span className="btn-shimmer"></span>
                        {t.ctaPrimary}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
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

                {/* Animated Stats */}
                <motion.div
                    className="hero-stats"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                >
                    <div className="hero-stat">
                        <span className="stat-number">{count1}+</span>
                        <span className="stat-label">Tamamlanan Proje</span>
                    </div>
                    <div className="hero-stat-divider"></div>
                    <div className="hero-stat">
                        <span className="stat-number">%{count2}</span>
                        <span className="stat-label">Müşteri Memnuniyeti</span>
                    </div>
                    <div className="hero-stat-divider"></div>
                    <div className="hero-stat">
                        <span className="stat-number">{count3}/7</span>
                        <span className="stat-label">Kesintisiz Destek</span>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="hero-scroll-cue"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
            >
                <div className="scroll-mouse">
                    <div className="scroll-wheel"></div>
                </div>
                <span className="scroll-text">Keşfet</span>
            </motion.div>
        </section>
    );
};

export default React.memo(Hero);
