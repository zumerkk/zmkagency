import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Testimonials.css';

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
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
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
                        <motion.div
                            key={index}
                            className="tst-card"
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                        >
                            <div className="tst-quote-mark">"</div>
                            <p className="tst-text">{item.text}</p>
                            <div className="tst-author">
                                <div className="tst-avatar">{item.author.charAt(0)}</div>
                                <div>
                                    <h4 className="tst-name">{item.author}</h4>
                                    <span className="tst-position">{item.position}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
