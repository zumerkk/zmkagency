import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import '../styles/Testimonials.css';

const TestimonialCard = ({ item, index }) => {
    const cardRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -4;
        const rotateY = (x - centerX) / centerX * 4;
        cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    }, []);

    // Star rating
    const stars = '★★★★★';

    return (
        <motion.div
            className="tst-card"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08, duration: 0.6 }}
        >
            <div className="tst-card-inner">
                <div className="tst-stars">{stars}</div>
                <p className="tst-text">{item.text}</p>
                <div className="tst-author">
                    <div className="tst-avatar">{item.author.charAt(0)}</div>
                    <div>
                        <h4 className="tst-name">{item.author}</h4>
                        <span className="tst-position">{item.position}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const Testimonials = ({ t }) => {
    return (
        <section className="tst-section" aria-label="Müşteri Yorumları">
            <div className="tst-inner">
                <div className="tst-header">
                    <motion.span
                        className="tst-eyebrow"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Müşteri Deneyimi
                    </motion.span>
                    <motion.h2
                        className="tst-headline"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                    >
                        {t.title}
                    </motion.h2>
                    <motion.p
                        className="tst-tagline"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        {t.subtitle}
                    </motion.p>
                </div>

                <div className="tst-grid">
                    {t.items.map((item, index) => (
                        <TestimonialCard key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
