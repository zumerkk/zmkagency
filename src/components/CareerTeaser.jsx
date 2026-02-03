import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const CareerTeaser = ({ t }) => {
    return (
        <section className="career-teaser" style={{ padding: '120px 0', borderTop: '1px solid var(--border-subtle)', background: 'linear-gradient(to top, #050505, #000)' }}>
            <div className="container">
                <div className="career-content" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                    <motion.span
                        style={{ color: '#888', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '14px', marginBottom: '20px', display: 'block' }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                    >
                        Join The Elite
                    </motion.span>
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={{ marginBottom: '30px' }}
                    >
                        Sıradan Olanı<br /><span className="text-gradient">Reddediyoruz.</span>
                    </motion.h2>
                    <motion.p
                        style={{ color: '#888', fontSize: '1.2rem', marginBottom: '50px', lineHeight: '1.8' }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        ZMK Agency sadece bir iş yeri değil. Burası tutkulu, obsesif ve vizyoner zihinlerin buluşma noktası. Eğer 'iyi' sizin için yeterli değilse, konuşalım.
                    </motion.p>
                    <motion.a
                        href="mailto:jobs@zmkagency.com"
                        className="btn-secondary"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                        whileHover={{ scale: 1.05 }}
                    >
                        Başvuru Yap <ArrowRight size={18} />
                    </motion.a>
                </div>
            </div>
        </section>
    );
};

export default CareerTeaser;
