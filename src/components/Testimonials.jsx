import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Testimonials.css';

const Testimonials = ({ t }) => {
    return (
        <section className="testimonials-section">
            <div className="container">
                <div className="testimonials-header">
                    <h2 className="section-title">
                        <span className="text-gradient">{t.title}</span>
                    </h2>
                    <p className="section-subtitle">{t.subtitle}</p>
                </div>

                <div className="testimonials-grid">
                    {t.items.map((item, index) => (
                        <motion.div
                            key={index}
                            className="testimonial-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <p className="testimonial-text">
                                "{item.text}"
                            </p>
                            <div className="testimonial-author">
                                <div className="author-avatar">
                                    {item.author.charAt(0)}
                                </div>
                                <div className="author-info">
                                    <h4 className="author-name">{item.author}</h4>
                                    <span className="author-position">{item.position}</span>
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
