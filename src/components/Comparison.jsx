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
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
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
                                    <span className="cmp-zmk-badge">ZMK</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {t.rows.map((row, i) => (
                                <tr key={i}>
                                    <td className="cmp-feature">{row.feature}</td>
                                    <td className="cmp-standard">{row.standard}</td>
                                    <td className="cmp-zmk">{row.zmk}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </motion.div>
            </div>
        </section>
    );
};

export default Comparison;
