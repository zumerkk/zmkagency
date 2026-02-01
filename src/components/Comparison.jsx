import React from 'react';
import '../styles/Comparison.css';

const Comparison = ({ t }) => {
    return (
        <section className="comparison-section">
            <div className="container">
                <h2 className="section-title">{t.title}</h2>
                <div className="comparison-table glass-panel">
                    <div className="comp-header">
                        <div className="comp-col empty-col"></div>
                        <div className="comp-col standard-col">{t.standard}</div>
                        <div className="comp-col zmk-col">ZMK AGENCY</div>
                    </div>

                    {t.rows.map((row, idx) => (
                        <div className="comp-row" key={idx}>
                            <div className="comp-feature">{row.feature}</div>
                            <div className="comp-val standard-val">{row.standard}</div>
                            <div className="comp-val zmk-val">{row.zmk}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Comparison;
