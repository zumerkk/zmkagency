import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/ui/Reveal';
import { DisplayHeading, Button, TextCTA, ArrowRight, MediaFrame } from '../components/ui';
import { pillars, processSteps } from '../data/capabilities';
import { works, disciplineLabels } from '../data/workData';
import siteConfig from '../config/siteConfig';
import '../styles/home.css';
import '../styles/pillar.css';

/**
 * One template driving all four pillar routes.
 *
 * Each pillar carries its own accent — set as `--pillar-accent` on the root,
 * which every accented element in pillar.css reads from. Brand is ivory,
 * Growth gold, Software blue, Studio warm gold. That is what stops the four
 * pages from reading as the same page with the words swapped, without
 * fragmenting the design system.
 */
const ACCENTS = {
  brand: { accent: 'var(--ivory)', ground: 'obsidian', wash: 'rgba(246,244,239,0.06)' },
  growth: { accent: 'var(--gold)', ground: 'carbon', wash: 'rgba(201,154,61,0.1)' },
  software: { accent: 'var(--zmk-blue-light)', ground: 'graphite', wash: 'rgba(10,86,245,0.12)' },
  studio: { accent: 'var(--gold-light)', ground: 'umber', wash: 'rgba(219,176,102,0.1)' },
};

const PillarDetail = ({ pillarId }) => {
  const pillar = pillars.find((p) => p.id === pillarId);
  if (!pillar) return null;

  const theme = ACCENTS[pillarId] || ACCENTS.growth;
  const related = works.filter((w) => w.disciplines.includes(pillarId)).slice(0, 3);
  const others = pillars.filter((p) => p.id !== pillarId);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: pillar.title,
    provider: { '@type': 'Organization', '@id': `${siteConfig.url}/#organization` },
    areaServed: { '@type': 'Country', name: 'Türkiye' },
    description: pillar.outcome,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `ZMK ${pillar.title}`,
      itemListElement: pillar.services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: service },
      })),
    },
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Hizmetler', item: `${siteConfig.url}/hizmetler` },
      { '@type': 'ListItem', position: 3, name: pillar.title, item: `${siteConfig.url}/${pillar.slug}` },
    ],
  };

  return (
    <>
      <SEO
        title={`${pillar.title} Hizmetleri`}
        description={pillar.outcome.slice(0, 155)}
        schema={serviceSchema}
        breadcrumbs={breadcrumbs}
      />

      <article
        className={`pillar pillar--${pillarId}`}
        style={{ '--pillar-accent': theme.accent, '--pillar-wash': theme.wash }}
      >
        {/* -- Hero ------------------------------------------------------- */}
        <header className={`pillar-hero pillar-hero--${theme.ground} zmk-grain`}>
          <div className="pillar-hero__wash" aria-hidden="true" />
          <div className="zmk-container pillar-hero__inner">
            <nav className="pillar-crumbs" aria-label="Sayfa yolu">
              <Link to="/">Ana Sayfa</Link>
              <span aria-hidden="true">/</span>
              <Link to="/hizmetler">Hizmetler</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{pillar.title}</span>
            </nav>

            <p className="zmk-micro pillar-hero__label">
              <span className="pillar-hero__n">{pillar.number}</span> {pillar.label}
            </p>

            <h1 className="zmk-display pillar-hero__title">{pillar.headline}</h1>
            <p className="zmk-lead pillar-hero__lead">{pillar.outcome}</p>

            <div className="pillar-hero__actions">
              <Button to="/iletisim">Projeni Konuşalım</Button>
              <Button to="/calismalar" variant="ghost">Çalışmalarımızı İncele</Button>
            </div>
          </div>
        </header>

        {/* -- Scope ------------------------------------------------------ */}
        <section className="zmk-chapter zmk-chapter--obsidian">
          <div className="zmk-container">
            <Reveal className="pillar-scope__head">
              <p className="zmk-micro">Kapsam</p>
              <h2 className="zmk-h2 r-up">Bu başlık altında neler yapıyoruz?</h2>
            </Reveal>

            <Reveal className="pillar-scope">
              {pillar.services.map((service, i) => (
                <div className="pillar-service r-up" key={service} style={{ transitionDelay: `${i * 55}ms` }}>
                  <span className="zmk-micro pillar-service__n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="pillar-service__name">{service}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* -- Media band -------------------------------------------------- */}
        <section className="zmk-chapter zmk-chapter--carbon zmk-chapter--tight">
          <div className="zmk-container">
            <Reveal className="pillar-media">
              <MediaFrame
                src={related[0]?.image}
                ratio="21 / 9"
                label={`${pillar.title} · Çalışma görselleri`}
                alt={`${pillar.title} çalışmaları`}
              />
            </Reveal>
          </div>
        </section>

        {/* -- Process ----------------------------------------------------- */}
        <section className="zmk-chapter zmk-chapter--obsidian">
          <div className="zmk-container">
            <Reveal className="pillar-process__head">
              <p className="zmk-micro">Süreç</p>
              <DisplayHeading
                as="h2"
                className="pillar-process__title"
                lines={['Proje teslim etmiyoruz.', <span className="pillar-accent" key="2">Sistem kuruyoruz.</span>]}
              />
            </Reveal>

            <Reveal className="pillar-process">
              {processSteps.map((step, i) => (
                <div className="pillar-step r-up" key={step.number} style={{ transitionDelay: `${i * 70}ms` }}>
                  <span className="zmk-micro pillar-step__n">{step.number}</span>
                  <h3 className="pillar-step__title">{step.title}</h3>
                  <p className="pillar-step__text">{step.text}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* -- Related work ------------------------------------------------ */}
        {related.length > 0 && (
          <section className="zmk-chapter zmk-chapter--carbon">
            <div className="zmk-container">
              <Reveal className="pillar-work__head">
                <p className="zmk-micro">Çalışmalar</p>
                <h2 className="zmk-h2 r-up">Bu alanda yaptığımız işler</h2>
              </Reveal>

              <div className="pillar-work">
                {related.map((work, i) => (
                  <Reveal className="pillar-work__item" key={work.id} delay={i * 90}>
                    <MediaFrame src={work.image} ratio="4 / 3" label={work.title} alt={work.title} tone="carbon" />
                    <p className="zmk-micro pillar-work__sector">{work.sector}</p>
                    <h3 className="pillar-work__name">{work.title}</h3>
                    <p className="pillar-work__summary">{work.summary}</p>
                    <ul className="pillar-work__tags">
                      {work.disciplines.map((d) => <li key={d}>{disciplineLabels[d]}</li>)}
                    </ul>
                  </Reveal>
                ))}
              </div>

              <Reveal className="pillar-work__foot r-up">
                <TextCTA to="/calismalar">Tüm çalışmalar</TextCTA>
              </Reveal>
            </div>
          </section>
        )}

        {/* -- Other disciplines -------------------------------------------- */}
        <section className="zmk-chapter zmk-chapter--obsidian">
          <div className="zmk-container">
            <Reveal className="pillar-others__head">
              <p className="zmk-micro">Diğer disiplinler</p>
              <h2 className="zmk-h2 r-up">Tek ajans. <span className="zmk-dim">Birden fazla disiplin.</span></h2>
            </Reveal>

            <Reveal className="pillar-others">
              {others.map((other, i) => (
                <Link className="pillar-other r-up" to={`/${other.slug}`} key={other.id} style={{ transitionDelay: `${i * 80}ms` }}>
                  <span className="zmk-micro pillar-other__n">{other.number}</span>
                  <h3 className="pillar-other__title">{other.title}</h3>
                  <p className="pillar-other__headline">{other.headline}</p>
                  <span className="pillar-other__cue" aria-hidden="true"><ArrowRight /></span>
                </Link>
              ))}
            </Reveal>
          </div>
        </section>

        {/* -- CTA ----------------------------------------------------------- */}
        <section className="zmk-chapter zmk-chapter--ivory chapter-closing">
          <div className="zmk-container">
            <Reveal className="chapter-closing__inner">
              <DisplayHeading
                as="h2"
                className="chapter-closing__title"
                lines={[`${pillar.title} tarafında`, <span className="zmk-dim" key="2">bir ihtiyacınız mı var?</span>]}
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
      </article>
    </>
  );
};

export default PillarDetail;
