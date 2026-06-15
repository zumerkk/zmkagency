import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import Contact from '../../components/Contact';
import '../../styles/ServicesPage.css';

/* ─── ALL SERVICE DETAIL DATA ─── */
const serviceDetails = {
    'kurumsal-web-sitesi': {
        title: 'Kurumsal Web Sitesi',
        value: 'SEO uyumlu, mobil öncelikli, ışık hızında yüklenen modern web siteleri ile markanızın dijital vitrinini oluşturuyoruz.',
        audience: ['KOBİ\'ler ve orta ölçekli işletmeler', 'Kurumsal imajını güçlendirmek isteyen firmalar', 'Dijitalde profesyonel görünüm arayan markalar'],
        includes: ['Özel UX/UI Tasarım', 'CMS (İçerik Yönetimi Sistemi)', 'SEO Uyumlu Altyapı', 'Hızlı Yükleme (<1sn)', 'Çoklu Dil Desteği', 'Responsive (Mobil Uyumlu) Tasarım', 'Hosting & Domain Yönetimi', 'SSL Sertifikası'],
        delivery: '2-4 Hafta (kapsamlı projelerde 4-6 hafta)',
        faq: [
            { q: 'Hangi teknolojileri kullanıyorsunuz?', a: 'React, Next.js ve Vercel altyapısıyla en hızlı ve güvenli çözümleri sunuyoruz.' },
            { q: 'İçeriklerimi kendim güncelleyebilir miyim?', a: 'Evet, kullanımı kolay CMS paneli ile içeriklerinizi kolayca güncelleyebilirsiniz.' },
            { q: 'Bakım ve destek dahil mi?', a: 'İlk 3 ay teknik destek ve güncelleme dahildir. Sonrası için uygun bakım paketlerimiz mevcuttur.' }
        ],
        price: '20.000₺ – 25.000₺'
    },
    'e-ticaret-cozumleri': {
        title: 'E-Ticaret Çözümleri',
        value: 'Yüksek dönüşüm oranlı, satış odaklı online mağazalar kuruyoruz. Stok yönetiminden kargo entegrasyonuna kadar uçtan uca cepheyi biz yönetiyoruz.',
        audience: ['Ürün satan her ölçekteki işletme', 'Mağazasını dijitale taşımak isteyen fiziksel dükkanlar', 'Pazaryerlerinde (Trendyol, Amazon) açılmak isteyen markalar'],
        includes: ['Gelişmiş Stok & Sipariş Yönetimi', 'Ödeme Sistemleri Entegrasyonu (iyzico, PayTR)', 'Pazaryeri Entegrasyonları (Trendyol, N11)', 'Kampanya & Kupon Modülleri', 'Kullanıcı Paneli', 'Kargo Entegrasyonu', 'Ürün Filtreleme & Arama'],
        delivery: '4-8 Hafta',
        faq: [
            { q: 'Hangi e-ticaret altyapılarını kullanıyorsunuz?', a: 'Shopify, İkas ve custom headless çözümler sunuyoruz. İhtiyacınıza göre en uygununu belirleriz.' },
            { q: 'Pazaryeri entegrasyonu dahil mi?', a: 'Evet, Trendyol, N11 ve diğer pazaryeri entegrasyonları proje kapsamına dahildir.' }
        ],
        price: '60.000₺ – 120.000₺'
    },
    'ozel-yazilim-app': {
        title: 'Özel Yazılım / App',
        value: 'İş süreçlerinize özel iOS, Android ve web uygulamaları geliştiriyoruz. CRM, ERP ve SaaS çözümlerimizle dijital dönüşümünüzü tamamlayın.',
        audience: ['Kendi uygulamasını çıkarmak isteyen girişimciler', 'İş süreçlerini otomatize eden kurumsal firmalar', 'SaaS ürünü geliştirmek isteyen startup\'lar'],
        includes: ['iOS & Android Uygulama (React Native)', 'SaaS Geliştirme', 'CRM / ERP Entegrasyonları', 'Mikroservis Mimarisi', 'Bulut Altyapısı (AWS/GCP)', 'API Geliştirme', 'Kullanıcı Yönetimi & Auth'],
        delivery: '4-12 Hafta (proje kapsamına göre)',
        faq: [
            { q: 'Hem iOS hem Android\'e çıkabilir mi?', a: 'Evet, React Native ile tek kod tabanından her iki platformda da yayınlanır.' },
            { q: 'Kaynak kodları bize mi ait?', a: 'Evet, proje tamamlandığında tüm kaynak kodları size teslim edilir.' }
        ],
        price: '40.000₺+'
    },
    'lokal-seo': {
        title: 'Lokal SEO Paketi',
        value: 'Google Haritalar\'da ve yerel aramalarda ilk sırada çıkın. Bölgenizdeki potansiyel müşteriler sizi bulsun.',
        audience: ['Belirli bir bölgede hizmet veren işletmeler', 'Restoran, klinik, berber gibi yerel dükkanlar', 'Kırıkkale ve çevre illerde görünürlük isteyen firmalar'],
        includes: ['Google My Business Optimizasyonu', 'Yerel Backlink Çalışması', 'Yorum & İtibar Yönetimi', 'Haftalık GMB Postları', 'Yerel anahtar kelime analizi', 'Rakip izleme raporu'],
        delivery: 'Aylık sürekli hizmet (ilk sonuçlar 1-3 ay)',
        faq: [
            { q: 'Ne kadar sürede sonuç alırım?', a: 'Google Haritalar\'da 4-8 hafta içinde görünür iyileşme beklenir. SEO organik sonuçlar için 2-4 ay.' },
            { q: 'Sadece Kırıkkale için mi?', a: 'Hayır, Türkiye\'nin her ili ve ilçesi için lokal SEO çalışması yapıyoruz.' }
        ],
        price: '8.000₺ – 16.000₺/ay'
    },
    'ulusal-global-seo': {
        title: 'Ulusal / Global SEO',
        value: 'Büyük ölçekli rekabette organik trafiğinizi katlayın. Teknik audit, içerik stratejisi ve otoriter backlink inşasıyla sektörünüzde otorite olun.',
        audience: ['Türkiye genelinde rekabet eden markalar', 'E-ticaret siteleri', 'Uluslararası pazara açılmak isteyen firmalar'],
        includes: ['Kapsamlı Teknik SEO Audit', 'İçerik Stratejisi & Blog Planı', 'Otoriter Backlink İnşası', 'Rakip Gap Analizi', 'Core Web Vitals İyileştirmesi', 'Sayfa Hızı Optimizasyonu', 'Schema Markup'],
        delivery: 'Aylık sürekli hizmet (ilk sonuçlar 3-6 ay)',
        faq: [
            { q: 'Garanti veriyor musunuz?', a: 'SEO\'da Google algoritması değişkendir, kesin sıra garantisi veremeyiz. Ancak veriye dayalı stratejilerle en yüksek etkiyi sağlıyoruz.' },
            { q: 'İçerik üretimi dahil mi?', a: 'Evet, aylık SEO odaklı blog yazıları ve sayfa optimizasyonları paket kapsamındadır.' }
        ],
        price: '20.000₺/ay+'
    },
    'tanitim-filmi': {
        title: 'Tanıtım Filmi',
        value: 'Markanızı sinematik bir dille anlatın. 4K çekim, drone görüntüleri ve profesyonel post-prodüksiyon ile unutulmaz tanıtım filmleri.',
        audience: ['Kurumsal tanıtım ihtiyacı olan firmalar', 'E-ticaret ve sosyal medya için video içerik arayan markalar', 'Fuar, etkinlik ve lansman filmi isteyen şirketler'],
        includes: ['Senaryo & Storyboard', 'Profesyonel Seslendirme', 'Drone Çekimleri (4K)', 'Renk & Ses Miksajı', 'Sosyal Medya Teaserları', 'Müzik Lisansı'],
        delivery: '1-3 Hafta (konsepte göre)',
        faq: [
            { q: 'Drone çekimi dahil mi?', a: 'Evet, paketin içinde drone çekimi ve hava görüntüleri dahildir.' },
            { q: 'Kaç revizyon hakkımız var?', a: '2 revizyon turunu ücretsiz sunuyoruz. Ek revizyonlar için ayrı fiyatlandırma yapılır.' }
        ],
        price: '20.000₺ – 60.000₺'
    },
    'urun-fotografciligi': {
        title: 'Ürün Fotoğrafçılığı',
        value: 'E-ticaret ve katalog için profesyonel, satış artıran ürün kareleri. Stüdyo ve dış mekan çekim imkanı.',
        audience: ['E-ticaret siteleri ve pazaryeri satıcıları', 'Katalog ve broşür tasaratacak firmalar', 'Sosyal medya için profesyonel görsel arayan markalar'],
        includes: ['Konsept Geliştirme', 'Dekupaj & Retouch', 'Model & Mekan Kullanımı', 'Yüksek Çözünürlüklü Teslim', 'Beyaz zemin & lifestyle çekim seçenekleri'],
        delivery: '3-7 Gün',
        faq: [
            { q: 'Kaç ürün çekimi dahil?', a: 'Paket detayı görüşmede belirlenir. Ürün bazlı ve paket fiyatlandırma seçenekleri mevcuttur.' },
            { q: 'Stüdyoda mı yoksa dış mekanda mı çekiyorsunuz?', a: 'Her iki seçenek de mümkündür. İhtiyacınıza göre mekan belirleriz.' }
        ],
        price: '5.000₺ – 15.000₺'
    },
    'reklam-yonetimi-google': {
        title: 'Google Ads (SEM) Yönetimi',
        value: 'Google\'da arama sonuçlarının en tepesinde yer alın. Dönüşüm odaklı, bütçenizi maksimum verimle kullanan reklam kampanyaları.',
        audience: ['Hızlı müşteri kazanmak isteyen işletmeler', 'E-ticaret siteleri (Shopping Ads)', 'B2B hizmet sağlayıcılar'],
        includes: ['Anahtar Kelime Analizi', 'Rakip Analizi', 'Dönüşüm Kurulumu', 'Negatif Kelime Optimizasyonu', 'A/B Testleri', 'Aylık Performans Raporu'],
        delivery: 'Aylık sürekli yönetim',
        faq: [
            { q: 'Reklam bütçesi dahil mi?', a: 'Hayır, 8.000₺ - 11.000₺ yönetim ücretine ek olarak Google\'a ödenecek reklam bütçesi ayrıdır.' },
            { q: 'Minimum reklam bütçesi ne kadar olmalı?', a: 'Sektöre göre değişir, ancak etkili sonuçlar için aylık minimum 5.000-10.000₺ arası öneriyoruz.' }
        ],
        price: '8.000₺ – 11.000₺/ay'
    },
    'reklam-yonetimi-sosyal': {
        title: 'Sosyal Medya Reklamları',
        value: 'Facebook, Instagram, TikTok ve LinkedIn\'de hedef kitlenize nokta atışı ulaşın. Retargeting ve ROAS odaklı kampanyalar.',
        audience: ['Marka bilinirliği artırmak isteyen işletmeler', 'Uygulama indirme kampanyası yapan markalar', 'Lead generation arayan B2B şirketler'],
        includes: ['Hedef Kitle Segmentasyonu', 'Retargeting Kurguları', 'Kreatif Tasarım Desteği', 'Pixel & CAPI Kurulumu', 'ROAS Odaklı Yönetim', 'Aylık Video Rapor'],
        delivery: 'Aylık sürekli yönetim',
        faq: [
            { q: 'Kreatif görselleri siz mi hazırlıyorsunuz?', a: 'Evet, reklam tasarımları ve video kreatifler paket kapsamındadır.' },
            { q: 'Hangi platformlarda yönetim yapıyorsunuz?', a: 'Meta (Facebook/Instagram), TikTok, LinkedIn ve Pinterest reklam yönetimi yapıyoruz.' }
        ],
        price: '7.000₺ – 9.000₺/ay'
    },
    '360-retainer-startup-growth': {
        title: '360° Startup Growth',
        value: 'Girişimler ve küçük işletmeler için temel dijital varlık ve büyüme paketi. Sosyal medya, SEO ve raporlama tek elde.',
        audience: ['Yeni kurulan işletmeler', 'Dijital varlığını sıfırdan kurmak isteyen markalar', 'Sınırlı bütçeyle maksimum etki arayan firmalar'],
        includes: ['Sosyal Medya Yönetimi (2 Platform)', 'Haftalık 3 Post + 1 Reel', 'Temel SEO Optimizasyonu', 'Aylık Performans Raporu', 'E-posta Desteği'],
        delivery: 'Aylık retainer anlaşma (minimum 3 ay)',
        faq: [
            { q: 'Minimum kaç ay anlaşma gerekli?', a: 'Dijital pazarlamada sonuçlar zamana yayıldığından minimum 3 aylık anlaşma öneriyoruz.' },
            { q: 'Hangi sosyal medya platformlarını yönetiyorsunuz?', a: 'Instagram ve Facebook varsayılan olarak dahildir. Ek platform talepleri ayrıca değerlendirilir.' }
        ],
        price: '15.000₺ – 20.000₺/ay'
    },
    '360-retainer-market-domination': {
        title: '360° Market Domination',
        value: 'Sektör liderliği hedefleyen markalar için tam kapsamlı dijital departman. Growth hacking, viralgörüntüleme ve 7/24 VIP destek.',
        audience: ['Hızla büyüyen ve pazar liderliği hedefleyen şirketler', 'Ulusal/uluslararası ölçekte rekabet eden markalar', 'Tam kapsamlı dijital ajansa ihtiyaç duyan kurumlar'],
        includes: ['Tüm Dijital Platformlar', 'Günlük İçerik & Viral Prodüksiyon', 'Ulusal SEO & PR Çalışmaları', 'Growth Hacking Stratejileri', 'Kriz Yönetimi & İtibar Koruma', '7/24 VIP Destek Hattı', 'Haftalık Strateji Toplantıları'],
        delivery: 'Aylık retainer anlaşma',
        faq: [
            { q: 'Dedike bir ekip atanıyor mu?', a: 'Evet, markanıza özel account manager, stratejist ve içerik ekibi atanır.' },
            { q: 'Kriz yönetimi ne demek?', a: 'Olumsuz bir durum anında hızlı aksiyon alarak markanızın itibarını koruyoruz. 7/24 müdahale kapasitesi mevcuttur.' }
        ],
        price: '35.000₺ – 45.000₺/ay'
    },
    'marka-kurumsal': {
        title: 'Marka & Kurumsal Kimlik',
        value: 'Logodan marka kitabına, kartviziyetten sosyal medya kitine kadar markanızın profesyonel yüzünü tasarlıyoruz.',
        audience: ['Yeni kurulan işletmeler', 'Rebranding planlayan firmalar', 'Profesyonel kurumsal imaj arayan her ölçekteki marka'],
        includes: ['Logo Tasarımı', 'Renk Paleti & Tipografi', 'Kartvizit & Antetli Kağıt', 'Brand Book (Kullanım Kılavuzu)', 'Sosyal Medya Kit', 'Kurumsal Sunum Şablonu'],
        delivery: '2-4 Hafta',
        faq: [
            { q: 'Kaç logo alternatifi sunuyorsunuz?', a: '3 farklı konsept sunuyoruz. Seçilen konsept üzerinde 3 revizyon hakkınız vardır.' },
            { q: 'Brand Book nedir?', a: 'Logonuzun, renklerinizin ve tipografinizin nasıl kullanılacağını anlatan kurumsal kimlik kılavuzudur.' }
        ],
        price: '18.000₺ – 40.000₺',
        bundlePrice: '12.000₺',
        bundleNote: '360° paket veya yazılım projesiyle birlikte alındığında başlangıç marka seti'
    }
};

