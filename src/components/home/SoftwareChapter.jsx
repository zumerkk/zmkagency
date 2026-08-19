import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, DisplayHeading } from '../ui';
import Reveal from '../ui/Reveal';

/**
 * The systems ZMK builds, each framed as the operational problem it ends.
 * `screen` describes the interface abstractly — these render as composed
 * UI abstractions rather than fake dashboard screenshots, because a
 * fabricated product screenshot is worse than an honest diagram.
 */
const systems = [
  {
    id: 'panel',
    label: 'Yönetim Paneli',
    problem: 'Siparişler WhatsApp gruplarında kayboluyor.',
    solution: 'Tüm siparişler tek ekranda; durumu belli, geçmişi kayıtlı, sorumlusu atanmış.',
    rows: ['Sipariş #1428', 'Sipariş #1429', 'Sipariş #1430', 'Sipariş #1431'],
    metricLabel: 'Açık sipariş',
  },
  {
    id: 'stock',
    label: 'Stok & Kasa',
    problem: 'Stok defterde, kasa ayrı bir Excel dosyasında.',
    solution: 'Stok ve kasa aynı sistemde. Gün sonu raporu elle hesaplanmıyor.',
    rows: ['Giriş · 240 adet', 'Çıkış · 186 adet', 'Kritik seviye · 3 ürün', 'Gün sonu · kapandı'],
    metricLabel: 'Gün sonu farkı',
  },
  {
    id: 'booking',
    label: 'Rezervasyon',
    problem: 'Randevular telefonda alınıyor, çakışmalar elle çözülüyor.',
    solution: 'Müşteri uygun saati kendisi seçiyor; çakışma sistem tarafından engelleniyor.',
    rows: ['09:00 · dolu', '10:30 · dolu', '13:00 · uygun', '15:30 · uygun'],
    metricLabel: 'Doluluk',
  },
  {
    id: 'crm',
    label: 'CRM & Teklif',
    problem: 'Hangi müşteriye ne teklif verildiği kimsede net değil.',
    solution: 'Teklif geçmişi, takip tarihi ve kapanma oranı tek yerden izlenebiliyor.',
    rows: ['Teklif gönderildi', 'Takip · 3 gün', 'Görüşme planlandı', 'Kazanıldı'],
    metricLabel: 'Kapanma oranı',
  },
];

/**
 * Software chapter — a pinned, scroll-driven showcase.
 *
 * The left column stays fixed while the right column's interface abstraction
 * changes as each system scrolls through. This is the one place blue appears:
 * software gets a cool sub-identity, and the page returns to gold afterwards.
 *
 * Implementation note: which system is active is decided by a single
 * IntersectionObserver over the four scroll markers rather than by measuring
 * scroll offsets on every frame. It costs nothing when idle and degrades to
 * a plain stacked list if the browser lacks support.
 */
const SoftwareChapter = () => {
  const [active, setActive] = useState(0);
  const markersRef = useRef([]);

  useEffect(() => {
    const nodes = markersRef.current.filter(Boolean);
    if (!nodes.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            if (!Number.isNaN(index)) setActive(index);
          }
        });
      },
      // A narrow band across the middle of the viewport: a system becomes
      // active as it crosses the centre line, not as it enters the screen.
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const current = systems[active];

  return (
    <section className="chapter-software zmk-grain" aria-labelledby="software-title">
      <div className="zmk-container">
        <Reveal className="chapter-software__head">
          <p className="zmk-micro chapter-software__index">03 — Software</p>
          <DisplayHeading
            as="h2"
            className="chapter-software__title"
            lines={[
              'Markanızı tasarlıyoruz.',
              <span className="chapter-software__title-2" key="2">İşinizi kodluyoruz.</span>,
            ]}
          />
          <p className="zmk-lead r-up chapter-software__lead">
            Hazır tema kurulumu değil, işleyişinize göre yazılan sistemler. Excel dosyalarında
            ve WhatsApp gruplarında yürüyen işler tek panele taşınır.
          </p>
        </Reveal>
      </div>

      <div className="zmk-container chapter-software__stage">
        {/* Sticky interface column */}
        <div className="software-screen" aria-hidden="true">
          <div className="software-screen__frame">
            <div className="software-screen__chrome">
              <span /><span /><span />
              <p className="software-screen__title">{current.label}</p>
            </div>

            <div className="software-screen__body">
              <div className="software-screen__metric">
                <span className="software-screen__metric-label">{current.metricLabel}</span>
                <span className="software-screen__bar">
                  <span className="software-screen__bar-fill" style={{ width: `${42 + active * 14}%` }} />
                </span>
              </div>

              <ul className="software-screen__rows">
                {current.rows.map((row, i) => (
                  <li key={row} style={{ transitionDelay: `${i * 60}ms` }}>
                    <span className="software-screen__row-dot" />
                    {row}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Scrolling narrative column */}
        <ol className="software-list">
          {systems.map((system, i) => (
            <li
              key={system.id}
              className={`software-item ${i === active ? 'is-active' : ''}`}
              data-index={i}
              ref={(node) => { markersRef.current[i] = node; }}
            >
              <p className="zmk-micro software-item__index">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="zmk-h3 software-item__label">{system.label}</h3>
              <p className="software-item__problem">{system.problem}</p>
              <p className="software-item__solution">{system.solution}</p>
            </li>
          ))}
        </ol>
      </div>

      <div className="zmk-container">
        <Reveal className="chapter-software__foot r-up">
          <Link to="/yazilim" className="zmk-btn">
            Yazılım Çözümlerini İncele <ArrowRight />
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default SoftwareChapter;
