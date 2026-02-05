import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Portfolio from '../components/Portfolio'; // Reusing the component for the grid
import '../styles/Portfolio.css'; // Utilizing existing styles + new page specific ones

const PortfolioPage = ({ t }) => {
    // We can extend the data here if needed, or just use the passed props
    // For a full page, we might want to add categories filter in the future

    return (
        <>
            <SEO
                title={`${t.portfolio.title} | ZMK Agency`}
                description={t.portfolio.subtitle}
                keywords="kırıkkale web tasarım referansları, zmk agency projeler, kırıkkale reklam ajansı işleri"
            />
            <div className="page-wrapper portfolio-page" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="portfolio-page-header"
                        style={{ textAlign: 'center', marginBottom: '60px' }}
                    >
                        <h1 className="hero-title">
                            <span className="text-gradient">{t.portfolio.title}</span>
                        </h1>
                        <p className="hero-subtitle" style={{ maxWidth: '600px', margin: '0 auto' }}>
                            {t.portfolio.subtitle}
                        </p>
                    </motion.div>

                    {/* Reusing the Grid Component but maybe we can just render it directly here to control logic */}
                    <div className="portfolio-grid">
                        {t.portfolio.items.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="portfolio-item group"
                            >
                                <div className="portfolio-thumb" style={{ backgroundImage: `url(${item.image})` }}>
                                    <div className="overlay">
                                        <span className="view-project">{t.portfolio.viewProject}</span>
                                    </div>
                                </div>
                                <div className="portfolio-info">
                                    <span className="portfolio-cat">{item.category}</span>
                                    <h3>{item.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                        {/* Adding some placeholder items to make the page look fuller if the list is short */}
                        {[1, 2, 3].map((i) => (
                            <motion.div
                                key={`placeholder-${i}`}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="portfolio-item group"
                                style={{ opacity: 0.5, filter: 'grayscale(1)' }}
                            >
                                <div className="portfolio-thumb" style={{ backgroundColor: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ color: '#333' }}>Gizli Proje NDA</span>
                                </div>
                                <div className="portfolio-info">
                                    <span className="portfolio-cat">Kurumsal</span>
                                    <h3>Gizli Proje {i}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PortfolioPage;
