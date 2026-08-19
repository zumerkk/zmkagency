import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import Reveal from '../components/ui/Reveal';
import { DisplayHeading, Button, ArrowRight } from '../components/ui';
import { pillars, processSteps, industries } from '../data/capabilities';
import siteConfig from '../config/siteConfig';
import '../styles/home.css';
import '../styles/pillar.css';

const monthlyScope = [
  { pillar: 'Marka', items: ['Marka tutarlılığı denetimi', 'Kampanya görselleri', 'Basılı & dijital materyal'] },
  { pillar: 'Büyüme', items: ['İçerik planı ve üretimi', 'Reklam yönetimi ve bütçe optimizasyonu', 'SEO çalışmaları'] },
  { pillar: 'Yazılım', items: ['Web/sistem bakımı ve güncellemeler', 'Yeni özellik geliştirme', 'Ölçüm altyapısı'] },
  { pillar: 'Prodüksiyon', items: ['Aylık çekim günü', 'Reels & kısa video', 'Ürün / mekân görselleri'] },
];

const commitments = [
  { title: 'Tek strateji', text: 'Marka, reklam, yazılım ve prodüksiyon kararları birbirini bilerek alınır. Dört ayrı tedarikçiyle dört ayrı yön çizilmez.' },
  { title: 'Tek raporlama', text: 'Her ay tek bir raporda: ne yapıldı, ne ölçüldü, gelecek ay ne planlanıyor. Kanal kanal ayrı rapor kovalamazsınız.' },
  { title: 'Tek muhatap', text: 'Süreci yöneten sabit bir ekibiniz olur. Her yeni iş için baştan brief vermezsiniz.' },
];

/**
 * ZMK 360 — the integrated retainer model.
 *
 * Deliberately no price: the scope of a 360 engagement differs enough between
 * a single-location business and a manufacturer that a published number would
 * be misleading. /fiyatlar carries the packages that can honestly be priced
 * up front.
 */
