import React from 'react';
import '../styles/Portfolio.css';

// Placeholder images - in real app would use real project assets
// Using generous abstract gradients/colors for "Mockups"
const Portfolio = ({ t }) => {
    return (
        <section className="portfolio-section">
            <div className="container">
                <div className="portfolio-header">
                    <h2 className="section-title">{t.title}</h2>
                    <p className="section-subtitle">{t.subtitle}</p>
                </div>

                <div className="portfolio-grid">
                    {t.items.map((item, idx) => (
                        <div key={idx} className="portfolio-item group">
                            <div className="portfolio-thumb" style={{ backgroundImage: `url(${item.image})` }}>
                                <div className="overlay">
                                    <span className="view-project">{t.viewProject}</span>
                                </div>
                            </div>
                            <div className="portfolio-info">
                                <span className="portfolio-cat">{item.category}</span>
                                <h3>{item.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
