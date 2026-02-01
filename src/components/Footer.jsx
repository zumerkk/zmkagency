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
            <div className="footer-bottom container">
                <p>{t.copyright}</p>
            </div>
        </footer>
    );
};

export default Footer;
