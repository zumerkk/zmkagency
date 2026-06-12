import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import logo from '../assets/zmk-logo-stacked.png';

const Footer = ({ t }) => {
    return (
        <footer className="apple-footer">
            <div className="apple-footer-inner">
                {/* Top section — columns */}
                <div className="apple-footer-grid">
                    <div className="apple-footer-col apple-footer-brand">
                        <img src={logo} alt="ZMK Agency" className="apple-footer-logo" />
                        <p className="apple-footer-desc">{t.aboutText}</p>
                        {/* NAP — Local SEO */}
                        <div itemScope itemType="https://schema.org/LocalBusiness" className="apple-footer-nap">
                            <meta itemProp="name" content="ZMK Agency" />
                            <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                                <span itemProp="streetAddress">Delice İş Hanı, Yenidoğan, Hürriyet Cd. No: 6/50 Kat:5</span><br />
                                <span itemProp="addressLocality">Kırıkkale</span>, <span itemProp="postalCode">71200</span> <span itemProp="addressCountry">TR</span>
                            </div>
                            <div className="apple-footer-nap-row">
                                <a href="tel:+905413812114" itemProp="telephone">0541 381 21 14</a>
                            </div>
                            <div className="apple-footer-nap-row">
                                <a href="mailto:iletisim@zmkagency.com" itemProp="email">iletisim@zmkagency.com</a>
                            </div>
                            <div className="apple-footer-nap-hours">Pzt–Cmt: 09:00–19:00</div>
                        </div>
                    </div>

                    <div className="apple-footer-col">
                        <h4>{t.services}</h4>
                        <ul>
                            <li><Link to="/services/kurumsal-web-sitesi">Kurumsal Web Sitesi</Link></li>
                            <li><Link to="/services/e-ticaret">E-Ticaret Çözümleri</Link></li>
                            <li><Link to="/services/google-ads">Google Ads</Link></li>
                            <li><Link to="/services/sosyal-medya">Sosyal Medya</Link></li>
                            <li><Link to="/services/lokal-seo">SEO Hizmeti</Link></li>
                            <li><Link to="/services/kurumsal-kimlik">Kurumsal Kimlik</Link></li>
                        </ul>
                    </div>

                    <div className="apple-footer-col">
                        <h4>{t.links}</h4>
                        <ul>
                            <li><Link to="/pricing">Hizmetler & Fiyatlar</Link></li>
                            <li><Link to="/vision">{t.vision || "Vision"}</Link></li>
                            <li><Link to="/portfolio">Referanslar</Link></li>
                            <li><Link to="/kirikkale-dijital-cozumler">Kırıkkale Dijital</Link></li>
                            <li><Link to="/blog">Blog</Link></li>
                            <li><a href="/#agency">Agency</a></li>
                            <li><Link to="/contact">İletişim</Link></li>
                        </ul>
                    </div>

                    <div className="apple-footer-col">
                        <h4>{t.legal}</h4>
                        <ul>
                            <li><Link to="/legal/privacy">{t.privacy}</Link></li>
                            <li><Link to="/legal/terms">{t.terms}</Link></li>
                        </ul>
                    </div>
                </div>

                {/* SEO spider links */}
                <div className="apple-footer-seo">
                    <p className="apple-footer-seo-label">Kırıkkale Hizmet Bölgeleri</p>
                    <div className="apple-footer-seo-links">
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
                            { slug: 'kirikkale-oto-galeri-dijital-pazarlama', label: 'Oto Galeri' },
                            { slug: 'kirikkale-grafik-tasarim-matbaa', label: 'Matbaa & Grafik' },
                            { slug: 'kirikkale-seo-danismanligi', label: 'İleri SEO' },
                            { slug: 'kirikkale-saglik-turizmi-dijital-pazarlama', label: 'Sağlık & Klinik' },
                            { slug: 'kirikkale-insaat-emlak-reklam-ajansi', label: 'İnşaat Lansman' },
                            { slug: 'kirikkale-sanayi-uretim-dijital-donusum', label: 'Sanayi Dijital' },
                            { slug: 'kirikkale-ozel-okul-kolej-reklam', label: 'Eğitim & Kolej' },
                            { slug: 'kirikkale-avukat-hukuk-web-tasarim', label: 'Hukuk Web' }
                        ].map(link => (
                            <Link key={link.slug} to={`/${link.slug}`}>{link.label}</Link>
                        ))}
                    </div>
                </div>

                {/* Bottom */}
                <div className="apple-footer-bottom">
                    <p>{t.copyright}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
