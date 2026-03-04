import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import Contact from '../components/Contact';
import '../styles/ServicesPage.css';

/* ─── SERVICE DATA (TR) ─── */
const serviceCategories = [
    { id: 'all', label: 'Tümü', icon: '🔥' },
    { id: 'web', label: 'Web & Yazılım', icon: '💻' },
    { id: 'ads', label: 'Reklam & Pazarlama', icon: '📢' },
    { id: 'seo', label: 'SEO', icon: '📈' },
    { id: 'production', label: 'Prodüksiyon', icon: '🎥' },
    { id: 'brand', label: 'Marka & Kurumsal', icon: '🎨' },
    { id: 'retainer', label: '360° Retainer', icon: '🚀' }
];

const services = [
    {
        id: 'kurumsal-web-sitesi',
        category: 'web',
        title: 'Kurumsal Web Sitesi',
        description: 'Markanızın dijital vitrini. SEO uyumlu, mobil öncelikli, ışık hızında yüklenen modern web siteleri.',
        icon: '🌐',
        includes: ['Özel UX/UI Tasarım', 'CMS Entegrasyonu', 'SEO Altyapısı'],
        price: '12.500₺'
    },
    {
        id: 'e-ticaret-cozumleri',
        category: 'web',
        title: 'E-Ticaret Çözümleri',
        description: 'Yüksek dönüşüm oranlı, satış odaklı online mağazalar. Pazaryeri entegrasyonları dahil.',
        icon: '🛍️',
        includes: ['Stok & Sipariş Yönetimi', 'Ödeme Entegrasyonları', 'Pazaryeri Bağlantısı'],
        price: '35.000₺'
    },
    {
        id: 'ozel-yazilim-app',
        category: 'web',
        title: 'Özel Yazılım / App',
        description: 'İş süreçlerinize özel iOS, Android ve web uygulamaları. SaaS & CRM çözümleri.',
        icon: '📱',
        includes: ['iOS & Android App', 'Bulut Altyapısı', 'Mikroservis Mimarisi'],
        price: '85.000₺'
    },
    {
        id: 'reklam-yonetimi-google',
        category: 'ads',
        title: 'Google Ads (SEM)',
        description: 'Arama sonuçlarında en tepede yer alın. Anahtar kelime analizi ve dönüşüm odaklı kampanyalar.',
        icon: '🔍',
        includes: ['Anahtar Kelime Analizi', 'A/B Testleri', 'Dönüşüm Kurulumu'],
        price: '7.500₺/ay'
    },
    {
        id: 'reklam-yonetimi-sosyal',
        category: 'ads',
        title: 'Sosyal Medya Reklamları',
        description: 'Hedef kitlenize nokta atışı ulaşın. Meta, TikTok ve LinkedIn reklam yönetimi.',
        icon: '📣',
        includes: ['Hedef Kitle Segmentasyonu', 'Retargeting', 'ROAS Yönetimi'],
        price: '7.500₺/ay'
    },
    {
        id: 'lokal-seo',
        category: 'seo',
        title: 'Lokal SEO Paketi',
        description: 'Bölgenizdeki aramalarda haritalarda ve sonuçlarda ilk sıra. Google My Business hakimiyeti.',
        icon: '📍',
        includes: ['GMB Optimizasyonu', 'Yerel Backlink', 'Yorum Yönetimi'],
        price: '8.000₺/ay'
    },
    {
        id: 'ulusal-global-seo',
        category: 'seo',
        title: 'Ulusal / Global SEO',
        description: 'Büyük ölçekli rekabette organik trafik artışı. Teknik SEO + içerik stratejisi.',
        icon: '🌍',
        includes: ['Teknik Audit', 'İçerik Stratejisi', 'Backlink İnşası'],
        price: '19.000₺/ay'
    },
    {
        id: 'tanitim-filmi',
        category: 'production',
        title: 'Tanıtım Filmi',
        description: 'Markanızı sinematik bir dille anlatın. 4K çekim, drone ve profesyonel post-prodüksiyon.',
        icon: '🎬',
        includes: ['Senaryo & Kurgu', 'Drone Çekimleri', 'Profesyonel Seslendirme'],
        price: '3.500₺'
    },
    {
        id: 'urun-fotografciligi',
        category: 'production',
        title: 'Ürün Fotoğrafçılığı',
        description: 'E-ticaret ve katalog için profesyonel stüdyo ve dış mekan çekimleri.',
        icon: '📸',
        includes: ['Konsept Geliştirme', 'Dekupaj & Retouch', 'Yüksek Çözünürlük'],
        price: '1.500₺'
    },
    {
        id: 'marka-kurumsal',
        category: 'brand',
        title: 'Marka & Kurumsal Kimlik',
        description: 'Logo, renk paleti, brand book ve sosyal medya kit ile markanızı profesyonelce inşa edin.',
        icon: '🎨',
        includes: ['Logo Tasarımı', 'Brand Book', 'Sosyal Medya Kit'],
        price: '22.500₺'
    },
    {
        id: '360-retainer-startup-growth',
        category: 'retainer',
        title: '360° Startup Growth',
        description: 'Yeni girişimler için sosyal medya yönetimi, temel SEO ve aylık raporlama.',
        icon: '🌱',
        includes: ['Sosyal Medya (2 Platform)', 'Temel SEO', 'Aylık Rapor'],
        price: '29.999₺/ay'
    },
    {
        id: '360-retainer-market-domination',
        category: 'retainer',
        title: '360° Market Domination',
        description: 'Sektör liderliği için tüm dijital platformlar, günlük içerik ve 7/24 VIP destek.',
        icon: '👑',
        includes: ['Tüm Platformlar', 'Growth Hacking', '7/24 VIP Destek'],
        price: '49.999₺/ay'
    }
];

