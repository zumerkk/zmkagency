import React from 'react';
import { DisplayHeading, TextCTA, MediaFrame } from '../ui';
import Reveal from '../ui/Reveal';

/**
 * Brand chapter — the page's first inversion into ivory.
 *
 * Rationale for the light ground here: brand is the warmest, most human of the
 * four disciplines, and the switch gives the reader a chapter break rather
 * than another dark section. Large ink typography on warm ivory is also the
 * closest thing on screen to the printed material this discipline produces.
 *
 * Four ZMK applications show the system moving from identity into physical
 * touchpoints: stationery, packaging, signage and print.
 */
const applications = [
  { label: 'Kurumsal Kimlik', ratio: '4 / 5', src: '/media/brand/corporate-identity.webp' },
  { label: 'Ambalaj', ratio: '1 / 1', src: '/media/brand/packaging.webp' },
  { label: 'Tabela & Mekân', ratio: '1 / 1', src: '/media/brand/signage.webp' },
  { label: 'Basılı Materyal', ratio: '4 / 5', src: '/media/brand/print-materials.webp' },
];

const BrandChapter = () => (
  <section className="zmk-chapter zmk-chapter--ivory chapter-brand" aria-labelledby="brand-title">
    <div className="zmk-container">
      <div className="chapter-brand__head">
        <Reveal>
          <p className="zmk-micro chapter-brand__index">01 — Brand</p>
          <DisplayHeading
            as="h2"
            className="chapter-brand__title"
            id="brand-title"
            lines={['Bir marka', <span key="2">logodan ibaret değildir.</span>]}
          />
        </Reveal>

        <Reveal className="chapter-brand__copy" delay={120}>
          <p className="zmk-lead r-up">
            Marka; ne sattığınızın değil, neden tercih edildiğinizin cevabıdır. Bu cevabı
            önce netleştiriyor, sonra logodan tabelaya, ambalajdan sunuma kadar her temas
            noktasında aynı dille tekrar ediyoruz.
          </p>
          <div className="r-up chapter-brand__cta">
            <TextCTA to="/marka">Marka hizmetlerini incele</TextCTA>
          </div>
        </Reveal>
      </div>

      <Reveal className="chapter-brand__grid">
        {applications.map((application, i) => (
          <MediaFrame
            key={application.label}
            tone="ivory"
            src={application.src}
            ratio={application.ratio}
            label={application.label}
            alt={`${application.label} çalışması`}
            className={`chapter-brand__slot chapter-brand__slot--${i + 1}`}
          />
        ))}
      </Reveal>
    </div>
  </section>
);

export default BrandChapter;
