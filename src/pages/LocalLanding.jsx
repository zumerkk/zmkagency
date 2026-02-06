import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, ArrowRight, MapPin, ShieldCheck, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import Testimonials from '../components/Testimonials';
import '../styles/LocalLanding.css';
import WizardForm from '../components/WizardForm';

const LocalLanding = ({ data, t }) => {
    const [showWizard, setShowWizard] = useState(false);

    // Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Anasayfa",
                "item": "https://zmkagency.com"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Hizmetler",
                "item": "https://zmkagency.com/services"
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": data.title,
                "item": `https://zmkagency.com/${data.slug}`
            }
        ]
    };

    // GOD MODE SEO: FAQ Schema
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": data.faq.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    };

    // GOD MODE SEO: Service Schema
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": data.serviceName,
        "provider": {
            "@type": "LocalBusiness",
            "name": "ZMK Agency",
            "image": "https://zmkagency.com/logo.png",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Yenişehir, Kazım Karabekir Cd. No: 39/2",
                "addressLocality": "Kırıkkale",
                "postalCode": "71200",
                "addressCountry": "TR"
            },
            "priceRange": "₺₺₺"
        },
        "areaServed": {
            "@type": "City",
            "name": "Kırıkkale"
        },
        "description": data.description
    };

    return (
        <div className="local-landing">
            <SEO
                title={data.title}
                description={data.description}
                keywords={data.keywords || `kırıkkale ${data.serviceName}, kırıkkale reklam, zmk agency`}
                schema={[faqSchema, serviceSchema]}
                breadcrumbs={breadcrumbSchema}
                canonical={`https://zmkagency.com/${data.slug}`}
                ogImage={data.ogImage}
            />

            {/* Hero Section */}
            <section className="local-hero">
                <div className="local-hero-content">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="location-badge">
                            <MapPin size={16} /> Kırıkkale, TR
                        </div>
                        <h1 className="local-title">{data.heroTitle}</h1>
                        <p className="local-subtitle">{data.heroSubtitle}</p>
                        <button className="cta-btn-primary" onClick={() => setShowWizard(true)}>
                            Teklif Alın <ArrowRight size={20} />
                        </button>
                    </motion.div>
                </div>
                <div className="local-hero-bg"></div>
            </section>

            {/* Proof Section */}
            <section className="proof-section">
                <div className="container">
                    <div className="proof-grid">
                        <div className="proof-card">
                            <h3>{data.proof.stat1}</h3>
                            <p>{data.proof.label1}</p>
                        </div>
                        <div className="proof-card">
                            <h3>{data.proof.stat2}</h3>
                            <p>{data.proof.label2}</p>
                        </div>
                        <div className="proof-quote">
                            <div className="stars">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#FFD700" color="#FFD700" />)}
                            </div>
                            <p>"{data.proof.quote}"</p>
                            <span>— {data.proof.author}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Workflow Section */}
            <section className="workflow-section">
                <div className="container">
                    <h2 className="section-title">{data.serviceName} Süreci</h2>
                    <div className="workflow-steps">
                        {data.workflow.map((step, index) => (
                            <div key={index} className="step-card">
                                <div className="step-number">{step.step}</div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Us Section */}
            <section className="why-us-section">
                <div className="container">
                    <div className="why-grid">
                        <div className="why-card">
                            <ShieldCheck size={40} className="why-icon" />
                            <h3>%100 Kırıkkale Yerel</h3>
                            <p>Uzaktan değil, yanınızdayız. Kırıkkale'yi ve dinamiklerini bilen ekibiz.</p>
                        </div>
                        <div className="why-card">
                            <Zap size={40} className="why-icon" />
                            <h3>Hızlı Sonuç</h3>
                            <p>Boş vaatler değil, ölçülebilir büyüme ve ciro artışı sunuyoruz.</p>
                        </div>
                        <div className="why-card">
                            <Star size={40} className="why-icon" />
                            <h3>Premium Kalite</h3>
                            <p>Global standartlarda tasarım ve yazılım kalitesi.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Internal Linking / Related Services */}
            {data.relatedLinks && data.relatedLinks.length > 0 && (
                <section className="related-services-section">
                    <div className="container">
                        <h2 className="section-title">İlginizi Çekebilecek Diğer Hizmetler</h2>
                        <div className="related-grid">
                            {data.relatedLinks.map((link, index) => (
                                <a key={index} href={`/${link.slug}`} style={{ textDecoration: 'none' }}>
                                    <div className="related-card">
                                        <h4>{link.title}</h4>
                                        <p>İncele <ArrowRight size={14} /></p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ Section */}
            <section className="faq-section">
                <div className="container">
                    <h2 className="section-title">Merak Edilenler</h2>
                    <div className="faq-grid">
                        {data.faq.map((item, index) => (
                            <div key={index} className="faq-item">
                                <h4>{item.q}</h4>
                                <p>{item.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials for Local Trust */}
            <Testimonials t={t.testimonials} />

            {/* Final CTA */}
            <section className="final-cta">
                <div className="container">
                    <h2>Hazır mısınız?</h2>
                    <p>Kırıkkale'de dijitalin lideri olun.</p>
                    <button className="cta-btn-primary" onClick={() => setShowWizard(true)}>
                        Hemen Başlayın
                    </button>
                </div>
            </section>

            {showWizard && <WizardForm t={t.wizard} onClose={() => setShowWizard(false)} />}
        </div>
    );
};

export default LocalLanding;
