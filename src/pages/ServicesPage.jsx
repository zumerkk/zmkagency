import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/ui/Reveal';
import PageHero from '../components/ui/PageHero';
import { DisplayHeading, Button, TextCTA, ArrowRight } from '../components/ui';
import { services } from '../data/servicesData';
import { pillars, processSteps } from '../data/capabilities';
import siteConfig from '../config/siteConfig';
import '../styles/home.css';
import '../styles/page.css';
import '../styles/pages/services.css';

/**
 * Per-discipline accent + ground. The same four-identity system the pillar
 * pages use, so a service block on this page and its dedicated page read as
 * the same thing.
 */
const THEME = {
  brand: { accent: 'var(--ivory)', ground: 'obsidian' },
  growth: { accent: 'var(--gold)', ground: 'carbon' },
  software: { accent: 'var(--zmk-blue-light)', ground: 'graphite' },
  studio: { accent: 'var(--gold-light)', ground: 'umber' },
};

/** Extra capability lists a service may carry, rendered only when present. */
const SPEC_FIELDS = [
  ['platforms', 'Platformlar'],
  ['techStack', 'Teknolojiler'],
  ['tools', 'Araçlar'],
  ['techniques', 'Yöntemler'],
  ['infrastructure', 'Altyapı'],
  ['equipment', 'Ekipman'],
  ['styles', 'Stiller'],
  ['metrics', 'Ölçtüğümüz metrikler'],
  ['deliverables', 'Teslim edilenler'],
  ['target', 'Kimin için'],
];

/**
 * /hizmetler — services overview.
 *
 * Rebuilt from a 634-line component with an inline data array and 888 lines of
 * its own CSS. Each of the six services is now a chapter with the ground and
 * accent of the discipline it belongs to, so the page inherits the homepage's
 * rhythm instead of repeating one card grid six times.
 *
 * Every service name, description, sub-service and capability list is
 * preserved — they live in src/data/servicesData.js now.
 */
const ServicesPage = () => {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'ZMK Agency Hizmetleri',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.title,
        description: s.description,
        provider: { '@type': 'Organization', '@id': `${siteConfig.url}/#organization` },
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Hizmetler', item: `${siteConfig.url}/hizmetler` },
    ],
  };

  return (
    <>
      <SEO
        title="Dijital Hizmetler | 360° Marka, Sosyal Medya, Reklam, Web & Prodüksiyon"
        description="ZMK Agency profesyonel dijital hizmetler: 360° marka yönetimi, sosyal medya, reklam yönetimi, web & mobil uygulama, özel yazılım geliştirme, klip & reklam filmi çekimleri."
        keywords="dijital ajans hizmetleri, marka yönetimi, sosyal medya yönetimi, reklam yönetimi, web geliştirme, yazılım geliştirme, reklam filmi çekimi"
        schema={[serviceSchema, breadcrumbSchema]}
      />

      <PageHero
        label="Hizmetler"
        crumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'Hizmetler' }]}
        lines={['Stratejiden üretime,', <span className="zmk-gold" key="2">koddan çekime.</span>]}
        lead="Bir işletmenin büyümesi için gereken yetkinlikleri parçalara bölmüyoruz. Dört disiplin, tek strateji, tek ekip."
        actions={
          <>
            <Button to="/iletisim">Projeni Konuşalım</Button>
            <Button to="/fiyatlar" variant="ghost">Fiyatları İncele</Button>
          </>
        }
      />

      {/* Discipline index — the four pillars, as an entry point */}
      <section className="zmk-chapter zmk-chapter--obsidian zmk-chapter--tight">
        <div className="zmk-container">
          <Reveal className="tile-grid">
            {pillars.map((pillar, i) => (
              <Link className="tile r-up" to={`/${pillar.slug}`} key={pillar.id} style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="zmk-micro tile__n">{pillar.number}</span>
                <h2 className="tile__title">{pillar.title}</h2>
                <p className="tile__text">{pillar.headline}</p>
                <span className="pillar-other__cue" aria-hidden="true"><ArrowRight /></span>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      {/* One chapter per service */}
      {services.map((service, index) => {
        const theme = THEME[service.pillar] || THEME.growth;
        const specs = SPEC_FIELDS.filter(([key]) => service[key]?.length);

        return (
          <section
            className={`zmk-chapter zmk-chapter--${theme.ground} service-chapter`}
            style={{ '--pillar-accent': theme.accent }}
            key={service.id}
            id={service.id}
            aria-labelledby={`svc-${service.id}`}
          >
            <div className="zmk-container">
              <Reveal className="service-chapter__head">
                <p className="zmk-micro service-chapter__n">
                  {String(index + 1).padStart(2, '0')} — {service.title}
                </p>
                <DisplayHeading
                  as="h2"
                  id={`svc-${service.id}`}
                  className="service-chapter__title"
                  lines={service.headline.split('\n')}
                />
                <p className="service-chapter__tagline r-up">{service.tagline}</p>
                <p className="zmk-lead r-up service-chapter__desc">{service.description}</p>
              </Reveal>

              <Reveal className="service-subs">
                {service.subServices.map((sub, i) => (
                  <div className="service-sub r-up" key={sub.title} style={{ transitionDelay: `${i * 60}ms` }}>
                    <span className="zmk-micro service-sub__n">{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="service-sub__title">{sub.title}</h3>
                    <p className="service-sub__desc">{sub.desc}</p>
                  </div>
                ))}
              </Reveal>

              {specs.length > 0 && (
                <Reveal className="service-specs r-up">
                  {specs.map(([key, label]) => (
                    <div className="service-spec" key={key}>
                      <h3 className="zmk-micro service-spec__label">{label}</h3>
                      <ul className="service-spec__list">
                        {service[key].map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </div>
                  ))}
                </Reveal>
              )}
            </div>
          </section>
        );
      })}

      {/* Process */}
      <section className="zmk-chapter zmk-chapter--carbon">
        <div className="zmk-container">
          <Reveal className="page-head">
            <p className="zmk-micro">Süreç</p>
            <DisplayHeading
              as="h2"
              lines={['Proje teslim etmiyoruz.', <span className="zmk-gold" key="2">Sistem kuruyoruz.</span>]}
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

          <Reveal className="r-up" style={{ marginTop: 'var(--s8)' }}>
            <TextCTA to="/zmk-360">Aylık bütünleşik model: ZMK 360</TextCTA>
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
              lines={['Hangi hizmete', <span className="zmk-dim" key="2">ihtiyacınız olduğunu birlikte bulalım.</span>]}
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

export default ServicesPage;
