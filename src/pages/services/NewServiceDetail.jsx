import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/SEO';
import Reveal from '../../components/ui/Reveal';
import PageHero from '../../components/ui/PageHero';
import { DisplayHeading, Button, TextCTA } from '../../components/ui';
import { serviceDetails, slugAliases } from '../../data/serviceDetailData';
import siteConfig from '../../config/siteConfig';
import '../../styles/home.css';
import '../../styles/page.css';
import '../../styles/pages/service-detail.css';

/** Extracts the first number from a price string, for Offer schema. */
const firstPriceValue = (price = '') => {
  const match = price.match(/[\d.]+/);
  return match ? match[0].replace(/\./g, '') : undefined;
};

/**
 * Service detail template — 12 routes plus 7 alias slugs.
 *
 * Migrated to the V2 system. The alias resolution and the canonical URL it
 * produces are untouched: `slug` is always the canonical form, so an alias URL
 * still renders the page while pointing its canonical tag at the real one.
 */
const NewServiceDetail = () => {
  const { slug: rawSlug } = useParams();
  const slug = slugAliases[rawSlug] || rawSlug;
  const service = serviceDetails[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <>
        <SEO title="Hizmet Bulunamadı" description="Aradığınız hizmet sayfası bulunamadı." />
        <PageHero
          label="404"
          crumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'Hizmetler', to: '/hizmetler' }, { label: 'Bulunamadı' }]}
          lines={['Bu hizmeti', <span className="zmk-dim" key="2">bulamadık.</span>]}
          lead="Aradığınız sayfa taşınmış veya kaldırılmış olabilir. Tüm hizmetlerimize göz atabilirsiniz."
          actions={<Button to="/hizmetler">Hizmetlere Dön</Button>}
        />
      </>
    );
  }

  const priceValue = firstPriceValue(service.price);

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.value,
    provider: { '@type': 'Organization', '@id': `${siteConfig.url}/#organization` },
    areaServed: { '@type': 'Country', name: 'Türkiye' },
    ...(priceValue && {
      offers: {
        '@type': 'Offer',
        price: priceValue,
        priceCurrency: 'TRY',
        url: `${siteConfig.url}/services/${slug}`,
      },
    }),
  };

  const faqSchema = service.faq?.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: service.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }
    : null;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Hizmetler', item: `${siteConfig.url}/hizmetler` },
      { '@type': 'ListItem', position: 3, name: service.title, item: `${siteConfig.url}/services/${slug}` },
    ],
  };

  const schemas = [serviceSchema, breadcrumbSchema];
  if (faqSchema) schemas.push(faqSchema);

  return (
    <>
      <SEO
        title={service.title}
        description={service.value}
        canonical={`${siteConfig.url}/services/${slug}`}
        schema={schemas}
      />

      <PageHero
        label={service.title}
        crumbs={[
          { label: 'Ana Sayfa', to: '/' },
          { label: 'Hizmetler', to: '/hizmetler' },
          { label: service.title },
        ]}
        lines={[service.title]}
        lead={service.value}
        actions={
          <>
            <Button to="/iletisim">Projeni Konuşalım</Button>
            <Button to="/hizmetler" variant="ghost">Tüm Hizmetler</Button>
          </>
        }
      />

      {/* Scope + commercials */}
      <section className="zmk-chapter zmk-chapter--carbon">
        <div className="zmk-container">
          <div className="sd-grid">
            <Reveal className="sd-main">
              <p className="zmk-micro">Kapsam</p>
              <h2 className="zmk-h2 r-up sd-heading">Neler dahil?</h2>

              <ul className="sd-includes">
                {service.includes.map((item, i) => (
                  <li className="r-up" key={item} style={{ transitionDelay: `${i * 45}ms` }}>{item}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal className="sd-side r-up" delay={120}>
              {service.price && (
                <div className="sd-fact">
                  <p className="zmk-micro sd-fact__label">Başlangıç bütçesi</p>
                  <p className="sd-fact__value sd-fact__value--price">{service.price}</p>
                </div>
              )}

              {service.delivery && (
                <div className="sd-fact">
                  <p className="zmk-micro sd-fact__label">Teslim süresi</p>
                  <p className="sd-fact__value">{service.delivery}</p>
                </div>
              )}

              {service.bundlePrice && (
                <div className="sd-fact">
                  <p className="zmk-micro sd-fact__label">Paket fiyatı</p>
                  <p className="sd-fact__value sd-fact__value--price">{service.bundlePrice}</p>
                  {service.bundleNote && <p className="sd-fact__note">{service.bundleNote}</p>}
                </div>
              )}

              <div className="sd-cta">
                <Button to="/iletisim">Teklif Al</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Audience */}
      {service.audience?.length > 0 && (
        <section className="zmk-chapter zmk-chapter--obsidian">
          <div className="zmk-container">
            <Reveal className="page-head">
              <p className="zmk-micro">Kimin için</p>
              <h2 className="zmk-h2 r-up">Bu hizmet kime uygun?</h2>
            </Reveal>

            <Reveal className="sd-audience">
              {service.audience.map((item, i) => (
                <div className="sd-audience__item r-up" key={item} style={{ transitionDelay: `${i * 70}ms` }}>
                  <span className="zmk-micro sd-audience__n">{String(i + 1).padStart(2, '0')}</span>
                  <p className="sd-audience__text">{item}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* FAQ */}
      {service.faq?.length > 0 && (
        <section className="zmk-chapter zmk-chapter--carbon">
          <div className="zmk-container">
            <Reveal className="page-head">
              <p className="zmk-micro">SSS</p>
              <h2 className="zmk-h2 r-up">Merak edilenler</h2>
            </Reveal>

            <Reveal className="local-faq">
              {service.faq.map((item, i) => (
                <div className="local-faq__item r-up" key={item.q} style={{ transitionDelay: `${i * 60}ms` }}>
                  <h3 className="local-faq__q">{item.q}</h3>
                  <p className="local-faq__a">{item.a}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* Other services */}
      <section className="zmk-chapter zmk-chapter--obsidian">
        <div className="zmk-container">
          <Reveal className="page-head">
            <p className="zmk-micro">Diğer hizmetler</p>
            <h2 className="zmk-h2 r-up">Bunlar da ilginizi çekebilir</h2>
          </Reveal>

          <Reveal className="local-related">
            {Object.entries(serviceDetails)
              .filter(([key]) => key !== slug)
              .slice(0, 6)
              .map(([key, other], i) => (
                <Link className="local-related__item r-up" to={`/services/${key}`} key={key} style={{ transitionDelay: `${i * 50}ms` }}>
                  <span className="local-related__title">{other.title}</span>
                </Link>
              ))}
          </Reveal>

          <Reveal className="r-up" style={{ marginTop: 'var(--s7)' }}>
            <TextCTA to="/hizmetler">Tüm hizmetler</TextCTA>
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
              lines={[`${service.title} için`, <span className="zmk-dim" key="2">konuşalım.</span>]}
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

export default NewServiceDetail;
