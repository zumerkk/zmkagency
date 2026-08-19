import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/ui/Reveal';
import PageHero from '../components/ui/PageHero';
import { DisplayHeading, Button, ArrowRight } from '../components/ui';
import { works, disciplineLabels } from '../data/workData';
import { pillars } from '../data/capabilities';
import siteConfig from '../config/siteConfig';
import '../styles/home.css';
import '../styles/page.css';

const FILTERS = [
  { id: 'all', label: 'Tümü' },
  ...pillars.map((p) => ({ id: p.id, label: p.title })),
];

/**
 * /calismalar — the portfolio.
 *
 * The previous version rendered nine equally sized cards, each with a monogram
 * tile and its own hardcoded accent colour (indigo, cyan, amber, violet, green,
 * teal, orange, red, purple). That per-item colour scatter was the single
 * strongest "generated template" signal on the site.
 *
 * Now it uses the same large case blocks as the homepage gallery: one shared
 * palette, and a hierarchy — whichever project leads the current filter gets a
 * full-width slot. It also reads from src/data/workData.js instead of keeping
 * a second copy of the project list, so the homepage and this page can never
 * disagree about what ZMK has shipped.
 */
const PortfolioPage = () => {
  const [filter, setFilter] = useState('all');
  const visible = filter === 'all' ? works : works.filter((w) => w.disciplines.includes(filter));

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'ZMK Agency Seçilmiş Çalışmalar',
    itemListElement: works.map((work, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: work.title,
      description: work.summary,
    })),
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Çalışmalar', item: `${siteConfig.url}/calismalar` },
    ],
  };

  return (
    <>
      <SEO
        title="Çalışmalar"
        description="ZMK Agency'nin marka, yazılım, dijital büyüme ve prodüksiyon alanlarında yürüttüğü seçilmiş işler."
        keywords="kırıkkale web tasarım referansları, zmk agency projeler, kırıkkale reklam ajansı işleri"
        schema={itemListSchema}
        breadcrumbs={breadcrumbs}
      />

      <PageHero
        label="Çalışmalar"
        crumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'Çalışmalar' }]}
        lines={['Teslim ettiğimiz projeler değil,', <span className="zmk-dim" key="2">kurduğumuz sistemler.</span>]}
        lead="Farklı sektörlerde, farklı disiplinlerde. Ortak nokta: her biri bir işletmenin gerçek bir problemini çözmek için kuruldu."
        actions={
          <>
            <Button to="/iletisim">Projeni Konuşalım</Button>
            <Button to="/hizmetler" variant="ghost">Hizmetleri İncele</Button>
          </>
        }
      />

      <section className="zmk-chapter zmk-chapter--obsidian">
        <div className="zmk-container">
          {/* Filter as an editorial row, not a bank of pill buttons. */}
          <Reveal className="work-filter r-up">
            <span className="zmk-micro work-filter__label">Disiplin</span>
            <div className="work-filter__options" role="group" aria-label="Disipline göre filtrele">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`work-filter__btn ${filter === f.id ? 'is-active' : ''}`}
                  onClick={() => setFilter(f.id)}
                  aria-pressed={filter === f.id}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <span className="zmk-micro work-filter__count">{visible.length} proje</span>
          </Reveal>

          <div className="work-gallery">
            {visible.map((work, i) => (
              <Reveal
                key={work.id}
                className={`work-case work-case--${i === 0 ? 'lead' : 'standard'}`}
                delay={i === 0 ? 0 : 60}
              >
                <div className="work-case__link">
                  <div className="work-case__media r-media">
                    {work.image ? (
                      <img className="work-case__img r-scale" src={work.image} alt={work.title} loading="lazy" decoding="async" />
                    ) : (
                      <div className="work-case__placeholder" aria-hidden="true">
                        <span className="work-case__monogram">
                          {work.title.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                        </span>
                      </div>
                    )}
                    <span className="work-case__scrim" aria-hidden="true" />
                  </div>

                  <div className="work-case__meta">
                    <p className="zmk-micro work-case__sector">{work.sector}</p>
                    <h2 className="work-case__name">{work.title}</h2>
                    <p className="work-case__summary">{work.summary}</p>
                    <ul className="work-case__disciplines">
                      {work.disciplines.map((d) => <li key={d}>{disciplineLabels[d]}</li>)}
                    </ul>
                    <ul className="work-deliverables">
                      {work.deliverables.map((d) => <li key={d}>{d}</li>)}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="zmk-chapter zmk-chapter--carbon">
        <div className="zmk-container">
          <Reveal className="page-head">
            <p className="zmk-micro">Disiplinler</p>
            <h2 className="zmk-h2 r-up">Bu işleri hangi ekiple yapıyoruz?</h2>
          </Reveal>

          <Reveal className="tile-grid">
            {pillars.map((pillar, i) => (
              <Link className="tile r-up" to={`/${pillar.slug}`} key={pillar.id} style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="zmk-micro tile__n">{pillar.number}</span>
                <h3 className="tile__title">{pillar.title}</h3>
                <p className="tile__text">{pillar.headline}</p>
                <span className="pillar-other__cue" aria-hidden="true"><ArrowRight /></span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="zmk-chapter zmk-chapter--ivory chapter-closing">
        <div className="zmk-container">
          <Reveal className="chapter-closing__inner">
            <DisplayHeading
              as="h2"
              className="chapter-closing__title"
              lines={['Sıradaki proje', <span className="zmk-dim" key="2">sizinki olsun.</span>]}
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

export default PortfolioPage;
