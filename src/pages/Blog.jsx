import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User, Search } from 'lucide-react';
import SEO from '../components/SEO';
import { blogData } from '../data/blogData';
import '../styles/Blog.css';

const Blog = ({ t }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('Tümü');

    // Extract unique categories
    const categories = useMemo(() => {
        const cats = ['Tümü', ...new Set(blogData.map(p => p.category))];
        return cats;
    }, []);

    // Filter posts
    const filteredPosts = useMemo(() => {
        return blogData.filter(post => {
            const matchesSearch = searchTerm === '' ||
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.keywords.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'Tümü' || post.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory]);

    // Sort: newest first
    const sortedPosts = useMemo(() => {
        return [...filteredPosts].reverse();
    }, [filteredPosts]);

    return (
        <div className="blog-page">
            <SEO
                title="Kırıkkale Dijital Pazarlama Blog | ZMK Magazine"
                description="Kırıkkale'deki işletmeler için dijital pazarlama, SEO, sosyal medya, web tasarım ve yazılım trendleri. ZMK Agency uzman içerikleri."
                keywords="kırıkkale dijital pazarlama blog, kırıkkale seo rehberi, kırıkkale web tasarım blog"
            />

            <header className="blog-header">
                <div className="container">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        ZMK <span className="highlight">MAGAZINE</span>.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Dijital dünyanın nabzını tutun. Kırıkkale ve ötesinden trendler, rehberler ve stratejiler.
                    </motion.p>
                </div>
            </header>

            {/* Search & Filter Bar */}
            <section className="blog-filter-section container">
                <div className="blog-search-wrapper">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Blog yazılarında ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="blog-search-input"
                    />
                </div>
                <div className="blog-categories">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`blog-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            <section className="blog-grid-section container">
                {sortedPosts.length === 0 && (
                    <div className="blog-no-results">
                        <p>Aramanızla eşleşen yazı bulunamadı.</p>
                    </div>
                )}
                <div className="blog-grid">
                    {sortedPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            className="blog-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: Math.min(index * 0.05, 0.3) }}
                        >
                            <div className="card-image-wrapper">
                                <img src={post.image} alt={post.title} className="card-image" loading="lazy" />
                                <span className="card-category">{post.category}</span>
                            </div>
                            <div className="card-content">
                                <div className="card-meta">
                                    <span><Calendar size={14} /> {post.date}</span>
                                    <span><User size={14} /> {post.author}</span>
                                </div>
                                <h2>{post.title}</h2>
                                <p>{post.excerpt}</p>
                                <Link to={`/blog/${post.slug}`} className="read-more">
                                    Devamını Oku <ArrowRight size={16} />
                                </Link>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Blog;
