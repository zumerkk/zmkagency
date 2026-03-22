import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Services.css';

const ServiceCard = ({ service, index }) => {
    const cardRef = useRef(null);

    // 3D tilt effect on mouse move
    const handleMouseMove = useCallback((e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -8;
        const rotateY = (x - centerX) / centerX * 8;
        cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        // Move the glow with cursor
        const glowEl = cardRef.current.querySelector('.svc-card-glow');
        if (glowEl) {
            glowEl.style.background = `radial-gradient(300px circle at ${x}px ${y}px, rgba(41,151,255,0.08), transparent 70%)`;
        }
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        const glowEl = cardRef.current.querySelector('.svc-card-glow');
        if (glowEl) glowEl.style.background = 'transparent';
    }, []);

    const num = String(index + 1).padStart(2, '0');

    return (
        <motion.div
            className="svc-card"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ delay: index * 0.08, duration: 0.6 }}
        >
            <div className="svc-card-glow"></div>
            <div className="svc-card-content">
                <span className="svc-num">{num}</span>
                <h3 className="svc-name">{service.title}</h3>
                <p className="svc-desc">{service.desc}</p>
                <Link to="/services" className="svc-link">
                    Keşfet
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </Link>
            </div>
        </motion.div>
    );
};

const Services = ({ t }) => {
    return (
        <section className="svc-section" aria-label="Hizmetlerimiz">
            <div className="svc-inner">
                <div className="svc-header">
                    <motion.span
                        className="svc-eyebrow"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Hizmetlerimiz
                    </motion.span>
                    <motion.h2
                        className="svc-headline"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                    >
                        {t.title}
                    </motion.h2>
                    <motion.p
                        className="svc-tagline"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        {t.subtitle}
                    </motion.p>
                </div>

                <div className="svc-grid">
                    {t.items.map((service, i) => (
                        <ServiceCard key={i} service={service} index={i} />
                    ))}
                </div>

                {/* CTA to services page */}
                <motion.div
                    className="svc-bottom-cta"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <Link to="/services" className="svc-all-link">
                        Tüm Hizmetleri Gör
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
