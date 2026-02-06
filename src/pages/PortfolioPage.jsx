import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import '../styles/Portfolio.css';

const PortfolioPage = ({ t }) => {
    const portfolio = t.portfolio;
    const [filter, setFilter] = useState('all');

    // MOCK DATA AUGMENTATION for Ultra-Premium feel
    // Merging translation items with some high-end placeholders to fill the grid
    const allItems = useMemo(() => {
        const baseItems = portfolio.items.map(item => ({ ...item, id: item.title }));
        const extraItems = [
            { id: 'ex1', title: "Luxe Hotel Kırıkkale", category: "Web & Growth", image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=1000" },
            { id: 'ex2', title: "E-Ticaret Dev", category: "Yazılım & UX", image: "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=1000" },
            { id: 'ex3', title: "Coffee Co. Branding", category: "Marka Kimliği", image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1000" }
        ];
        // Only add extra items if we are in 'tr' mode to avoid language mismatch, or just map categories loosely
        // For now, let's keep it simple and just use base items + extras mapping categories manually if needed.
        // To stay safe with "premium", let's strictly use mostly the base items but maybe duplicate them for demo if needed 
        // OR just stick to the 3 real ones + 3 placeholders if they look good.
        return [...baseItems, ...extraItems];
    }, [portfolio.items]);

    // Extract Categories
    const categories = ['all', 'Marka Kimliği', 'Yazılım & UX', 'Web & Growth'];
    // Mapping for English if needed, but assuming TR primary for Kırıkkale context

    const filteredItems = filter === 'all'
        ? allItems
        : allItems.filter(item => item.category.includes(filter) || (filter === 'Web & Growth' && item.category.includes('Web')));

    return (
        <>
            <SEO
                title={`${portfolio.title} | ZMK Agency`}
                description={portfolio.subtitle}
                keywords="kırıkkale web tasarım referansları, zmk agency projeler, kırıkkale reklam ajansı işleri"
            />
            <div className="page-wrapper portfolio-page" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh', background: '#050505' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="portfolio-page-header"
                    >
                        <h1 className="hero-title">
                            <span className="text-gradient">{portfolio.title}</span>
                        </h1>
                        <p className="hero-subtitle" style={{ maxWidth: '600px', margin: '0 auto', color: '#888' }}>
                            {portfolio.subtitle}
                        </p>
                    </motion.div>

                    {/* Filter Buttons */}
                    <div className="portfolio-filters">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                                onClick={() => setFilter(cat)}
                            >
                                {cat === 'all' ? 'Tüm Projeler' : cat}
                            </button>
                        ))}
                    </div>

                    <motion.div layout className="portfolio-grid">
                        <AnimatePresence>
                            {filteredItems.map((item) => (
                                <motion.div
                                    layout
                                    key={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    className="portfolio-item group"
                                >
                                    <div className="portfolio-thumb" style={{ backgroundImage: `url(${item.image})` }}>
                                        <div className="overlay">
                                            <span className="view-project">{portfolio.viewProject}</span>
                                        </div>
                                    </div>
                                    <div className="portfolio-info">
                                        <span className="portfolio-cat">{item.category}</span>
                                        <h3>{item.title}</h3>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default PortfolioPage;
