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

                    <h3 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '24px', color: 'var(--text-secondary)' }}>PROCESS FLOW</h3>
                    <div className="process-flow" style={{ position: 'relative', padding: '20px 0' }}>
                        <div style={{ position: 'absolute', left: '50%', top: '0', bottom: '0', width: '2px', background: 'var(--text-accent)', transform: 'translateX(-50%)', opacity: '0.3', display: 'none' }} className="timeline-line"></div>
                        {tService.process && tService.process.map((step, index) => (
                            <div key={index} className="process-step" style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px',
                                marginBottom: '20px',
                                background: 'rgba(255,255,255,0.03)',
                                padding: '20px',
                                borderRadius: '15px',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                <div style={{
                                    background: 'var(--text-accent)',
                                    color: '#000',
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    flexShrink: 0
                                }}>
                                    {index + 1}
                                </div>
                                <div>
                                    <span style={{ fontSize: '18px', fontWeight: '600', color: 'var(--text-primary)' }}>{step.title || step}</span>
                                    {step.desc && <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '5px' }}>{step.desc}</p>}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* LIVE RESULTS TICKER */}
                    <div className="results-ticker-container" style={{ margin: '60px 0', borderTop: '1px solid #333', borderBottom: '1px solid #333', padding: '20px 0', overflow: 'hidden' }}>
                        <div className="ticker-label" style={{ textAlign: 'center', fontSize: '12px', letterSpacing: '2px', color: '#666', marginBottom: '15px' }}>LIVE CLIENT RESULTS</div>
                        <div className="ticker-wrapper" style={{ display: 'flex', gap: '40px', animation: 'ticker 20s linear infinite' }}>
                            {[
                                "📈 ROI +%320 (E-Ticaret)", "🚀 Hız 0.8s (Web)", "👥 +15K Takipçi (Sosyal Medya)",
                                "💰 Maliyet -%40 (Ads)", "🥇 #1. Sıra (SEO)", "🎥 1M İzlenme (Reels)",
                                "📈 ROI +%320 (E-Ticaret)", "🚀 Hız 0.8s (Web)", "👥 +15K Takipçi (Sosyal Medya)"
                            ].map((res, i) => (
                                <span key={i} style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', whiteSpace: 'nowrap' }}>{res}</span>
                            ))}
                        </div>
                        <style>{`
                            @keyframes ticker {
                                0% { transform: translateX(0); }
                                100% { transform: translateX(-50%); }
                            }
                        `}</style>
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
