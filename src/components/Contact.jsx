import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Contact.css';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Contact = ({ t }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
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
                email: formData.email,
                message: formData.message,
                type: 'Contact Form',
                status: 'New',
                timestamp: serverTimestamp()
            });
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(''), 3000);
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
                    <motion.form
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="contact-form glass-panel"
                        onSubmit={handleSubmit}
                    >
                        <div className={`form-group ${focusedField === 'name' ? 'focused' : ''}`}>
                            <label>ADINIZ</label>
                            <input
                                type="text"
                                name="name"
                                placeholder={t.namePlaceholder}
                                value={formData.name}
                                onChange={handleInput}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => setFocusedField(null)}
                                required
                            />
                        </div>
                        <div className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}>
                            <label>E-POSTA</label>
                            <input
                                type="email"
                                name="email"
                                placeholder={t.emailPlaceholder}
                                value={formData.email}
                                onChange={handleInput}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                required
                            />
                        </div>
                        <div className={`form-group ${focusedField === 'message' ? 'focused' : ''}`}>
                            <label>PROJE DETAYLARI</label>
                            <textarea
                                name="message"
                                placeholder={t.messagePlaceholder}
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
                            className="submit-btn"
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? (
                                <span className="loading-spinner"></span>
                            ) : (
                                status === 'success' ? 'MESAJ İLETİLDİ ✓' : t.submit
                            )}
                        </button>
                        {status === 'success' && <p className="success-message">Size en kısa sürede dönüş yapacağız.</p>}
                        {status === 'error' && <p className="error-message">Bir hata oluştu. Lütfen tekrar deneyin.</p>}
                    </motion.form>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 1 }}
                        className="contact-info"
                    >
                        <div className="info-item location">
                            <span className="icon">📍</span>
                            <span className="text">Kırıkkale, Türkiye</span>
                        </div>
                        <div className="info-divider"></div>
                        <a href="mailto:info@zmkagency.com" className="info-item">
                            <span className="icon">✉️</span>
                            <span className="text">info@zmkagency.com</span>
                        </a>
                        <div className="info-divider"></div>
                        <a href="tel:+905413812114" className="info-item">
                            <span className="icon">📞</span>
                            <span className="text">0541 381 21 14</span>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
