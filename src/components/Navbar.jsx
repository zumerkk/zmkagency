import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/ZMK AGENCY-logo.png';

const Navbar = ({ t, lang, toggleLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Helper to scroll to hash on home page, or navigate to page
  const scrollToSection = (e, sectionId) => {
    if (isHome) {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="ZMK Agency" />
        </Link>
        <ul className="navbar-links">
          <li><Link to="/vision">{t.vision}</Link></li>
          <li><a href="/#services" onClick={(e) => scrollToSection(e, 'services')}>{t.services}</a></li>
          <li><a href="/#agency" onClick={(e) => scrollToSection(e, 'agency')}>{t.agency}</a></li>
          <li><Link to="/pricing">{t.pricing}</Link></li>
          <li><a href="/#contact" onClick={(e) => scrollToSection(e, 'contact')}>{t.contact}</a></li>
          <li>
            <button className="lang-toggle" onClick={toggleLang}>
              {lang === 'tr' ? 'EN' : 'TR'}
            </button>
          </li>
          <li><a href="/#contact" onClick={(e) => scrollToSection(e, 'contact')} className="cta-button">{t.cta}</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
