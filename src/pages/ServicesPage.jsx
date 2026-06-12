import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import SEO from '../components/SEO';
import Contact from '../components/Contact';
import '../styles/ServicesPage.css';

/* ─── 6 ANA HİZMET — DETAYLI VERİ ─── */
const services = [
    {
        id: '360-marka-yonetimi',
        title: '360° Marka Yönetimi',
        headline: 'Markanız.\nBir başyapıt olarak.',
        tagline: 'Sıfırdan inşa. Stratejik konumlandırma. Sektörde fark.',
        icon: '◉',
        accentColor: '#f59e0b',
        accentGlow: 'rgba(245, 158, 11, 0.15)',
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
        headline: 'Sosyal medyada\nvar olmak yetmez.',
        tagline: 'Büyümek, etkileşmek ve dönüştürmek gerek.',
        icon: '◎',
        accentColor: '#8b5cf6',
        accentGlow: 'rgba(139, 92, 246, 0.15)',
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
        headline: 'Reklam değil,\nsonuç yönetimi.',
        tagline: 'Her kuruş ölçülür. Her tıklama izlenir. Her dönüşüm sayılır.',
        icon: '◈',
        accentColor: '#ef4444',
        accentGlow: 'rgba(239, 68, 68, 0.15)',
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
        title: 'Web & Mobil Uygulama',
        headline: 'Kod yazılmaz.\nDeneyim tasarlanır.',
        tagline: 'Işık hızında. Mobil öncelikli. Dönüşüm odaklı.',
        icon: '⬡',
        accentColor: '#06b6d4',
        accentGlow: 'rgba(6, 182, 212, 0.15)',
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
        headline: 'Yazılım,\ngörünmez güçtür.',
        tagline: 'İş süreçlerinize özel. Ölçeklenebilir. Güvenli.',
        icon: '⎔',
        accentColor: '#10b981',
        accentGlow: 'rgba(16, 185, 129, 0.15)',
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
        title: 'Klip & Reklam Filmi',
        headline: 'Görüntü,\nbir his bırakır.',
        tagline: 'Sinematik kalite. Profesyonel ekip. Yaratıcı vizyon.',
        icon: '▣',
        accentColor: '#00d4ff',
        accentGlow: 'rgba(0, 212, 255, 0.15)',
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
    { num: '01', title: 'Keşif & Analiz', desc: 'İhtiyaçlarınızı derinlemesine dinliyor, sektörünüzü ve rakiplerinizi analiz ediyoruz.' },
    { num: '02', title: 'Strateji & Planlama', desc: 'Veri odaklı bir yol haritası hazırlıyor, KPI\'lar belirliyoruz.' },
    { num: '03', title: 'Üretim & Uygulama', desc: 'Tasarım, geliştirme ve içerik üretimini en yüksek kalitede gerçekleştiriyoruz.' },
    { num: '04', title: 'Yayın & Optimizasyon', desc: 'Projeyi yayına alıyor, performansı ölçüyor ve sürekli optimize ediyoruz.' }
];

const faqItems = [
    { q: 'Hangi sektörlere hizmet veriyorsunuz?', a: 'E-ticaret, hizmet sektörü, sağlık, gayrimenkul, eğitim, teknoloji, gıda ve daha fazlası. Her sektöre özel, veri odaklı stratejiler uyguluyoruz.' },
    { q: 'Proje süreci ne kadar sürüyor?', a: 'Projenin kapsamına göre değişir. Web sitesi 2-4 hafta, yazılım projesi 4-12 hafta, marka kimliği 2-3 hafta, SEO ise 3-6 ay içinde sonuç verir. İlk görüşmede net bir zaman planı paylaşıyoruz.' },
    { q: 'Kırıkkale dışına hizmet veriyor musunuz?', a: 'Evet! Kırıkkale merkezliyiz ancak Türkiye ve dünya genelinde uzaktan hizmet veriyoruz. Video konferans ile tüm süreçleri rahatlıkla yönetiyoruz.' },
    { q: 'Projelerimde revizyon hakkım var mı?', a: 'Tabii ki! Her projede belirlenen revizyon hakları dahilinde düzeltmeler yapıyoruz. Memnuniyetiniz bizim önceliğimiz.' },
    { q: 'Sonuçları ne zaman görürüm?', a: 'Web ve yazılım projelerinde anında sonuç, reklam kampanyalarında ilk 7 gün, SEO projelerinde ise ilk 30-90 gün içinde ölçülebilir sonuçlar paylaşıyoruz.' },
    { q: 'Teklif almak ücretsiz mi?', a: 'Evet, ilk görüşme ve teklif tamamen ücretsizdir. Projenizi anlattıktan sonra detaylı bir teklif ve yol haritası hazırlıyoruz.' }
];

/* ─── SERVICE SHOWCASE COMPONENT (Apple-style full-width section) ─── */
const ServiceShowcase = ({ service, index, isActive, onToggle }) => {
    const ref = useRef(null);

    return (
        <section
            ref={ref}
            className={`sp-showcase ${isActive ? 'active' : ''}`}
            style={{ '--accent': service.accentColor, '--accent-glow': service.accentGlow }}
            id={service.id}
        >
            {/* Full-width Hero for this service */}
            <div className="sp-showcase-hero" onClick={() => onToggle(service.id)}>
                <div className="sp-showcase-container">
                    <motion.div
                        className="sp-showcase-left"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    >
                        <div className="sp-showcase-index">{String(index + 1).padStart(2, '0')}</div>
                        <div className="sp-showcase-icon">{service.icon}</div>
                    </motion.div>

                    <motion.div
                        className="sp-showcase-center"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                    >
                        <h2 className="sp-showcase-headline" dangerouslySetInnerHTML={{ __html: service.headline.replace('\n', '<br/>') }} />
                        <p className="sp-showcase-tagline">{service.tagline}</p>
                        <div className="sp-showcase-title-bar">
                            <span className="sp-showcase-service-name">{service.title}</span>
                            <span className="sp-showcase-arrow-hint">
                                {isActive ? 'Kapat' : 'Keşfet'}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: isActive ? 'rotate(180deg)' : 'none', transition: 'transform 0.4s ease' }}>
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Expandable Detail */}
            <AnimatePresence>
                {isActive && (
                    <motion.div
                        className="sp-showcase-detail"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <div className="sp-showcase-detail-inner">
                            {/* Description */}
                            <motion.p
                                className="sp-showcase-desc"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.5 }}
                            >
                                {service.description}
                            </motion.p>

                            {/* Sub-services */}
                            <div className="sp-showcase-section">
                                <h3 className="sp-showcase-section-label">Neler Yapıyoruz</h3>
                                <div className="sp-showcase-cards">
                                    {service.subServices.map((sub, i) => (
                                        <motion.div
                                            key={i}
                                            className="sp-showcase-card"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.15 + i * 0.06, duration: 0.4 }}
                                        >
                                            <span className="sp-showcase-card-num">{String(i + 1).padStart(2, '0')}</span>
                                            <h4>{sub.title}</h4>
                                            <p>{sub.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Technical Details Row */}
                            <div className="sp-showcase-tech-row">
                                {service.tools && (
                                    <div className="sp-showcase-tech-col">
                                        <h3 className="sp-showcase-section-label">Araçlar & Teknolojiler</h3>
                                        <div className="sp-showcase-pills">
                                            {service.tools.map((t, i) => (
                                                <span key={i} className="sp-pill">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {service.techniques && (
                                    <div className="sp-showcase-tech-col">
                                        <h3 className="sp-showcase-section-label">Yaklaşım & Teknikler</h3>
                                        <div className="sp-showcase-pills">
                                            {service.techniques.map((t, i) => (
                                                <span key={i} className="sp-pill sp-pill-outline">{t}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Conditional extra sections */}
                            {service.deliverables && (
                                <div className="sp-showcase-section sp-showcase-section-compact">
                                    <h3 className="sp-showcase-section-label">Teslim Edilecekler</h3>
                                    <div className="sp-showcase-check-list">
                                        {service.deliverables.map((d, i) => (
                                            <div key={i} className="sp-showcase-check-item">
                                                <span className="sp-check-mark">✓</span>
                                                <span>{d}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {service.platforms && (
                                <div className="sp-showcase-section sp-showcase-section-compact">
                                    <h3 className="sp-showcase-section-label">Desteklenen Platformlar</h3>
                                    <div className="sp-showcase-pills">
                                        {service.platforms.map((p, i) => (
                                            <span key={i} className="sp-pill sp-pill-glow">{p}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {service.metrics && (
                                <div className="sp-showcase-section sp-showcase-section-compact">
                                    <h3 className="sp-showcase-section-label">Takip Ettiğimiz Metrikler</h3>
                                    <div className="sp-showcase-pills">
                                        {service.metrics.map((m, i) => (
                                            <span key={i} className="sp-pill sp-pill-outline">{m}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {service.techStack && (
                                <div className="sp-showcase-section sp-showcase-section-compact">
                                    <h3 className="sp-showcase-section-label">Teknoloji Stack</h3>
                                    <div className="sp-showcase-pills">
                                        {service.techStack.map((ts, i) => (
                                            <span key={i} className="sp-pill">{ts}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {service.infrastructure && (
                                <div className="sp-showcase-section sp-showcase-section-compact">
                                    <h3 className="sp-showcase-section-label">Altyapı & Güvenlik</h3>
                                    <div className="sp-showcase-pills">
                                        {service.infrastructure.map((inf, i) => (
                                            <span key={i} className="sp-pill sp-pill-outline">{inf}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {service.equipment && (
                                <div className="sp-showcase-section sp-showcase-section-compact">
                                    <h3 className="sp-showcase-section-label">Profesyonel Ekipmanlar</h3>
                                    <div className="sp-showcase-equip-grid">
                                        {service.equipment.map((eq, i) => (
                                            <div key={i} className="sp-equip-item">
                                                <span className="sp-equip-dot"></span>
                                                {eq}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {service.styles && (
                                <div className="sp-showcase-section sp-showcase-section-compact">
                                    <h3 className="sp-showcase-section-label">Çekim Tarzları</h3>
                                    <div className="sp-showcase-pills">
                                        {service.styles.map((s, i) => (
                                            <span key={i} className="sp-pill sp-pill-glow">{s}</span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA */}
                            <div className="sp-showcase-cta">
                                <Link to="/contact" className="sp-cta-primary">
                                    Bu Hizmet İçin Teklif Al
                                    <span className="sp-cta-arrow">→</span>
                                </Link>
                                <a
                                    href="https://wa.me/905413812114"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="sp-cta-secondary"
                                >
                                    Hemen Bilgi Al
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

/* ─── MAIN PAGE ─── */
const ServicesPage = ({ tContact }) => {
    const [activeService, setActiveService] = useState(null);
    const [openFaq, setOpenFaq] = useState(null);
    const heroRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start']
    });

    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
    const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 60]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggleService = (id) => {
        setActiveService(activeService === id ? null : id);
    };

    // Schemas
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
                "itemOffered": { "@type": "Service", "name": s.title, "description": s.description }
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
            className="sp-wrapper"
        >
            <SEO
                title="Dijital Hizmetler | 360° Marka, Sosyal Medya, Reklam, Web & Prodüksiyon"
                description="ZMK Agency profesyonel dijital hizmetler: 360° marka yönetimi, sosyal medya, reklam yönetimi, web & mobil uygulama, özel yazılım geliştirme, klip & reklam filmi çekimleri."
                keywords="dijital ajans hizmetleri, marka yönetimi, sosyal medya yönetimi, reklam yönetimi, web geliştirme, yazılım geliştirme, reklam filmi çekimi"
                schema={[serviceSchema, faqSchema, breadcrumbSchema]}
            />

            {/* ═══ HERO ═══ */}
            <motion.section
                ref={heroRef}
                className="sp-hero"
                style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
            >
                <div className="sp-hero-noise"></div>
                <div className="sp-hero-glow"></div>
                <div className="sp-hero-content">
                    <motion.p
                        className="sp-hero-eyebrow"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        ZMK Agency
                    </motion.p>
                    <motion.h1
                        className="sp-hero-h1"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        <span className="sp-hero-h1-white">Dijital dünyada</span>
                        <span className="sp-hero-h1-gradient">fark yaratan hizmetler.</span>
                    </motion.h1>
                    <motion.p
                        className="sp-hero-p"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        Stratejiden üretime, koddan çekime — her şey tek çatı altında.
                    </motion.p>
                    <motion.div
                        className="sp-hero-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                    >
                        <Link to="/contact" className="sp-cta-primary">
                            Teklif Al <span className="sp-cta-arrow">→</span>
                        </Link>
                        <a
                            href="https://wa.me/905413812114"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sp-cta-ghost"
                        >
                            WhatsApp
                        </a>
                    </motion.div>

                    {/* Scroll hint */}
                    <motion.div
                        className="sp-scroll-hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                    >
                        <div className="sp-scroll-line"></div>
                    </motion.div>
                </div>
            </motion.section>

            {/* ═══ SERVICE SHOWCASES ═══ */}
            <div className="sp-showcases">
                {services.map((service, index) => (
                    <ServiceShowcase
                        key={service.id}
                        service={service}
                        index={index}
                        isActive={activeService === service.id}
                        onToggle={toggleService}
                    />
                ))}
            </div>

            {/* ═══ PROCESS ═══ */}
            <section className="sp-process">
                <div className="sp-process-inner">
                    <motion.div
                        className="sp-section-header"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="sp-eyebrow">Süreç</p>
                        <h2 className="sp-section-h2">Nasıl çalışıyoruz?</h2>
                        <p className="sp-section-p">Her projemizi dört net adımla yönetiyoruz.</p>
                    </motion.div>
                    <div className="sp-process-grid">
                        {processSteps.map((step, i) => (
                            <motion.div
                                key={step.num}
                                className="sp-process-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <span className="sp-process-num">{step.num}</span>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ FAQ ═══ */}
            <section className="sp-faq">
                <div className="sp-faq-inner">
                    <motion.div
                        className="sp-section-header"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="sp-eyebrow">SSS</p>
                        <h2 className="sp-section-h2">Sık sorulan sorular.</h2>
                    </motion.div>
                    <div className="sp-faq-list">
                        {faqItems.map((item, i) => (
                            <motion.div
                                key={i}
                                className={`sp-faq-item ${openFaq === i ? 'open' : ''}`}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.04 }}
                            >
                                <button className="sp-faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                    <span>{item.q}</span>
                                    <span className="sp-faq-icon">{openFaq === i ? '−' : '+'}</span>
                                </button>
                                <AnimatePresence>
                                    {openFaq === i && (
                                        <motion.div
                                            className="sp-faq-a"
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

            {/* ═══ FINAL CTA ═══ */}
            <section className="sp-final-cta">
                <motion.div
                    className="sp-final-cta-inner"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2>Projenizi hayata geçirelim.</h2>
                    <p>15 dakikalık ücretsiz keşif görüşmesiyle başlayın.</p>
                    <div className="sp-final-cta-actions">
                        <Link to="/contact" className="sp-cta-primary sp-cta-lg">
                            Ücretsiz Teklif Al <span className="sp-cta-arrow">→</span>
                        </Link>
                        <a
                            href="https://wa.me/905413812114"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="sp-cta-ghost"
                        >
                            WhatsApp ile Randevu
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* ═══ CONTACT ═══ */}
            <section style={{ paddingBottom: '80px' }}>
                <Contact t={tContact} />
            </section>
        </motion.div>
    );
};

export default ServicesPage;
