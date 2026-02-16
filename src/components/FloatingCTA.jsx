import React from 'react';
import '../styles/FloatingCTA.css';

const FloatingCTA = ({ t, onClick }) => {
    return (
        <button className="floating-cta" onClick={onClick} aria-label="Hızlı Teklif Al">
            <span className="cta-icon">🚀</span>
            <span className="cta-text">{t}</span>
        </button>
    );
};

export default FloatingCTA;
