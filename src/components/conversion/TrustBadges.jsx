import React from 'react';
import { motion } from 'framer-motion';
import '../../styles/Conversion.css';
import { ShieldCheck, BarChart2, Clock, HeadphonesIcon } from 'lucide-react';

const iconMap = {
    "Sözleşmeli Çalışma": <ShieldCheck size={40} className="trust-icon" />,
    "Canlı Raporlama": <BarChart2 size={40} className="trust-icon" />,
    "Net Teslim Süresi": <Clock size={40} className="trust-icon" />,
    "Sürekli Destek": <HeadphonesIcon size={40} className="trust-icon" />,
    "Contracted Work": <ShieldCheck size={40} className="trust-icon" />,
    "Live Reporting": <BarChart2 size={40} className="trust-icon" />,
    "Clear Delivery Time": <Clock size={40} className="trust-icon" />,
    "Continuous Support": <HeadphonesIcon size={40} className="trust-icon" />
};

const TrustBadges = ({ t }) => {
    if (!t || !t.items) return null;

    return (
        <section className="trust-badges section-padding">
            <div className="container">
                <div className="trust-badges-grid">
                    {t.items.map((item, index) => (
                        <motion.div
                            key={index}
                            className="trust-badge-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="trust-icon-container">
                                {iconMap[item.title] || <ShieldCheck size={40} className="trust-icon" />}
                            </div>
                            <h4>{item.title}</h4>
                            <p>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustBadges;
