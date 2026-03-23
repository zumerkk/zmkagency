import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Services.css';

const categories = [
    {
        id: 'digital',
        num: '01',
        title: 'Dijital Pazarlama & Yönetim',
        desc: 'Markanızı dijitalde görünür, büyüyen ve satan bir güce dönüştürüyoruz.',
        color: '#2997ff',
        subs: [
            { icon: '📱', name: 'Sosyal Medya Yönetimi', detail: 'Viral içerik, topluluk inşası, algoritma hakimiyeti' },
            { icon: '📊', name: 'Google & Meta Reklam Yönetimi', detail: 'ROAS odaklı performans kampanyaları' },
            { icon: '🔍', name: 'SEO & Arama Motoru Optimizasyonu', detail: 'Google\'da ilk sayfada rakiplerinizi ezip geçin' },
            { icon: '📈', name: 'Veri Analitiği & Growth Hacking', detail: 'Verilere dayalı agresif büyüme stratejileri' },
        ]
    },
    {
        id: 'tech',
        num: '02',
        title: 'Web, Yazılım & Teknoloji',
        desc: 'Kırıkkale\'den dünyaya açılan özel yazılım çözümleri ve web sistemleri.',
        color: '#30d158',
        subs: [
            { icon: '🌐', name: 'Dönüşüm Odaklı Web Sitesi', detail: 'Core Web Vitals, ultra-hız, SEO uyumlu' },
            { icon: '💻', name: 'Özel Yazılım Geliştirme', detail: 'CRM, ERP, SaaS — size özel sistemler' },
            { icon: '📱', name: 'Mobil Uygulama Geliştirme', detail: 'iOS & Android native ve cross-platform' },
            { icon: '☁️', name: 'Cloud & DevOps Altyapı', detail: 'Ölçeklenebilir, güvenli, 7/24 çalışan sistemler' },
        ]
    },
    {
        id: 'creative',
        num: '03',
        title: 'Prodüksiyon & Marka Kimliği',
        desc: 'Markanızın ruhunu, görselini ve hikayesini sinema kalitesinde inşa ediyoruz.',
        color: '#bf5af2',
        subs: [
            { icon: '🎬', name: 'Tanıtım Filmi & Reklam Çekimi', detail: '4K/8K sinematik çekim, drone, VFX' },
            { icon: '📸', name: 'Profesyonel Fotoğraf Çekimi', detail: 'Ürün, mekan, portre ve kurumsal çekimler' },
            { icon: '🎨', name: 'Marka Stratejisi & Logo Tasarım', detail: 'Kurumsal kimlik, ses tonu, görsel dil' },
            { icon: '🖨️', name: 'Kurumsal Baskı & Promosyon', detail: 'Kartvizit, araç giydirme, tekstil, matbaa' },
        ]
    }
];

const CategoryCard = ({ cat, isOpen, onToggle }) => {
    const cardRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        if (!cardRef.current || isOpen) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -4;
        const rotateY = (x - centerX) / centerX * 4;
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }, [isOpen]);

    const handleMouseLeave = useCallback(() => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    }, []);

    return (
        <motion.div
            className={`svc-category ${isOpen ? 'svc-category-open' : ''}`}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ '--cat-color': cat.color }}
        >
            {/* Header — always visible */}
            <div className="svc-cat-header" onClick={onToggle}>
                <div className="svc-cat-left">
                    <span className="svc-cat-num" style={{ color: cat.color }}>{cat.num}</span>
                    <div>
                        <h3 className="svc-cat-title">{cat.title}</h3>
                        <p className="svc-cat-desc">{cat.desc}</p>
                    </div>
                </div>
                <div className={`svc-cat-toggle ${isOpen ? 'open' : ''}`} style={{ borderColor: `${cat.color}33` }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={cat.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="12" y1="5" x2="12" y2="19" className="toggle-v" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </div>
            </div>

            {/* Expandable sub-services */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="svc-subs"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        <div className="svc-subs-inner">
                            {cat.subs.map((sub, i) => (
                                <motion.div
                                    key={i}
                                    className="svc-sub-item"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.08 }}
                                >
                                    <span className="svc-sub-icon">{sub.icon}</span>
                                    <div>
                                        <h4 className="svc-sub-name">{sub.name}</h4>
                                        <p className="svc-sub-detail">{sub.detail}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const Services = ({ t }) => {
    const [openId, setOpenId] = useState(null);

    const handleToggle = (id) => {
        setOpenId(prev => prev === id ? null : id);
    };

    return (
        <section className="svc-section" aria-label="Hizmetlerimiz">
            <div className="svc-inner">
                <div className="svc-header">
                    <motion.span
                        className="svc-eyebrow"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Hizmetlerimiz
                    </motion.span>
                    <motion.h2
                        className="svc-headline"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                    >
                        Beklentilerin Ötesinde.
                    </motion.h2>
                    <motion.p
                        className="svc-tagline"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        3 ana uzmanlık. Sınırsız olasılık.
                    </motion.p>
                </div>

                <div className="svc-categories">
                    {categories.map((cat) => (
                        <CategoryCard
                            key={cat.id}
                            cat={cat}
                            isOpen={openId === cat.id}
                            onToggle={() => handleToggle(cat.id)}
                        />
                    ))}
                </div>

                <motion.div
                    className="svc-bottom-cta"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <Link to="/services" className="svc-all-link">
                        Tüm Detayları Gör
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
