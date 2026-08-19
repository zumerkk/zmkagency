import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from './ui';
import siteConfig from '../config/siteConfig';
import { pillars } from '../data/capabilities';
import '../styles/Footer.css';

const NAVIGATION = [
  { to: '/calismalar', label: 'Çalışmalar' },
  { to: '/hizmetler', label: 'Hizmetler' },
  { to: '/zmk-360', label: 'ZMK 360' },
  { to: '/fiyatlar', label: 'Fiyatlar' },
  { to: '/hakkimizda', label: 'Hakkımızda' },
  { to: '/blog', label: 'Magazine' },
  { to: '/iletisim', label: 'İletişim' },
];

/**
 * Local SEO landing pages.
 *
 * These were previously 25 low-contrast links sitting directly in the footer,
 * which flattened the whole composition into keyword soup. They still need to
 * be crawlable, so they live in a collapsed list below the legal rule —
 * present in the DOM for crawlers and reachable for users, without competing
 * with the brand statement above.
 */
const LOCAL_LINKS = [
  ['kirikkale-reklam-ajansi', 'Reklam Ajansı'],
  ['kirikkale-web-tasarim', 'Web Tasarım'],
  ['kirikkale-dijital-pazarlama-ajansi', 'Dijital Pazarlama'],
  ['kirikkale-google-ads-yonetimi', 'Google Ads'],
  ['kirikkale-sosyal-medya-yonetimi', 'Sosyal Medya'],
  ['kirikkale-yazilim-gelistirme', 'Özel Yazılım'],
  ['kirikkale-e-ticaret-otomasyon', 'E-Ticaret'],
  ['kirikkale-seo', 'SEO'],
  ['kirikkale-dijital-donusum-danismanligi', 'Dijital Dönüşüm'],
  ['kirikkale-instagram-reklam-yonetimi', 'Instagram Reklam'],
  ['kirikkale-360-dijital-ajans', '360° Ajans'],
  ['kirikkale-mobil-uygulama-gelistirme', 'Mobil Uygulama'],
  ['kirikkale-kurumsal-kimlik-tasarimi', 'Kurumsal Kimlik'],
  ['kirikkale-drone-cekim-tanitim-filmi', 'Drone Çekimi'],
  ['kirikkale-dijital-menu-tasarim', 'Dijital Menü'],
  ['kirikkale-emlak-cekimi-reklam', 'Emlak Medya'],
  ['kirikkale-oto-galeri-dijital-pazarlama', 'Oto Galeri'],
  ['kirikkale-grafik-tasarim-matbaa', 'Matbaa & Grafik'],
  ['kirikkale-seo-danismanligi', 'SEO Danışmanlığı'],
  ['kirikkale-saglik-turizmi-dijital-pazarlama', 'Sağlık & Klinik'],
  ['kirikkale-insaat-emlak-reklam-ajansi', 'İnşaat Lansman'],
  ['kirikkale-sanayi-uretim-dijital-donusum', 'Sanayi Dijital'],
  ['kirikkale-ozel-okul-kolej-reklam', 'Eğitim & Kolej'],
  ['kirikkale-avukat-hukuk-web-tasarim', 'Hukuk Web'],
  ['kirikkale-siyasi-dijital-danismanlik', 'Siyasi Danışmanlık'],
];

/**
 * Footer.
 *
 * Opens with the brand statement at display scale — the footer is the last
 * thing a visitor reads, so it should close the argument rather than trail off
 * into small print. Every contact value comes from siteConfig, which is now
 * the only place they are defined.
 */
const Footer = () => {
  const [localOpen, setLocalOpen] = useState(false);
  const year = new Date().getFullYear();

  return (
    <footer className="footer zmk-grain">
      <div className="zmk-container footer__inner">
        <div className="footer__statement">
          <p className="zmk-micro footer__brand">{siteConfig.name}</p>
          <p className="footer__tagline">
            Markanızın <span className="zmk-gold">büyüme departmanı.</span>
          </p>
          <Link to="/iletisim" className="zmk-cta footer__cta">
            Projeni Konuşalım <ArrowRight />
          </Link>
        </div>

        <div className="footer__cols">
          <nav className="footer__col" aria-labelledby="f-disciplines">
            <h2 className="zmk-micro footer__col-title" id="f-disciplines">Disiplinler</h2>
            <ul>
              {pillars.map((pillar) => (
                <li key={pillar.id}><Link to={`/${pillar.slug}`}>{pillar.title}</Link></li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-labelledby="f-nav">
            <h2 className="zmk-micro footer__col-title" id="f-nav">Menü</h2>
            <ul>
              {NAVIGATION.map((item) => (
                <li key={item.to}><Link to={item.to}>{item.label}</Link></li>
              ))}
            </ul>
          </nav>

          <div className="footer__col footer__col--contact">
            <h2 className="zmk-micro footer__col-title">İletişim</h2>
            <ul>
              <li><a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phoneDisplay}</a></li>
              <li><a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></li>
              <li>
                <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </li>
            </ul>

            <address className="footer__address">
              {siteConfig.address.street}<br />
              {siteConfig.address.postalCode} {siteConfig.address.locality}
            </address>
            <p className="footer__hours">{siteConfig.hours.display}</p>
          </div>

          <div className="footer__col">
            <h2 className="zmk-micro footer__col-title">Takip</h2>
            <ul>
              {siteConfig.social.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© {year} {siteConfig.legalName}. Tüm hakları saklıdır.</p>
          <ul className="footer__legal">
            <li><Link to="/legal/privacy">Gizlilik Politikası</Link></li>
            <li><Link to="/legal/terms">Kullanım Koşulları</Link></li>
          </ul>
        </div>

        <div className="footer__local">
          <button
            type="button"
            className="footer__local-toggle"
            onClick={() => setLocalOpen((open) => !open)}
            aria-expanded={localOpen}
            aria-controls="footer-local-links"
          >
            Kırıkkale hizmet sayfaları
            <span className={`footer__local-chevron ${localOpen ? 'is-open' : ''}`} aria-hidden="true" />
          </button>

          <ul id="footer-local-links" className="footer__local-links" hidden={!localOpen}>
            {LOCAL_LINKS.map(([slug, label]) => (
              <li key={slug}><Link to={`/${slug}`}>{label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