const processSteps = [
    { num: '01', title: 'Brief & Analiz', desc: 'İhtiyaçlarınızı dinler, pazar ve rakip analizi yaparız.' },
    { num: '02', title: 'Strateji & Planlama', desc: 'Veri odaklı bir yol haritası ve proje planı hazırlarız.' },
    { num: '03', title: 'Üretim & Uygulama', desc: 'Tasarım, kodlama ve içerik üretimini başlatırız.' },
    { num: '04', title: 'Yayın & Raporlama', desc: 'Projeyi yayına alır, performansı ölçer ve optimize ederiz.' }
];

const faqItems = [
    { q: 'Hangi sektörlere hizmet veriyorsunuz?', a: 'E-ticaret, hizmet sektörü, sağlık, gayrimenkul, eğitim ve daha fazlası. Her sektöre özel stratejiler uyguluyoruz.' },
    { q: 'Proje süreci ne kadar sürüyor?', a: 'Projenin kapsamına göre değişir. Web sitesi 2-4 hafta, özel yazılım 4-12 hafta, SEO ise 3-6 ay içinde sonuç verir.' },
    { q: 'Kırıkkale dışına hizmet veriyor musunuz?', a: 'Evet! Kırıkkale merkezliyiz ancak Türkiye ve dünya genelinde uzaktan hizmet veriyoruz.' },
    { q: 'Ödeme planlarınız nasıl?', a: 'Proje bazlı ve aylık ödeme seçenekleri sunuyoruz. Taksit imkanı mevcuttur.' },
    { q: 'Sonuçları ne zaman görürüm?', a: 'Web ve yazılım projelerinde anında sonuç, SEO ve reklam projelerinde ise ilk 30 gün içinde ilk verileri paylaşırız.' }
];

