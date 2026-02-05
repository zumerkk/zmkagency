import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, User } from 'lucide-react';
import SEO from '../components/SEO';
import { blogData } from '../data/blogData';
import '../styles/Blog.css';

const Blog = ({ t }) => {
    return (
        <div className="blog-page">
            <SEO title="ZMK Magazine | Dijital İçgörüler" description="Teknoloji, tasarım ve pazarlama dünyasından en son trendler ve analizler." />

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
                        {t.about.blog ? t.about.blog.subtitle : "Dijital dünyanın nabzını tutun."}
                    </motion.p>
                </div>
            </header>

            <section className="blog-grid-section container">
                <div className="blog-grid">
                    {blogData.map((post, index) => (
                        <motion.article
                            key={post.id}
                            className="blog-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="card-image-wrapper">
                                <img src={post.image} alt={post.title} className="card-image" />
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
