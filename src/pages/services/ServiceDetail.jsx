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

                        {/* DELIVERABLES LIST (NELER TESLİM EDİYORUZ) */}
                        {tService.features && (
                            <div className="deliverables-container" style={{
                                background: 'rgba(255, 255, 255, 0.02)',
                                padding: '30px',
                                borderRadius: '15px',
                                borderLeft: '4px solid var(--text-accent)'
                            }}>
                                <h3 style={{ fontSize: '22px', marginBottom: '25px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-accent)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                    Neler Teslim Edeceğiz?
                                </h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                                    {tService.features.map((feature, idx) => (
                                        <div key={idx} style={{
                                            display: 'flex',
                                            alignItems: 'flex-start',
                                            gap: '12px',
                                            color: 'var(--text-secondary)',
                                            fontSize: '16px'
                                        }}>
                                            <div style={{
                                                background: 'rgba(37, 211, 102, 0.1)',
                                                borderRadius: '50%',
                                                padding: '4px',
                                                display: 'flex',
                                                marginTop: '2px'
                                            }}>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#25D366" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                            </div>
                                            <span style={{ flex: 1 }}>{feature}</span>
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
