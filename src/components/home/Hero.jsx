import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from '../ui';
import { pillars } from '../../data/capabilities';

/**
 * Signature hero.
 *
 * Choreography, in order, all inside ~1.2s so the visitor is never held:
 *   1. "MARKANIZIN" masks up from below
 *   2. "BÜYÜME DEPARTMANI." follows one beat later
 *   3. lead + actions fade up
 *   4. the four discipline labels resolve along the baseline rule
 *
 * On scroll the whole composition drifts and dims slightly, so the hero hands
 * off to the first chapter instead of just scrolling away. That drift is
 * driven by a CSS custom property written from a rAF-throttled scroll handler
 * — one property write per frame, no React state, no re-render.
 */
const Hero = () => {
  const rootRef = useRef(null);
  const [ready, setReady] = useState(false);

  // Start the entrance on the next frame after mount so the initial masked
  // state is painted first — otherwise the transition has nothing to run from.
  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const progress = Math.min(y / (window.innerHeight || 1), 1);
        el.style.setProperty('--hero-progress', progress.toFixed(4));
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      className={`hero zmk-grain ${ready ? 'is-ready' : ''}`}
      ref={rootRef}
      aria-labelledby="hero-title"
    >
      <div className="hero__ground" aria-hidden="true" />
      <div className="hero__beam" aria-hidden="true" />

      <div className="zmk-container hero__inner">
        <h1 className="hero__title zmk-mega" id="hero-title">
          <span className="r-line"><span>Markanızın</span></span>
          <span className="r-line"><span className="hero__title-2">büyüme departmanı.</span></span>
        </h1>

        <div className="hero__body">
          <p className="hero__lead">
            Marka, yazılım, dijital pazarlama ve prodüksiyonu tek merkezde birleştirerek
            işletmeler için sürdürülebilir büyüme sistemleri kuruyoruz.
          </p>

          <div className="hero__actions">
            <Link to="/iletisim" className="zmk-btn">
              Projeni Konuşalım <ArrowRight />
            </Link>
            <Link to="/calismalar" className="zmk-btn zmk-btn--ghost">
              Çalışmalarımızı İncele <ArrowRight />
            </Link>
          </div>
        </div>
      </div>

      {/* Baseline: the four disciplines resolve along a rule at the foot of
          the first viewport. This is the hero's proof of range. */}
      <div className="hero__baseline">
        <div className="zmk-container hero__baseline-inner">
          <ul className="hero__disciplines">
            {pillars.map((pillar, i) => (
              <li key={pillar.id} style={{ transitionDelay: `${700 + i * 90}ms` }}>
                <Link to={`/${pillar.slug}`}>
                  <span className="hero__discipline-index">{pillar.number}</span>
                  <span className="hero__discipline-name">{pillar.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="hero__origin">Kırıkkale merkezli · Türkiye çapında</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
