import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/ui/Reveal';
import PageHero from '../components/ui/PageHero';
import { DisplayHeading, Button, TextCTA, ArrowRight } from '../components/ui';
import WizardForm from '../components/WizardForm';
import siteConfig from '../config/siteConfig';
import { pillars } from '../data/capabilities';
import '../styles/home.css';
import '../styles/page.css';

/**
 * Local SEO landing template — renders all 84 /kirikkale-* routes.
 *
 * Migrated to the V2 design system. Two things changed beyond presentation,
 * both deliberate:
 *
 * 1. The `proof` block is no longer rendered. It carried invented statistics
 *    ("%300+ Ortalama ROI", "50+ Referans") and named testimonials from people
 *    who cannot be verified ("Ahmet Y. - Yüksel İnşaat"), duplicated across 25
 *    data entries. Publishing fabricated endorsements is a trust and
 *    advertising-compliance problem, so the slot is now filled by the real
 *    capability content instead. The data is still in localSeoData.js — wire
 *    it back in once the testimonials are real and the client has consented.
 *
 * 2. The generic <Testimonials> block was removed for the same reason.
 *
 * Everything else — title, description, keywords, canonical, ogImage, both
 * schemas, heroTitle/Subtitle, workflow, longContent, relatedLinks, faq — is
 * preserved exactly as it comes from src/data/localSeoData.js.
 */
const LocalLanding = ({ data, t }) => {
  const [showWizard, setShowWizard] = useState(false);

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: data.title, item: `${siteConfig.url}/${data.slug}` },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.serviceName,
    description: data.description,
    provider: { '@type': 'Organization', '@id': `${siteConfig.url}/#organization` },
    areaServed: {
      '@type': 'City',
      name: siteConfig.address.locality,
    },
  };

  return (
    <>
      <SEO
        title={data.title}
        description={data.description}
        keywords={data.keywords || `kırıkkale ${data.serviceName}, kırıkkale reklam, zmk agency`}
        schema={[faqSchema, serviceSchema]}
        breadcrumbs={breadcrumbSchema}
        canonical={`${siteConfig.url}/${data.slug}`}
        ogImage={data.ogImage}
      />

      <PageHero
        label={`${siteConfig.address.locality}, TR`}
        crumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: data.serviceName }]}
        lines={[data.heroTitle]}
        lead={data.heroSubtitle}
        actions={
          <>
            <Button onClick={() => setShowWizard(true)}>Teklif Alın</Button>
            <Button to="/calismalar" variant="ghost">Çalışmalarımızı İncele</Button>
          </>
        }
      />

      {/* Process */}
      <section className="zmk-chapter zmk-chapter--carbon">
        <div className="zmk-container">
          <Reveal className="page-head">
            <p className="zmk-micro">Süreç</p>
            <h2 className="zmk-h2 r-up">{data.serviceName} nasıl ilerliyor?</h2>
          </Reveal>

          <Reveal className="local-points">
            {data.workflow.map((step, i) => (
              <div className="local-point r-up" key={step.title} style={{ transitionDelay: `${i * 80}ms` }}>
                <p className="zmk-micro local-point__n">
                  {String(step.step ?? i + 1).toString().padStart(2, '0')}
                </p>
                <h3 className="local-point__title">{step.title}</h3>
                <p className="local-point__text">{step.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Long-form SEO content */}
      {data.longContent?.length > 0 && (
        <section className="zmk-chapter zmk-chapter--obsidian">
          <div className="zmk-container zmk-container--narrow">
            {data.longContent.map((block, idx) => (
              <Reveal className="local-article r-up" key={idx} delay={idx * 60}>
                {block.h2 && <h2 className="local-article__h2">{block.h2}</h2>}
                {block.h3 && <h3 className="local-article__h3">{block.h3}</h3>}
                {block.text && <p className="local-article__text">{block.text}</p>}
                {block.list && (
                  <ul className="local-article__list">
                    {block.list.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                )}
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Why ZMK — capability, stated without invented numbers */}
      <section className="zmk-chapter zmk-chapter--graphite">
        <div className="zmk-container">
          <Reveal className="page-head">
            <p className="zmk-micro">Neden ZMK</p>
            <h2 className="zmk-h2 r-up">
              Tek ajans. <span className="zmk-dim">Birden fazla disiplin.</span>
            </h2>
            <p className="zmk-lead r-up">
              {siteConfig.address.locality} merkezliyiz, Türkiye çapında çalışıyoruz. Marka,
              yazılım, dijital büyüme ve prodüksiyon aynı ekipte olduğu için işin tamamı
              tek strateji altında ilerliyor.
            </p>
          </Reveal>

          <Reveal className="tile-grid">
            {pillars.map((pillar, i) => (
              <Link className="tile r-up" to={`/${pillar.slug}`} key={pillar.id} style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="zmk-micro tile__n">{pillar.number}</span>
                <h3 className="tile__title">{pillar.title}</h3>
                <p className="tile__text">{pillar.headline}</p>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="zmk-chapter zmk-chapter--obsidian">
        <div className="zmk-container">
          <Reveal className="page-head">
            <p className="zmk-micro">SSS</p>
            <h2 className="zmk-h2 r-up">Merak edilenler</h2>
          </Reveal>

          <Reveal className="local-faq">
            {data.faq.map((item, i) => (
              <div className="local-faq__item r-up" key={item.q} style={{ transitionDelay: `${i * 60}ms` }}>
                <h3 className="local-faq__q">{item.q}</h3>
                <p className="local-faq__a">{item.a}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Related services — the internal link mesh these pages exist for */}
      {data.relatedLinks?.length > 0 && (
        <section className="zmk-chapter zmk-chapter--carbon">
          <div className="zmk-container">
            <Reveal className="page-head">
              <p className="zmk-micro">İlgili hizmetler</p>
              <h2 className="zmk-h2 r-up">Bunlar da ilginizi çekebilir</h2>
            </Reveal>

            <Reveal className="local-related">
              {data.relatedLinks.map((link, i) => (
                <Link className="local-related__item r-up" to={`/${link.slug}`} key={link.slug} style={{ transitionDelay: `${i * 50}ms` }}>
                  <span className="local-related__title">{link.title}</span>
                  <span className="local-related__cue" aria-hidden="true"><ArrowRight /></span>
                </Link>
              ))}
            </Reveal>

            <Reveal className="r-up" style={{ marginTop: 'var(--s7)' }}>
              <TextCTA to="/hizmetler">Tüm hizmetler</TextCTA>
            </Reveal>
          </div>
        </section>
      )}

      {/* Closing */}
      <section className="zmk-chapter zmk-chapter--ivory chapter-closing">
        <div className="zmk-container">
          <Reveal className="chapter-closing__inner">
            <DisplayHeading
              as="h2"
              className="chapter-closing__title"
              lines={[`${data.serviceName} için`, <span className="zmk-dim" key="2">konuşalım.</span>]}
            />
            <div className="chapter-closing__foot r-up">
              <div className="chapter-closing__actions">
                <Button onClick={() => setShowWizard(true)}>Teklif Alın</Button>
                <Button href={siteConfig.contact.whatsapp} variant="ghost">WhatsApp'tan Ulaş</Button>
              </div>
              <p className="chapter-closing__note">{siteConfig.hours.note}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {showWizard && <WizardForm t={t.wizard} onClose={() => setShowWizard(false)} />}
    </>
  );
};

export default LocalLanding;
