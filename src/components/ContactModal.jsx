import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, CheckCircle, AlertCircle, Phone, Mail } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import '../styles/ContactModal.css';

const ContactModal = ({ t, onClose }) => {
    const ct = t?.contact || {};
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        service: '',
        budget: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await addDoc(collection(db, 'leads'), {
                ...formData,
                type: 'Contact Modal (Bize Ulaşın)',
                status: 'New',
                timestamp: serverTimestamp()
            });
            setStatus('success');
            setFormData({ name: '', phone: '', service: '', budget: '', message: '' });
        } catch (error) {
            console.error("Error adding document: ", error);
            setStatus('error');
        }
    };

    const serviceOptions = [
        'Web / Yazılım',
        'Sosyal Medya Yönetimi',
        'Reklam Yönetimi (Google & Meta)',
        'Marka Kimliği & Prodüksiyon',
        'Esnaf Dijitalleşme Paketi',
        'ZMK Spesiyel (360° Paket)',
        'Tümü / Büyüme Danışmanlığı'
    ];

    const budgetOptions = [
        '8.000₺ - 15.000₺',
        '15.000₺ - 30.000₺',
        '30.000₺ - 60.000₺',
        '60.000₺ - 120.000₺+',
        'Sadece Proje (Tek Seferlik)'
    ];

    return (
        <AnimatePresence>
            <motion.div
                className="cm-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="cm-container"
                    initial={{ opacity: 0, y: 40, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 40, scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="cm-rainbow-bar" />

                    <button className="cm-close" onClick={onClose}>
                        <X size={20} />
                    </button>

                    {status === 'success' ? (
                        <div className="cm-success">
                            <CheckCircle size={48} className="cm-success-icon" />
                            <h3>Mesajınız Alındı!</h3>
                            <p>En kısa sürede size dönüş yapacağız.</p>
                            <button className="cm-btn-secondary" onClick={onClose}>Kapat</button>
                        </div>
                    ) : (
                        <>
                            <div className="cm-header">
                                <h2>{ct.title || 'Haydi Başlayalım.'}</h2>
                                <p>{ct.subtitle || 'Dijital dönüşümünüz bir mesaj uzağınızda.'}</p>
                            </div>

                            {/* Quick Contact Info */}
                            <div className="cm-quick-info">
                                <a href="tel:+905413812114"><Phone size={14} /> +90 541 381 21 14</a>
                                <a href="mailto:info@zmkagency.com"><Mail size={14} /> info@zmkagency.com</a>
                            </div>

                            <form onSubmit={handleSubmit} className="cm-form">
                                <div className="cm-row">
                                    <div className="cm-field">
                                        <label>Ad Soyad</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInput}
                                            placeholder="Adınız Soyadınız"
                                            required
                                        />
                                    </div>
                                    <div className="cm-field">
                                        <label>Telefon</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInput}
                                            placeholder="05XX XXX XX XX"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="cm-row">
                                    <div className="cm-field">
                                        <label>İlgilendiğiniz Hizmet</label>
                                        <select name="service" value={formData.service} onChange={handleInput} required>
                                            <option value="" disabled>Seçiniz...</option>
                                            {serviceOptions.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="cm-field">
                                        <label>Bütçe Aralığı</label>
                                        <select name="budget" value={formData.budget} onChange={handleInput} required>
                                            <option value="" disabled>Seçiniz...</option>
                                            {budgetOptions.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="cm-field">
                                    <label>Proje Detayları</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInput}
                                        placeholder="Hayalinizdeki projeyi anlatın..."
                                        rows="3"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="cm-submit-btn"
                                    disabled={status === 'loading'}
                                >
                                    {status === 'loading' ? (
                                        <span className="cm-spinner" />
                                    ) : (
                                        <>
                                            {ct.submit || 'Projeyi Başlat'} <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>

                                {status === 'error' && (
                                    <div className="cm-error-msg">
                                        <AlertCircle size={16} /> Bir hata oluştu. Lütfen tekrar deneyin.
                                    </div>
                                )}
                            </form>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ContactModal;
