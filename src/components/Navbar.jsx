import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight } from './ui';
import siteConfig from '../config/siteConfig';
import '../styles/Navbar.css';
// Gold variant. The blue lockup in the repo predates the current gold identity;
// this file is generated from it as a stopgap until the official gold asset
// lands — see ASSETS NEEDED.
import logo from '../assets/zmk-logo-horizontal-gold.png';

const NAV_LINKS = [
  { to: '/calismalar', label: 'Çalışmalar' },
  { to: '/hizmetler', label: 'Hizmetler' },
  { to: '/yazilim', label: 'Yazılım' },
  { to: '/studio', label: 'Studio' },
  { to: '/hakkimizda', label: 'Hakkımızda' },
  { to: '/iletisim', label: 'İletişim' },
];

/**
 * Primary navigation.
 *
 * Two states: transparent over the hero, then a smoked-glass bar once the
 * page scrolls. It hides on scroll-down and returns on scroll-up so the bar
 * is never competing with a full-bleed chapter.
 *
 * The mobile menu is a full-viewport overlay rather than a dropdown, with
 * staggered link entrances and the contact details in the composition — on a
 * phone it is the whole brand moment, not a list that fell out of the header.
 * Focus is trapped inside it while open, and Escape closes it.
 */
const Navbar = ({ lang, toggleLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > lastY.current && y > 140);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page behind the overlay.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  // Escape to close, and keep Tab inside the overlay while it is open —
  // otherwise focus walks onto the page hidden behind it.
  useEffect(() => {
    if (!menuOpen) return;

    const panel = panelRef.current;
    const focusables = panel
      ? panel.querySelectorAll('a[href], button:not([disabled])')
      : [];
    focusables[0]?.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !focusables.length) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`nav ${scrolled ? 'is-scrolled' : ''} ${hidden && !menuOpen ? 'is-hidden' : ''} ${menuOpen ? 'is-menu-open' : ''}`}
        aria-label="Ana menü"
      >
        <div className="nav__inner">
          <Link to="/" className="nav__logo" onClick={closeMenu} aria-label="ZMK Agency ana sayfa">
            <img src={logo} alt="ZMK Agency" width="164" height="31" />
          </Link>

          <ul className="nav__links">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} aria-current={location.pathname === link.to ? 'page' : undefined}>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="nav__end">
            <button
              type="button"
              className="nav__lang"
              onClick={toggleLang}
              aria-label={lang === 'tr' ? 'Switch to English' : "Türkçe'ye geç"}
            >
              {lang === 'tr' ? 'EN' : 'TR'}
            </button>

            <Link to="/iletisim" className="nav__cta" onClick={closeMenu}>
              Projeni Konuşalım <ArrowRight size={13} />
            </Link>

            <button
              type="button"
              ref={toggleRef}
              className={`nav__toggle ${menuOpen ? 'is-open' : ''}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="zmk-menu"
              aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      {/* Full-viewport mobile menu */}
      <div
        id="zmk-menu"
        ref={panelRef}
        className={`menu ${menuOpen ? 'is-open' : ''}`}
        hidden={!menuOpen}
      >
        <div className="menu__inner">
          <nav className="menu__nav" aria-label="Mobil menü">
            <ul>
              {NAV_LINKS.map((link, i) => (
                <li key={link.to} style={{ transitionDelay: `${120 + i * 55}ms` }}>
                  <Link to={link.to} onClick={closeMenu}>
                    <span className="menu__n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="menu__label">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="menu__foot">
            <Link to="/iletisim" className="zmk-btn menu__cta" onClick={closeMenu}>
              Projeni Konuşalım <ArrowRight />
            </Link>

            <div className="menu__contact">
              <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phoneDisplay}</a>
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
            </div>

            <ul className="menu__social">
              {siteConfig.social.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
