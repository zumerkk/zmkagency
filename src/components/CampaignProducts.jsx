import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/CampaignProducts.css';

const CampaignProducts = () => {
    return (
        <section className="camp-section" aria-label="Kampanyalı Ürünler">
            <div className="camp-inner">
                <div className="camp-header">
                    <motion.span
                        className="camp-eyebrow"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Sınırlı Süre
                    </motion.span>
                    <motion.h2
                        className="camp-headline"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                    >
                        Kampanyalı Ürünler.
                    </motion.h2>
                    <motion.p
                        className="camp-tagline"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Kırıkkale'nin dijital geleceğini şekillendiren iki devrimci paket.
                    </motion.p>
                </div>

                <div className="camp-grid">
                    {/* ESNAF PAKETİ */}
                    <motion.div
                        className="camp-card"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.7 }}
                    >
                        <div className="camp-card-glow glow-blue"></div>
                        <div className="camp-card-content">
                            <span className="camp-badge badge-blue">Esnaf & KOBİ</span>
                            <h3 className="camp-card-title">
                                Bölgesel<br />
                                <span className="camp-gradient-blue">Hakimiyet.</span>
                            </h3>
                            <p className="camp-card-desc">
                                Google Haritalar'da görünün. Sosyal medyada var olun. 
                                Dijital dünyanın kapısını aralamak için tasarlandı.
                            </p>
                            <ul className="camp-features">
                                <li>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#30d158" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    Google Harita Kaydı & Optimizasyon
                                </li>
                                <li>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#30d158" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    One-Page Tanıtım Sitesi
                                </li>
                                <li>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#30d158" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    Sosyal Medya Kurulumu
                                </li>
                                <li>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#30d158" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    Profesyonel Mekân Çekimi
                                </li>
                            </ul>
                            <Link to="/esnaf-paketi" className="camp-cta camp-cta-blue">
                                Paketi İncele
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                            </Link>
                        </div>
                    </motion.div>

                    {/* DİJİTAL KALKINMA PAKETİ */}
                    <motion.div
                        className="camp-card camp-card-featured"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                    >
                        <div className="camp-card-glow glow-purple"></div>
                        <div className="camp-popular-tag">En Popüler</div>
                        <div className="camp-card-content">
                            <span className="camp-badge badge-purple">360° Tam Kapsamlı</span>
                            <h3 className="camp-card-title">
                                Dijital<br />
                                <span className="camp-gradient-purple">Kalkındırma.</span>
                            </h3>
                            <p className="camp-card-desc">
                                Web, reklam, sosyal medya, SEO — hepsi tek elde. Esnaf ve KOBİ'ler için
                                Kırıkkale'nin en kapsamlı dijital büyüme hareketi.
                            </p>
                            <ul className="camp-features">
                                <li>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bf5af2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    Dönüşüm Odaklı Web Sitesi
                                </li>
                                <li>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bf5af2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    Google & Meta Reklam Yönetimi
                                </li>
                                <li>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bf5af2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    Tüm Sosyal Medya Yönetimi
                                </li>
                                <li>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bf5af2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    Google Harita SEO Optimizasyonu
                                </li>
                                <li>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#bf5af2" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                    Aylık Profesyonel Çekim
                                </li>
                            </ul>
                            <a
                                href="https://wa.me/905413812114?text=Merhaba,%20Dijital%20Kalkındırma%20Paketi%20hakkında%20bilgi%20almak%20istiyorum."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="camp-cta camp-cta-purple"
                            >
                                Hemen Başvur
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default CampaignProducts;
