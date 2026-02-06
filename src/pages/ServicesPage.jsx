import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Contact from '../components/Contact';
import '../styles/ServicesPage.css';

const ServicesPage = ({ t, tContact }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Mouse move effect handler for cards
    const handleMouseMove = (e) => {
        const cards = document.getElementsByClassName("service-card");
        for (const card of cards) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        }
    };

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

    const services = t.items || [];

    // Animation variants
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariant = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="services-page-wrapper"
            onMouseMove={handleMouseMove}
        >
            <SEO
                title={t.title}
                description="ZMK Agency Hizmet Kataloğu. Web Tasarım, Özel Yazılım, Drone Çekimi, Kurumsal Baskı, Sosyal Medya ve daha fazlası."
            />

            <div className="container">
                {/* Hero Section */}
                <header className="services-hero">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        {t.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        {t.subtitle}
                    </motion.p>
                </header>

                {/* Services Grid */}
                <motion.div
                    className="services-grid"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    {services.map((service, index) => (
                        <motion.div variants={itemVariant} key={index} style={{ height: '100%' }}>
                            <Link
                                to={`/services/${service.id}`}
                                className="service-card"
                            >
                                <div className="service-content">
                                    <div className="service-icon">
                                        {renderIcon(service.icon)}
                                    </div>
                                    <h3>{service.title}</h3>
                                    <p>{service.description}</p>
                                </div>
                                <div className="service-footer">
                                    {t.moreDetails} <span className="arrow-icon">→</span>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <section style={{ paddingBottom: '80px' }}>
                    <Contact t={tContact} />
                </section>
            </div>
        </motion.div>
    );
};

export default ServicesPage;
