import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/ui/Reveal';
import PageHero from '../components/ui/PageHero';
import { DisplayHeading, Button, ArrowRight } from '../components/ui';
import { blogData } from '../data/blogData';
import siteConfig from '../config/siteConfig';
import '../styles/home.css';
import '../styles/page.css';
import '../styles/pages/blog.css';

/**
 * /blog — ZMK Magazine index.
 *
 * Rebuilt as an editorial index: the newest post leads with a large media
 * block, the rest are dense rows. Search and category filtering are unchanged.
 *
 * Post images are 500–700 KB PNGs. Only the lead post loads eagerly; every
 * other image is lazy with an explicit aspect ratio so the list cannot shift
 * as they arrive.
 */
const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tümü');

  const categories = useMemo(
    () => ['Tümü', ...new Set(blogData.map((p) => p.category))],
    []
  );

  const filteredPosts = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return blogData.filter((post) => {
      const matchesSearch =
        q === '' ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.keywords.toLowerCase().includes(q);
      const matchesCategory = activeCategory === 'Tümü' || post.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  const [lead, ...rest] = filteredPosts;

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'ZMK Magazine',
    url: `${siteConfig.url}/blog`,
    publisher: { '@type': 'Organization', '@id': `${siteConfig.url}/#organization` },
    blogPost: blogData.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      author: { '@type': 'Organization', name: post.author },
      url: `${siteConfig.url}/blog/${post.slug}`,
    })),
  };

  return (
    <>
      <SEO
        title="Kırıkkale Dijital Pazarlama Blog | ZMK Magazine"
        description="Dijital pazarlama, SEO, web tasarım ve yazılım üzerine ZMK Agency içerikleri. Kırıkkale ve Türkiye geneli işletmeler için pratik rehberler."
        keywords="dijital pazarlama blog, seo rehberi, kırıkkale dijital pazarlama, web tasarım blog"
        schema={blogSchema}
      />

      <PageHero
        label="ZMK Magazine"
        crumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'Magazine' }]}
        lines={['Dijitalde ne oluyor,', <span className="zmk-dim" key="2">ne işe yarıyor.</span>]}
        lead="Pazarlama, SEO, yazılım ve marka üzerine yazdıklarımız. Teorik değil, sahada işe yarayan tarafı."
      />

      <section className="zmk-chapter zmk-chapter--carbon">
        <div className="zmk-container">
          {/* Filter row */}
          <Reveal className="blog-filter r-up">
            <div className="blog-filter__search">
              <label className="zmk-sr-only" htmlFor="blog-search">Yazılarda ara</label>
              <input
                id="blog-search"
                type="search"
                placeholder="Yazılarda ara…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="blog-filter__cats" role="group" aria-label="Kategoriye göre filtrele">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`work-filter__btn ${activeCategory === cat ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          {filteredPosts.length === 0 && (
            <p className="blog-empty">Aramanıza uygun yazı bulunamadı.</p>
          )}

          {/* Lead post */}
          {lead && (
            <Reveal className="blog-lead">
              <Link to={`/blog/${lead.slug}`} className="blog-lead__link">
                <div className="blog-lead__media r-media">
                  <img
                    src={lead.image}
                    alt=""
                    className="r-scale"
                    width="1200" height="630"
                    loading="eager" fetchPriority="high" decoding="sync"
                  />
                </div>
                <div className="blog-lead__meta">
                  <p className="zmk-micro blog-meta">
                    {lead.category} · {lead.date}
                  </p>
                  <h2 className="blog-lead__title">{lead.title}</h2>
                  <p className="blog-lead__excerpt">{lead.excerpt}</p>
                  <span className="zmk-cta blog-lead__cue">Yazıyı oku <ArrowRight /></span>
                </div>
              </Link>
            </Reveal>
          )}

          {/* The rest, as an index */}
          {rest.length > 0 && (
            <ul className="blog-index">
              {rest.map((post, i) => (
                <li key={post.slug}>
                  <Reveal className="blog-row r-up" delay={Math.min(i, 6) * 50}>
                    <Link to={`/blog/${post.slug}`} className="blog-row__link">
                      <div className="blog-row__thumb">
                        <img
                          src={post.image}
                          alt=""
                          width="400" height="225"
                          loading="lazy" decoding="async"
                        />
                      </div>
                      <div className="blog-row__body">
                        <p className="zmk-micro blog-meta">{post.category} · {post.date}</p>
                        <h3 className="blog-row__title">{post.title}</h3>
                        <p className="blog-row__excerpt">{post.excerpt}</p>
                      </div>
                      <span className="blog-row__cue" aria-hidden="true"><ArrowRight /></span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="zmk-chapter zmk-chapter--ivory chapter-closing">
        <div className="zmk-container">
          <Reveal className="chapter-closing__inner">
            <DisplayHeading
              as="h2"
              className="chapter-closing__title"
              lines={['Okumak yerine', <span className="zmk-dim" key="2">uygulayalım mı?</span>]}
            />
            <div className="chapter-closing__foot r-up">
              <div className="chapter-closing__actions">
                <Button to="/iletisim">Projeni Konuşalım</Button>
                <Button href={siteConfig.contact.whatsapp} variant="ghost">WhatsApp'tan Ulaş</Button>
              </div>
              <p className="chapter-closing__note">{siteConfig.hours.note}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default Blog;
