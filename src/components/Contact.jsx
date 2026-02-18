import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Contact.css';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { MapPin, Mail, Phone, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const Contact = ({ t }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
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
                name: formData.name,
                phone: formData.phone,
                message: formData.message,
                type: 'Contact Form',
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
        <section id="contact" className="contact-section">
            {/* Background Atmosphere */}
            <div className="contact-glow-1"></div>
            <div className="contact-glow-2"></div>

            <div className="container contact-container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="contact-header"
                >
                    <h2 className="section-title">{t.title}</h2>
                    <p className="contact-subtitle">{t.subtitle}</p>
                </motion.div>

                <div className="contact-content-wrapper">
                    {/* Left Column: Info Cards */}
                    <motion.div
                        className="contact-info-wrapper"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <a href="https://maps.app.goo.gl/YourMapLinkHere" target="_blank" rel="noopener noreferrer" className="info-card">
                            <div className="info-icon">
                                <MapPin size={24} />
                            </div>
                            <div className="info-text">
                                <h4>Adres</h4>
                                <p>Delice İş Hanı, Yenidoğan, Hürriyet Cd. No: 6/50 Kat:5, 71200 Merkez/Kırıkkale</p>
                            </div>
                        </a>

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
                    </motion.div>

                    {/* Right Column: Glass Form */}
                    <motion.div
                        className="glass-form-container"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <form onSubmit={handleSubmit}>
                            <div className={`form-group ${focusedField === 'name' ? 'focused' : ''}`}>
                                <label>{t.namePlaceholder || "ADINIZ"}</label>
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
                                <label>{t.phonePlaceholder || "TELEFON"}</label>
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
                            <div className={`form-group ${focusedField === 'message' ? 'focused' : ''}`}>
                                <label>{t.messagePlaceholder || "PROJE DETAYLARI"}</label>
                                <textarea
                                    name="message"
                                    className="form-textarea"
                                    rows="4"
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
                                        {t.submit || "GÖNDER"} <ArrowRight size={18} />
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
                                        Mesajınız alındı. En kısa sürede dönüş yapacağız.
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
                                        Bir hata oluştu. Lütfen WhatsApp üzerinden ulaşın.
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
