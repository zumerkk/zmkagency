import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Contact from '../components/Contact';

const ServicesPage = ({ t, tContact }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Helper to render icons
    const renderIcon = (icon) => {
        switch (icon) {
            case 'globe': return '🌐';
            case 'iphone': return '📱';
            case 'camera': return '🎥';
            case 'art': return '🎨';
            case 'chart': return '📈';
            case 'printer': return '🖨️';
            case 'aperture': return '🚁';
            case 'box': return '🧊';
            case 'briefcase': return '💼';
            case 'cart': return '🛍️'; // E-commerce
            case 'megaphone': return '📢'; // PR
            default: return '💻';
        }
    };

    // Combine all services if not already combined in data
    // Assuming t.items contains ALL services now as we merged them in translations.js
    const services = t.items || [];

    return (
        <>
            <SEO
                title={t.title}
                description="ZMK Agency Hizmet Kataloğu. Web Tasarım, Özel Yazılım, Drone Çekimi, Kurumsal Baskı, Sosyal Medya ve daha fazlası."
            />

            <div className="services-page-wrapper" style={{ paddingTop: '120px', minHeight: '100vh', background: '#000' }}>
                <div className="container">

                    {/* Hero Section */}
                    <div className="services-hero" style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h1 style={{
                            fontSize: 'clamp(40px, 5vw, 72px)',
                            background: 'linear-gradient(to right, #fff, #666)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '20px'
                        }}>
                            {t.title}
                        </h1>
                        <p style={{
                            fontSize: '20px',
                            color: '#888',
                            maxWidth: '600px',
                            margin: '0 auto',
                            lineHeight: '1.6'
                        }}>
                            {t.subtitle}
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="services-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '30px',
                        marginBottom: '100px'
                    }}>
                        {services.map((service, index) => (
                            <Link
                                to={`/services/${service.id}`}
                                key={index}
                                className="glass-panel"
                                style={{
                                    display: 'block',
                                    textDecoration: 'none',
                                    padding: '40px',
                                    transition: 'transform 0.3s ease, border-color 0.3s ease',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-10px)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                                }}
                            >
                                <div style={{ fontSize: '48px', marginBottom: '20px' }}>
                                    {renderIcon(service.icon)}
                                </div>
                                <h3 style={{
                                    color: '#fff',
                                    fontSize: '24px',
                                    marginBottom: '15px',
                                    fontWeight: '600'
                                }}>
                                    {service.title}
                                </h3>
                                <p style={{
                                    color: '#aaa',
                                    lineHeight: '1.7',
                                    marginBottom: '20px'
                                }}>
                                    {service.description}
                                </p>
                                <span style={{
                                    color: '#fff',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px'
                                }}>
                                    {t.moreDetails} <span style={{ transition: 'transform 0.3s' }}>→</span>
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div style={{ paddingBottom: '80px' }}>
                        <Contact t={tContact} />
                    </div>

                </div>
            </div>
        </>
    );
};

export default ServicesPage;
