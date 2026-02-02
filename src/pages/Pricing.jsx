import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import '../styles/Pricing.css';


import SEO from '../components/SEO';
import WizardForm from '../components/WizardForm';

const Pricing = ({ t, wizardT }) => {
    // True = Monthly (Retainer), False = Project
    const [isRetainer, setIsRetainer] = useState(true);

    const [roiBudget, setRoiBudget] = useState(15000); // Default budget for simulator
    const [roiSector, setRoiSector] = useState(1.2); // Default multiplier (Service)
    const [wizardConfig, setWizardConfig] = useState({
        isOpen: false,
        initialData: {},
        source: 'Quick Quote'
    });

    const activeData = isRetainer ? t.retainer : t.project;

    const openWizardForPlan = (plan) => {
        setWizardConfig({
            isOpen: true,
            initialData: {
                budget: `${plan.price} ${plan.period}`,
                details: `Selected Plan: ${plan.title}`
            },
            source: `Pricing - ${plan.title}`
        });
    };

    return (
        <>
            <SEO
                title={t.title}
                description={t.subtitle}
            />
            <section className="pricing-page">

                <div className="container">
                    <div className="pricing-header">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {t.title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                        >
                            {t.subtitle}
                        </motion.p>
                    </div>

                    <div className="pricing-switch-container">
                        <div className="pricing-switch">
                            <button
                                className={`switch-btn ${isRetainer ? 'active' : ''}`}
                                onClick={() => setIsRetainer(true)}
                            >
                                {t.monthlyToggle}
                            </button>
                            <button
                                className={`switch-btn ${!isRetainer ? 'active' : ''}`}
                                onClick={() => setIsRetainer(false)}
                            >
                                {t.projectToggle}
                            </button>
                        </div>
                    </div>

                    <div className="pricing-grid">
                        {activeData.map((plan, idx) => (
                            <motion.div
                                key={idx}
                                className={`pricing-card ${plan.isPopular ? 'popular' : ''}`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 + 0.3 }}
                            >
                                {plan.isPopular && <span className="popular-tag">{t.popularTag}</span>}

                                <div className="card-header">
                                    <h3>{plan.title}</h3>
                                    <div className="price">
                                        <span className="currency">{t.currency}</span>
                                        {plan.price}
                                        <span className="period">{plan.period}</span>
                                    </div>
                                </div>

                                <p className="card-desc">{plan.description}</p>

                                <ul className="features-list">
                                    {plan.features.map((feature, fIdx) => (
                                        <li key={fIdx}>
                                            <Check size={18} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className="pricing-cta"
                                    onClick={() => openWizardForPlan(plan)}
                                >
                                    {t.cta}
                                </button>
                            </motion.div>
                        ))}
                    </div>

                    {/* ROI Simulator - Market Dominance Feature */}
                    <div className="roi-simulator glass-panel" style={{ margin: '80px 0', padding: '40px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>{t.roi ? t.roi.title : "Yatırım Getirisi Simülatörü"}</h2>
                        <p style={{ color: '#888', marginBottom: '40px' }}>{t.roi ? t.roi.subtitle : "Dijital pazarlamanın gücünü keşfedin. Tahmini erişim ve etkileşimi hesaplayın."}</p>

                        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                            {/* Sector Selector */}
                            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
                                <label style={{ display: 'block', marginBottom: '10px', color: '#ccc' }}>Sektörünüz:</label>
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    {[
                                        { id: 'ecommerce', label: 'E-Ticaret / Ürün Satışı', multiplier: 2.5 },
                                        { id: 'service', label: 'Hizmet / Danışmanlık', multiplier: 1.2 },
                                        { id: 'realestate', label: 'Gayrimenkul / İnşaat', multiplier: 0.8 },
                                        { id: 'health', label: 'Sağlık / Klinik', multiplier: 1.5 }
                                    ].map(sector => (
                                        <button
                                            key={sector.id}
                                            onClick={() => setRoiSector(sector.multiplier)}
                                            style={{
                                                padding: '8px 15px',
                                                borderRadius: '20px',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                background: roiSector === sector.multiplier ? 'var(--primary-color)' : 'transparent',
                                                color: roiSector === sector.multiplier ? '#fff' : '#888',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                transition: 'all 0.3s'
                                            }}
                                        >
                                            {sector.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ marginBottom: '30px', textAlign: 'left' }}>
                                <label style={{ display: 'block', marginBottom: '10px', color: '#ccc' }}>Aylık Bütçe: <span style={{ color: '#fff', fontWeight: 'bold' }}>₺{roiBudget.toLocaleString()}</span></label>
                                <input
                                    type="range"
                                    min="10000"
                                    max="500000"
                                    step="5000"
                                    value={roiBudget}
                                    onChange={(e) => setRoiBudget(Number(e.target.value))}
                                    style={{ width: '100%', accentColor: 'var(--primary-color)', cursor: 'pointer' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#666', marginTop: '5px' }}>
                                    <span>10.000₺</span>
                                    <span>500.000₺+</span>
                                </div>
                            </div>

                            <div className="roi-results" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div className="roi-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px' }}>
                                    <h3 style={{ fontSize: '36px', color: 'var(--text-accent)', marginBottom: '5px' }}>
                                        {Math.floor(roiBudget * (isRetainer ? 1.5 : 0.05) * roiSector).toLocaleString()}
                                    </h3>
                                    <p style={{ fontSize: '14px', color: '#888' }}>Tahmini Erişim (Kişi)</p>
                                </div>
                                <div className="roi-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px' }}>
                                    <h3 style={{ fontSize: '36px', color: '#a78bfa', marginBottom: '5px' }}>
                                        {Math.floor(roiBudget * (isRetainer ? 0.08 : 0.003) * roiSector).toLocaleString()}
                                    </h3>
                                    <p style={{ fontSize: '14px', color: '#888' }}>Potansiyel Etkileşim</p>
                                </div>
                            </div>
                            <p style={{ fontSize: '12px', color: '#555', marginTop: '20px', fontStyle: 'italic' }}>*Veriler seçilen sektöre ve ortalama reklam maliyetlerine göre yapay zeka tarafından tahmin edilmiştir.</p>
                        </div>
                    </div>

                    {/* Custom Quote Section */}
                    <div className="custom-quote-section">
                        <div className="custom-quote-content">
                            <h2>{t.customQuote.title}</h2>
                            <p>{t.customQuote.subtitle}</p>

                            <button
                                className="pricing-cta"
                                style={{ marginTop: '20px', maxWidth: '300px' }}
                                onClick={() => setWizardConfig({
                                    isOpen: true,
                                    initialData: {},
                                    source: 'Pricing - Custom Quote'
                                })}
                            >
                                {t.customQuote.cta || "Hızlı Teklif Alın"}
                            </button>

                            <AnimatePresence>
                                {wizardConfig.isOpen && (
                                    <WizardForm
                                        t={wizardT}
                                        onClose={() => setWizardConfig({ ...wizardConfig, isOpen: false })}
                                        initialData={wizardConfig.initialData}
                                        source={wizardConfig.source}
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Pricing;
