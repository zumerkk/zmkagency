import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Comparison.css';

const Comparison = ({ t }) => {
    return (
        <section className="cmp-section" aria-label="Karşılaştırma">
            <div className="cmp-inner">
                <div className="cmp-header">
                    <motion.span
                        className="cmp-eyebrow"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Karşılaştırma
                    </motion.span>
                    <motion.h2
                        className="cmp-headline"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1, duration: 0.8 }}
                    >
                        {t.title}
                    </motion.h2>
                </div>

                <motion.div
                    className="cmp-table-wrap"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <table className="cmp-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th className="cmp-th-standard">{t.standard}</th>
                                <th className="cmp-th-zmk">
                                    <span className="cmp-zmk-badge">
                                        <span className="zmk-badge-dot"></span>
                                        ZMK
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {t.rows.map((row, i) => (
                                <motion.tr
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                                >
                                    <td className="cmp-feature">{row.feature}</td>
                                    <td className="cmp-standard">
                                        <span className="cmp-x-icon">✕</span>
                                        {row.standard}
                                    </td>
                                    <td className="cmp-zmk">
                                        <span className="cmp-check-icon">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#30d158" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                                        </span>
                                        {row.zmk}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </div>
        </section>
    );
};

export default Comparison;
