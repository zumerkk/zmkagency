import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/MarketDominance.css';

const keywordClusters = [
    {
        title: 'Yazılım Talebi',
        terms: ['Kırıkkale yazılım', 'Kırıkkale yazılım ajansı', 'Kırıkkale yazılım firması', 'Kırıkkale web yazılım'],
        path: '/kirikkale-yazilim-ajansi'
    },
    {
        title: 'Reklam Talebi',
        terms: ['Kırıkkale reklam', 'Kırıkkale reklam ajansı', 'Kırıkkale dijital ajans', 'Kırıkkale Google reklam'],
        path: '/kirikkale-reklam'
    },
    {
        title: 'Sosyal Medya Talebi',
        terms: ['Kırıkkale sosyal medya ajansı', 'Kırıkkale sosyal medya yönetimi', 'Kırıkkale Instagram reklam', 'Kırıkkale medya ajansı'],
        path: '/kirikkale-sosyal-medya-ajansi'
    }
];

const roadmap = [
    'Teknik SEO: schema, sitemap, hız, dahili link ve Core Web Vitals kontrolü',
    'Yerel SEO: Google Business Profile, Kırıkkale ilçe sayfaları ve yorum stratejisi',
    'İçerik SEO: yazılım, reklam, sosyal medya ve sektör bazlı haftalık rehberler',
    'Reklam: Google arama kampanyaları, remarketing ve Meta lead kampanyaları',
    'Satış sistemi: WhatsApp akışı, teklif formu, CRM ve aylık performans raporu'
];

const MarketDominance = () => {
    return (
        <section className="md-section" aria-labelledby="market-dominance-title">
            <div className="md-inner">
                <motion.div
                    className="md-hero-card"
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="md-eyebrow">Kırıkkale Pazar Hakimiyeti</span>
                    <h2 id="market-dominance-title">Aranan her hizmette ZMK görünsün.</h2>
                    <p>
                        Kırıkkale'de yazılım, reklam, sosyal medya ve SEO arayan işletmeler için ZMK Agency
                        tek cevap olacak şekilde kurgulandı: ayrı landing page, ayrı teklif, ayrı dönüşüm akışı.
                    </p>
                    <div className="md-actions">
                        <Link to="/kirikkale-dijital-cozumler" className="md-primary">Ana SEO Rehberi</Link>
                        <Link to="/pricing" className="md-secondary">Paketleri Gör</Link>
                    </div>
                </motion.div>

                <div className="md-grid">
                    {keywordClusters.map((cluster, index) => (
                        <motion.article
                            className="md-cluster"
                            key={cluster.title}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08, duration: 0.55 }}
                        >
                            <span className="md-cluster-index">0{index + 1}</span>
                            <h3>{cluster.title}</h3>
                            <ul>
                                {cluster.terms.map((term) => (
                                    <li key={term}>{term}</li>
                                ))}
                            </ul>
                            <Link to={cluster.path}>Bu arama niyetini sahiplen</Link>
                        </motion.article>
                    ))}
                </div>

                <motion.div
                    className="md-roadmap"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65 }}
                >
                    <h3>12 Aylık Etik Büyüme Makinesi</h3>
                    <div className="md-roadmap-list">
                        {roadmap.map((item, index) => (
                            <div className="md-roadmap-item" key={item}>
                                <span>{index + 1}</span>
                                <p>{item}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default MarketDominance;