import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import Contact from '../components/Contact';
import '../styles/PillarPage.css';

/* ─── FAQ DATA ─── */
const pillarFaq = [
    { q: 'Kırıkkale\'de yazılım yaptırmak ne kadara mal olur?', a: 'Kurumsal web sitesi 12.500₺\'den, e-ticaret siteleri 35.000₺\'den, özel yazılım projeleri ise 85.000₺\'den başlar. Esnaf paketi kapsamında temel web sitesi 9.999₺\'ye elde edilebilir. ZMK Agency olarak şeffaf fiyat politikası uyguluyoruz.' },
    { q: 'Kırıkkale\'de en iyi reklam ajansı hangisi?', a: 'ZMK Agency, Kırıkkale\'nin ilk ve tek 360° dijital reklam ajansıdır. Web tasarım, sosyal medya, Google Ads, SEO, prodüksiyon ve kurumsal kimlik hizmetlerini tek çatı altında sunuyoruz. 50+ referans ile Kırıkkale\'nin en fazla müşteri memnuniyetine sahip ajansıyız.' },
    { q: 'Reklam bütçem düşük, yine de çalışabilir miyiz?', a: 'Kesinlikle. Esnaf Paketi ile 9.999₺ gibi uygun bir fiyatla dijital dünyaya adım atabilirsiniz. Google Ads ve sosyal medya reklamları için minimum 5.000₺/ay bütçe öneriyoruz, ancak her bütçeye uygun planlarımız mevcuttur.' },
    { q: 'SEO ne kadar sürede sonuç verir?', a: 'Lokal SEO (Google Haritalar) genellikle 4-8 haftada görünür sonuçlar verir. Organik arama sıralamaları için 3-6 aylık bir süreç gereklidir. Kırıkkale gibi yerel pazarlarda rekabet düşük olduğu için sonuçlar genellikle daha hızlı gelir.' },
    { q: 'Kırıkkale dışından hizmet alabilir miyim?', a: 'Evet, ZMK Agency Kırıkkale merkezli olsa da Türkiye geneli ve uluslararası müşterilere hizmet vermektedir. Uzaktan proje yönetimi altyapımız ile lokasyondan bağımsız çalışıyoruz.' },
    { q: 'Hangi teknolojileri kullanıyorsunuz?', a: 'React, Next.js, Node.js, Python ve Flutter gibi modern teknolojiler kullanıyoruz. Altyapılarımız Vercel ve AWS üzerinde barındırılmaktadır. AI destekli araçlarımızla veri odaklı çözümler sunuyoruz.' }
];

/* ─── SERVICE LINKS FOR INTERNAL LINKING ─── */
const serviceLinks = [
    { title: 'Kurumsal Web Sitesi', slug: '/services/kurumsal-web-sitesi', desc: 'SEO uyumlu, mobil öncelikli modern web siteleri', price: '12.500₺' },
    { title: 'E-Ticaret Çözümleri', slug: '/services/e-ticaret', desc: 'Stok yönetimi ve pazaryeri entegrasyonlu mağazalar', price: '35.000₺' },
    { title: 'Özel Yazılım / App', slug: '/services/ozel-yazilim', desc: 'iOS, Android ve web uygulamaları', price: '85.000₺' },
    { title: 'Google Ads Yönetimi', slug: '/services/google-ads', desc: 'Dönüşüm odaklı arama reklamları', price: '7.500₺/ay' },
    { title: 'Sosyal Medya Reklamları', slug: '/services/sosyal-medya', desc: 'Facebook, Instagram, TikTok kampanyaları', price: '7.500₺/ay' },
    { title: 'Lokal SEO', slug: '/services/lokal-seo', desc: 'Google Haritalar\'da ilk sıraya çıkın', price: '8.000₺/ay' },
    { title: 'Ulusal SEO', slug: '/services/ulusal-seo', desc: 'Organik trafiğinizi katlayın', price: '19.000₺/ay' },
    { title: 'Tanıtım Filmi', slug: '/services/tanitim-filmi', desc: '4K çekim ve drone görüntüleri', price: '3.500₺' },
    { title: 'Kurumsal Kimlik', slug: '/services/kurumsal-kimlik', desc: 'Logo, kartvizit ve marka kiti', price: '22.500₺' }
];

