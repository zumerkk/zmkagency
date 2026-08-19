import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
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
 * /blog/:slug — article.
 *
 * The body is author-written HTML injected with dangerouslySetInnerHTML, which
 * is unchanged: the source is our own data file, not user input. All of its
 * typography now comes from the `.article-body` descendant rules in blog.css
 * instead of inline styles, so articles inherit the site's reading measure.
 */
const BlogDetail = () => {
  const { slug } = useParams();
  const post = blogData.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const index = blogData.findIndex((p) => p.slug === slug);
  const next = blogData[(index + 1) % blogData.length];
  const related = blogData
    .filter((p) => p.slug !== slug && p.category === post.category)
    .slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.image?.startsWith('http') ? post.image : `${siteConfig.url}${post.image}`,
    datePublished: post.date,
    keywords: post.keywords,
    author: { '@type': 'Organization', name: post.author },
    publisher: { '@type': 'Organization', '@id': `${siteConfig.url}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.url}/blog/${post.slug}` },
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Magazine', item: `${siteConfig.url}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${siteConfig.url}/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        keywords={post.keywords}
        ogType="article"
        ogImage={post.image}
        schema={articleSchema}
        breadcrumbs={breadcrumbs}
      />

      <PageHero
        label={`${post.category} · ${post.date}`}
        crumbs={[
          { label: 'Ana Sayfa', to: '/' },
          { label: 'Magazine', to: '/blog' },
          { label: post.title },
        ]}
        lines={[post.title]}
        lead={post.excerpt}
      />

      {/* Hero image */}
      <section className="zmk-chapter zmk-chapter--carbon zmk-chapter--tight">
        <div className="zmk-container zmk-container--narrow">
          <Reveal className="article-hero r-media">
            <img
              src={post.image}
              alt=""
              width="1200" height="630"
              loading="eager" fetchPriority="high" decoding="sync"
            />
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section className="zmk-chapter zmk-chapter--carbon">
        <div className="zmk-container zmk-container--narrow">
          <Reveal
            className="article-body r-up"
            /* Source is our own data file, not user input. */
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <Reveal className="article-cta r-up">
            <h2 className="article-cta__title">
              Rehberi okudunuz. <span className="zmk-gold">Uygulayalım mı?</span>
            </h2>
            <p className="article-cta__text">
              Stratejiyi hayata geçirecek ekibe ihtiyacınız varsa, mevcut durumu birlikte
              değerlendirelim.
            </p>
            <Button to="/iletisim">Projeni Konuşalım</Button>
          </Reveal>
        </div>
      </section>

      {/* Related + next */}
      <section className="zmk-chapter zmk-chapter--obsidian">
        <div className="zmk-container">
          <Reveal className="page-head">
            <p className="zmk-micro">Devamı</p>
            <h2 className="zmk-h2 r-up">Bunlar da ilginizi çekebilir</h2>
          </Reveal>

          <Reveal className="local-related">
            {(related.length ? related : [next]).map((p, i) => (
              <Link className="local-related__item r-up" to={`/blog/${p.slug}`} key={p.slug} style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="local-related__title">{p.title}</span>
                <span className="local-related__cue" aria-hidden="true"><ArrowRight /></span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Closing */}
      <section className="zmk-chapter zmk-chapter--ivory chapter-closing">
        <div className="zmk-container">
          <Reveal className="chapter-closing__inner">
            <DisplayHeading
              as="h2"
              className="chapter-closing__title"
              lines={['Sıradaki adımı', <span className="zmk-dim" key="2">birlikte planlayalım.</span>]}
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

export default BlogDetail;