const Zmk360Page = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'ZMK 360 — Bütünleşik Marka ve Büyüme Yönetimi',
    provider: { '@type': 'Organization', '@id': `${siteConfig.url}/#organization` },
    areaServed: { '@type': 'Country', name: 'Türkiye' },
    description: 'Marka, içerik, reklam, yazılım ve prodüksiyonun tek strateji ve tek raporlama altında aylık yürütüldüğü bütünleşik çalışma modeli.',
  };

  return (
    <>
      <SEO
        title="ZMK 360 — Dışarıdaki Büyüme Departmanınız"
        description="Marka, içerik, reklam, yazılım ve prodüksiyon tek strateji ve tek raporlama altında. ZMK 360, işletmenizin dışarıdaki büyüme ve teknoloji departmanı olarak çalışır."
        schema={schema}
      />

      <article className="pillar" style={{ '--pillar-accent': 'var(--gold)', '--pillar-wash': 'rgba(201,154,61,0.14)' }}>
        {/* -- Hero — the flagship gets the gold ground -------------------- */}
        <header className="pillar-hero pillar-hero--obsidian z360-hero zmk-grain">
          <div className="pillar-hero__wash" aria-hidden="true" />
          <div className="zmk-container pillar-hero__inner">
            <nav className="pillar-crumbs" aria-label="Sayfa yolu">
              <Link to="/">Ana Sayfa</Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page">ZMK 360</span>
            </nav>

            <p className="zmk-micro pillar-hero__label">
              <span className="pillar-hero__n">◆</span> ZMK 360
            </p>

            <DisplayHeading
              as="h1"
              size="mega"
              className="pillar-hero__title z360-hero__title"
              lines={['Bir ajans değil.', <span className="zmk-gold" key="2">Dışarıdaki departmanınız.</span>]}
            />

            <p className="zmk-lead pillar-hero__lead">
              Tek şirket, tek strateji, tek raporlama. Marka, içerik, reklam, yazılım ve
              prodüksiyon aynı ekip tarafından planlanır, yürütülür ve her ay ölçülür.
            </p>

            <div className="pillar-hero__actions">
              <Button to="/iletisim">Projeni Konuşalım</Button>
              <Button to="/fiyatlar" variant="ghost">Paketleri İncele</Button>
            </div>
          </div>
        </header>

        {/* -- Why the model exists ---------------------------------------- */}
        <section className="zmk-chapter zmk-chapter--carbon">
          <div className="zmk-container">
            <Reveal className="pillar-process__head">
              <p className="zmk-micro">Model</p>
              <DisplayHeading
                as="h2"
                className="pillar-process__title"
                lines={['Departman kurmadan', <span className="zmk-dim" key="2">departmanı olan şirket gibi çalışın.</span>]}
              />
              <p className="zmk-lead r-up" style={{ marginTop: 'var(--s5)' }}>
                İçeride bir pazarlama ekibi kurmak; işe alım, eğitim, yazılım lisansları ve
                ekipman demek. ZMK 360 aynı yetkinliği dışarıdan ve tek sözleşmeyle sağlar.
              </p>
            </Reveal>

            <Reveal className="z360-commitments">
              {commitments.map((c, i) => (
                <div className="z360-commitment r-up" key={c.title} style={{ transitionDelay: `${i * 90}ms` }}>
                  <h3 className="z360-commitment__title">{c.title}</h3>
                  <p className="z360-commitment__text">{c.text}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* -- Monthly scope ------------------------------------------------ */}
        <section className="zmk-chapter zmk-chapter--obsidian">
          <div className="zmk-container">
            <Reveal className="pillar-scope__head">
              <p className="zmk-micro">Kapsam</p>
              <h2 className="zmk-h2 r-up">Her ay ne yürüyor?</h2>
              <p className="zmk-lead r-up" style={{ marginTop: 'var(--s5)' }}>
                Kapsam işletmenin ölçeğine göre belirlenir. Aşağıdaki başlıklar bütünleşik
                bir ayın tipik içeriğidir.
              </p>
            </Reveal>

            <Reveal className="z360-scope">
              {monthlyScope.map((group, i) => (
                <div className="r-up" key={group.pillar} style={{ transitionDelay: `${i * 80}ms` }}>
                  <h3 className="zmk-micro z360-scope__pillar">{group.pillar}</h3>
                  <ul className="z360-scope__items">
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* -- Process ------------------------------------------------------ */}
        <section className="zmk-chapter zmk-chapter--carbon">
          <div className="zmk-container">
            <Reveal className="pillar-process__head">
              <p className="zmk-micro">Süreç</p>
              <DisplayHeading
                as="h2"
                className="pillar-process__title"
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
          </div>
        </section>

        {/* -- Disciplines + sectors ---------------------------------------- */}
        <section className="zmk-chapter zmk-chapter--obsidian">
          <div className="zmk-container">
            <Reveal className="pillar-others__head">
              <p className="zmk-micro">Disiplinler</p>
              <h2 className="zmk-h2 r-up">Modelin içindeki dört disiplin</h2>
            </Reveal>

            <Reveal className="pillar-others">
              {pillars.map((pillar, i) => (
                <Link className="pillar-other r-up" to={`/${pillar.slug}`} key={pillar.id} style={{ transitionDelay: `${i * 70}ms` }}>
                  <span className="zmk-micro pillar-other__n">{pillar.number}</span>
                  <h3 className="pillar-other__title">{pillar.title}</h3>
                  <p className="pillar-other__headline">{pillar.headline}</p>
                  <span className="pillar-other__cue" aria-hidden="true"><ArrowRight /></span>
                </Link>
              ))}
            </Reveal>

            <Reveal className="industries-list" style={{ marginTop: 'var(--s9)' }}>
              <p className="zmk-micro r-up" style={{ marginBottom: 'var(--s5)' }}>Çalıştığımız sektörler</p>
              <ul>
                {industries.map((industry, i) => (
                  <li className="industry r-up" key={industry} style={{ transitionDelay: `${i * 50}ms` }}>
                    <span className="industry__n zmk-micro">{String(i + 1).padStart(2, '0')}</span>
                    <span className="industry__name">{industry}</span>
                  </li>
                ))}
              </ul>
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
                lines={['Kapsamı işletmenize göre', <span className="zmk-dim" key="2">birlikte belirleyelim.</span>]}
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

export default Zmk360Page;
