import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = ({ t }) => {
    // Basic styling for testimonials if no specific CSS file exists
    // Using inline styles consistent with glassmorphism
    const cardStyle = {
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '24px',
        padding: '30px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    };

    return (
        <section style={{ padding: '80px 0' }}>
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h2 className="section-title">
                        <span className="text-gradient">{t.title}</span>
                    </h2>
                    <p className="section-subtitle">{t.subtitle}</p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '30px'
                }}>
                    {t.items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            style={cardStyle}
                        >
                            <p style={{
                                fontSize: '18px',
                                lineHeight: '1.6',
                                color: 'var(--text-primary)',
                                marginBottom: '20px',
                                fontStyle: 'italic'
                            }}>
                                "{item.text}"
                            </p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(45deg, var(--accent-primary), var(--accent-secondary))',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white',
                                    fontWeight: 'bold'
                                }}>
                                    {item.author.charAt(0)}
                                </div>
                                <div>
                                    <h4 style={{ color: 'var(--text-primary)', margin: 0, fontSize: '16px' }}>{item.author}</h4>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{item.position}</span>
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
