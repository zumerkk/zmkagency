import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap, Globe, BarChart2, Camera, MapPin } from 'lucide-react';
import SEO from '../components/SEO';
import WizardForm from '../components/WizardForm';
import '../styles/ZMKSpesiyel.css';

const ZMKSpesiyel = ({ t }) => {
    const sp = t.specialPackage;
    const [showWizard, setShowWizard] = React.useState(false);
    const packagePrice = `${sp?.currency || '₺'}${sp?.price || '35.000 – 45.000'}${sp?.period || '/ay'}`;

    const services = [
        { icon: Globe, title: 'Dönüşüm Odaklı Web Sitesi', desc: 'One-Page formatında, hızlı yüklenen, SEO uyumlu ve mobil öncelikli profesyonel web sitesi.' },
        { icon: MapPin, title: 'Google Harita Optimizasyonu', desc: 'İşletmenizi Google Haritalar\'da üst sıralara taşıyoruz. Aylık optimizasyon ve yorum yönetimi.' },
        { icon: BarChart2, title: 'Google & Meta Reklam Yönetimi', desc: 'Hedef kitleye ulaşan, dönüşüm odaklı, ROI takipli Google Ads ve Meta (Instagram/FB) kampanyaları.' },
        { icon: Zap, title: 'Sosyal Medya Yönetimi', desc: 'Instagram ve TikTok hesaplarınızın profesyonel içerik üretimi, takipçi büyümesi ve etkileşim yönetimi.' },
        { icon: Camera, title: 'Profesyonel Çekim', desc: 'Aylık mekan, ürün ve ünite fotoğraf/video çekimi. Sosyal medya ve web sitesi için optimized içerik.' },
    ];

    return (
        <>
            <SEO
                title="ZMK Spesiyel — Dijital Kalkındırma Paketi"
                description="Kırıkkale esnafına özel 360° dijital dönüşüm paketi. Web sitesi, Google Ads, sosyal medya, harita optimizasyonu hepsi bir arada."
                keywords="kırıkkale dijital paket, esnaf dijital dönüşüm, zmk spesiyel, kırıkkale reklam paketi"
            />

            <div className="zmk-spesiyel-page">
                {/* Hero */}
                <section className="zsp-hero">
                    <div className="zsp-hero-glow" />
                    <div className="container">
                        <motion.div
                            className="zsp-hero-content"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="zsp-badge">{sp?.badge || '🔥 Sınırlı Kontenjan'}</span>
                            <h1>{sp?.title || 'Dijital Kalkındırma Paketi'}</h1>
                            <p className="zsp-subtitle">{sp?.subtitle || 'ZMK Spesiyel: Şehrin En Kapsamlı Dijital Büyüme Hareketi'}</p>
                            <p className="zsp-desc">{sp?.description || 'Kırıkkale esnafına özel 360° dijital dönüşüm paketi.'}</p>

                            <div className="zsp-price-hero">
                                <span className="zsp-currency">{sp?.currency || '₺'}</span>
                                <span className="zsp-price">{sp?.price || '35.000 – 45.000'}</span>
                                <span className="zsp-period">{sp?.period || '/ay'}</span>
                            </div>

                            <button className="zsp-cta-btn" onClick={() => setShowWizard(true)}>
                                {sp?.cta || 'Hemen Başvur'} <ArrowRight size={20} />
                            </button>
                        </motion.div>
                    </div>
                </section>

                {/* Services Breakdown */}
                <section className="zsp-services">
                    <div className="container">
                        <motion.h2
                            className="zsp-section-title"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Pakete Dahil Olan Her Şey.
                        </motion.h2>
                        <div className="zsp-service-grid">
                            {services.map((svc, idx) => {
                                const Icon = svc.icon;
                                return (
                                    <motion.div
                                        key={idx}
                                        className="zsp-service-card"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.08 }}
                                    >
                                        <div className="zsp-service-icon"><Icon size={24} /></div>
                                        <h3>{svc.title}</h3>
                                        <p>{svc.desc}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Why Section */}
                <section className="zsp-why">
                    <div className="container">
                        <motion.h2
                            className="zsp-section-title"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            Neden ZMK Spesiyel?
                        </motion.h2>
                        <div className="zsp-why-grid">
                            {[
                                { num: packagePrice, label: 'Aylık, tüm dahil hizmet bedeli' },
                                { num: '5+', label: 'Kapsamlı hizmet tek pakette' },
                                { num: '%100', label: 'Kırıkkale pazarına özel strateji' },
                                { num: '7/24', label: 'Destek ve performans takibi' }
                            ].map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    className="zsp-why-card"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.08 }}
                                >
                                    <span className="zsp-why-num">{stat.num}</span>
                                    <span className="zsp-why-label">{stat.label}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="zsp-final-cta">
                    <div className="container">
                        <motion.div
                            className="zsp-cta-box"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2>Dijital Kalkınmanız İçin İlk Adımı Atın.</h2>
                            <p>Sınırlı kontenjan — Kırıkkale'deki işletmenizi şimdi dönüştürün.</p>
                            <button className="zsp-cta-btn" onClick={() => setShowWizard(true)}>
                                Hemen Başvur <ArrowRight size={20} />
                            </button>
                        </motion.div>
                    </div>
                </section>
            </div>

            {showWizard && (
                <WizardForm
                    t={t.wizard}
                    onClose={() => setShowWizard(false)}
                    initialData={{ type: ['Dijital Kalkındırma'], budget: packagePrice, details: 'ZMK Spesiyel Paketi Başvurusu' }}
                    source="ZMK Spesiyel Page"
                />
            )}
        </>
    );
};

export default ZMKSpesiyel;
