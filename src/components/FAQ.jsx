import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/FAQ.css';

const FAQItem = ({ question, answer, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            className={`faq-item ${isOpen ? 'open' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
        >
            <div className="faq-question">
                <span>{question}</span>
                <span className="faq-toggle">{isOpen ? '−' : '+'}</span>
            </div>
            <div className="faq-answer">
                <p>{answer}</p>
            </div>
        </motion.div>
    );
};

const FAQ = ({ t }) => {
    return (
        <section className="faq-section" aria-label="Sık Sorulan Sorular">
            <div className="faq-inner">
                <div className="faq-header">
                    <motion.span
                        className="faq-eyebrow"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        SSS
                    </motion.span>
                    <motion.h2
                        className="faq-headline"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        {t.title}
                    </motion.h2>
                </div>
                <div className="faq-list">
                    {t.items.map((item, idx) => (
                        <FAQItem key={idx} question={item.q} answer={item.a} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
