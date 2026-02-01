import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Services.css';

const Services = ({ t }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        // Also observe children for staggered effect
        const cards = document.querySelectorAll('.service-card');
        cards.forEach(card => observer.observe(card));

        return () => observer.disconnect();
    }, []);

    return (
        <section id="services" className="services-section" ref={sectionRef}>
            <div className="container">
                <div className="services-header">
                    <h2 className="section-title">{t.title}</h2>
                    <p className="section-subtitle">{t.subtitle}</p>
                </div>

                <div className="services-grid">
                    {t.items.map((service, index) => {
                        // Determine link path based on service ID
                        let linkPath = "#";
                        if (service.id === 'software') linkPath = "/services/software";
                        if (service.id === 'web-seo') linkPath = "/services/web-seo";
                        if (service.id === 'social-media') linkPath = "/services/social-media";
                        if (service.id === 'production') linkPath = "/services/production";
                        // For new services without pages yet, keep basic or add later

                        // Only show link for ones with pages, or all if we added generic handling. 
                        // For now, only first 4 have pages.
                        const hasPage = ['software', 'web-seo', 'social-media', 'production'].includes(service.id);

                        const CardContent = (
                            <>
                                <div className="card-icon">
                                    {service.icon === 'globe' ? '🌐' :
                                        service.icon === 'iphone' ? '📱' :
                                            service.icon === 'camera' ? '🎥' :
                                                service.icon === 'art' ? '🎨' :
                                                    service.icon === 'chart' ? '📈' : '💻'}
                                </div>
                                <h3>{service.title}</h3>
                                <p>{service.description}</p>
                                <div className="card-hover-effect"></div>
                                {hasPage && (
                                    <span style={{ fontSize: '12px', marginTop: '10px', display: 'inline-block', color: 'var(--text-accent)' }}>
                                        {t.moreDetails} →
                                    </span>
                                )}
                            </>
                        );

                        return hasPage ? (
                            <Link to={linkPath} className="service-card glass-panel" key={index} style={{ '--delay': `${index * 0.1}s`, textDecoration: 'none', color: 'inherit', display: 'block' }}>
                                {CardContent}
                            </Link>
                        ) : (
                            <div className="service-card glass-panel" key={index} style={{ '--delay': `${index * 0.1}s` }}>
                                {CardContent}
                            </div>
                        );
                    })}
                </div>

                {/* Tech Stack Section to Show Dominance */}
                <div className="tech-stack-section" style={{ marginTop: '100px', textAlign: 'center' }}>
                    <p style={{ color: '#666', marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '14px' }}>Powered By Next-Gen Technology</p>
                    <div className="tech-logos" style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', opacity: 0.8 }}>
                        {/* Using text representations or simple spans if SVGs aren't available, but stylized */}
                        <span className="tech-item" title="React">⚛️ React</span>
                        <span className="tech-item" title="Firebase">🔥 Firebase</span>
                        <span className="tech-item" title="Sanki AI">🧠 AI Integration</span>
                        <span className="tech-item" title="Next.js">⚡ Next.js</span>
                        <span className="tech-item" title="Framer Motion">🎬 Motion</span>
                        <span className="tech-item" title="Three.js">🧊 Three.js</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Services);
