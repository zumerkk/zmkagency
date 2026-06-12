import React from 'react';
import { motion } from 'framer-motion';
import '../styles/About.css';
import logo from '../assets/zmk-logo-stacked.png';

const About = ({ t }) => {
    return (
        <section id="agency" className="about-section" aria-label="Hakkımızda">
            <div className="about-inner">
                <div className="about-grid">
                    {/* Visual */}
                    <motion.div
                        className="about-visual"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="about-logo-frame">
                            <div className="about-logo-glow"></div>
                            <img src={logo} alt="ZMK Agency" />
                        </div>
                        <div className="about-metrics">
                            <div className="about-metric">
                                <span className="metric-value">100%</span>
                                <span className="metric-label">{t.stats.focus}</span>
                            </div>
                            <div className="about-metric-divider"></div>
                            <div className="about-metric">
                                <span className="metric-value">#1</span>
                                <span className="metric-label">{t.stats.rank}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Text */}
                    <div className="about-text">
                        <motion.span
                            className="about-eyebrow"
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Agency
                        </motion.span>
                        <motion.h2
                            className="about-headline"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                        >
                            {t.title}
                        </motion.h2>
                        <motion.p
                            className="about-body"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                        >
                            {t.text}
                        </motion.p>
                        <motion.div
                            className="about-socials"
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                        >
                            {t.socials && Object.entries(t.socials).map(([key, url]) => (
                                <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="about-social-link" aria-label={key}>
                                    {key === 'instagram' && '◎'}
                                    {key === 'youtube' && '▶'}
                                    {key === 'tiktok' && '♪'}
                                    {key === 'twitter' && '𝕏'}
                                </a>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
