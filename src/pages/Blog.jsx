import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User, Tag } from 'lucide-react';
import SEO from '../components/SEO';
import '../styles/Blog.css';

const Blog = ({ t }) => {
    // Mock Data - In real app this would come from a CMS or MDX
    const posts = [
        {
            id: 1,
            title: "Dijital Dönüşümde Kırıkkale'nin Rolü",
            excerpt: "Anadolu'nun kalbinde başlayan teknolojik devrim. ZMK Agency olarak yerel işletmeleri global standartlara nasıl taşıyoruz?",
            category: "Strateji",
            date: "10 Ekim 2025",
            author: "ZMK Team",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop"
        },
        {
            id: 2,
            title: "Neden 360° Ajans ile Çalışmalısınız?",
            excerpt: "Parçalanmış hizmetler markanızın dilini bozar. Bütünleşik pazarlama stratejisinin ROI üzerindeki sarsılmaz etkisi.",
            category: "Marka",
            date: "25 Eylül 2025",
            author: "Zumer Kekilli",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop"
        },
        {
            id: 3,
            title: "2026 Sosyal Medya Trendleri",
            excerpt: "Yapay zeka, kısa video formatları ve topluluk yönetimi. Markanızı geleceğe hazırlayacak 5 kritik hamle.",
            category: "Trendler",
            date: "12 Eylül 2025",
            author: "Social Team",
            image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200&auto=format&fit=crop"
        }
    ];

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
                    {posts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            className="blog-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
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
                                <button className="read-more">
                                    Devamını Oku <ArrowRight size={16} />
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Blog;
