import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import Contact from '../components/Contact';
import '../styles/ServicesPage.css';

/* ─── 6 ANA HİZMET — DETAYLI VERİ ─── */
const services = [
    {
        id: '360-marka-yonetimi',
        title: '360° Marka Yönetimi',
        tagline: 'Markanızı sıfırdan inşa ediyor, stratejik konumlandırmayla sektörde fark yaratıyoruz.',
        icon: '🎯',
        accentColor: '#f59e0b',
        gradient: 'linear-gradient(135deg, #f59e0b22, #f9731611)',
        description: 'Marka kimliğinizden dijital varlığınıza, müşteri deneyiminden pazar konumlandırmasına kadar her detayı yönetiyoruz. 360 derece marka yönetimi ile rakiplerinizden ayrışan, güçlü ve tanınır bir marka oluşturuyoruz.',
        subServices: [
            { title: 'Marka Stratejisi & Konumlandırma', desc: 'Pazar analizi, rakip araştırması ve hedef kitle belirleme ile markanızın stratejik yol haritasını çiziyoruz.' },
            { title: 'Logo & Kurumsal Kimlik Tasarımı', desc: 'Profesyonel logo, tipografi, renk paleti ve görsel dil oluşturarak markanızın kimliğini inşa ediyoruz.' },
            { title: 'Brand Book & Stil Rehberi', desc: 'Tüm mecralarda tutarlı marka iletişimi için kapsamlı brand book ve stil rehberi hazırlıyoruz.' },
            { title: 'Sosyal Medya Kit & Şablonlar', desc: 'Instagram, LinkedIn, TikTok ve tüm platformlar için markanıza özel şablon ve içerik kiti oluşturuyoruz.' },
            { title: 'Ambalaj & Baskı Tasarımı', desc: 'Kartvizit, broşür, ambalaj, araç giydirme ve tüm basılı materyallerinizi tasarlıyoruz.' },
            { title: 'Marka İzleme & Kriz Yönetimi', desc: 'Marka algınızı sürekli izliyor, negatif durumları proaktif kriz yönetimi ile çözümlüyoruz.' }
        ],
        tools: ['Adobe Illustrator', 'Adobe Photoshop', 'Figma', 'Canva Pro', 'Brandwatch', 'Google Analytics'],
        techniques: ['SWOT Analizi', 'Persona Oluşturma', 'Brand Audit', 'Competitor Mapping', 'Tone of Voice Geliştirme'],
        deliverables: ['Logo Paketi (AI, SVG, PNG, PDF)', 'Brand Book (60+ sayfa)', 'Sosyal Medya Kit (50+ şablon)', 'Kurumsal Kırtasiye Seti', 'Dijital & Basılı Reklam Materyalleri']
    },
    {
        id: 'sosyal-medya-yonetimi',
        title: 'Sosyal Medya Yönetimi',
        tagline: 'İçerik üretiminden topluluk yönetimine, her platformda markanızı büyütüyoruz.',
        icon: '📱',
        accentColor: '#8b5cf6',
        gradient: 'linear-gradient(135deg, #8b5cf622, #a855f711)',
        description: 'Instagram, TikTok, LinkedIn, YouTube, X (Twitter) ve Facebook dahil tüm sosyal medya platformlarında stratejik içerik üretimi, topluluk yönetimi ve büyüme stratejileri ile markanızın dijital varlığını güçlendiriyoruz.',
        subServices: [
            { title: 'İçerik Stratejisi & Takvimi', desc: 'Aylık içerik takvimi, tema planlaması ve editoryal strateji ile düzenli ve etkili paylaşımlar.' },
            { title: 'Görsel & Video İçerik Üretimi', desc: 'Reels, Stories, Carousel, Infografik ve kısa video formatlarında profesyonel içerik üretimi.' },
            { title: 'Topluluk Yönetimi & Etkileşim', desc: 'Mesaj ve yorum yönetimi, müşteri iletişimi ve marka sadakati oluşturma.' },
            { title: 'Influencer Marketing', desc: 'Sektörünüze uygun influencer seçimi, kampanya planlama ve performans takibi.' },
            { title: 'Trend Analizi & Hashtag Stratejisi', desc: 'Güncel trendleri takip ediyor, viral içerik stratejileri ve hashtag optimizasyonu uyguluyoruz.' },
            { title: 'Performans Raporlama & Analitik', desc: 'Haftalık ve aylık detaylı raporlar ile büyüme metriklerini, etkileşim oranlarını ve ROI\'yi analiz ediyoruz.' }
        ],
        tools: ['Meta Business Suite', 'Hootsuite', 'Later', 'Canva Pro', 'CapCut', 'Adobe Premiere Pro', 'TikTok Creator Tools'],
        techniques: ['Content Pillar Stratejisi', 'Growth Hacking', 'UGC (Kullanıcı İçeriği)', 'A/B Test', 'Viral Loop Optimizasyonu'],
        platforms: ['Instagram', 'TikTok', 'LinkedIn', 'YouTube', 'X (Twitter)', 'Facebook', 'Pinterest']
    },
    {
        id: 'reklam-yonetimi',
        title: 'Reklam Yönetimi',
        tagline: 'Her kuruşunuzun karşılığını alın. Veri odaklı, yüksek ROAS kampanyalar.',
        icon: '📢',
        accentColor: '#ef4444',
        gradient: 'linear-gradient(135deg, #ef444422, #f9731611)',
        description: 'Google Ads, Meta Ads (Facebook & Instagram), TikTok Ads, LinkedIn Ads ve YouTube Ads dahil tüm dijital reklam platformlarında kampanyalarınızı stratejik olarak yönetiyor, bütçenizi en verimli şekilde kullanıyoruz.',
        subServices: [
            { title: 'Google Ads (SEM) Yönetimi', desc: 'Arama ağı, görüntülü reklam, alışveriş kampanyaları ve Performance Max ile hedef kitlenize ulaşın.' },
            { title: 'Meta Ads (Facebook & Instagram)', desc: 'Hedef kitle segmentasyonu, lookalike audience, retargeting ve dönüşüm odaklı kampanyalar.' },
            { title: 'TikTok & YouTube Ads', desc: 'Video reklam kampanyaları, in-feed ads, branded hashtag challenge ve bumper ads yönetimi.' },
            { title: 'LinkedIn & B2B Reklamları', desc: 'Karar vericilere ulaşan B2B kampanyalar, InMail reklamları ve lead generation formları.' },
            { title: 'Remarketing & Retargeting', desc: 'Web sitenizi ziyaret eden kullanıcıları geri kazanmak için çoklu kanal retargeting stratejileri.' },
            { title: 'Dönüşüm Optimizasyonu (CRO)', desc: 'Landing page optimizasyonu, A/B testleri, conversion tracking ve funnel analizi ile dönüşüm oranlarını artırın.' }
        ],
        tools: ['Google Ads', 'Meta Ads Manager', 'TikTok Ads Manager', 'Google Analytics 4', 'Google Tag Manager', 'Hotjar', 'SEMrush'],
        techniques: ['ROAS Optimizasyonu', 'Bid Strategy Tuning', 'Audience Segmentation', 'Ad Creative Testing', 'Attribution Modeling'],
        metrics: ['CTR (Click-Through Rate)', 'CPA (Maliyet/Dönüşüm)', 'ROAS (Reklam Harcama Getirisi)', 'CPM (1000 Gösterim Maliyeti)', 'Quality Score']
    },
    {
        id: 'web-mobil-uygulama',
        title: 'Web & Mobil Uygulama Geliştirme',
        tagline: 'Işık hızında, mobil öncelikli, SEO uyumlu dijital deneyimler.',
        icon: '💻',
        accentColor: '#06b6d4',
        gradient: 'linear-gradient(135deg, #06b6d422, #0ea5e911)',
        description: 'Kurumsal web sitelerinden e-ticaret platformlarına, iOS ve Android uygulamalarından Progressive Web App\'lere kadar en güncel teknolojilerle dijital ürünlerinizi tasarlıyor ve geliştiriyoruz.',
        subServices: [
            { title: 'Kurumsal Web Sitesi', desc: 'SEO uyumlu, mobil öncelikli, ışık hızında yüklenen ve markanızı en iyi şekilde temsil eden modern web siteleri.' },
            { title: 'E-Ticaret Çözümleri', desc: 'Ödeme entegrasyonları, stok yönetimi, pazaryeri bağlantıları ve yüksek dönüşüm oranına sahip online mağazalar.' },
            { title: 'iOS & Android Uygulama', desc: 'React Native ve Flutter ile cross-platform mobil uygulamalar. App Store ve Play Store yayınlama süreci dahil.' },
            { title: 'Progressive Web App (PWA)', desc: 'Offline çalışabilen, push notification destekli, uygulama benzeri web deneyimleri.' },
            { title: 'UI/UX Tasarım', desc: 'Kullanıcı araştırması, wireframe, prototip ve kullanılabilirlik testleri ile mükemmel kullanıcı deneyimi.' },
            { title: 'Landing Page & Funnel', desc: 'A/B test edilmiş, dönüşüm odaklı açılış sayfaları ve satış hunisi tasarımı.' }
        ],
        tools: ['React', 'Next.js', 'Vue.js', 'React Native', 'Flutter', 'Node.js', 'Firebase', 'AWS', 'Figma', 'Vercel'],
        techniques: ['Mobile-First Design', 'Server-Side Rendering', 'Headless CMS', 'API-First Architecture', 'CI/CD Pipeline'],
        techStack: ['HTML5 / CSS3 / JavaScript', 'TypeScript', 'PostgreSQL / MongoDB', 'Redis', 'Docker / Kubernetes', 'GraphQL / REST API']
    },
    {
        id: 'ozel-yazilim-gelistirme',
        title: 'Özel Yazılım Geliştirme',
        tagline: 'İş süreçlerinize özel, ölçeklenebilir ve güvenli yazılım çözümleri.',
        icon: '⚙️',
        accentColor: '#10b981',
        gradient: 'linear-gradient(135deg, #10b98122, #059b6e11)',
        description: 'İş süreçlerinizi dijitalleştiren, verimliliği artıran ve rekabet avantajı sağlayan özel yazılım çözümleri geliştiriyoruz. SaaS ürünlerinden ERP sistemlerine, CRM çözümlerinden otomasyon platformlarına kadar geniş bir yelpazede hizmet veriyoruz.',
        subServices: [
            { title: 'SaaS Ürün Geliştirme', desc: 'Sıfırdan SaaS ürünü geliştirme, multi-tenant mimari, abonelik yönetimi ve ölçeklenebilir altyapı.' },
            { title: 'CRM & ERP Sistemleri', desc: 'Müşteri ilişkileri yönetimi ve kurumsal kaynak planlama yazılımları ile iş süreçlerinizi optimize edin.' },
            { title: 'API Geliştirme & Entegrasyon', desc: 'RESTful ve GraphQL API\'lar, üçüncü parti servis entegrasyonları ve middleware geliştirme.' },
            { title: 'Otomasyon & İş Akışları', desc: 'Tekrarlayan iş süreçlerini otomatikleştiren, verimlilik artıran akıllı otomasyon çözümleri.' },
            { title: 'Veri Analizi & Dashboard', desc: 'Gerçek zamanlı veri görselleştirme, business intelligence dashboard\'ları ve raporlama sistemleri.' },
            { title: 'Yapay Zekâ & Machine Learning', desc: 'AI destekli chatbot, doğal dil işleme, tahmin modelleri ve akıllı öneri sistemleri geliştirme.' }
        ],
        tools: ['Python', 'Node.js', 'Go', 'Java', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'Kubernetes', 'TensorFlow'],
        techniques: ['Agile / Scrum', 'Microservices Architecture', 'Domain-Driven Design', 'Test-Driven Development', 'DevOps & CI/CD'],
        infrastructure: ['AWS / Google Cloud / Azure', 'Containerized Deployment', 'Load Balancing', 'SSL/TLS Encryption', 'Auto-Scaling']
    },
    {
        id: 'klip-reklam-filmi',
        title: 'Klip & Reklam Filmi Çekimleri',
        tagline: 'Sinematik kalitede prodüksiyon. Markanızı görsel bir hikâyeye dönüştürüyoruz.',
        icon: '🎬',
        accentColor: '#ec4899',
        gradient: 'linear-gradient(135deg, #ec489922, #f43f5e11)',
        description: 'Profesyonel ekipman, deneyimli ekip ve yaratıcı vizyon ile tanıtım filmi, reklam filmi, müzik klibi, ürün çekimi, drone çekimi ve sosyal medya içerik prodüksiyonu gerçekleştiriyoruz. Ön prodüksiyondan post-prodüksiyona kadar tüm süreçleri yönetiyoruz.',
        subServices: [
            { title: 'Tanıtım & Kurumsal Film', desc: 'Şirketinizi, ürünlerinizi ve hizmetlerinizi sinematik bir dille anlatan profesyonel tanıtım filmleri.' },
            { title: 'Reklam Filmi & TVC', desc: 'TV, dijital platformlar ve sosyal medya için yüksek prodüksiyon değerine sahip reklam filmleri.' },
            { title: 'Müzik Klibi Prodüksiyonu', desc: 'Konsept geliştirme, senaryo yazımı, çekim ve post-prodüksiyon dahil komple klip üretimi.' },
            { title: 'Ürün & Katalog Fotoğrafçılığı', desc: 'E-ticaret, katalog ve sosyal medya için profesyonel stüdyo ve dış mekan ürün çekimleri.' },
            { title: 'Drone & Hava Çekimleri', desc: '4K drone çekimleri, havadan tanıtım görüntüleri ve sinematik hava fotoğrafçılığı.' },
            { title: 'Motion Graphics & Animasyon', desc: '2D/3D animasyon, explainer video, logo animasyonu ve sosyal medya motion içerikleri.' }
        ],
        equipment: ['Sony FX6 / RED Komodo', 'DJI Inspire 3 Drone', 'Aputure 600x Pro Işık Sistemi', 'DJI Ronin 4D Gimbal', 'Rode NTG5 Mikrofon', 'Atomos Ninja V Monitor'],
        techniques: ['Sinematik Çekim Teknikleri', 'Color Grading (DaVinci Resolve)', 'Profesyonel Seslendirme', 'SFX & VFX', 'Storyboard & Senaryo Yazımı'],
        styles: ['Sinematik', 'Belgesel', 'Lifestyle', 'Minimal & Modern', 'Dramatik', 'Fast-Paced / Dinamik']
    }
];

