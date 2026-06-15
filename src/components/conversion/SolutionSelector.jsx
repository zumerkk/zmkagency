import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../../styles/Conversion.css';
import { Briefcase, Target, Cpu, TrendingUp } from 'lucide-react';

const iconMap = {
    esnaf: <Target className="selector-icon" size={32} />,
    kurumsal: <Briefcase className="selector-icon" size={32} />,
    yazilim: <Cpu className="selector-icon" size={32} />,
    reklam: <TrendingUp className="selector-icon" size={32} />
};

const SolutionSelector = ({ t }) => {
    const navigate = useNavigate();

    const handleAction = (id) => {
        if (id === 'esnaf') navigate('/esnaf-paket');
        else if (id === 'kurumsal') navigate('/services');
        else if (id === 'yazilim') navigate('/services/ozel-yazilim-app');
        else navigate('/pricing');
    };

    if (!t || !t.items) return null;

    return (
        <section className="solution-selector section-padding bg-dark">
            <div className="container">
                <div className="section-header text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="section-title"
                    >
                        {t.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="section-subtitle"
                    >
                        {t.subtitle}
                    </motion.p>
                </div>

                <div className="selector-grid">
                    {t.items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="selector-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => handleAction(item.id)}
                            whileHover={{ y: -5, scale: 1.02 }}
                        >
                            <div className="icon-wrapper">
                                {iconMap[item.id]}
                            </div>
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                            <span className="selector-action">{item.action} &rarr;</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SolutionSelector;
