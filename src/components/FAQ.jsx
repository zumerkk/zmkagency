import React, { useState } from 'react';
import '../styles/FAQ.css';

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`faq-item ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            <div className="faq-question">
                <span>{question}</span>
                <span className="faq-icon">{isOpen ? '−' : '+'}</span>
            </div>
            <div className="faq-answer">
                <p>{answer}</p>
            </div>
        </div>
    );
};

const FAQ = ({ t }) => {
    return (
        <section className="faq-section">
            <div className="container">
                <h2 className="section-title">{t.title}</h2>
                <div className="faq-grid">
                    {t.items.map((item, idx) => (
                        <FAQItem key={idx} question={item.q} answer={item.a} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
