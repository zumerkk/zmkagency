import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, User, Tag, Share2 } from 'lucide-react';
import SEO from '../components/SEO';
import { blogData } from '../data/blogData';
import '../styles/Blog.css'; // Utilizing existing styles + inline for detail specific

const BlogDetail = () => {
    const { slug } = useParams();
    const post = blogData.find(p => p.slug === slug);

    if (!post) {
        return <Navigate to="/blog" replace />; // Or 404
    }

    return (
        <>
            <SEO
                title={`${post.title} | ZMK Magazine`}
                description={post.excerpt}
                keywords={post.keywords}
                ogType="article"
                ogImage={post.image}
            />

            <article className="blog-detail-page" style={{ paddingTop: '120px', paddingBottom: '80px', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
                {/* Hero / Header Image */}
                <div className="container" style={{ maxWidth: '900px' }}>
                    <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '30px', textDecoration: 'none' }}>
                        <ArrowLeft size={20} /> Blog'a Dön
                    </Link>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="detail-category" style={{
                            background: 'var(--accent-primary)',
                            color: 'white',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            fontSize: '14px',
                            fontWeight: '600',
                            display: 'inline-block',
                            marginBottom: '20px'
                        }}>
                            {post.category}
                        </span>

                        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: '1.2', marginBottom: '30px' }}>
                            {post.title}
                        </h1>

                        <div className="detail-meta" style={{ display: 'flex', gap: '20px', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={16} /> {post.date}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><User size={16} /> {post.author}</span>
                        </div>

                        <div className="detail-image" style={{ borderRadius: '24px', overflow: 'hidden', marginBottom: '50px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                            <img src={post.image} alt={post.title} style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </div>

                        <div
                            className="detail-content"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                            style={{
                                fontSize: '18px',
                                lineHeight: '1.8',
                                color: '#e0e0e0',
                                marginBottom: '40px'
                            }}
                        />

                        {/* LEAD MAGNET / CTA */}
                        <div style={{
                            background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.1), rgba(0, 0, 0, 0.8))',
                            border: '1px solid rgba(37, 211, 102, 0.3)',
                            borderRadius: '24px',
                            padding: '40px',
                            textAlign: 'center',
                            marginTop: '60px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                        }}>
                            <h3 style={{ fontSize: '24px', color: '#fff', marginBottom: '15px' }}>Zamanınızı Uygulamaya Değil, İşinizi Büyütmeye Ayırın</h3>
                            <p style={{ color: '#ccc', marginBottom: '25px', fontSize: '16px', lineHeight: '1.6' }}>Rehberi okudunuz, ancak stratejiyi kusursuz bir şekilde hayata geçirecek profesyonel bir ekibe mi ihtiyacınız var? Sizin için "Saha Kurtları" olarak devreye girelim.</p>
                            <Link to="/contact" style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '15px 30px',
                                background: '#25D366',
                                color: '#000',
                                borderRadius: '12px',
                                fontWeight: 'bold',
                                fontSize: '16px',
                                textDecoration: 'none'
                            }}>
                                Ücretsiz Proje Analizi İsteyin
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </article>
        </>
    );
};

export default BlogDetail;
