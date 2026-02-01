import React from 'react';
import '../styles/Clients.css';

const clients = [
    "GM DANIŞMANLIK",
    "YİĞİT OTO SERVİS",
    "TENCERE APP",
    "ATLAS DERSLİK",
    "OLİMPİYAT YÜZME KULÜBÜ"
];

const Clients = ({ t }) => {
    return (
        <section className="clients-section">
            <div className="container">
                <p className="clients-title">{t.title}</p>
                <div className="clients-slider">
                    <div className="clients-track">
                        {/* Double the logos for seamless loop. Tripled here to ensure enough width for text. */}
                        {[...clients, ...clients, ...clients].map((client, index) => (
                            <div key={index} className="client-logo-text">
                                {client}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Clients;
