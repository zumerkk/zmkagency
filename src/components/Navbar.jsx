import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/ZMK AGENCY-logo.png';

const Navbar = ({ t, lang, toggleLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if scrolled (for background style)
      if (currentScrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Determine direction for smart hide
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true); // Scrolling down -> hide
      } else {
        setHidden(false); // Scrolling up -> show
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

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
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${hidden ? 'navbar-hidden' : ''}`}>
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
          <li><Link to="/portfolio" onClick={closeMobileMenu}>{t.portfolio}</Link></li>
          <li><a href="/#services" onClick={(e) => scrollToSection(e, 'services')}>{t.services}</a></li>
          <li><a href="/#agency" onClick={(e) => scrollToSection(e, 'agency')}>{t.agency}</a></li>
          <li><Link to="/pricing" onClick={closeMobileMenu}>{t.pricing}</Link></li>
          <li><Link to="/blog" onClick={closeMobileMenu}>Magazine</Link></li>
          <li><Link to="/contact" onClick={closeMobileMenu}>{t.contact}</Link></li>
          <li>
            <button className="lang-toggle" onClick={() => { toggleLang(); closeMobileMenu(); }}>
              {lang === 'tr' ? 'EN' : 'TR'}
            </button>
          </li>
          <li><Link to="/contact" onClick={closeMobileMenu} className="cta-button">{t.cta}</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