const firstPriceValue = (price = '') => {
    const match = price.match(/[\d.]+/);
    return match ? match[0].replace(/\./g, '') : undefined;
};

// Eski / alternatif slug'ları kanonik hizmet slug'ına yönlendirir.
// Footer, PillarPage, SolutionSelector ve indekslenmiş eski URL'ler bu sayede çalışır.
const slugAliases = {
    'e-ticaret': 'e-ticaret-cozumleri',
    'google-ads': 'reklam-yonetimi-google',
    'sosyal-medya': 'reklam-yonetimi-sosyal',
    'kurumsal-kimlik': 'marka-kurumsal',
    'ozel-yazilim': 'ozel-yazilim-app',
    'software': 'ozel-yazilim-app',
    'ulusal-seo': 'ulusal-global-seo',
};

const NewServiceDetail = ({ tContact }) => {
    const { slug: rawSlug } = useParams();
    const slug = slugAliases[rawSlug] || rawSlug;
    const service = serviceDetails[slug];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!service) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff', flexDirection: 'column', gap: '20px' }}>
                <h1 style={{ fontSize: '2rem' }}>Hizmet Bulunamadı</h1>
                <Link to="/services" style={{ color: 'var(--text-accent, #0066ff)' }}>← Hizmetlere Dön</Link>
            </div>
        );
    }

    // Build Service Schema
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.title,
        "description": service.value,
        "provider": {
            "@type": "Organization",
            "name": "ZMK Agency",
            "url": "https://zmkagency.com"
        },
        "areaServed": {
            "@type": "City",
            "name": "Kırıkkale"
        },
        "offers": {
            "@type": "Offer",
            "price": firstPriceValue(service.price),
            "priceCurrency": "TRY",
            "url": `https://zmkagency.com/services/${slug}`
        }
    };

    // Build FAQPage Schema
    const faqSchema = service.faq && service.faq.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": service.faq.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    } : null;

    // BreadcrumbList Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Ana Sayfa", "item": "https://zmkagency.com" },
            { "@type": "ListItem", "position": 2, "name": "Hizmetler", "item": "https://zmkagency.com/services" },
            { "@type": "ListItem", "position": 3, "name": service.title, "item": `https://zmkagency.com/services/${slug}` }
        ]
    };

    const schemas = [serviceSchema, breadcrumbSchema];
    if (faqSchema) schemas.push(faqSchema);

    return (
        <>
            <SEO
                title={`${service.title} | Kırıkkale ${service.title.includes('SEO') ? 'SEO Hizmeti' : 'Dijital Hizmet'}`}
                description={service.value.substring(0, 155)}
                keywords={`kırıkkale ${service.title.toLowerCase()}, ${service.title.toLowerCase()} fiyatları, zmk agency ${service.title.toLowerCase()}`}
                canonical={`https://zmkagency.com/services/${slug}`}
                schema={schemas}
            />
            <div className="services-page-wrapper">
                {/* ─── HERO ─── */}
                <section className="sp-hero" style={{ paddingBottom: '60px' }}>
                    <div className="container">
                        <Link to="/services" className="sp-back-link">
                            ← Tüm Hizmetler
                        </Link>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {service.title}
                        </motion.h1>
                        <motion.p
                            className="sp-hero-sub"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {service.value}
                        </motion.p>
                        {/* Price */}
                        <motion.div
                            style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginTop: '24px' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {service.bundlePrice ? (
                                <>
                                    <div style={{
                                        background: 'rgba(16,185,129,0.1)',
                                        border: '1px solid rgba(16,185,129,0.3)',
                                        borderRadius: '14px',
                                        padding: '12px 24px',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: '600', marginBottom: '4px' }}>Paketle Birlikte</div>
                                        <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#10b981' }}>{service.bundlePrice}</div>
                                    </div>
                                    <div style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '14px',
                                        padding: '12px 24px',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{ fontSize: '0.75rem', color: '#888', fontWeight: '600', marginBottom: '4px' }}>Tek Başına</div>
                                        <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff' }}>{service.price}</div>
                                    </div>
                                </>
                            ) : (
                                <div style={{
                                    fontSize: '2rem',
                                    fontWeight: '800',
                                    color: 'var(--text-accent, #0066ff)'
                                }}>
                                    {service.price}
                                </div>
                            )}
                        </motion.div>
                        {service.bundleNote && (
                            <p style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '8px', fontStyle: 'italic' }}>
                                * {service.bundleNote}
                            </p>
                        )}
                    </div>
                </section>

                <div className="container" style={{ padding: '0 20px 80px' }}>
                    {/* ─── AUDIENCE ─── */}
                    <motion.div
                        className="sp-detail-block"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Kimler İçin Uygun?</h2>
                        <ul className="sp-detail-list">
                            {service.audience.map((item, i) => (
                                <li key={i}><span className="sp-check">👤</span> {item}</li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* ─── INCLUDES ─── */}
                    <motion.div
                        className="sp-detail-block"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Neler Dahil?</h2>
                        <div className="sp-includes-grid">
                            {service.includes.map((item, i) => (
                                <div key={i} className="sp-include-item">
                                    <span className="sp-check">✓</span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ─── DELIVERY ─── */}
                    <motion.div
                        className="sp-detail-block"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Teslim Süresi / Süreç</h2>
                        <div style={{
                            background: 'rgba(255,255,255,0.03)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '16px',
                            padding: '24px 32px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px'
                        }}>
                            <span style={{ fontSize: '2rem' }}>⏱️</span>
                            <div>
                                <div style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff' }}>{service.delivery}</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ─── EXAMPLE OUTPUTS PLACEHOLDER ─── */}
                    <motion.div
                        className="sp-detail-block"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2>Örnek Çıktılar</h2>
                        <div style={{
                            background: 'rgba(255,255,255,0.02)',
                            border: '1px dashed rgba(255,255,255,0.1)',
                            borderRadius: '16px',
                            padding: '48px 32px',
                            textAlign: 'center',
                            color: '#555'
                        }}>
                            <span style={{ fontSize: '2rem', display: 'block', marginBottom: '12px' }}>📋</span>
                            Örnek çalışmalar yakında eklenecektir. Referanslarımız için <Link to="/contact" style={{ color: 'var(--text-accent, #0066ff)' }}>iletişime geçin</Link>.
                        </div>
                    </motion.div>

                    {/* ─── FAQ ─── */}
                    {service.faq && service.faq.length > 0 && (
                        <motion.div
                            className="sp-detail-block"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2>Sık Sorulan Sorular</h2>
                            <div className="sp-faq-list">
                                {service.faq.map((item, i) => (
                                    <details key={i} className="sp-detail-faq">
                                        <summary>{item.q}</summary>
                                        <p>{item.a}</p>
                                    </details>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* ─── CTA ─── */}
                    <motion.div
                        style={{ textAlign: 'center', padding: '60px 0' }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '800', marginBottom: '12px' }}>Bu Hizmete İlgi Duyuyor musunuz?</h2>
                        <p style={{ color: '#888', marginBottom: '24px' }}>Size özel bir teklif hazırlayalım.</p>
                        <div className="sp-hero-ctas">
                            <Link to="/contact" className="sp-btn sp-btn-primary">Teklif Al</Link>
                            <a href="https://wa.me/905456789012" target="_blank" rel="noopener noreferrer" className="sp-btn sp-btn-secondary">
                                💬 WhatsApp'tan Yaz
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* ─── CONTACT ─── */}
                <section style={{ paddingBottom: '80px' }}>
                    <Contact t={tContact} />
                </section>
            </div>
        </>
    );
};

export default NewServiceDetail;
