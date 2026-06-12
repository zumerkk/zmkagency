import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import '../styles/Testimonials.css';

const partners = [
    { name: 'Atlas Derslik', monogram: 'AD', category: 'Eğitim', icon: '🎓' },
    { name: 'İlanPort', monogram: 'İP', category: 'Teknoloji', icon: '🚀' },
    { name: 'TencereApp', monogram: 'TA', category: 'Teknoloji', icon: '📱' },
    { name: 'ZBeauty', monogram: 'ZB', category: 'Güzellik', icon: '💎' },
    { name: 'Hira Butik', monogram: 'HB', category: 'Moda', icon: '👗' },
    { name: 'Olimpiyat Spor Kulübü', monogram: 'OS', category: 'Spor', icon: '🏆' },
    { name: 'Mert Nakliyat', monogram: 'MN', category: 'Lojistik', icon: '🚛' },
    { name: 'Kafkas Çiğköfte', monogram: 'KÇ', category: 'Gastronomi', icon: '🍽️' },
    { name: 'Tunç Kuruyemiş', monogram: 'TK', category: 'Gastronomi', icon: '🥜' },
    { name: 'Köfteci Orhan', monogram: 'KO', category: 'Gastronomi', icon: '🔥' },
    { name: 'ENTAŞ', monogram: 'EN', category: 'Sanayi', icon: '🏗️' },
    { name: 'ENTEC', monogram: 'ET', category: 'Mühendislik', icon: '⚙️' },
    { name: 'RAVEN SPORT', monogram: 'RS', category: 'Spor', icon: '🦅' },
    { name: 'Kahvaltı Konağı', monogram: 'KK', category: 'Gastronomi', icon: '🍳' },
    { name: 'Yuvam Apart', monogram: 'YA', category: 'Konaklama', icon: '🏠' },
];

/* ── Animated counter ── */
const AnimatedCounter = ({ target, suffix = '' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const end = parseInt(target);
        const duration = 2000;
        const increment = end / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [isInView, target]);

    return <span ref={ref}>{count}{suffix}</span>;
};

/* ── Single partner card ── */
const PartnerCard = ({ partner, index }) => (
    <motion.div
        className="ptr-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ delay: index * 0.06, duration: 0.6, type: 'spring', stiffness: 90 }}
        whileHover={{ y: -12, scale: 1.03 }}
    >
        {/* Glow beacon */}
        <div className="ptr-glow" />

        {/* Category pill */}
        <span className="ptr-category">{partner.category}</span>

        {/* Icon ring */}
        <div className="ptr-icon-ring">
            <div className="ptr-icon-inner">
                <span className="ptr-emoji">{partner.icon}</span>
            </div>
            {/* Orbiting dot */}
            <span className="ptr-orbit-dot" />
        </div>

        {/* Monogram */}
        <span className="ptr-monogram">{partner.monogram}</span>

        {/* Name */}
        <span className="ptr-name">{partner.name}</span>

        {/* Shine sweep (hover) */}
        <div className="ptr-shine" />
    </motion.div>
);

/* ── Section ── */
const Testimonials = () => {
    return (
        <section className="ptr-section" id="partners" aria-label="İş Ortaklarımız">
            {/* Background layers */}
            <div className="ptr-bg-grid" />
            <div className="ptr-bg-radial" />
            <div className="ptr-bg-noise" />

            <div className="ptr-inner">
                {/* ─ Header ─ */}
                <div className="ptr-header">
                    <motion.span
                        className="ptr-eyebrow"
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="ptr-eyebrow-line" />
                        Birlikte Büyüyoruz
                        <span className="ptr-eyebrow-line" />
                    </motion.span>

                    <motion.h2
                        className="ptr-headline"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.12, duration: 0.9 }}
                    >
                        İş Ortaklarımız<span className="ptr-dot">.</span>
                    </motion.h2>

                    <motion.p
                        className="ptr-tagline"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.25 }}
                    >
                        Vizyonumuzu paylaşan, birlikte zirveye koştuğumuz markalar.
                        <br />
                        Farklı sektörlerden güçlü isimler, tek bir hedef: <strong>Dijital mükemmellik.</strong>
                    </motion.p>
                </div>

                {/* ─ Stats strip ─ */}
                <motion.div
                    className="ptr-stats"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="ptr-stat">
                        <span className="ptr-stat-value"><AnimatedCounter target="15" suffix="+" /></span>
                        <span className="ptr-stat-label">Aktif İş Ortağı</span>
                    </div>
                    <div className="ptr-stat-divider" />
                    <div className="ptr-stat">
                        <span className="ptr-stat-value"><AnimatedCounter target="10" /></span>
                        <span className="ptr-stat-label">Farklı Sektör</span>
                    </div>
                    <div className="ptr-stat-divider" />
                    <div className="ptr-stat">
                        <span className="ptr-stat-value"><AnimatedCounter target="100" suffix="%" /></span>
                        <span className="ptr-stat-label">Müşteri Memnuniyeti</span>
                    </div>
                </motion.div>

                {/* ─ Partner Grid ─ */}
                <div className="ptr-grid">
                    {partners.map((partner, index) => (
                        <PartnerCard key={partner.name} partner={partner} index={index} />
                    ))}
                </div>

                {/* ─ Bottom CTA ─ */}
                <motion.div
                    className="ptr-bottom"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="ptr-cta-text">
                        Esnafından kurumsal firmasına, <em>hayallerine sahip çıkan</em> herkes için buradayız.
                    </p>
                    <div className="ptr-cta-badge">
                        <span className="ptr-badge-pulse" />
                        Yeni ortaklıklar için görüşmelere açığız
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;
