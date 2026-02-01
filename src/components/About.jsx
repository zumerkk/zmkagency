import React from 'react';
import '../styles/About.css';
import logo from '../assets/ZMK AGENCY-logo.png';

const About = ({ t }) => {
    return (
        <section id="agency" className="about-section">
            <div className="container about-container">
                <div className="about-content">
                    <h2 className="section-title">{t.title}</h2>
                    <p className="about-text">
                        {t.text}
                    </p>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">{t.stats.focus}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">#1</span>
                            <span className="stat-label">{t.stats.rank}</span>
                        </div>
                    </div>
                </div>
                <div className="about-image">
                    <div className="image-card">
                        <img src={logo} alt="ZMK Agency Logo" />
                        <div className="glow"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