const ServicesPage = ({ t, tContact }) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filteredServices = activeCategory === 'all'
        ? services
        : services.filter(s => s.category === activeCategory);

    // Build schemas
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a }
        }))
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://zmkagency.com" },
            { "@type": "ListItem", "position": 2, "name": "Hizmetler", "item": "https://zmkagency.com/services" }
        ]
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="services-page-wrapper"
        >
            <SEO
                title="Kırıkkale Dijital Hizmetler | Web, SEO, Reklam, Yazılım"
                description="Kırıkkale merkezli 12+ dijital hizmet: kurumsal web sitesi, e-ticaret, sosyal medya, SEO, Google Ads, tanıtım filmi. Detaylı bilgi ve fiyatlar."
                keywords="kırıkkale dijital hizmetler, kırıkkale web tasarım, kırıkkale seo, kırıkkale reklam ajansı, kırıkkale google ads, kırıkkale sosyal medya"
                schema={[faqSchema, breadcrumbSchema]}
            />

            {/* ─── HERO ─── */}
            <section className="sp-hero">
                <div className="container">
                    <motion.div
                        className="sp-hero-badge"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        Kırıkkale'nin 360° Dijital Ajansı
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Hizmetler
                    </motion.h1>
                    <motion.p
                        className="sp-hero-sub"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Kırıkkale merkezli, yapay zekâ destekli dijital büyüme çözümleri.
                    </motion.p>
                    <motion.div
                        className="sp-hero-ctas"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <Link to="/contact" className="sp-btn sp-btn-primary">Teklif Al</Link>
                        <a
                            href="https://wa.me/905456789012"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sp-btn sp-btn-secondary"
                        >
                            💬 WhatsApp'tan Yaz
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ─── CATEGORY TABS ─── */}
            <section className="sp-categories">
                <div className="container">
                    <div className="sp-tabs">
                        {serviceCategories.map(cat => (
                            <button
                                key={cat.id}
                                className={`sp-tab ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.id)}
                            >
                                <span className="sp-tab-icon">{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SERVICE CARDS GRID ─── */}
            <section className="sp-services-grid-section">
                <div className="container">
                    <div className="sp-services-grid">
                        <AnimatePresence mode="wait">
                            {filteredServices.map((service, index) => (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    layout
                                >
                                    <Link
                                        to={`/services/${service.id}`}
                                        className="sp-service-card"
                                    >
                                        <div className="sp-card-icon">{service.icon}</div>
                                        <h3>{service.title}</h3>
                                        <p className="sp-card-desc">{service.description}</p>
                                        <div className="sp-card-includes">
                                            <span className="sp-includes-label">Neler dahil?</span>
                                            <ul>
                                                {service.includes.map((item, i) => (
                                                    <li key={i}>✓ {item}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="sp-card-price">{service.price}</div>
                                        <div className="sp-card-cta">
                                            Detayları Gör <span className="arrow">→</span>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            {/* ─── PROCESS STEPS ─── */}
            <section className="sp-process">
                <div className="container">
                    <h2 className="sp-section-title">Süreç Nasıl İşliyor?</h2>
                    <p className="sp-section-sub">Projelerimizi 4 net adımla yönetiyoruz.</p>
                    <div className="sp-process-grid">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={step.num}
                                className="sp-process-step"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <div className="sp-step-num">{step.num}</div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── KIRIIKKALE LOCAL ADVANTAGE ─── */}
            <section className="sp-local">
                <div className="container">
                    <div className="sp-local-card">
                        <div className="sp-local-badge">📍 Yerel Avantaj</div>
                        <h2>Kırıkkale'de Yerel Avantaj</h2>
                        <p>
                            Kırıkkale'nin dinamiklerini, esnafını ve pazar yapısını yakından biliyoruz.
                            Saha tecrübemiz ve yerel ağımız sayesinde dijital stratejilerinizi
                            çok daha hızlı ve etkili hayata geçiriyoruz.
                        </p>
                        <div className="sp-local-features">
                            <div className="sp-local-feature">
                                <span>🤝</span>
                                <span>Yüz yüze toplantı & saha ziyareti</span>
                            </div>
                            <div className="sp-local-feature">
                                <span>📍</span>
                                <span>Yerel pazar hakimiyeti</span>
                            </div>
                            <div className="sp-local-feature">
                                <span>⚡</span>
                                <span>Hızlı aksiyon & destek</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="sp-faq">
                <div className="container">
                    <h2 className="sp-section-title">Sık Sorulan Sorular</h2>
                    <div className="sp-faq-list">
                        {faqItems.map((item, index) => (
                            <motion.div
                                key={index}
                                className={`sp-faq-item ${openFaq === index ? 'open' : ''}`}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <button
                                    className="sp-faq-question"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    <span>{item.q}</span>
                                    <span className="sp-faq-toggle">{openFaq === index ? '−' : '+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            className="sp-faq-answer"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <p>{item.a}</p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FOOTER CTA ─── */}
            <section className="sp-footer-cta">
                <div className="container">
                    <h2>Ücretsiz 15 Dakikalık Görüşme</h2>
                    <p>Projenizi anlatın, size en uygun çözümü birlikte bulalım.</p>
                    <div className="sp-hero-ctas">
                        <Link to="/contact" className="sp-btn sp-btn-primary">Teklif Al</Link>
                        <a
                            href="https://wa.me/905456789012"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sp-btn sp-btn-secondary"
                        >
                            💬 WhatsApp ile Randevu
                        </a>
                    </div>
                </div>
            </section>

            {/* ─── CONTACT ─── */}
            <section style={{ paddingBottom: '80px' }}>
                <Contact t={tContact} />
            </section>
        </motion.div>
    );
};

export default ServicesPage;
