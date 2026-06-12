import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import '../styles/Portfolio.css';

// Partner portfolio items with rich descriptions
const partnerWorks = [
    {
        id: 'atlas-derslik',
        title: 'Atlas Derslik',
        category: 'Web & Growth',
        monogram: 'AD',
        description: 'Eğitim sektöründe dijital dönüşüm: Online ders platformu, öğrenci takip sistemi ve SEO çalışması.',
        tags: ['Web Sitesi', 'SEO', 'Panel'],
        color: '#6366f1'
    },
    {
        id: 'ilan-port',
        title: 'İlanPort',
        category: 'Yazılım & UX',
        monogram: 'IP',
        description: 'Emlak ilan platformu: Harita entegrasyonu, gelişmiş filtreleme ve modern UI/UX tasarım.',
        tags: ['Platform', 'UX/UI', 'Maps'],
        color: '#00d4ff'
    },
    {
        id: 'tencere-app',
        title: 'TencereApp',
        category: 'Yazılım & UX',
        monogram: 'TA',
        description: 'Yemek tarifi ve sipariş uygulaması: Restoran entegrasyonu, kullanıcı paneli, push bildirimler.',
        tags: ['Mobil App', 'API', 'UI'],
        color: '#f59e0b'
    },
    {
        id: 'hira-butik',
        title: 'Hira Butik',
        category: 'Marka Kimliği',
        monogram: 'HB',
        description: 'Butik moda markası: Logo tasarımı, e-ticaret web sitesi ve Instagram yönetimi.',
        tags: ['Branding', 'E-Ticaret', 'Sosyal'],
        color: '#8b5cf6'
    },
    {
        id: 'olimpiyat-spor',
        title: 'Olimpiyat Spor Kulübü',
        category: 'Web & Growth',
        monogram: 'OS',
        description: 'Spor kulübü dijitalleşme: Üye kayıt sistemi, etkinlik takvimi ve Google Ads kampanyaları.',
        tags: ['Web Sitesi', 'Google Ads', 'CRM'],
        color: '#22c55e'
    },
    {
        id: 'pedalset',
        title: 'Pedalset',
        category: 'Marka Kimliği',
        monogram: 'PS',
        description: 'Bisiklet ekipman markası: Kurumsal kimlik, ürün fotoğrafçılığı ve sosyal medya stratejisi.',
        tags: ['Branding', 'Prodüksiyon', 'Sosyal'],
        color: '#14b8a6'
    },
    {
        id: 'mert-nakliyat',
        title: 'Mert Nakliyat',
        category: 'Web & Growth',
        monogram: 'MN',
        description: 'Nakliyat firması: SEO odaklı web sitesi, Google Harita optimizasyonu ve teklif formu entegrasyonu.',
        tags: ['Web Sitesi', 'SEO', 'Maps'],
        color: '#f97316'
    },
    {
        id: 'kafkas-cigkofte',
        title: 'Kafkas Çiğköfte',
        category: 'Marka Kimliği',
        monogram: 'KÇ',
        description: 'Franchise restoran zinciri: Menü tasarımı, QR sipariş sistemi ve TikTok içerik üretimi.',
        tags: ['Branding', 'QR Menü', 'TikTok'],
        color: '#ef4444'
    },
    {
        id: 'tunc-kuruyemis',
        title: 'Tunç Kuruyemiş',
        category: 'Web & Growth',
        monogram: 'TK',
        description: 'Yerel gıda markası: E-ticaret sitesi, ürün çekimi ve Meta reklam yönetimi.',
        tags: ['E-Ticaret', 'Prodüksiyon', 'Meta Ads'],
        color: '#a855f7'
    }
];

const PortfolioPage = ({ t }) => {
    const portfolio = t.portfolio;
    const [filter, setFilter] = useState('all');

    const categories = ['all', 'Marka Kimliği', 'Yazılım & UX', 'Web & Growth'];

    const filteredItems = filter === 'all'
        ? partnerWorks
        : partnerWorks.filter(item => item.category === filter);

    return (
        <>
            <SEO
                title={`${portfolio.title} | ZMK Agency`}
                description={portfolio.subtitle}
                keywords="kırıkkale web tasarım referansları, zmk agency projeler, kırıkkale reklam ajansı işleri"
            />
            <div className="portfolio-page">
                <div className="container">
                    {/* Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="portfolio-page-header"
                    >
                        <span className="pf-eyebrow">Portfolio</span>
                        <h1 className="pf-title">{portfolio.title}</h1>
                        <p className="pf-subtitle">{portfolio.subtitle}</p>
                    </motion.div>

                    {/* Filter Buttons */}
                    <div className="portfolio-filters">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat === 'all' ? 'Tüm Projeler' : cat}
                            </button>
                        ))}
                    </div>

                    {/* Portfolio Grid */}
                    <motion.div layout className="portfolio-grid">
                        <AnimatePresence>
                            {filteredItems.map((item, idx) => (
                                <motion.div
                                    layout
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                                    className="pf-card"
                                >
                                    <div className="pf-card-glow" style={{ background: `radial-gradient(circle, ${item.color}15 0%, transparent 70%)` }} />
                                    <div className="pf-card-inner">
                                        <div className="pf-monogram-wrap" style={{ borderColor: `${item.color}30` }}>
                                            <span className="pf-monogram" style={{
                                                background: `linear-gradient(135deg, ${item.color}, ${item.color}80)`,
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text'
                                            }}>{item.monogram}</span>
                                        </div>
                                        <span className="pf-cat">{item.category}</span>
                                        <h3 className="pf-card-title">{item.title}</h3>
                                        <p className="pf-card-desc">{item.description}</p>
                                        <div className="pf-tags">
                                            {item.tags.map(tag => (
                                                <span key={tag} className="pf-tag" style={{
                                                    borderColor: `${item.color}25`,
                                                    color: item.color
                                                }}>{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default PortfolioPage;
