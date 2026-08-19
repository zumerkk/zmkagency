import React from 'react';
import { Link } from 'react-router-dom';
import { DisplayHeading, ArrowRight } from '../ui';
import Reveal from '../ui/Reveal';
import { industries, pillars } from '../../data/capabilities';
import siteConfig from '../../config/siteConfig';

/* ==========================================================================
   ZMK 360 — flagship offering.
   Black-to-gold composition, the only place on the page where gold is used
   at scale rather than as a detail. That escalation is what makes it read as
   the flagship rather than as another section.
   ========================================================================== */
export const Zmk360Chapter = () => {
  const orbit = ['Marka', 'İçerik', 'Reklam', 'Web', 'Yazılım', 'Prodüksiyon', 'Analitik'];

  return (
    <section className="chapter-flagship zmk-grain" aria-labelledby="flagship-title">
      <div className="chapter-flagship__glow" aria-hidden="true" />

      <div className="zmk-container chapter-flagship__inner">
        <Reveal className="chapter-flagship__content">
          <p className="zmk-micro chapter-flagship__eyebrow">ZMK 360</p>
          <DisplayHeading
            as="h2"
            id="flagship-title"
            className="chapter-flagship__title"
            lines={['Bir ajans değil.', <span className="zmk-gold" key="2">Dışarıdaki departmanınız.</span>]}
          />
          <p className="zmk-lead r-up chapter-flagship__lead">
            Tek şirket, tek strateji, tek raporlama. Marka, içerik, reklam, yazılım ve
            prodüksiyon aynı ekip tarafından planlanır ve her ay ölçülür.
          </p>
          <div className="r-up chapter-flagship__actions">
            <Link to="/zmk-360" className="zmk-btn">
              ZMK 360'ı İncele <ArrowRight />
            </Link>
          </div>
        </Reveal>

        {/* One hub, seven functions. Static composition, no continuous
            animation — a permanently spinning diagram is a battery cost and a
            distraction. It settles once on reveal and then stays still. */}
        <Reveal className="flagship-orbit" delay={140}>
          <div className="flagship-orbit__ring" aria-hidden="true" />
          <div className="flagship-orbit__ring flagship-orbit__ring--inner" aria-hidden="true" />
          <div className="flagship-orbit__hub">ZMK</div>
          <ul className="flagship-orbit__items">
            {orbit.map((item, i) => (
              <li
                key={item}
                style={{
                  '--angle': `${(360 / orbit.length) * i - 90}deg`,
                  transitionDelay: `${200 + i * 70}ms`,
                }}
              >
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
};

/* ==========================================================================
   INDUSTRIES — large editorial typography, not a list inside a card.
   The sector names are the composition.
   ========================================================================== */
export const IndustriesChapter = () => (
  <section className="zmk-chapter zmk-chapter--obsidian chapter-industries" aria-labelledby="industries-title">
    <div className="zmk-container">
      <Reveal className="chapter-industries__head">
        <p className="zmk-micro">Sektörler</p>
        <h2 className="zmk-h2 r-up" id="industries-title">
          KOBİ'den kurumsala, <span className="zmk-dim">aynı disiplinle.</span>
        </h2>
      </Reveal>

      <Reveal className="industries-list">
        <ul>
          {industries.map((industry, i) => (
            <li className="industry r-up" key={industry} style={{ transitionDelay: `${i * 60}ms` }}>
              <span className="industry__n zmk-micro">{String(i + 1).padStart(2, '0')}</span>
              <span className="industry__name">{industry}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  </section>
);

/* ==========================================================================
   FINAL CTA — ivory. The typography carries the composition; the buttons are
   the only other elements present.
   ========================================================================== */
export const ClosingChapter = () => (
  <section className="zmk-chapter zmk-chapter--ivory chapter-closing" aria-labelledby="closing-title">
    <div className="zmk-container">
      <Reveal className="chapter-closing__inner">
        <DisplayHeading
          as="h2"
          id="closing-title"
          size="mega"
          className="chapter-closing__title"
          lines={[
            'İşinizi iyi yapıyorsunuz.',
            <span className="zmk-dim" key="2">Bunu herkesin bilmesini</span>,
            <span className="zmk-dim" key="3">biz sağlıyoruz.</span>,
          ]}
        />

        <div className="chapter-closing__foot r-up">
          <div className="chapter-closing__actions">
            <Link to="/iletisim" className="zmk-btn">
              Projeni Konuşalım <ArrowRight />
            </Link>
            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="zmk-btn zmk-btn--ghost"
            >
              WhatsApp'tan Ulaş <ArrowRight />
            </a>
          </div>
          <p className="chapter-closing__note">{siteConfig.hours.note}</p>
        </div>
      </Reveal>
    </div>
  </section>
);

/* ==========================================================================
   DISCIPLINE OVERVIEW — the four pillars as an index, placed early on the
   page to establish range before the individual chapters go deep.
   ========================================================================== */
export const DisciplineIndex = () => (
  <section className="zmk-chapter zmk-chapter--obsidian chapter-index" aria-labelledby="index-title">
    <div className="zmk-container">
      <Reveal className="chapter-index__head">
        <h2 className="zmk-h2 r-up" id="index-title">
          Dört disiplin. <span className="zmk-dim">Tek strateji.</span>
        </h2>
        <p className="zmk-lead r-up chapter-index__lead">
          Bir işletmenin büyümesi için gereken yetkinlikleri parçalara bölmüyoruz.
        </p>
      </Reveal>

      <Reveal className="discipline-index">
        {pillars.map((pillar, i) => (
          <Link
            to={`/${pillar.slug}`}
            className="discipline r-up"
            key={pillar.id}
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <span className="zmk-micro discipline__n">{pillar.number}</span>
            <h3 className="discipline__name">{pillar.title}</h3>
            <p className="discipline__headline">{pillar.headline}</p>
            <span className="discipline__cue" aria-hidden="true"><ArrowRight /></span>
          </Link>
        ))}
      </Reveal>
    </div>
  </section>
);
