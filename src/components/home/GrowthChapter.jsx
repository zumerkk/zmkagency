import React from 'react';
import { DisplayHeading, TextCTA } from '../ui';
import Reveal from '../ui/Reveal';

/**
 * Growth as a system, not a service list.
 *
 * The five stages are drawn as a single continuous track: a hairline that runs
 * through every stage with a gold node at each stop. This is the visual
 * argument — the channels are not separate purchases, they are one loop that
 * feeds back into itself.
 *
 * No icons. An icon per stage is exactly the infographic cliché this section
 * exists to avoid; the numbering and the track carry the sequence.
 */
const stages = [
  { n: '01', title: 'Dikkat', text: 'İçerik ve kampanya ile doğru kitlenin ilgisini kazanıyoruz.', channels: 'İçerik · Sosyal · Kampanya' },
  { n: '02', title: 'Trafik', text: 'İlgiyi ölçülebilir ziyarete dönüştürüyoruz.', channels: 'Google Ads · Meta Ads · SEO' },
  { n: '03', title: 'Dönüşüm', text: 'Ziyaretçiyi teklif, form veya siparişe taşıyoruz.', channels: 'Web · WhatsApp · Form' },
  { n: '04', title: 'Ölçüm', text: 'Hangi kanalın ne getirdiğini raporluyoruz.', channels: 'Analytics · Dönüşüm takibi' },
  { n: '05', title: 'Büyüme', text: 'Veriye göre bütçeyi ve mesajı yeniden kurguluyoruz.', channels: 'Optimizasyon · Yeni kampanya' },
];

const GrowthChapter = () => (
  <section className="zmk-chapter zmk-chapter--carbon chapter-growth zmk-grain" aria-labelledby="growth-title">
    <div className="zmk-container">
      <div className="chapter-growth__head">
        <Reveal>
          <p className="zmk-micro">02 — Growth</p>
          <DisplayHeading
            as="h2"
            id="growth-title"
            className="chapter-growth__title"
            lines={['Reklam bütçesini görünürlüğe değil,', <span className="zmk-gold" key="2">ölçülebilir büyümeye çeviriyoruz.</span>]}
          />
        </Reveal>
        <Reveal delay={100}>
          <p className="zmk-lead r-up chapter-growth__lead">
            Kanalları tek tek satmıyoruz. Dikkatten büyümeye kadar kapalı bir döngü kurup
            her ay aynı döngüyü veriye göre yeniden ayarlıyoruz.
          </p>
        </Reveal>
      </div>

      <Reveal className="growth-track">
        <div className="growth-track__line" aria-hidden="true" />
        <ol className="growth-track__stages">
          {stages.map((stage, i) => (
            <li className="growth-stage r-up" key={stage.n} style={{ transitionDelay: `${i * 110}ms` }}>
              <span className="growth-stage__node" aria-hidden="true" />
              <p className="zmk-micro growth-stage__n">{stage.n}</p>
              <h3 className="growth-stage__title">{stage.title}</h3>
              <p className="growth-stage__text">{stage.text}</p>
              <p className="growth-stage__channels zmk-micro">{stage.channels}</p>
            </li>
          ))}
        </ol>
        {/* The loop back: growth feeds attention again. */}
        <p className="growth-track__loop zmk-micro" aria-hidden="true">
          Döngü yeniden başlar
        </p>
      </Reveal>

      <Reveal className="chapter-growth__foot r-up">
        <TextCTA to="/dijital">Dijital büyüme hizmetlerini incele</TextCTA>
      </Reveal>
    </div>
  </section>
);

export default GrowthChapter;
