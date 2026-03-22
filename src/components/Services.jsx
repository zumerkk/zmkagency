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

        if (sectionRef.current) observer.observe(sectionRef.current);
        const cards = document.querySelectorAll('.apple-svc-card');
        cards.forEach(card => observer.observe(card));
        return () => observer.disconnect();
    }, []);

    const renderIcon = (icon) => {
        const map = {
            globe: '◎', iphone: '◉', camera: '▣', art: '◈',
            chart: '⬡', printer: '⎔', aperture: '◇', box: '⬢',
            briefcase: '◆', cart: '◈', megaphone: '◉'
        };
        return map[icon] || '◎';
    };

    return (
        <section id="services" className="apple-svc-section" ref={sectionRef}>
            <div className="apple-svc-inner">
                <div className="apple-svc-header">
                    <p className="apple-svc-eyebrow">Hizmetler</p>
                    <h2 className="apple-svc-h2">{t.title}</h2>
                    <p className="apple-svc-sub">{t.subtitle}</p>
                </div>

                <div className="apple-svc-grid">
                    {t.items.filter(item => item.isFeatured).map((service, index) => (
                        <Link
                            to={`/services/${service.id}`}
                            className="apple-svc-card"
                            key={index}
                            style={{ '--delay': `${index * 0.06}s` }}
                        >
                            <span className="apple-svc-icon">{renderIcon(service.icon)}</span>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <span className="apple-svc-link">Keşfet →</span>
                        </Link>
                    ))}
                </div>

                <div className="apple-svc-all">
                    <Link to="/services" className="apple-svc-view-all">
                        {t.viewAll}
                        <span className="apple-svc-arrow">→</span>
                    </Link>
                </div>

                {/* Tech Stack */}
                <div className="apple-svc-tech">
                    <p className="apple-svc-tech-label">Powered by</p>
                    <div className="apple-svc-tech-row">
                        {['React', 'Firebase', 'AI', 'Next.js', 'Motion', 'Three.js'].map((t, i) => (
                            <span key={i} className="apple-svc-tech-item">{t}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default React.memo(Services);
