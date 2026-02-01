import React from 'react';
import Contact from '../../components/Contact';
import SEO from '../../components/SEO';

// Reusable component for service details
const ServiceDetail = ({ tService, tContact }) => {
    if (!tService) return <div>Loading...</div>;

    return (
        <>
            <SEO
                title={`${tService.title} | ZMK Agency`}
                description={tService.description}
            />
            <div className="service-page">
                <div className="service-hero" style={{
                    paddingTop: '160px',
                    paddingBottom: '80px',
                    background: 'linear-gradient(to bottom, #000, #111)',
                    textAlign: 'center'
                }}>
                    <div className="container">
                        <h1 className="hero-title" style={{ fontSize: '48px', marginBottom: '20px' }}>{tService.title}</h1>
                        <p className="hero-subtitle" style={{ maxWidth: '800px', margin: '0 auto' }}>{tService.description}</p>
                    </div>
                </div>

                <div className="container" style={{ padding: '80px 20px' }}>
                    <div className="glass-panel" style={{ padding: '40px', marginBottom: '60px' }}>
                        <h2 className="section-title" style={{ fontSize: '32px', marginBottom: '30px' }}>{tService.detailTitle}</h2>
                        <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '40px' }}>{tService.detailText}</p>

                        {/* NEW: Capabilities / Features List */}
                        {tService.features && (
                            <div>
                                <h3 style={{ fontSize: '20px', marginBottom: '20px', color: 'var(--text-primary)' }}>CAPABILITIES</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                                    {tService.features.map((feature, idx) => (
                                        <div key={idx} style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '10px',
                                            color: 'var(--text-secondary)'
                                        }}>
                                            <span style={{ color: 'var(--text-accent)' }}>✓</span>
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <h3 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '24px', color: 'var(--text-secondary)' }}>PROCESS</h3>
                    <div className="services-grid">
                        {tService.process && tService.process.map((step, index) => (
                            <div key={index} className="glass-panel" style={{ padding: '30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--text-secondary)' }}>0{index + 1}</span>
                                <span style={{ fontSize: '18px', fontWeight: '600' }}>{step}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div id="contact">
                    <Contact t={tContact} />
                </div>
            </div>
        </>
    );
};

export default ServiceDetail;
