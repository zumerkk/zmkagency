import React, { useState } from 'react';
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



    // Better handle change with name attribute
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
            <div className="container contact-container">
                <div className="contact-header">
                    <h2 className="section-title">{t.title}</h2>
                    <p className="contact-subtitle">{t.subtitle}</p>
                </div>

                <form className="contact-form glass-panel" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            placeholder={t.namePlaceholder}
                            value={formData.name}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            placeholder={t.emailPlaceholder}
                            value={formData.email}
                            onChange={handleInput}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            name="message"
                            placeholder={t.messagePlaceholder}
                            rows="4"
                            value={formData.message}
                            onChange={handleInput}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="submit-btn" disabled={status === 'loading'}>
                        {status === 'loading' ? '...' : (status === 'success' ? 'Gönderildi!' : t.submit)}
                    </button>
                    {status === 'success' && <p style={{ color: '#86efac', marginTop: '10px', textAlign: 'center' }}>Mesajınız alındı!</p>}
                    {status === 'error' && <p style={{ color: '#fca5a5', marginTop: '10px', textAlign: 'center' }}>Bir hata oluştu.</p>}
                </form>

                <div className="contact-info">
                    <p>{t.location}</p>
                    <a href="mailto:info@zmkagency.com">info@zmkagency.com</a>
                    <a href="tel:+905413812114" style={{ marginTop: '10px', display: 'block' }}>0541 381 21 14</a>
                </div>
            </div>
        </section>
    );
};

export default Contact;
