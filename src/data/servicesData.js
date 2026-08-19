/**
 * The six service categories shown on /hizmetler.
 *
 * Extracted verbatim from ServicesPage.jsx so the page component holds layout
 * only. Two changes were made during extraction:
 *  - `accentColor` / `accentGlow` / `icon` / `offset` were removed. Each entry
 *    carried its own hardcoded hex (amber, violet, emerald…), which is the
 *    per-item colour scatter the V2 system exists to eliminate.
 *  - `pillar` was added, mapping each service to a discipline in
 *    capabilities.js. Colour now comes from the pillar, not from the item.
 *
 * All service names, descriptions, sub-services, tooling and platform lists
 * are unchanged.
 */

export const services = [
    {
        id: '360-marka-yonetimi',
        pillar: 'brand',
        title: '360° Marka Yönetimi',
        headline: 'Markanız.\nBir başyapıt olarak.',
        tagline: 'Sıfırdan inşa. Stratejik konumlandırma. Sektörde fark.',
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
        pillar: 'growth',
        title: 'Sosyal Medya Yönetimi',
        headline: 'Sosyal medyada\nvar olmak yetmez.',
        tagline: 'Büyümek, etkileşmek ve dönüştürmek gerek.',
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
        pillar: 'growth',
        title: 'Reklam Yönetimi',
        headline: 'Reklam değil,\nsonuç yönetimi.',
        tagline: 'Her kuruş ölçülür. Her tıklama izlenir. Her dönüşüm sayılır.',
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
        pillar: 'software',
        title: 'Web & Mobil Uygulama',
        headline: 'Kod yazılmaz.\nDeneyim tasarlanır.',
        tagline: 'Işık hızında. Mobil öncelikli. Dönüşüm odaklı.',
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
        pillar: 'software',
        title: 'Özel Yazılım Geliştirme',
        headline: 'Yazılım,\ngörünmez güçtür.',
        tagline: 'İş süreçlerinize özel. Ölçeklenebilir. Güvenli.',
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
        pillar: 'studio',
        title: 'Klip & Reklam Filmi',
        headline: 'Görüntü,\nbir his bırakır.',
        tagline: 'Sinematik kalite. Profesyonel ekip. Yaratıcı vizyon.',
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

export default services;
