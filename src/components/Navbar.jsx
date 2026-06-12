import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/zmk-logo-horizontal.png';

const Navbar = ({ t, lang, toggleLang, onContactClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const scrollToSection = (e, sectionId) => {
    closeMobileMenu();
    if (isHome) {
      e.preventDefault();
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`apple-nav ${scrolled ? 'scrolled' : ''} ${hidden && !mobileMenuOpen ? 'nav-hidden' : ''}`}>
      <div className="apple-nav-inner">
        <Link to="/" className="apple-nav-logo" onClick={closeMobileMenu}>
          <img src={logo} alt="ZMK Agency" />
        </Link>

        <div className={`apple-nav-hamburger ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <span></span>
          <span></span>
        </div>

        <ul className={`apple-nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <li><Link to="/vision" onClick={closeMobileMenu}>{t.vision}</Link></li>
          <li><Link to="/portfolio" onClick={closeMobileMenu}>{t.portfolio}</Link></li>
          <li><Link to="/services" onClick={closeMobileMenu}>{t.services}</Link></li>
          <li><Link to="/pricing" onClick={closeMobileMenu}>{t.pricing}</Link></li>
          <li><a href="/#agency" onClick={(e) => scrollToSection(e, 'agency')}>{t.agency}</a></li>
          <li><Link to="/esnaf-paket" onClick={closeMobileMenu} className="nav-esnaf-link">Esnaf Paketi</Link></li>
          <li><Link to="/zmk-spesiyel" onClick={closeMobileMenu} className="nav-spesiyel-link">ZMK Spesiyel</Link></li>
          <li><Link to="/blog" onClick={closeMobileMenu}>Magazine</Link></li>
          <li><Link to="/contact" onClick={closeMobileMenu}>{t.contact}</Link></li>
          <li>
            <button className="apple-nav-lang" onClick={() => { toggleLang(); closeMobileMenu(); }}>
              {lang === 'tr' ? 'EN' : 'TR'}
            </button>
          </li>
          <li>
            <button
              className="apple-nav-cta"
              onClick={() => { closeMobileMenu(); if (onContactClick) onContactClick(); }}
            >
              {t.cta}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