const processSteps = [
    { num: '01', title: 'Keşif & Analiz', desc: 'İhtiyaçlarınızı derinlemesine dinliyor, sektörünüzü ve rakiplerinizi analiz ediyoruz.', icon: '🔍' },
    { num: '02', title: 'Strateji & Planlama', desc: 'Veri odaklı bir yol haritası hazırlıyor, KPI\'lar belirliyoruz.', icon: '📋' },
    { num: '03', title: 'Üretim & Uygulama', desc: 'Tasarım, geliştirme ve içerik üretimini en yüksek kalitede gerçekleştiriyoruz.', icon: '⚡' },
    { num: '04', title: 'Yayın & Optimizasyon', desc: 'Projeyi yayına alıyor, performansı ölçüyor ve sürekli optimize ediyoruz.', icon: '🚀' }
];

const faqItems = [
    { q: 'Hangi sektörlere hizmet veriyorsunuz?', a: 'E-ticaret, hizmet sektörü, sağlık, gayrimenkul, eğitim, teknoloji, gıda ve daha fazlası. Her sektöre özel, veri odaklı stratejiler uyguluyoruz.' },
    { q: 'Proje süreci ne kadar sürüyor?', a: 'Projenin kapsamına göre değişir. Web sitesi 2-4 hafta, yazılım projesi 4-12 hafta, marka kimliği 2-3 hafta, SEO ise 3-6 ay içinde sonuç verir. İlk görüşmede net bir zaman planı paylaşıyoruz.' },
    { q: 'Kırıkkale dışına hizmet veriyor musunuz?', a: 'Evet! Kırıkkale merkezliyiz ancak Türkiye ve dünya genelinde uzaktan hizmet veriyoruz. Video konferans ile tüm süreçleri rahatlıkla yönetiyoruz.' },
    { q: 'Projelerimde revizyon hakkım var mı?', a: 'Tabii ki! Her projede belirlenen revizyon hakları dahilinde düzeltmeler yapıyoruz. Memnuniyetiniz bizim önceliğimiz.' },
    { q: 'Sonuçları ne zaman görürüm?', a: 'Web ve yazılım projelerinde anında sonuç, reklam kampanyalarında ilk 7 gün, SEO projelerinde ise ilk 30-90 gün içinde ölçülebilir sonuçlar paylaşıyoruz.' },
    { q: 'Teklif almak ücretsiz mi?', a: 'Evet, ilk görüşme ve teklif tamamen ücretsizdir. Projenizi anlattıktan sonra detaylı bir teklif ve yol haritası hazırlıyoruz.' }
];

