import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Globe, Share2, Target, TrendingUp, Clapperboard, PenTool, Code2, Smartphone,
    Check, ArrowRight, AlertTriangle, FileCheck, Layers, BarChart3, Headphones,
    Sparkles, Crown, Building2, MessageCircle, Star
} from 'lucide-react';
import '../styles/Pricing.css';

import SEO from '../components/SEO';
import WizardForm from '../components/WizardForm';
import {
    packages, webTiers, serviceCategories, extras, assurances, PERIOD_LABEL
} from '../data/pricingData';

const ICONS = {
    Globe, Share2, Target, TrendingUp, Clapperboard, PenTool, Code2, Smartphone,
    FileCheck, Layers, BarChart3, Headphones
};

const periodSuffix = (period) =>
    period === 'month' ? '/ay' : period === 'unit' ? '/adet' : '';

/* Parse "15.000₺ – 22.500₺" → [15000, 22500] for structured data */
const parseRange = (price) => {
    const nums = (price.match(/[\d.]+/g) || [])
        .map(n => parseInt(n.replace(/\./g, ''), 10))
        .filter(n => !isNaN(n));
    return nums.length ? nums : [0];
};

const Pricing = ({ wizardT }) => {
    const [activeSection, setActiveSection] = useState('paketler');
    const [wizardConfig, setWizardConfig] = useState({ isOpen: false, initialData: {}, source: 'Pricing' });
    const sectionRefs = useRef({});

    const navItems = [
        { id: 'paketler', label: 'Paketler' },
        ...serviceCategories.map(c => ({ id: c.id, label: c.title.split(' ')[0] === 'Google' ? 'SEO' : c.title.split('&')[0].replace('Hizmetleri', '').trim() })),
        { id: 'ekstralar', label: 'Ekstralar' },
    ];

    /* Scrollspy */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: '-30% 0px -60% 0px' }
        );
        Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const scrollTo = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 120;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const openWizard = (title, price, periodText = '') => {
        setWizardConfig({
            isOpen: true,
            initialData: {
                budget: `${price} ${periodText}`.trim(),
                details: `Seçilen Hizmet: ${title}`,
            },
            source: `Pricing - ${title}`,
        });
    };

    /* ── Structured data: full OfferCatalog ── */
    const offerCatalogSchema = {
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        name: 'ZMK Agency 2026 Hizmet Listesi ve Fiyatlandırma',
        description: 'Web tasarım, sosyal medya, reklam yönetimi, SEO, çekim, kurumsal kimlik, özel yazılım ve mobil uygulama fiyatları.',
        itemListElement: [
            ...packages.map(p => {
                const range = parseRange(p.price);
                return {
                    '@type': 'Offer',
                    name: p.name,
                    description: p.description,
                    price: range[0],
                    priceCurrency: 'TRY',
                    itemOffered: {
                        '@type': 'Service',
                        name: p.name,
                        provider: { '@type': 'ProfessionalService', name: 'ZMK Agency' },
                    },
                };
            }),
            ...serviceCategories.flatMap(cat =>
                cat.items.map(item => {
                    const range = parseRange(item.price);
                    return {
                        '@type': range.length > 1 ? 'AggregateOffer' : 'Offer',
                        name: item.name,
                        ...(range.length > 1
                            ? { lowPrice: range[0], highPrice: range[1] }
                            : { price: range[0] }),
                        priceCurrency: 'TRY',
                        itemOffered: {
                            '@type': 'Service',
                            name: item.name,
                            category: cat.title,
                            provider: { '@type': 'ProfessionalService', name: 'ZMK Agency' },
                        },
                    };
                })
            ),
        ],
    };

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://zmkagency.com' },
            { '@type': 'ListItem', position: 2, name: 'Hizmetler & Fiyatlandırma', item: 'https://zmkagency.com/pricing' },
        ],
    };

    return (
        <>
            <SEO
                title="Hizmetler & Fiyatlandırma 2026 | Web, Sosyal Medya, Reklam, Yazılım"
                description="ZMK Agency 2026 şeffaf fiyat listesi: kurumsal web sitesi 22.500₺'den, sosyal medya yönetimi 9.500₺/ay'dan, reklam yönetimi, SEO, çekim, kurumsal kimlik, özel yazılım ve mobil uygulama."
                keywords="kırıkkale web sitesi fiyatları, sosyal medya yönetimi fiyatları 2026, reklam ajansı fiyat listesi, kırıkkale seo fiyatları, özel yazılım fiyatları, mobil uygulama fiyatı"
                schema={[offerCatalogSchema, breadcrumbSchema]}
            />

            <div className="zpr-page">
                {/* ════════ HERO ════════ */}
                <header className="zpr-hero">
                    <div className="zpr-hero-glow" />
                    <div className="zpr-hero-grid" />
                    <div className="zpr-container">
                        <motion.span
                            className="zpr-eyebrow"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <Sparkles size={13} />
                            ZMK AGENCY — 2026 Hizmet & Yatırım Rehberi
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                        >
                            Hizmetler <span className="zpr-amp">&</span>{' '}
                            <span className="zpr-h1-accent">Fiyatlandırma</span>
                        </motion.h1>

                        <motion.p
                            className="zpr-hero-sub"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25, duration: 0.7 }}
                        >
                            Biz site yapmıyoruz; işletmenizin <strong>dijital satış ve güven altyapısını</strong> kuruyoruz.
                            Net kapsam, şeffaf fiyat, ölçülebilir sonuç.
                        </motion.p>

                        <motion.div
                            className="zpr-hero-chips"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            <span><FileCheck size={14} /> Sözleşmeli & Faturalı</span>
                            <span><Layers size={14} /> Şeffaf Kapsam</span>
                            <span><BarChart3 size={14} /> Aylık Raporlama</span>
                        </motion.div>
                    </div>
                </header>

                {/* ════════ STICKY NAV ════════ */}
                <nav className="zpr-nav" aria-label="Fiyat kategorileri">
                    <div className="zpr-nav-track">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                className={`zpr-nav-chip ${activeSection === item.id ? 'active' : ''}`}
                                onClick={() => scrollTo(item.id)}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </nav>

                {/* ════════ PAKETLER ════════ */}
                <section
                    id="paketler"
                    className="zpr-section"
                    ref={el => (sectionRefs.current.paketler = el)}
                >
                    <div className="zpr-container">
                        <div className="zpr-section-head">
                            <span className="zpr-kicker"><Crown size={14} /> Öne Çıkan Paketler</span>
                            <h2>İşletmenize Göre Hazır Sistemler</h2>
                            <p>Tek tek hizmet seçmek istemeyenler için kurguladığımız, kendini kanıtlamış 6 paket.</p>
                        </div>

                        <div className="zpr-packages">
                            {packages.map((pkg, i) => (
                                <motion.article
                                    key={pkg.id}
                                    className={`zpr-pkg ${pkg.featured ? 'featured' : ''} ${pkg.prestige ? 'prestige' : ''} ${pkg.enterprise ? 'enterprise' : ''}`}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-60px' }}
                                    transition={{ delay: (i % 3) * 0.1, duration: 0.6 }}
                                >
                                    {pkg.badge && (
                                        <span className="zpr-pkg-badge">
                                            {pkg.featured && <Star size={12} />}
                                            {pkg.prestige && <Crown size={12} />}
                                            {pkg.enterprise && <Building2 size={12} />}
                                            {pkg.badge}
                                        </span>
                                    )}
                                    <span className="zpr-pkg-no">{pkg.no}</span>
                                    <h3>{pkg.name}</h3>
                                    <p className="zpr-pkg-audience">{pkg.audience}</p>

                                    <div className="zpr-pkg-price">
                                        <strong>{pkg.price}</strong>
                                        <span>{PERIOD_LABEL[pkg.period] === 'Aylık' ? '/ ay' : PERIOD_LABEL[pkg.period]}</span>
                                    </div>

                                    <p className="zpr-pkg-desc">{pkg.description}</p>

                                    <ul className="zpr-pkg-features">
                                        {pkg.features.map((f, fi) => (
                                            <li key={fi}><Check size={15} /><span>{f}</span></li>
                                        ))}
                                    </ul>

                                    {pkg.note && (
                                        <p className="zpr-pkg-note"><AlertTriangle size={13} /> {pkg.note}</p>
                                    )}

                                    <button
                                        className="zpr-pkg-cta"
                                        onClick={() => openWizard(pkg.name, pkg.price, PERIOD_LABEL[pkg.period])}
                                    >
                                        Bu Paketi İste <ArrowRight size={16} />
                                    </button>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ════════ HİZMET KATEGORİLERİ ════════ */}
                {serviceCategories.map((cat, ci) => {
                    const Icon = ICONS[cat.icon] || Globe;
                    return (
                        <section
                            key={cat.id}
                            id={cat.id}
                            className={`zpr-section zpr-cat ${ci % 2 === 1 ? 'alt' : ''}`}
                            ref={el => (sectionRefs.current[cat.id] = el)}
                        >
                            <div className="zpr-container">
                                <div className="zpr-cat-head">
                                    <div className="zpr-cat-icon"><Icon size={26} /></div>
                                    <div>
                                        <span className="zpr-cat-index">{String(ci + 1).padStart(2, '0')}</span>
                                        <h2>{cat.title}</h2>
                                        <p>{cat.tagline}</p>
                                    </div>
                                </div>

                                {/* Web kategorisi: çapa fiyatlı 3 seviye */}
                                {cat.id === 'web' && (
                                    <div className="zpr-tiers">
                                        {webTiers.map((tier, ti) => (
                                            <motion.div
                                                key={tier.name}
                                                className={`zpr-tier ${tier.featured ? 'featured' : ''}`}
                                                initial={{ opacity: 0, y: 30 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: ti * 0.12 }}
                                            >
                                                {tier.badge && <span className="zpr-tier-badge"><Star size={12} /> {tier.badge}</span>}
                                                <h3>{tier.name}</h3>
                                                <div className="zpr-tier-price">{tier.price}</div>
                                                <p className="zpr-tier-tagline">{tier.tagline}</p>
                                                <ul>
                                                    {tier.features.map((f, fi) => (
                                                        <li key={fi}><Check size={14} /><span>{f}</span></li>
                                                    ))}
                                                </ul>
                                                <button
                                                    className="zpr-tier-cta"
                                                    onClick={() => openWizard(`${tier.name} Web Paketi`, tier.price)}
                                                >
                                                    Teklif Al <ArrowRight size={15} />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}

                                {/* Reklam bütçesi uyarısı */}
                                {cat.budgetNote && (
                                    <div className="zpr-budget-note" role="note">
                                        <AlertTriangle size={18} />
                                        <div>
                                            <strong>Önemli:</strong> {cat.budgetNote}
                                        </div>
                                    </div>
                                )}

                                {/* Fiyat listesi */}
                                <div className="zpr-rows">
                                    {cat.items.map((item, ii) => (
                                        <motion.div
                                            key={item.name}
                                            className={`zpr-row ${item.popular ? 'popular' : ''}`}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: '-30px' }}
                                            transition={{ delay: ii * 0.04, duration: 0.45 }}
                                        >
                                            <div className="zpr-row-name">
                                                {item.popular && <span className="zpr-row-star"><Star size={13} /></span>}
                                                <span>{item.name}</span>
                                                {item.popular && <em className="zpr-row-tag">En çok tercih edilen</em>}
                                            </div>
                                            <div className="zpr-row-dots" aria-hidden="true" />
                                            <div className="zpr-row-price">
                                                <strong>{item.price}</strong>
                                                {periodSuffix(item.period) && <span>{periodSuffix(item.period)}</span>}
                                            </div>
                                            <button
                                                className="zpr-row-cta"
                                                onClick={() => openWizard(item.name, item.price, periodSuffix(item.period))}
                                                aria-label={`${item.name} için teklif al`}
                                            >
                                                Teklif Al
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Satış cümlesi */}
                                <motion.blockquote
                                    className="zpr-quote"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="zpr-quote-mark">“</span>
                                    <p>{cat.quote}</p>
                                    <cite>— ZMK AGENCY</cite>
                                </motion.blockquote>
                            </div>
                        </section>
                    );
                })}

                {/* ════════ EKSTRALAR ════════ */}
                <section
                    id="ekstralar"
                    className="zpr-section"
                    ref={el => (sectionRefs.current.ekstralar = el)}
                >
                    <div className="zpr-container">
                        <div className="zpr-section-head">
                            <span className="zpr-kicker"><Sparkles size={14} /> Ekstra Hizmetler</span>
                            <h2>Küçük Dokunuşlar, Büyük Fark</h2>
                            <p>Mevcut paketinize ekleyebileceğiniz hızlı ve etkili çözümler.</p>
                        </div>

                        <div className="zpr-extras">
                            {extras.map((ex, i) => (
                                <motion.button
                                    key={ex.name}
                                    className="zpr-extra"
                                    onClick={() => openWizard(ex.name, ex.price)}
                                    initial={{ opacity: 0, scale: 0.94 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: (i % 5) * 0.05 }}
                                >
                                    <span className="zpr-extra-name">{ex.name}</span>
                                    <span className="zpr-extra-price">{ex.price}</span>
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ════════ GÜVENCE ŞERİDİ ════════ */}
                <section className="zpr-section zpr-assure-wrap">
                    <div className="zpr-container">
                        <div className="zpr-assure">
                            {assurances.map(a => {
                                const Icon = ICONS[a.icon] || FileCheck;
                                return (
                                    <div key={a.title} className="zpr-assure-item">
                                        <Icon size={22} />
                                        <h4>{a.title}</h4>
                                        <p>{a.text}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ════════ FİNAL CTA ════════ */}
                <section className="zpr-final">
                    <div className="zpr-final-glow" />
                    <div className="zpr-container">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2>Hangisi size göre, birlikte karar verelim.</h2>
                            <p>
                                15 dakikalık ücretsiz ön görüşmede işletmenizi dinliyor, bütçenize ve hedefinize
                                en uygun kurguyu net rakamlarla öneriyoruz. Satış baskısı yok; yol haritası var.
                            </p>
                            <div className="zpr-final-actions">
                                <button
                                    className="zpr-final-primary"
                                    onClick={() => setWizardConfig({ isOpen: true, initialData: {}, source: 'Pricing - Custom Quote' })}
                                >
                                    Özel Teklif Al <ArrowRight size={18} />
                                </button>
                                <a
                                    className="zpr-final-wa"
                                    href="https://wa.me/905413812114?text=Merhaba,%20hizmet%20ve%20fiyat%20listenizle%20ilgili%20bilgi%20almak%20istiyorum."
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <MessageCircle size={18} /> WhatsApp'tan Yazın
                                </a>
                            </div>
                            <p className="zpr-final-note">
                                Fiyatlar 2026 yılı için geçerlidir; kapsam netleşince size özel sabit teklif sunulur.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <AnimatePresence>
                    {wizardConfig.isOpen && (
                        <WizardForm
                            t={wizardT}
                            onClose={() => setWizardConfig(prev => ({ ...prev, isOpen: false }))}
                            initialData={wizardConfig.initialData}
                            source={wizardConfig.source}
                        />
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default Pricing;
