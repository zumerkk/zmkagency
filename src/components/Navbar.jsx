import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/ZMK AGENCY-logo.png';

const Navbar = ({ t, lang, toggleLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  // UseEffect to prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Helper to scroll to hash on home page, or navigate to page
  const scrollToSection = (e, sectionId) => {
    closeMobileMenu(); // Close mobile menu if open
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
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img src={logo} alt="ZMK Agency" />
        </Link>

        <div className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`navbar-links ${mobileMenuOpen ? 'active' : ''}`}>
          <li><Link to="/vision" onClick={closeMobileMenu}>{t.vision}</Link></li>
          <li><a href="/#services" onClick={(e) => scrollToSection(e, 'services')}>{t.services}</a></li>
          <li><a href="/#agency" onClick={(e) => scrollToSection(e, 'agency')}>{t.agency}</a></li>
          <li><Link to="/pricing" onClick={closeMobileMenu}>{t.pricing}</Link></li>
          <li><Link to="/blog" onClick={closeMobileMenu}>Magazine</Link></li>
          <li><a href="/#contact" onClick={(e) => scrollToSection(e, 'contact')}>{t.contact}</a></li>
          <li>
            <button className="lang-toggle" onClick={() => { toggleLang(); closeMobileMenu(); }}>
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