const stats = [
    { num: '150+', label: 'Tamamlanan Proje' },
    { num: '50+', label: 'Mutlu Müşteri' },
    { num: '4+', label: 'Yıllık Deneyim' },
    { num: '10M+', label: 'Erişilen Kişi' }
];

const ServicesPage = ({ t, tContact }) => {
    const [expandedService, setExpandedService] = useState(null);
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggleService = (id) => {
        setExpandedService(expandedService === id ? null : id);
    };

    // Build schemas
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "ZMK Agency",
        "description": "360° Dijital Ajans — Marka, Sosyal Medya, Reklam, Web, Yazılım & Prodüksiyon",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Dijital Hizmetler",
            "itemListElement": services.map(s => ({
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": s.title,
                    "description": s.description
                }
            }))
        }
    };

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
                title="Dijital Hizmetler | 360° Marka, Sosyal Medya, Reklam, Web & Prodüksiyon"
                description="ZMK Agency profesyonel dijital hizmetler: 360° marka yönetimi, sosyal medya, reklam yönetimi, web & mobil uygulama, özel yazılım geliştirme, klip & reklam filmi çekimleri."
                keywords="dijital ajans hizmetleri, marka yönetimi, sosyal medya yönetimi, reklam yönetimi, web geliştirme, yazılım geliştirme, reklam filmi çekimi, tanıtım filmi"
                schema={[serviceSchema, faqSchema, breadcrumbSchema]}
            />

            {/* ─── HERO ─── */}
            <section className="sp-hero">
                <div className="sp-hero-bg-elements">
                    <div className="sp-hero-orb sp-hero-orb-1"></div>
                    <div className="sp-hero-orb sp-hero-orb-2"></div>
                    <div className="sp-hero-orb sp-hero-orb-3"></div>
                    <div className="sp-hero-grid-bg"></div>
                </div>
                <div className="container">
                    <motion.div
                        className="sp-hero-badge"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="sp-badge-dot"></span>
                        Profesyonel Dijital Çözümler
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="sp-hero-title-line">Dijital Dünyada</span>
                        <span className="sp-hero-title-accent">Fark Yaratan Hizmetler</span>
                    </motion.h1>
                    <motion.p
                        className="sp-hero-sub"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        Marka stratejisinden yazılım geliştirmeye, sosyal medyadan sinematik prodüksiyona —
                        işletmenizi bir sonraki seviyeye taşıyacak 6 ana hizmet alanı.
                    </motion.p>
                    <motion.div
                        className="sp-hero-ctas"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <Link to="/contact" className="sp-btn sp-btn-primary">
                            <span>Ücretsiz Teklif Al</span>
                            <span className="sp-btn-arrow">→</span>
                        </Link>
                        <a
                            href="https://wa.me/905413812114"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sp-btn sp-btn-secondary"
                        >
                            💬 WhatsApp'tan Yaz
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* ─── STATS BAR ─── */}
            <section className="sp-stats">
                <div className="container">
                    <div className="sp-stats-grid">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                className="sp-stat-item"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <span className="sp-stat-num">{stat.num}</span>
                                <span className="sp-stat-label">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── SERVICES ─── */}
            <section className="sp-services-section">
                <div className="container">
                    <motion.div
                        className="sp-section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="sp-section-badge">Hizmetlerimiz</span>
                        <h2 className="sp-section-title">Profesyonel Dijital Hizmetler</h2>
                        <p className="sp-section-sub">
                            Her biri kendi alanında uzmanlaşmış ekibimizle, işletmenizin dijital dönüşümünü gerçekleştiriyoruz.
                        </p>
                    </motion.div>

                    <div className="sp-services-list">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                className={`sp-service-block ${expandedService === service.id ? 'expanded' : ''}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                style={{ '--accent': service.accentColor }}
                            >
                                {/* Service Header Card */}
                                <div
                                    className="sp-service-header"
                                    onClick={() => toggleService(service.id)}
                                    style={{ background: service.gradient }}
                                >
                                    <div className="sp-service-header-left">
                                        <div className="sp-service-num">{String(index + 1).padStart(2, '0')}</div>
                                        <div className="sp-service-icon">{service.icon}</div>
                                        <div className="sp-service-info">
                                            <h3>{service.title}</h3>
                                            <p className="sp-service-tagline">{service.tagline}</p>
                                        </div>
                                    </div>
                                    <button className="sp-expand-btn" aria-label="Detayları Göster">
                                        <motion.span
                                            animate={{ rotate: expandedService === service.id ? 45 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            +
                                        </motion.span>
                                    </button>
                                </div>

                                {/* Expanded Detail */}
                                <AnimatePresence>
                                    {expandedService === service.id && (
                                        <motion.div
                                            className="sp-service-detail"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                                        >
                                            <div className="sp-detail-content">
                                                {/* Description */}
                                                <p className="sp-detail-desc">{service.description}</p>

                                                {/* Sub-services Grid */}
                                                <div className="sp-detail-section">
                                                    <h4 className="sp-detail-section-title">
                                                        <span className="sp-detail-icon">📋</span>
                                                        Alt Hizmetler
                                                    </h4>
                                                    <div className="sp-sub-services-grid">
                                                        {service.subServices.map((sub, i) => (
                                                            <div key={i} className="sp-sub-service-card">
                                                                <div className="sp-sub-service-num">{String(i + 1).padStart(2, '0')}</div>
                                                                <h5>{sub.title}</h5>
                                                                <p>{sub.desc}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Tools & Technologies */}
                                                {service.tools && (
                                                <div className="sp-detail-section">
                                                    <h4 className="sp-detail-section-title">
                                                        <span className="sp-detail-icon">🛠️</span>
                                                        Kullandığımız Araçlar & Teknolojiler
                                                    </h4>
                                                    <div className="sp-tags-grid">
                                                        {service.tools.map((tool, i) => (
                                                            <span key={i} className="sp-tag">{tool}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                )}

                                                {/* Techniques */}
                                                {service.techniques && (
                                                <div className="sp-detail-section">
                                                    <h4 className="sp-detail-section-title">
                                                        <span className="sp-detail-icon">🎯</span>
                                                        Yaklaşım & Teknikler
                                                    </h4>
                                                    <div className="sp-tags-grid">
                                                        {service.techniques.map((tech, i) => (
                                                            <span key={i} className="sp-tag sp-tag-outline">{tech}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                                )}

                                                {/* Extra Info (varies per service) */}
                                                {service.deliverables && (
                                                    <div className="sp-detail-section">
                                                        <h4 className="sp-detail-section-title">
                                                            <span className="sp-detail-icon">📦</span>
                                                            Teslim Edilecekler
                                                        </h4>
                                                        <ul className="sp-deliverables-list">
                                                            {service.deliverables.map((d, i) => (
                                                                <li key={i}><span className="sp-check-icon">✓</span> {d}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {service.platforms && (
                                                    <div className="sp-detail-section">
                                                        <h4 className="sp-detail-section-title">
                                                            <span className="sp-detail-icon">🌐</span>
                                                            Desteklenen Platformlar
                                                        </h4>
                                                        <div className="sp-tags-grid">
                                                            {service.platforms.map((p, i) => (
                                                                <span key={i} className="sp-tag sp-tag-platform">{p}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {service.metrics && (
                                                    <div className="sp-detail-section">
                                                        <h4 className="sp-detail-section-title">
                                                            <span className="sp-detail-icon">📊</span>
                                                            Takip Ettiğimiz Metrikler
                                                        </h4>
                                                        <div className="sp-tags-grid">
                                                            {service.metrics.map((m, i) => (
                                                                <span key={i} className="sp-tag sp-tag-metric">{m}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {service.techStack && (
                                                    <div className="sp-detail-section">
                                                        <h4 className="sp-detail-section-title">
                                                            <span className="sp-detail-icon">⚡</span>
                                                            Teknoloji Stack
                                                        </h4>
                                                        <div className="sp-tags-grid">
                                                            {service.techStack.map((ts, i) => (
                                                                <span key={i} className="sp-tag">{ts}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {service.infrastructure && (
                                                    <div className="sp-detail-section">
                                                        <h4 className="sp-detail-section-title">
                                                            <span className="sp-detail-icon">☁️</span>
                                                            Altyapı & Güvenlik
                                                        </h4>
                                                        <div className="sp-tags-grid">
                                                            {service.infrastructure.map((inf, i) => (
                                                                <span key={i} className="sp-tag sp-tag-outline">{inf}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {service.equipment && (
                                                    <div className="sp-detail-section">
                                                        <h4 className="sp-detail-section-title">
                                                            <span className="sp-detail-icon">🎥</span>
                                                            Profesyonel Ekipmanlar
                                                        </h4>
                                                        <div className="sp-equipment-grid">
                                                            {service.equipment.map((eq, i) => (
                                                                <div key={i} className="sp-equipment-item">
                                                                    <span className="sp-eq-dot"></span>
                                                                    {eq}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {service.styles && (
                                                    <div className="sp-detail-section">
                                                        <h4 className="sp-detail-section-title">
                                                            <span className="sp-detail-icon">🎨</span>
                                                            Çekim Tarzları
                                                        </h4>
                                                        <div className="sp-tags-grid">
                                                            {service.styles.map((s, i) => (
                                                                <span key={i} className="sp-tag sp-tag-style">{s}</span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* CTA */}
                                                <div className="sp-detail-cta">
                                                    <Link to="/contact" className="sp-btn sp-btn-primary">
                                                        Bu Hizmet İçin Teklif Al
                                                        <span className="sp-btn-arrow">→</span>
                                                    </Link>
                                                    <a
                                                        href="https://wa.me/905413812114"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="sp-btn sp-btn-secondary"
                                                    >
                                                        💬 Hemen Bilgi Al
                                                    </a>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── PROCESS STEPS ─── */}
            <section className="sp-process">
                <div className="container">
                    <motion.div
                        className="sp-section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="sp-section-badge">Süreç</span>
                        <h2 className="sp-section-title">Nasıl Çalışıyoruz?</h2>
                        <p className="sp-section-sub">Her projemizi 4 net adımla yönetiyoruz.</p>
                    </motion.div>
                    <div className="sp-process-grid">
                        {processSteps.map((step, index) => (
                            <motion.div
                                key={step.num}
                                className="sp-process-step"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.12 }}
                            >
                                <div className="sp-step-icon">{step.icon}</div>
                                <div className="sp-step-num">{step.num}</div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                                {index < processSteps.length - 1 && (
                                    <div className="sp-step-connector"></div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FAQ ─── */}
            <section className="sp-faq">
                <div className="container">
                    <motion.div
                        className="sp-section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="sp-section-badge">SSS</span>
                        <h2 className="sp-section-title">Sık Sorulan Sorular</h2>
                    </motion.div>
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
                    <motion.div
                        className="sp-footer-cta-content"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Projenizi Hayata Geçirelim</h2>
                        <p>
                            15 dakikalık ücretsiz keşif görüşmesiyle başlayın.
                            Size en uygun çözümü birlikte belirleyelim.
                        </p>
                        <div className="sp-hero-ctas">
                            <Link to="/contact" className="sp-btn sp-btn-primary">
                                Ücretsiz Teklif Al
                                <span className="sp-btn-arrow">→</span>
                            </Link>
                            <a
                                href="https://wa.me/905413812114"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="sp-btn sp-btn-secondary"
                            >
                                💬 WhatsApp ile Randevu
                            </a>
                        </div>
                    </motion.div>
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