/* ─── LOCAL LANDING LINKS ─── */
const localLinks = [
    { title: 'Kırıkkale Reklam Ajansı', slug: '/kirikkale-reklam-ajansi' },
    { title: 'Kırıkkale Web Tasarım', slug: '/kirikkale-web-tasarim' },
    { title: 'Kırıkkale Dijital Pazarlama', slug: '/kirikkale-dijital-pazarlama-ajansi' },
    { title: 'Kırıkkale SEO Uzmanı', slug: '/kirikkale-seo' },
    { title: 'Kırıkkale Sosyal Medya', slug: '/kirikkale-sosyal-medya-yonetimi' },
    { title: 'Kırıkkale Yazılım Geliştirme', slug: '/kirikkale-yazilim-gelistirme' },
    { title: 'Kırıkkale E-Ticaret', slug: '/kirikkale-e-ticaret-otomasyon' },
    { title: 'Kırıkkale Google Ads', slug: '/kirikkale-google-ads-yonetimi' },
    { title: 'Kırıkkale Drone Çekimi', slug: '/kirikkale-drone-cekim-tanitim-filmi' },
    { title: 'Kırıkkale Instagram Reklam', slug: '/kirikkale-instagram-reklam-yonetimi' }
];

const PillarPage = ({ t }) => {
    const [openFaq, setOpenFaq] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Article Schema
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "Kırıkkale Dijital Çözümler: Yazılım & Reklam – Kapsamlı Rehber",
        "description": "Kırıkkale'de yazılım, reklam, SEO, web tasarım ve sosyal medya hizmetleri hakkında kapsamlı rehber.",
        "author": { "@type": "Organization", "name": "ZMK Agency", "url": "https://zmkagency.com" },
        "publisher": { "@type": "Organization", "name": "ZMK Agency", "logo": { "@type": "ImageObject", "url": "https://zmkagency.com/logo.png" } },
        "datePublished": "2026-03-04",
        "dateModified": "2026-03-04"
    };

    // FAQPage Schema
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": pillarFaq.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": { "@type": "Answer", "text": item.a }
        }))
    };

    // BreadcrumbList
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://zmkagency.com" },
            { "@type": "ListItem", "position": 2, "name": "Kırıkkale Dijital Çözümler", "item": "https://zmkagency.com/kirikkale-dijital-cozumler" }
        ]
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pillar-page-wrapper"
        >
            <SEO
                title="Kırıkkale Yazılım & Reklam Ajansı | 360° Dijital Çözümler"
                description="Kırıkkale'de yazılım, reklam, SEO, web tasarım ve sosyal medya hizmetleri. 50+ referans, ölçülebilir sonuçlar. Kapsamlı rehber."
                keywords="kırıkkale yazılım, kırıkkale reklam, kırıkkale reklam ajansı, kırıkkale dijital pazarlama, kırıkkale web sitesi, kırıkkale seo, kırıkkale sosyal medya yönetimi"
                schema={[articleSchema, faqSchema, breadcrumbSchema]}
            />

            {/* ─── HERO ─── */}
            <section className="pillar-hero">
                <div className="container">
                    <motion.div
                        className="pillar-hero-badge"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        Kırıkkale'nin Dijital Referans Noktası
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        Kırıkkale Dijital Çözümler:<br />Yazılım & Reklam
                    </motion.h1>
                    <motion.p
                        className="pillar-hero-sub"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Kırıkkale'de işletmenizi dijitalde zirveye taşıyacak tüm hizmetler, fiyatlar ve stratejiler — tek bir rehberde.
                    </motion.p>
                </div>
            </section>

            <div className="container pillar-content">
                {/* ─── SECTION 1: OVERVIEW ─── */}
                <section className="pillar-section">
                    <h2>Kırıkkale'de Dijital Dönüşüm Neden Kaçınılmaz?</h2>
                    <p>
                        Kırıkkale, Ankara'ya sadece 80 km mesafede, hızla büyüyen bir Anadolu şehri. Merkez, Yahşihan, Keskin, Balışeyh, Bahşılı ve Delice ilçeleriyle güçlü bir ticaret ağına sahip. Ancak şehirdeki işletmelerin büyük çoğunluğu hâlâ dijitalde yeterince görünür değil.
                    </p>
                    <p>
                        Günümüzde müşterileriniz bir hizmete ihtiyaç duyduğunda ilk yaptıkları şey <strong>Google'da aramak</strong>. "Kırıkkale yazılım", "Kırıkkale reklam ajansı" veya "Kırıkkale web sitesi" gibi aramalarda işletmeniz çıkmıyorsa, potansiyel müşterilerinizi <em>rakiplerinize</em> kaptırıyorsunuz demektir.
                    </p>
                    <p>
                        ZMK Agency olarak, Kırıkkale merkezli 360° dijital ajans kimliğimizle — <strong>yazılımdan reklama, SEO'dan prodüksiyona</strong> — işletmenizin dijital kaderini değiştiriyoruz. Bu kapsamlı rehberde, Kırıkkale'de sunduğumuz tüm dijital çözümleri, fiyatları ve stratejileri bulacaksınız.
                    </p>
                </section>

                {/* ─── SECTION 2: SERVICES GRID (Internal Links) ─── */}
                <section className="pillar-section">
                    <h2>Kırıkkale'de Sunduğumuz Dijital Hizmetler</h2>
                    <p>İşletmenizin ihtiyacına en uygun hizmeti seçin. Her biri Kırıkkale pazarına özel optimize edilmiştir.</p>
                    <div className="pillar-services-grid">
                        {serviceLinks.map((svc, index) => (
                            <Link to={svc.slug} key={index} className="pillar-service-card">
                                <h3>{svc.title}</h3>
                                <p>{svc.desc}</p>
                                <div className="pillar-card-price">{svc.price}</div>
                                <span className="pillar-card-arrow">Detaylı bilgi →</span>
                            </Link>
                        ))}
                    </div>
                    <p style={{ textAlign: 'center', marginTop: '24px' }}>
                        <Link to="/services" className="pillar-inline-link">Tüm hizmetleri görüntüle →</Link>
                    </p>
                </section>

                {/* ─── SECTION 3: YAZILIM ─── */}
                <section className="pillar-section">
                    <h2>Kırıkkale'de Yazılım Hizmetleri</h2>
                    <p>
                        Kırıkkale'de yazılım ihtiyaçlarınız için doğru adres ZMK Agency. Hazır şablonlar yerine, işletmenize özel React, Next.js ve Node.js tabanlı modern yazılım çözümleri geliştiriyoruz.
                    </p>
                    <h3>Web Sitesi Geliştirme</h3>
                    <p>
                        Kurumsal web sitesi, e-ticaret platformu veya özel web uygulaması — hangi ihtiyacınız olursa olsun, SEO uyumlu, mobil öncelikli ve ışık hızında yüklenen siteler oluşturuyoruz. WordPress'in yavaşlığından ve güvenlik açıklarından kurtulun, modern teknolojilerle fark yaratın.
                    </p>
                    <ul className="pillar-feature-list">
                        <li>🚀 1 saniyenin altında yükleme hızı</li>
                        <li>📱 %100 mobil uyumlu (responsive) tasarım</li>
                        <li>🔒 SSL sertifikası ve hosting dahil</li>
                        <li>📊 Google Analytics ve Search Console entegrasyonu</li>
                        <li>🎯 CMS (içerik yönetim sistemi) ile kolay güncelleme</li>
                    </ul>
                    <p>
                        Detaylı bilgi için: <Link to="/services/kurumsal-web-sitesi" className="pillar-inline-link">Kurumsal Web Sitesi</Link> | <Link to="/services/e-ticaret" className="pillar-inline-link">E-Ticaret Çözümleri</Link> | <Link to="/services/ozel-yazilim" className="pillar-inline-link">Özel Yazılım / App</Link>
                    </p>

                    <h3>Mobil Uygulama Geliştirme</h3>
                    <p>
                        React Native ve Flutter ile iOS ve Android'e aynı anda uygulama çıkarıyoruz. CRM, sipariş takip, stok yönetimi veya müşteri sadakat uygulamaları — Kırıkkale'deki işletmeniz için terzi işi çözümler.
                    </p>
                </section>

                {/* ─── SECTION 4: REKLAM ─── */}
                <section className="pillar-section">
                    <h2>Kırıkkale'de Reklam ve Dijital Pazarlama</h2>
                    <p>
                        Geleneksel tabela ve broşür reklamcılığı artık tek başına yeterli değil. <strong>Kırıkkale'de reklam</strong> demek, artık Google Ads, sosyal medya kampanyaları ve SEO anlamına geliyor.
                    </p>

                    <h3>Google Ads (SEM)</h3>
                    <p>
                        Potansiyel müşterileriniz "Kırıkkale + hizmetiniz" araması yaptığında en tepede çıkın. Dönüşüm izleme, negatif kelime optimizasyonu ve A/B testleriyle bütçenizi maksimum verimle kullanıyoruz.
                    </p>

                    <h3>Sosyal Medya Yönetimi & Reklamları</h3>
                    <p>
                        Instagram, Facebook, TikTok ve LinkedIn'de markanızın sesini profesyonelce yönetiyoruz. İçerik üretimi, topluluk yönetimi ve hedefli reklamlarla Kırıkkale'deki potansiyel müşterilerinize ulaşıyoruz.
                    </p>
                    <p>
                        Detaylı bilgi: <Link to="/services/google-ads" className="pillar-inline-link">Google Ads Yönetimi</Link> | <Link to="/services/sosyal-medya" className="pillar-inline-link">Sosyal Medya Reklamları</Link> | <Link to="/kirikkale-dijital-pazarlama-ajansi" className="pillar-inline-link">Kırıkkale Dijital Pazarlama</Link>
                    </p>
                </section>

                {/* ─── SECTION 5: SEO ─── */}
                <section className="pillar-section">
                    <h2>Kırıkkale SEO: Google'da 1. Sayfaya Çıkın</h2>
                    <p>
                        Reklam bütçesi harcamadan, organik aramalardan kalıcı müşteri kazanın. <strong>Kırıkkale SEO</strong> hizmetimizle Google Haritalar'da ve organik aramalarda üst sıralara çıkmanızı sağlıyoruz.
                    </p>
                    <div className="pillar-two-col">
                        <div className="pillar-col-card">
                            <h4>🗺️ Lokal SEO</h4>
                            <p>Google My Business optimizasyonu, yerel backlink çalışması, yorum yönetimi. Kırıkkale'deki müşteriler sizi haritada ilk görür.</p>
                            <Link to="/services/lokal-seo" className="pillar-inline-link">8.000₺/ay →</Link>
                        </div>
                        <div className="pillar-col-card">
                            <h4>🌍 Ulusal SEO</h4>
                            <p>Teknik audit, içerik stratejisi, otoriter backlink inşası. Türkiye genelinde organik trafiğinizi katlayın.</p>
                            <Link to="/services/ulusal-seo" className="pillar-inline-link">19.000₺/ay →</Link>
                        </div>
                    </div>
                    <p>
                        Daha fazla: <Link to="/kirikkale-seo" className="pillar-inline-link">Kırıkkale SEO Hizmetleri</Link> | <Link to="/kirikkale-seo-danismanligi" className="pillar-inline-link">SEO Danışmanlığı</Link>
                    </p>
                </section>

                {/* ─── SECTION 6: PRODUCTION ─── */}
                <section className="pillar-section">
                    <h2>Prodüksiyon & Kurumsal Kimlik</h2>
                    <p>
                        4K tanıtım filmleri, drone çekimleri, ürün fotoğrafçılığı ve komple kurumsal kimlik tasarımı. Kırıkkale'deki işletmenizin profesyonel imajını inşa ediyoruz.
                    </p>
                    <p>
                        <Link to="/services/tanitim-filmi" className="pillar-inline-link">Tanıtım Filmi (3.500₺)</Link> | <Link to="/services/kurumsal-kimlik" className="pillar-inline-link">Kurumsal Kimlik (22.500₺)</Link> | <Link to="/kirikkale-drone-cekim-tanitim-filmi" className="pillar-inline-link">Drone Çekimi</Link>
                    </p>
                </section>

                {/* ─── SECTION 7: WHY ZMK ─── */}
                <section className="pillar-section pillar-highlight">
                    <h2>Neden ZMK Agency?</h2>
                    <div className="pillar-why-grid">
                        <div className="pillar-why-item">
                            <span className="pillar-why-icon">📍</span>
                            <h4>Kırıkkale Merkezli</h4>
                            <p>Yüz yüze görüşme imkanı, yerel pazarı tanıma</p>
                        </div>
                        <div className="pillar-why-item">
                            <span className="pillar-why-icon">🎯</span>
                            <h4>Veri Odaklı</h4>
                            <p>Her kampanyada ölçülebilir ROI ve şeffaf raporlama</p>
                        </div>
                        <div className="pillar-why-item">
                            <span className="pillar-why-icon">🤖</span>
                            <h4>AI Destekli</h4>
                            <p>Yapay zekâ araçlarıyla optimize edilmiş stratejiler</p>
                        </div>
                        <div className="pillar-why-item">
                            <span className="pillar-why-icon">🔄</span>
                            <h4>360° Hizmet</h4>
                            <p>Tek muhatap, dağınık ajans yok, tüm süreçler entegre</p>
                        </div>
                    </div>
                </section>

                {/* ─── SECTION 8: LOCAL LINKS ─── */}
                <section className="pillar-section">
                    <h2>Kırıkkale Dijital Hizmet Sayfalarımız</h2>
                    <p>Her hizmetimiz için Kırıkkale'ye özel optimize edilmiş detaylı sayfalarımızı keşfedin:</p>
                    <div className="pillar-local-grid">
                        {localLinks.map((link, index) => (
                            <Link to={link.slug} key={index} className="pillar-local-card">
                                {link.title}
                            </Link>
                        ))}
                    </div>
                </section>

                {/* ─── SECTION 9: FAQ ─── */}
                <section className="pillar-section">
                    <h2>Sık Sorulan Sorular</h2>
                    <div className="pillar-faq-list">
                        {pillarFaq.map((item, index) => (
                            <div key={index} className="pillar-faq-item" onClick={() => setOpenFaq(openFaq === index ? null : index)}>
                                <div className="pillar-faq-q">
                                    <span>{item.q}</span>
                                    <span className="pillar-faq-toggle">{openFaq === index ? '−' : '+'}</span>
                                </div>
                                {openFaq === index && (
                                    <motion.p
                                        className="pillar-faq-a"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                    >
                                        {item.a}
                                    </motion.p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>

                {/* ─── SECTION 10: CTA ─── */}
                <section className="pillar-section pillar-cta-section">
                    <h2>Kırıkkale'de Dijital Büyümenin Zamanı Geldi</h2>
                    <p>İşletmenize özel ücretsiz strateji görüşmesi için hemen bize ulaşın. İlk adımı atın, gerisini biz halledelim.</p>
                    <div className="pillar-cta-buttons">
                        <Link to="/contact" className="pillar-btn pillar-btn-primary">Ücretsiz Teklif Al</Link>
                        <a href="https://wa.me/905413812114" target="_blank" rel="noopener noreferrer" className="pillar-btn pillar-btn-secondary">
                            💬 WhatsApp'tan Yaz
                        </a>
                        <Link to="/pricing" className="pillar-btn pillar-btn-outline">Fiyatları Görüntüle</Link>
                    </div>
                </section>
            </div>

            {/* ─── CONTACT ─── */}
            {t && t.contact && (
                <section style={{ paddingBottom: '80px' }}>
                    <Contact t={t.contact} />
                </section>
            )}
        </motion.div>
    );
};

export default PillarPage;
