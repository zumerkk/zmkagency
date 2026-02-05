import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Clients from '../components/Clients';
import Testimonials from '../components/Testimonials'; // Assuming this component exists or creating it if not? Wait, Home.jsx used to have it but user removed it?
// Home.jsx said: {/* Testimonials removed as per Agency-Grade request */} - Wait check translations.
import CareerTeaser from '../components/CareerTeaser';
import '../styles/Vision.css';
// We can reuse styles or create new specific ones. Using inline for specific layout 
// combined with global utility classes.

const Vision = ({ t }) => {
    const vision = t.vision;
    return (
        <>
            <SEO
                title={`${vision.title} | ZMK Agency`}
                description={vision.subtitle}
            />
            <div className="page-wrapper" style={{ paddingTop: '120px', paddingBottom: '100px', minHeight: '100vh' }}>

                <div className="container">
                    <h1 className="hero-title" style={{ fontSize: '60px', marginBottom: '40px' }}>
                        <span className="text-gradient">{vision.title}</span>
                    </h1>
                    <h2 style={{ color: 'var(--text-secondary)', marginBottom: '60px', fontWeight: '300', fontSize: '24px' }}>
                        {vision.subtitle}
                    </h2>

                    <div className="glass-panel" style={{ padding: '40px', marginBottom: '60px' }}>
                        <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '20px' }}>{vision.p1}</p>
                        <p style={{ fontSize: '18px', lineHeight: '1.8' }}>{vision.p2}</p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '36px', color: 'var(--text-primary)' }}>∞</h3>
                            <p>{vision.stat1}</p>
                        </div>
                        <div className="glass-panel" style={{ padding: '30px', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '36px', color: 'var(--text-primary)' }}>🌍</h3>
                            <p>{vision.stat2}</p>
                        </div>
                    </div>
                </div>
            </div>

            <Clients t={t.clients} />

            <Testimonials t={t.testimonials} />

            <CareerTeaser t={t} />
        </>
    );
};

export default Vision;
