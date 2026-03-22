import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Services.css';

const Services = ({ t }) => {
    const gridRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('in-view');
            });
        }, { threshold: 0.08 });

        const cards = document.querySelectorAll('.svc-card');
        cards.forEach(card => observer.observe(card));
        return () => observer.disconnect();
    }, []);

    return (
        <section id="services" className="svc-section" aria-label="Hizmetler">
            <div className="svc-inner">
                {/* Cinematic Header */}
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
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        {t.title}
                    </motion.h2>
                    <motion.p
                        className="svc-tagline"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        {t.subtitle}
                    </motion.p>
                </div>

                {/* Featured Showcase — large cards */}
                <div className="svc-showcase" ref={gridRef}>
                    {t.items.filter(item => item.isFeatured).map((service, index) => (
                        <Link
                            to={`/services/${service.id}`}
                            className="svc-card"
                            key={service.id}
                            style={{ '--i': index }}
                        >
                            <div className="svc-card-inner">
                                <span className="svc-num">{String(index + 1).padStart(2, '0')}</span>
                                <h3 className="svc-card-title">{service.title}</h3>
                                <p className="svc-card-desc">{service.description}</p>
                                <span className="svc-card-cta">
                                    Keşfet
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All CTA */}
                <motion.div
                    className="svc-footer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Link to="/services" className="svc-view-all">
                        {t.viewAll}
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </Link>
                </motion.div>

                {/* Tech marquee */}
                <div className="svc-tech-bar">
                    <div className="svc-tech-track">
                        {['React', 'Next.js', 'Firebase', 'Node.js', 'AI/ML', 'Three.js', 'Framer Motion', 'Vercel', 'AWS', 'Figma', 'React', 'Next.js', 'Firebase', 'Node.js', 'AI/ML', 'Three.js'].map((tech, i) => (
                            <span key={i} className="svc-tech-item">{tech}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Services);
