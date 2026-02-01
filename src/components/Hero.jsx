import React from 'react';
import '../styles/Hero.css';
import heroBg from '../assets/hero-bg.png';

const Hero = ({ t }) => {
    return (
        <section className="hero">
            <div className="hero-bg-container">
                <img src={heroBg} alt="Abstract Background" className="hero-bg-image" />
                <div className="hero-overlay"></div>
            </div>

            <div className="hero-content container">
                <h1 className="hero-title">
                    <span className="block-reveal">{t.title1}</span>
                    <br />
                    <span className="block-reveal delay-1">{t.title2}</span>
                </h1>
                <p className="hero-subtitle">
                    {t.subtitle}
                </p>
                <div className="hero-actions">
                    <a href="#contact" className="btn-primary">{t.ctaPrimary}</a>
                    <a href="#services" className="btn-secondary">{t.ctaSecondary}</a>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Hero);
