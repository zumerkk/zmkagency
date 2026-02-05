import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';
import '../styles/Contact.css'; // Ensure this file is updated or created

const Contact = ({ t }) => {
    const contactData = t.contact;

    return (
        <>
            <SEO
                title={`${contactData.title} | ZMK Agency`}
                description={contactData.subtitle}
                keywords="kırıkkale reklam ajansı iletişim, zmk agency telefon, zmk agency adres"
            />
            <div className="page-wrapper contact-page">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="contact-header"
                    >
                        <h1 className="hero-title">
                            <span className="text-gradient">{contactData.title}</span>
                        </h1>
                        <p className="hero-subtitle">{contactData.subtitle}</p>
                    </motion.div>

                    <div className="contact-grid">
                        {/* Info Section */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="contact-info-card glass-panel"
                        >
                            <div className="info-item">
                                <h3>📍 Adres</h3>
                                <p>Yenişehir, Kazım Karabekir Cd. No: 39/2, 71200<br />Merkez/Kırıkkale</p>
                            </div>
                            <div className="info-item">
                                <h3>📞 Telefon</h3>
                                <p><a href="tel:+905551234567">+90 555 123 45 67</a></p>
                            </div>
                            <div className="info-item">
                                <h3>✉️ E-posta</h3>
                                <p><a href="mailto:info@zmkagency.com">info@zmkagency.com</a></p>
                            </div>
                            <div className="info-item">
                                <h3>🕒 Çalışma Saatleri</h3>
                                <p>Pzt - Cuma: 09:00 - 18:00<br />Cmt: 10:00 - 14:00</p>
                            </div>

                            {/* Socials */}
                            <div className="contact-socials">
                                <a href="https://www.instagram.com/agencyzmk/" target="_blank" rel="noreferrer">Instagram</a>
                                <a href="https://www.youtube.com/@ZMKAGENCY" target="_blank" rel="noreferrer">YouTube</a>
                                <a href="https://www.tiktok.com/@zmkagency" target="_blank" rel="noreferrer">TikTok</a>
                            </div>
                        </motion.div>

                        {/* Form Section */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="contact-form-card glass-panel"
                        >
                            <form className="contact-form-page">
                                <div className="form-group">
                                    <input type="text" placeholder={contactData.namePlaceholder} required />
                                </div>
                                <div className="form-group">
                                    <input type="email" placeholder={contactData.emailPlaceholder} required />
                                </div>
                                <div className="form-group">
                                    <input type="tel" placeholder="Telefon (Opsiyonel)" />
                                </div>
                                <div className="form-group">
                                    <textarea rows="5" placeholder={contactData.messagePlaceholder} required></textarea>
                                </div>
                                <button type="submit" className="submit-btn primary-btn full-width">
                                    {contactData.submit}
                                </button>
                            </form>
                        </motion.div>
                    </div>

                    {/* Map Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="map-section glass-panel"
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3062.657922248882!2d33.51357877651368!3d39.859492171221714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4081de10352ef20d%3A0xc304245973979720!2sYeni%C5%9Fehir%2C%20Kaz%C4%B1m%20Karabekir%20Cd.%20No%3A39%2F2%2C%2071200%20Merkez%2FK%C4%B1r%C4%B1kkale%20Merkez%2FK%C4%B1r%C4%B1kkale!5e0!3m2!1str!2str!4v1707130000000!5m2!1str!2str"
                            width="100%"
                            height="450"
                            style={{ border: 0, borderRadius: '16px' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="ZMK Agency Location"
                        ></iframe>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default Contact;
