import React from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/ui/Reveal';
import PageHero from '../components/ui/PageHero';
import { DisplayHeading, Button, MediaFrame } from '../components/ui';
import { pillars } from '../data/capabilities';
import siteConfig from '../config/siteConfig';
import '../styles/home.css';
import '../styles/page.css';

/**
 * /hakkimizda — About.
 *
 * The old copy led with "Kırıkkale'nin Teknoloji Merkezi" and a set of
 * superlatives. This version answers the only question an About page has to
 * answer — why does this company exist — using the observation the business is
 * actually built on: most businesses are good at their work and bad at being
 * seen doing it, and the suppliers who could fix that never talk to each other.
 *
 * No invented founding date, headcount, team photos or awards. Where a fact
 * would be needed, the page says something true instead.
 */
const gaps = [
  {
    n: '01',
    title: 'İyi ürün, zayıf algı',
    text: 'İşini gerçekten iyi yapan işletmeler, dışarıdan bakınca sıradan görünüyor. Ürün iyi, anlatım eksik.',
  },
  {
    n: '02',
    title: 'Dağınık tedarikçiler',
    text: 'Tasarımcı ayrı, yazılımcı ayrı, reklamcı ayrı. Kimse diğerinin ne yaptığını bilmiyor, marka her elde biraz daha değişiyor.',
  },
  {
    n: '03',
    title: 'Ölçülmeyen harcama',
    text: 'Reklam bütçesi harcanıyor ama hangi kanalın ne getirdiği bilinmiyor. Karar veri yerine izlenime dayanıyor.',
  },
  {
    n: '04',
    title: 'Defterde kalan süreç',
    text: 'Sipariş, stok, teklif ve randevu hâlâ WhatsApp ve Excel üzerinden yürüyor. Büyüdükçe sistem değil, yük büyüyor.',
  },
];

const Vision = ({ t }) => {
  const vision = t.vision || t;

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    url: `${siteConfig.url}/hakkimizda`,
    mainEntity: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      name: siteConfig.legalName,
      slogan: siteConfig.tagline,
    },
  };

  return (
    <>
      <SEO
        title={vision.title}
        description={vision.subtitle}
        keywords="zmk agency hakkında, kırıkkale reklam ajansı, marka danışmanlığı, dijital dönüşüm"
        schema={aboutSchema}
      />

      <PageHero
        label="Hakkımızda"
        crumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'Hakkımızda' }]}
        lines={['İşinizi iyi yapıyorsunuz.', <span className="zmk-dim" key="2">Gerisi bizde.</span>]}
        lead="ZMK; marka, yazılım, dijital büyüme ve prodüksiyonu tek çatı altında birleştirerek işletmelerin dışarıdaki büyüme departmanı olarak çalışır."
        actions={
          <>
            <Button to="/iletisim">Projeni Konuşalım</Button>
            <Button to="/calismalar" variant="ghost">Çalışmalarımızı İncele</Button>
          </>
        }
      />

      {/* Why ZMK exists */}
      <section className="zmk-chapter zmk-chapter--ivory">
        <div className="zmk-container">
          <Reveal className="about-statement">
            <p className="zmk-micro about-statement__label">ZMK neden var?</p>
            <DisplayHeading
              as="h2"
              className="about-statement__title"
              lines={[
                'İşinizi iyi yapıyorsunuz.',
                <span className="zmk-dim" key="2">Biz bunun doğru görünmesini,</span>,
                <span className="zmk-dim" key="3">doğru çalışmasını ve doğru</span>,
                <span className="zmk-dim" key="4">insanlara ulaşmasını sağlıyoruz.</span>,
              ]}
            />
          </Reveal>
        </div>
      </section>

      {/* The four gaps */}
      <section className="zmk-chapter zmk-chapter--carbon">
        <div className="zmk-container">
          <Reveal className="page-head">
            <p className="zmk-micro">Gözlem</p>
            <h2 className="zmk-h2 r-up">
              Çoğu işletmede aynı dört boşluk var.
            </h2>
            <p className="zmk-lead r-up">
              Bu boşluklar tek tek çözülmeye çalışıldığında birbirini bozuyor. ZMK
              tam olarak bu yüzden kuruldu.
            </p>
          </Reveal>

          <Reveal className="about-gaps">
            {gaps.map((gap, i) => (
              <div className="about-gap r-up" key={gap.n} style={{ transitionDelay: `${i * 80}ms` }}>
                <p className="zmk-micro about-gap__n">{gap.n}</p>
                <h3 className="about-gap__title">{gap.title}</h3>
                <p className="about-gap__text">{gap.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* How we answer them */}
      <section className="zmk-chapter zmk-chapter--graphite">
        <div className="zmk-container">
          <Reveal className="page-head">
            <p className="zmk-micro">Cevabımız</p>
            <DisplayHeading
              as="h2"
              lines={['Dört disiplin,', <span className="zmk-gold" key="2">aynı masada.</span>]}
            />
            <p className="zmk-lead r-up">
              Marka kararı yazılımı, yazılım kararı reklamı bilerek alınır. Tek strateji,
              tek ekip, tek raporlama.
            </p>
          </Reveal>

          <Reveal className="tile-grid">
            {pillars.map((pillar, i) => (
              <a className="tile r-up" href={`/${pillar.slug}`} key={pillar.id} style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="zmk-micro tile__n">{pillar.number}</span>
                <h3 className="tile__title">{pillar.title}</h3>
                <p className="tile__text">{pillar.headline}</p>
              </a>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Location positioning */}
      <section className="zmk-chapter zmk-chapter--obsidian">
        <div className="zmk-container">
          <div className="about-place">
            <Reveal className="about-place__copy">
              <p className="zmk-micro">Konum</p>
              <DisplayHeading
                as="h2"
                className="about-place__title"
                lines={['Kırıkkale’den.', <span className="zmk-gold" key="2">Her yerde.</span>]}
              />
              <p className="zmk-lead r-up">
                Kırıkkale merkezliyiz ve burayı iyi biliyoruz — yerel pazar bizim için
                stratejik, tavan değil. Türkiye çapında, sektör ayrımı yapmadan çalışıyoruz.
              </p>
              <div className="about-place__address r-up">
                <p className="zmk-micro">Ofis</p>
                <address>
                  {siteConfig.address.street}<br />
                  {siteConfig.address.postalCode} {siteConfig.address.locality}
                </address>
                <p className="about-place__hours">{siteConfig.hours.display}</p>
              </div>
            </Reveal>

            <Reveal className="about-place__media" delay={120}>
              <MediaFrame src="/media/about/zmk-office.webp" ratio="4 / 5" label="ZMK Ofis" alt="ZMK Agency ofisi" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="zmk-chapter zmk-chapter--ivory chapter-closing">
        <div className="zmk-container">
          <Reveal className="chapter-closing__inner">
            <DisplayHeading
              as="h2"
              className="chapter-closing__title"
              lines={['Bir görüşmeyle', <span className="zmk-dim" key="2">başlayalım.</span>]}
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

export default Vision;
