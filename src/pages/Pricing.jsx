import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import '../styles/Pricing.css';


import SEO from '../components/SEO';
import WizardForm from '../components/WizardForm';

const Pricing = ({ t, wizardT }) => {
    // Categories: retainer, webSoftware, marketingAds, seoData, production, branding
    const [activeCategory, setActiveCategory] = useState(t.categories?.[0]?.id || 'retainer');

    const [roiBudget, setRoiBudget] = useState(15000); // Default budget for simulator
    const [roiSector, setRoiSector] = useState(1.2); // Default multiplier (Service)
    const [wizardConfig, setWizardConfig] = useState({
        isOpen: false,
        initialData: {},
        source: 'Quick Quote'
    });

    // Removed unused activeData variable since we map directly from categories now

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

    // Build structured data for ALL pricing items (all categories)
    const pricingSchema = {
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        "name": "ZMK Agency Hizmet Fiyatları",
        "description": t.subtitle,
        "itemListElement": Object.entries(t.items).flatMap(([categoryId, plans]) =>
            plans.map(plan => ({
                "@type": "Offer",
                "name": plan.title,
                "description": plan.description,
                "price": plan.price.replace(/[^0-9]/g, ''),
                "priceCurrency": "TRY",
                "priceSpecification": {
                    "@type": "PriceSpecification",
                    "price": plan.price.replace(/[^0-9]/g, ''),
                    "priceCurrency": "TRY",
                    "unitText": plan.period
                },
                "itemOffered": {
                    "@type": "Service",
                    "name": plan.title,
                    "description": plan.description,
                    "provider": {
                        "@type": "ProfessionalService",
                        "name": "ZMK Agency"
                    }
                }
            }))
        )
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://zmkagency.com" },
            { "@type": "ListItem", "position": 2, "name": "Fiyatlar", "item": "https://zmkagency.com/pricing" }
        ]
    };

    return (
        <>
            <SEO
                title="Kırıkkale Web Sitesi & Reklam Fiyatları 2026"
                description="Şeffaf fiyatlandırma: kurumsal site 12.500₺, e-ticaret 35.000₺, sosyal medya yönetimi 7.500₺/ay. 31 Mart'a kadar özel kampanya."
                keywords="kırıkkale web sitesi fiyatları, kırıkkale reklam fiyatları, kırıkkale seo fiyatları, dijital ajans fiyatları 2026"
                schema={[pricingSchema, breadcrumbSchema]}
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

                    {/* Discount Badge */}
                    {t.discountTag && (
                        <motion.div
                            className="discount-badge-banner"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            style={{
                                background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                                color: '#fff',
                                padding: '12px 30px',
                                borderRadius: '50px',
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                textAlign: 'center',
                                margin: '0 auto 30px',
                                display: 'inline-block',
                                boxShadow: '0 4px 20px rgba(245, 158, 11, 0.4)',
                                letterSpacing: '0.5px'
                            }}
                        >
                            {t.discountTag}
                        </motion.div>
                    )}

                    {/* Categories */}
                    <div className="pricing-categories">
                        {t.categories.map((cat) => (
                            <button
                                key={cat.id}
                                className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="pricing-grid">
                        <AnimatePresence mode="wait">
                            {t.items[activeCategory]?.map((plan, idx) => (
                                <motion.div
                                    key={`${activeCategory}-${idx}`}
                                    className={`pricing-card ${plan.isPopular ? 'popular' : ''}`}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                                >
                                    {plan.isPopular && <span className="popular-tag">{t.popularTag}</span>}

                                    <div className="card-header">
                                        <h3>{plan.title}</h3>
                                        <div className="price">
                                            {plan.bundlePrice && (
                                                <div style={{
                                                    display: 'flex',
                                                    gap: '15px',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    marginBottom: '10px',
                                                    flexWrap: 'wrap'
                                                }}>
                                                    <div style={{
                                                        background: 'rgba(16, 185, 129, 0.15)',
                                                        border: '1px solid rgba(16, 185, 129, 0.3)',
                                                        borderRadius: '12px',
                                                        padding: '8px 14px',
                                                        textAlign: 'center'
                                                    }}>
                                                        <div style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: '600', marginBottom: '2px' }}>Paketle Birlikte</div>
                                                        <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#10b981' }}>{t.currency}{plan.bundlePrice}</div>
                                                    </div>
                                                    <div style={{
                                                        background: 'rgba(255,255,255,0.05)',
                                                        border: '1px solid rgba(255,255,255,0.1)',
                                                        borderRadius: '12px',
                                                        padding: '8px 14px',
                                                        textAlign: 'center'
                                                    }}>
                                                        <div style={{ fontSize: '0.7rem', color: '#888', fontWeight: '600', marginBottom: '2px' }}>Tek Başına</div>
                                                        <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#fff' }}>{t.currency}{plan.price}</div>
                                                    </div>
                                                </div>
                                            )}
                                            {!plan.bundlePrice && (
                                                <>
                                                    <span className="currency">{t.currency}</span>
                                                    {plan.price}
                                                    <span className="period">{plan.period}</span>
                                                </>
                                            )}
                                            {plan.bundlePrice && (
                                                <span className="period">{plan.period}</span>
                                            )}
                                        </div>
                                        {plan.campaignBadge && (
                                            <div style={{
                                                background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
                                                color: '#fff',
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontSize: '0.75rem',
                                                fontWeight: '700',
                                                display: 'inline-block',
                                                marginTop: '8px',
                                                letterSpacing: '0.3px'
                                            }}>
                                                🔥 {plan.campaignBadge}
                                            </div>
                                        )}
                                        {plan.bundleNote && (
                                            <p style={{ fontSize: '0.7rem', color: '#10b981', marginTop: '6px', fontStyle: 'italic' }}>
                                                * {plan.bundleNote}
                                            </p>
                                        )}
                                    </div>

                                    <p className="card-desc">{plan.description}</p>

                                    {/* Tech Specs for Developers/CTOs */}
                                    {plan.techSpecs && (
                                        <div className="tech-specs">
                                            &lt; {plan.techSpecs} /&gt;
                                        </div>
                                    )}

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
                        </AnimatePresence>
                    </div>

                    {/* PDF Download Section */}
                    <motion.div
                        className="pdf-download-section"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                    >
                        <p style={{ color: '#888', marginBottom: '20px' }}>
                            {t.categories[0].id === 'retainer' ? "Detaylı hizmet listesi ve teknik şartnameler için:" : "For detailed service list and technical specifications:"}
                        </p>
                        <a href="#" className="pdf-download-btn" onClick={(e) => e.preventDefault()}>
                            <span style={{ fontSize: '20px' }}>📄</span>
                            {t.categories[0].id === 'retainer' ? "Fiyat Listesini İndir (PDF - 2026)" : "Download Price List (PDF - 2026)"}
                        </a>
                    </motion.div>

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
                                        {Math.floor(roiBudget * (activeCategory === 'retainer' ? 1.5 : 0.05) * roiSector).toLocaleString()}
                                    </h3>
                                    <p style={{ fontSize: '14px', color: '#888' }}>Tahmini Erişim (Kişi)</p>
                                </div>
                                <div className="roi-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '10px' }}>
                                    <h3 style={{ fontSize: '36px', color: '#a78bfa', marginBottom: '5px' }}>
                                        {Math.floor(roiBudget * (activeCategory === 'retainer' ? 0.08 : 0.003) * roiSector).toLocaleString()}
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

                {/* Hidden but crawlable: All pricing data for SEO (all categories rendered as semantic HTML) */}
                <div aria-hidden="true" style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
                    {Object.entries(t.items).map(([categoryId, plans]) => (
                        <section key={categoryId}>
                            <h2>{t.categories.find(c => c.id === categoryId)?.label || categoryId}</h2>
                            {plans.map((plan, idx) => (
                                <article key={idx} itemScope itemType="https://schema.org/Offer">
                                    <h3 itemProp="name">{plan.title}</h3>
                                    <p itemProp="description">{plan.description}</p>
                                    <p>Fiyat: <span itemProp="price">{plan.price}</span> <span itemProp="priceCurrency">TRY</span> {plan.period}</p>
                                    {plan.bundlePrice && <p>Paketle Birlikte: {plan.bundlePrice} ₺</p>}
                                    <ul>
                                        {plan.features.map((f, fi) => <li key={fi}>{f}</li>)}
                                    </ul>
                                </article>
                            ))}
                        </section>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Pricing;
