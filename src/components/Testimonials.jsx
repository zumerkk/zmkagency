import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Testimonials.css';

const partners = [
    { name: 'Atlas Derslik', monogram: 'AD' },
    { name: 'İlanPort', monogram: 'IP' },
    { name: 'TencereApp', monogram: 'TA' },
    { name: 'Hira Butik', monogram: 'HB' },
    { name: 'Olimpiyat Spor Kulübü', monogram: 'OS' },
    { name: 'Pedalset', monogram: 'PS' },
    { name: 'Mert Nakliyat', monogram: 'MN' },
    { name: 'Kafkas Çiğköfte', monogram: 'KÇ' },
    { name: 'Tunç Kuruyemiş', monogram: 'TK' },
];

const PartnerCard = ({ partner, index }) => (
    <motion.div
        className="partner-card"
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.06, duration: 0.5, type: 'spring', stiffness: 120 }}
        whileHover={{ y: -8, scale: 1.05 }}
    >
        <div className="partner-icon-wrap">
            <span className="partner-monogram">{partner.monogram}</span>
        </div>
        <span className="partner-name">{partner.name}</span>
    </motion.div>
);

const Testimonials = ({ t }) => {
    return (
        <section className="tst-section" aria-label="İş Ortaklarımız">
            <div className="tst-inner">
                <div className="tst-header">
                    <motion.span
                        className="tst-eyebrow"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Birlikte Büyüyoruz
                    </motion.span>
                    <motion.h2
                        className="tst-headline"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                    >
                        İş Ortaklarımız.
                    </motion.h2>
                    <motion.p
                        className="tst-tagline"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Vizyonumuzu paylaşan, birlikte zirveye koştuğumuz markalar.
                    </motion.p>
                </div>

                <div className="partner-grid">
                    {partners.map((partner, index) => (
                        <PartnerCard key={partner.name} partner={partner} index={index} />
                    ))}
                </div>

                <motion.p
                    className="partner-cta-text"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    Esnafından kurumsal firmasına, hayallerine sahip çıkan herkes için buradayız.
                </motion.p>
            </div>
        </section>
    );
};

export default Testimonials;
