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
        <section className="clients-section" aria-label="Müşteriler">
            <div className="clients-inner">
                <p className="clients-label">{t.title}</p>
                <div className="clients-marquee">
                    <div className="clients-track">
                        {[...clients, ...clients, ...clients].map((client, index) => (
                            <span key={index} className="client-name">{client}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Clients;
