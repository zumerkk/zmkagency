import React, { useState } from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/ui/Reveal';
import PageHero from '../components/ui/PageHero';
import { DisplayHeading, Button, TextCTA } from '../components/ui';
import WizardForm from '../components/WizardForm';
import {
  packages, webTiers, serviceCategories, extras, assurances, PERIOD_LABEL,
} from '../data/pricingData';
import siteConfig from '../config/siteConfig';
import '../styles/home.css';
import '../styles/page.css';
import '../styles/pages/pricing.css';

/** Parse "20.000₺ – 25.000₺" → "20000" for Offer schema. */
const lowPrice = (price = '') => {
  const match = price.match(/[\d.]+/);
  return match ? match[0].replace(/\./g, '') : undefined;
};

/**
 * /fiyatlar — pricing.
 *
 * Every figure on this page comes from src/data/pricingData.js and is rendered
 * verbatim. No price is computed, rounded, formatted or hardcoded here; that
 * file stays the single source of truth so a price can never drift between the
 * page, the schema and the proposal.
 *
 * Presentation was rebuilt: the previous version used SaaS-style comparison
 * cards with per-tier accent colours. It now reads as an editorial rate card —
 * price rows with the strikethrough previous price kept where the data has one.
 */
const Pricing = ({ wizardT }) => {
  const [showWizard, setShowWizard] = useState(false);

  const offerSchema = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'ZMK Agency Hizmet ve Fiyat Listesi',
    itemListElement: serviceCategories.flatMap((cat) =>
      cat.items.map((item) => ({
        '@type': 'Offer',
        name: item.name,
        ...(lowPrice(item.price) && {
          priceSpecification: {
            '@type': 'PriceSpecification',
            price: lowPrice(item.price),
            priceCurrency: 'TRY',
          },
        }),
        itemOffered: { '@type': 'Service', name: item.name, description: item.note },
      }))
    ),
  };

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: `${siteConfig.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Fiyatlar', item: `${siteConfig.url}/fiyatlar` },
    ],
  };

  return (
    <>
      <SEO
        title="Hizmetler & Fiyatlandırma 2026 | Web, Sosyal Medya, Reklam, Yazılım"
        description="ZMK Agency 2026 Kırıkkale fiyat listesi: kurumsal web sitesi 20.000₺'den, sosyal medya yönetimi 8.000₺/ay'dan, reklam yönetimi, SEO, çekim, kurumsal kimlik, özel yazılım ve mobil uygulama."
        keywords="kırıkkale web tasarım fiyatları, sosyal medya yönetimi fiyat, reklam ajansı fiyat listesi, kurumsal kimlik fiyat"
        schema={offerSchema}
        breadcrumbs={breadcrumbs}
      />

      <PageHero
        label="Fiyatlar"
        crumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'Fiyatlar' }]}
        lines={['Net kapsam,', <span className="zmk-gold" key="2">net fiyat.</span>]}
        lead="Neyin dahil olduğu baştan bellidir. Aşağıdaki aralıklar başlangıç fiyatlarıdır; kesin teklif kapsam netleştikten sonra verilir."
        actions={
          <>
            <Button onClick={() => setShowWizard(true)}>Teklif Al</Button>
            <Button to="/zmk-360" variant="ghost">ZMK 360'ı İncele</Button>
          </>
        }
      />

      {/* Featured packages */}
      <section className="zmk-chapter zmk-chapter--carbon">
        <div className="zmk-container">
          <Reveal className="page-head">
            <p className="zmk-micro">Paketler</p>
            <h2 className="zmk-h2 r-up">Öne çıkan paketler</h2>
          </Reveal>

          <Reveal className="price-packages">
            {packages.map((pkg, i) => (
              <article className="price-pkg r-up" key={pkg.id} style={{ transitionDelay: `${i * 80}ms` }}>
                <p className="zmk-micro price-pkg__n">{pkg.no}</p>
                <h3 className="price-pkg__name">{pkg.name}</h3>
                <p className="price-pkg__audience">{pkg.audience}</p>

                <p className="price-pkg__price">
                  {pkg.previousPrice && <s className="price-pkg__was">{pkg.previousPrice}</s>}
                  <span className="price-pkg__now">{pkg.price}</span>
                  {pkg.period && <span className="price-pkg__period">{PERIOD_LABEL[pkg.period]}</span>}
                </p>

                {pkg.description && <p className="price-pkg__desc">{pkg.description}</p>}

                {pkg.features?.length > 0 && (
                  <ul className="price-pkg__features">
                    {pkg.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                )}

                <Button onClick={() => setShowWizard(true)} variant="ghost" className="price-pkg__cta">
                  Teklif Al
                </Button>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Web tiers */}
      {webTiers?.length > 0 && (
        <section className="zmk-chapter zmk-chapter--obsidian">
          <div className="zmk-container">
            <Reveal className="page-head">
              <p className="zmk-micro">Web</p>
              <h2 className="zmk-h2 r-up">Web sitesi seviyeleri</h2>
            </Reveal>

            <Reveal className="price-tiers">
              {webTiers.map((tier, i) => (
                <article className="price-tier r-up" key={tier.name} style={{ transitionDelay: `${i * 80}ms` }}>
                  <h3 className="price-tier__name">{tier.name}</h3>
                  <p className="price-tier__price">
                    {tier.previousPrice && <s className="price-pkg__was">{tier.previousPrice}</s>}
                    <span className="price-pkg__now">{tier.price}</span>
                  </p>
                  <p className="price-tier__tagline">{tier.tagline}</p>
                  <ul className="price-tier__features">
                    {tier.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                </article>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* Full rate card, by category */}
      {serviceCategories.map((cat, index) => (
        <section
          className={`zmk-chapter ${index % 2 === 0 ? 'zmk-chapter--carbon' : 'zmk-chapter--obsidian'}`}
          key={cat.id}
          id={cat.id}
          aria-labelledby={`cat-${cat.id}`}
        >
          <div className="zmk-container">
            <Reveal className="page-head">
              <p className="zmk-micro">{String(index + 1).padStart(2, '0')} — Fiyat listesi</p>
              <h2 className="zmk-h2 r-up" id={`cat-${cat.id}`}>{cat.title}</h2>
              {cat.tagline && <p className="zmk-lead r-up">{cat.tagline}</p>}
            </Reveal>

            <Reveal className="price-table">
              {cat.items.map((item, i) => (
                <div className={`price-row r-up ${item.popular ? 'is-popular' : ''}`} key={item.name} style={{ transitionDelay: `${i * 40}ms` }}>
                  <div className="price-row__id">
                    <h3 className="price-row__name">
                      {item.name}
                      {item.popular && <span className="price-row__badge">Çok tercih edilen</span>}
                    </h3>
                    {item.note && <p className="price-row__note">{item.note}</p>}
                  </div>

                  <div className="price-row__price">
                    {item.previousPrice && <s className="price-pkg__was">{item.previousPrice}</s>}
                    <span className="price-pkg__now">{item.price}</span>
                    {item.period && <span className="price-pkg__period">{PERIOD_LABEL[item.period]}</span>}
                  </div>
                </div>
              ))}
            </Reveal>

            {cat.quote && (
              <Reveal className="price-quote r-up">
                <p>{cat.quote}</p>
              </Reveal>
            )}
          </div>
        </section>
      ))}

      {/* Extras */}
      {extras?.length > 0 && (
        <section className="zmk-chapter zmk-chapter--graphite">
          <div className="zmk-container">
            <Reveal className="page-head">
              <p className="zmk-micro">Ek işler</p>
              <h2 className="zmk-h2 r-up">Tek seferlik ek hizmetler</h2>
            </Reveal>

            <Reveal className="price-table">
              {extras.map((extra, i) => (
                <div className="price-row r-up" key={extra.name} style={{ transitionDelay: `${i * 35}ms` }}>
                  <div className="price-row__id">
                    <h3 className="price-row__name">{extra.name}</h3>
                  </div>
                  <div className="price-row__price">
                    <span className="price-pkg__now">{extra.price}</span>
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </section>
      )}

      {/* Assurances */}
      {assurances?.length > 0 && (
        <section className="zmk-chapter zmk-chapter--obsidian">
          <div className="zmk-container">
            <Reveal className="page-head">
              <p className="zmk-micro">Çalışma şeklimiz</p>
              <h2 className="zmk-h2 r-up">Sürpriz maliyet yok</h2>
            </Reveal>

            <Reveal className="price-assurances">
              {assurances.map((a, i) => (
                <div className="price-assurance r-up" key={a.title} style={{ transitionDelay: `${i * 70}ms` }}>
                  <h3 className="price-assurance__title">{a.title}</h3>
                  <p className="price-assurance__text">{a.text}</p>
                </div>
              ))}
            </Reveal>

            <Reveal className="r-up" style={{ marginTop: 'var(--s8)' }}>
              <TextCTA to="/zmk-360">Aylık bütünleşik model: ZMK 360</TextCTA>
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
              lines={['Kapsamı netleştirelim,', <span className="zmk-dim" key="2">kesin teklifi verelim.</span>]}
            />
            <div className="chapter-closing__foot r-up">
              <div className="chapter-closing__actions">
                <Button onClick={() => setShowWizard(true)}>Teklif Al</Button>
                <Button href={siteConfig.contact.whatsapp} variant="ghost">WhatsApp'tan Ulaş</Button>
              </div>
              <p className="chapter-closing__note">{siteConfig.hours.note}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {showWizard && <WizardForm t={wizardT} onClose={() => setShowWizard(false)} />}
    </>
  );
};

export default Pricing;
