import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { MapPin, Ghost, EyeOff, Smartphone, TrendingDown, CheckCircle, ArrowRight, Star, AlertTriangle } from 'lucide-react';
import '../styles/EsnafLanding.css';
import SEO from '../components/SEO';
import WizardForm from '../components/WizardForm';

const EsnafLanding = ({ t }) => {
    const navigate = useNavigate();
    const content = t.esnafLanding;
    const [showWizard, setShowWizard] = React.useState(false);

    // Initial wizard data for this package
    const wizardInitialData = {
        type: ['Local Business', 'Web Design'],
        budget: content.solution.price,
        details: 'Esnaf Paketi Başvurusu'
    };

    const iconMap = {
        Ghost: Ghost,
        EyeOff: EyeOff,
        Smartphone: Smartphone,
        TrendingDown: TrendingDown
    };

    return (
        <>
            <SEO
                title="Esnaf Dijitalleşme Paketi - ZMK Agency"
                description="Kırıkkale esnafına özel web sitesi, harita kaydı ve sosyal medya yönetimi. Bölgesel hakimiyet paketi ile müşterilerinizi artırın."
            />

            <div className="esnaf-landing">

                {/* Hero Section */}
                <section className="esnaf-hero section-padding">
                    <div className="esnaf-container">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="esnaf-badge">{content.hero.badge}</span>
                            <h1>{content.hero.title}</h1>
                            <p>{content.hero.subtitle}</p>
                            <button className="btn-esnaf-primary" onClick={() => setShowWizard(true)}>
                                {content.hero.cta} <ArrowRight size={20} />
                            </button>
                        </motion.div>
                    </div>
                </section>

                {/* Problem Section */}
                <section className="esnaf-problem section-padding">
                    <div className="esnaf-container">
                        <div className="section-header text-center">
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{content.problem.title}</h2>
                        </div>
                        <div className="problem-grid">
                            {content.problem.items.map((item, idx) => {
                                const Icon = iconMap[item.icon] || Ghost;
                                return (
                                    <motion.div
                                        key={idx}
                                        className="problem-card"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="problem-icon">
                                            <Icon size={24} />
                                        </div>
                                        <p>{item.text}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Solution / Package Section */}
                <section className="esnaf-solution section-padding">
                    <div className="esnaf-container">
                        <motion.div
                            className="package-card-highlight"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="glow-effect"></div>
                            <span className="esnaf-badge" style={{ background: '#4ade80', color: '#000' }}>
                                {content.solution.badge}
                            </span>
                            <h2 style={{ fontSize: '3rem', margin: '20px 0' }}>{content.solution.title}</h2>
                            <p style={{ color: '#9ca3af', fontSize: '1.2rem' }}>{content.solution.description}</p>

                            <div className="package-price">
                                {content.solution.price} <span>{content.solution.period}</span>
                            </div>

                            <div className="features-list-checklist">
                                {content.solution.features.map((feature, i) => (
                                    <div key={i} className="check-item">
                                        <CheckCircle className="check-icon-green" size={24} />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="btn-esnaf-primary" onClick={() => setShowWizard(true)} style={{ width: '100%', justifyContent: 'center', padding: '20px' }}>
                                Hemen Başla <ArrowRight size={20} />
                            </button>
                        </motion.div>
                    </div>
                </section>

                {/* Social Proof */}
                <section className="esnaf-proof section-padding">
                    <div className="esnaf-container">
                        <h2>{content.socialProof.title}</h2>
                        <div className="stat-grid">
                            <div className="stat-item">
                                <h3>{content.socialProof.stat1.value}</h3>
                                <p>{content.socialProof.stat1.label}</p>
                            </div>
                            <div className="stat-item">
                                <h3>{content.socialProof.stat2.value}</h3>
                                <p>{content.socialProof.stat2.label}</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Urgency & Final CTA */}
                <section className="esnaf-urgency section-padding">
                    <div className="esnaf-container">
                        <div className="urgency-box">
                            <AlertTriangle size={20} style={{ verticalAlign: 'middle', marginRight: '10px' }} />
                            {content.urgency.text} <br />
                            <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>{content.urgency.subtext}</span>
                        </div>

                        <h2 style={{ fontSize: '3rem', marginBottom: '40px' }}>{content.ctaFinal.title}</h2>
                        <button className="btn-esnaf-primary" onClick={() => setShowWizard(true)} style={{ fontSize: '1.5rem', padding: '20px 60px' }}>
                            {content.ctaFinal.btn}
                        </button>
                    </div>
                </section>

            </div>

            {showWizard && (
                <WizardForm
                    t={t.wizard}
                    onClose={() => setShowWizard(false)}
                    initialData={wizardInitialData}
                    source="Esnaf Landing Page"
                />
            )}
        </>
    );
};

export default EsnafLanding;
