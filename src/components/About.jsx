import React from 'react';
import '../styles/About.css';
import logo from '../assets/ZMK AGENCY-logo.png';

const About = ({ t }) => {
    return (
        <section id="agency" className="apple-about">
            <div className="apple-about-inner">
                <div className="apple-about-content">
                    <p className="apple-about-eyebrow">Hakkımızda</p>
                    <h2 className="apple-about-h2">{t.title}</h2>
                    <p className="apple-about-text">{t.text}</p>
                    <div className="apple-about-stats">
                        <div className="apple-about-stat">
                            <span className="apple-about-stat-num">100%</span>
                            <span className="apple-about-stat-label">{t.stats.focus}</span>
                        </div>
                        <div className="apple-about-stat">
                            <span className="apple-about-stat-num">#1</span>
                            <span className="apple-about-stat-label">{t.stats.rank}</span>
                        </div>
                    </div>
                </div>
                <div className="apple-about-visual">
                    <div className="apple-about-logo-card">
                        <img src={logo} alt="ZMK Agency" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
