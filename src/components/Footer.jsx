import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import logo from '../assets/ZMK AGENCY-logo.png';

const Footer = ({ t }) => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-col brand-col">
                    <img src={logo} alt="ZMK" className="footer-logo" />
                    <p className="footer-desc">
                        {t.aboutText}
                    </p>
                    {t.address && <p className="footer-address" style={{ marginTop: '15px', color: '#888', fontSize: '13px' }}>{t.address}</p>}
                </div>

                <div className="footer-col">
                    <h4>{t.services}</h4>
                    <ul>
                        <li><Link to="/services/software">Software Development</Link></li>
                        <li><Link to="/services/web-seo">Web & SEO</Link></li>
                        <li><Link to="/services/social-media">Social Media</Link></li>
                        <li><Link to="/services/production">Production</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>{t.links}</h4>
                    <ul>
                        <li><Link to="/vision">{t.vision || "Vision"}</Link></li>
                        <li><a href="/#agency">Agency</a></li>
                        <li><a href="/#contact">Contact</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>{t.legal}</h4>
                    <ul>
                        <li><Link to="/legal/privacy">{t.privacy}</Link></li>
                        <li><Link to="/legal/terms">{t.terms}</Link></li>
                    </ul>
                </div>
            </div>

            {/* SEO Spider Web linking structure */}
            <div className="container footer-seo-links" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '40px', paddingTop: '30px' }}>
                <h5 style={{ color: '#555', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '15px' }}>Kırıkkale Hizmet Bölgeleri ve Servisler</h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 20px' }}>
                    {[
                        { slug: 'kirikkale-reklam-ajansi', label: 'Reklam Ajansı' },
                        { slug: 'kirikkale-web-tasarim', label: 'Web Tasarım' },
                        { slug: 'kirikkale-dijital-pazarlama-ajansi', label: 'Dijital Pazarlama' },
                        { slug: 'kirikkale-google-ads-yonetimi', label: 'Google Ads' },
                        { slug: 'kirikkale-sosyal-medya-yonetimi', label: 'Sosyal Medya' },
                        { slug: 'kirikkale-yazilim-gelistirme', label: 'Özel Yazılım' },
                        { slug: 'kirikkale-e-ticaret-otomasyon', label: 'E-Ticaret' },
                        { slug: 'kirikkale-seo', label: 'SEO Uzmanı' },
                        { slug: 'kirikkale-dijital-donusum-danismanligi', label: 'Dijital Dönüşüm' },
                        { slug: 'kirikkale-instagram-reklam-yonetimi', label: 'Instagram Reklam' },
                        { slug: 'kirikkale-360-dijital-ajans', label: '360° Ajans' },
                        { slug: 'kirikkale-mobil-uygulama-gelistirme', label: 'Mobil Uygulama' },
                        { slug: 'kirikkale-kurumsal-kimlik-tasarimi', label: 'Kurumsal Kimlik' },
                        { slug: 'kirikkale-drone-cekim-tanitim-filmi', label: 'Drone Çekimi' },
                        { slug: 'kirikkale-siyasi-dijital-danismanlik', label: 'Siyasi Danışmanlık' },
                        { slug: 'kirikkale-dijital-menu-tasarim', label: 'Dijital Menü' },
                        { slug: 'kirikkale-emlak-cekimi-reklam', label: 'Emlak Medya' },
                        { slug: 'kirikkale-oto-galeri-dijital-pazarlama', label: 'Oto Galeri Reklam' },
                        { slug: 'kirikkale-grafik-tasarim-matbaa', label: 'Matbaa & Grafik' },
                        { slug: 'kirikkale-seo-danismanligi', label: 'İleri Seviye SEO' }
                    ].map(link => (
                        <Link
                            key={link.slug}
                            to={`/${link.slug}`}
                            style={{ color: '#444', fontSize: '11px', textDecoration: 'none', transition: 'color 0.2s' }}
                            onMouseEnter={(e) => e.target.style.color = '#888'}
                            onMouseLeave={(e) => e.target.style.color = '#444'}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="footer-bottom container">
                <p>{t.copyright}</p>
            </div>
        </footer>
    );
};

export default Footer;
