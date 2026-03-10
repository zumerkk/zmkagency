import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Mail, Phone, ArrowRight, CheckCircle, AlertCircle, Clock, Instagram, Youtube, Linkedin, Twitter } from 'lucide-react';
import SEO from '../components/SEO';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import '../styles/Contact.css'; // Reusing the Apex styles

const Contact = ({ t }) => {
    // Fallback if t.contact isn't passed correctly, though App.jsx passes t directly usually, 
    // but looking at App.jsx it passes <Contact t={t} /> so we need t.contact
    const contactData = t.contact || t;

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        service: '',
        budget: '',
        message: ''
    });
    const [status, setStatus] = useState(''); // 'loading', 'success', 'error'
    const [focusedField, setFocusedField] = useState(null);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            await addDoc(collection(db, 'leads'), {
                ...formData,
                type: 'Contact Page Form',
                status: 'New',
                timestamp: serverTimestamp()
            });
            setStatus('success');
            setFormData({ name: '', phone: '', message: '' });
            setTimeout(() => setStatus(''), 5000);
        } catch (error) {
            console.error("Error adding document: ", error);
            setStatus('error');
        }
    };

    return (
        <>
            <SEO
                title={`${contactData.title} | ZMK Agency`}
                description={contactData.subtitle}
                keywords="iletisim, contact, kirikkale reklam ajansi adresi, zmk agency telefon"
            />

            <section className="contact-section-page">
                {/* Background Atmosphere - Reusing Apex classes */}
                <div className="contact-glow-1"></div>
                <div className="contact-glow-2"></div>

                <div className="container contact-container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="contact-header"
                        style={{ marginTop: '80px' }} // Spacing for Navbar
                    >
                        <h1 className="section-title" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)' }}>
                            {contactData.title}
                        </h1>
                        <p className="contact-subtitle" style={{ fontSize: '1.4rem' }}>
                            {contactData.subtitle}
                        </p>
                    </motion.div>

                    <div className="contact-content-wrapper">
                        {/* Left Column: Extensive Info */}
                        <motion.div
                            className="contact-info-wrapper"
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <a href="https://maps.app.goo.gl/YourMapLinkHere" target="_blank" rel="noopener noreferrer" className="info-card">
                                <div className="info-icon">
                                    <MapPin size={24} />
                                </div>
                                <div className="info-text">
                                    <h4>Merkez Ofis</h4>
                                    <p>Delice İş Hanı, Yenidoğan, Hürriyet Cd. No: 6/50 Kat:5<br />71200 Merkez/Kırıkkale</p>
                                </div>
                            </a>

                            <div className="info-card">
                                <div className="info-icon">
                                    <Clock size={24} />
                                </div>
                                <div className="info-text">
                                    <h4>Çalışma Saatleri</h4>
                                    <p>Pzt - Cuma: 09:00 - 18:00<br />Cumartesi: 10:00 - 14:00</p>
                                </div>
                            </div>

                            <a href="mailto:info@zmkagency.com" className="info-card">
                                <div className="info-icon">
                                    <Mail size={24} />
                                </div>
                                <div className="info-text">
                                    <h4>E-Posta</h4>
                                    <p>info@zmkagency.com</p>
                                </div>
                            </a>

                            <a href="https://wa.me/905413812114" target="_blank" rel="noopener noreferrer" className="info-card">
                                <div className="info-icon">
                                    <Phone size={24} />
                                </div>
                                <div className="info-text">
                                    <h4>Telefon / WhatsApp</h4>
                                    <p>+90 541 381 21 14</p>
                                </div>
                            </a>

                            <div className="social-connect">
                                <p style={{ color: '#888', marginBottom: '15px', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '0.8rem', fontWeight: 'bold' }}>Sosyal Medya</p>
                                <div style={{ display: 'flex', gap: '15px' }}>
                                    <a href="https://instagram.com/agencyzmk" className="social-btn"><Instagram size={20} /></a>
                                    <a href="https://youtube.com/@ZMKAGENCY" className="social-btn"><Youtube size={20} /></a>
                                    <a href="https://linkedin.com" className="social-btn"><Linkedin size={20} /></a>
                                    <a href="https://x.com/zmkagency" className="social-btn"><Twitter size={20} /></a>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Column: Premium Form */}
                        <motion.div
                            className="glass-form-container"
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <form onSubmit={handleSubmit}>
                                <div className={`form-group ${focusedField === 'name' ? 'focused' : ''}`}>
                                    <label>{contactData.namePlaceholder || "ADINIZ SOYADINIZ"}</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-input"
                                        value={formData.name}
                                        onChange={handleInput}
                                        onFocus={() => setFocusedField('name')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                    />
                                </div>

                                <div className={`form-group ${focusedField === 'phone' ? 'focused' : ''}`}>
                                    <label>{contactData.phonePlaceholder || "TELEFON NUMARANIZ"}</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="form-input"
                                        value={formData.phone}
                                        onChange={handleInput}
                                        onFocus={() => setFocusedField('phone')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                    />
                                </div>

                                <div className={`form-group ${focusedField === 'service' ? 'focused' : ''}`}>
                                    <label>İLGİLENDİĞİNİZ HİZMET</label>
                                    <select
                                        name="service"
                                        className="form-input"
                                        style={{ backgroundColor: 'transparent', color: '#fff' }}
                                        value={formData.service}
                                        onChange={handleInput}
                                        onFocus={() => setFocusedField('service')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                    >
                                        <option value="" disabled>Seçiniz...</option>
                                        <option value="Web / Yazılım" style={{ color: '#000' }}>Web / Yazılım</option>
                                        <option value="Sosyal Medya" style={{ color: '#000' }}>Sosyal Medya</option>
                                        <option value="Reklam & SEO" style={{ color: '#000' }}>Reklam & SEO</option>
                                        <option value="Tümü (Büyüme)" style={{ color: '#000' }}>Tüm Hizmetler (Büyüme)</option>
                                    </select>
                                </div>

                                <div className={`form-group ${focusedField === 'budget' ? 'focused' : ''}`}>
                                    <label>AYLIK REKLAM / PROJE BÜTÇESİ</label>
                                    <select
                                        name="budget"
                                        className="form-input"
                                        style={{ backgroundColor: 'transparent', color: '#fff' }}
                                        value={formData.budget}
                                        onChange={handleInput}
                                        onFocus={() => setFocusedField('budget')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                    >
                                        <option value="" disabled>Seçiniz...</option>
                                        <option value="10.000₺ - 25.000₺" style={{ color: '#000' }}>10.000₺ - 25.000₺</option>
                                        <option value="25.000₺ - 50.000₺" style={{ color: '#000' }}>25.000₺ - 50.000₺</option>
                                        <option value="50.000₺ - 100.000₺+" style={{ color: '#000' }}>50.000₺ - 100.000₺+</option>
                                        <option value="Sadece Proje (Tek Seferlik)" style={{ color: '#000' }}>Sadece Proje (Tek Seferlik)</option>
                                    </select>
                                </div>

                                <div className={`form-group ${focusedField === 'message' ? 'focused' : ''}`}>
                                    <label>{contactData.messagePlaceholder || "PROJE DETAYLARI VE HEDEFLERİNİZ"}</label>
                                    <textarea
                                        name="message"
                                        className="form-textarea"
                                        rows="5"
                                        value={formData.message}
                                        onChange={handleInput}
                                        onFocus={() => setFocusedField('message')}
                                        onBlur={() => setFocusedField(null)}
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="submit-btn-apex"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? (
                                        <div className="spinner"></div>
                                    ) : (
                                        <>
                                            {contactData.submit || "GÖNDER"} <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>

                                <AnimatePresence>
                                    {status === 'success' && (
                                        <motion.div
                                            className="form-status success"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                        >
                                            <CheckCircle size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '5px' }} />
                                            Mesajınız başarıyla iletildi.
                                        </motion.div>
                                    )}
                                    {status === 'error' && (
                                        <motion.div
                                            className="form-status error"
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                        >
                                            <AlertCircle size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '5px' }} />
                                            Bir hata oluştu.
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </form>
                        </motion.div>
                    </div>

                    {/* Full Width Map */}
                    <motion.div
                        className="map-container-apex"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        style={{ marginTop: '100px', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3062.657922248882!2d33.51357877651368!3d39.859492171221714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4081de10352ef20d%3A0xc304245973979720!2sDelice%20%C4%B0%C5%9F%20Han%C4%B1!5e0!3m2!1str!2str!4v1707130000000!5m2!1str!2str"
                            width="100%"
                            height="500"
                            style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </motion.div>
                </div>
            </section>
        </>
    );
};

export default Contact;
