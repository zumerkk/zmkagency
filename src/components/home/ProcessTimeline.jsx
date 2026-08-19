import React, { useEffect, useRef, useState } from 'react';
import { DisplayHeading } from '../ui';
import Reveal from '../ui/Reveal';
import { processSteps } from '../../data/capabilities';

/**
 * Process as a vertical timeline with a sticky step indicator.
 *
 * The six-across grid this replaces gave every step equal weight and no
 * sequence — it read as a feature list. A timeline with a progress rail that
 * fills as you scroll makes the order itself the argument: we do not start
 * producing before we have understood and planned.
 *
 * The rail fill and the active step are driven by one IntersectionObserver
 * over the steps, not by a scroll handler doing getBoundingClientRect on
 * every frame.
 */
const ProcessTimeline = () => {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);

  useEffect(() => {
    const nodes = stepRefs.current.filter(Boolean);
    if (!nodes.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number(entry.target.dataset.index);
            if (!Number.isNaN(i)) setActive(i);
          }
        });
      },
      { rootMargin: '-48% 0px -48% 0px', threshold: 0 }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  const progress = ((active + 1) / processSteps.length) * 100;

  return (
    <section className="zmk-chapter zmk-chapter--carbon chapter-process" aria-labelledby="process-title">
      <div className="zmk-container">
        <Reveal className="chapter-process__head">
          <p className="zmk-micro">Nasıl çalışıyoruz</p>
          <DisplayHeading
            as="h2"
            id="process-title"
            className="chapter-process__title"
            lines={['Proje teslim etmiyoruz.', <span className="zmk-gold" key="2">Sistem kuruyoruz.</span>]}
          />
        </Reveal>

        <div className="process-timeline">
          {/* Sticky indicator: current step out of six */}
          <aside className="process-timeline__indicator" aria-hidden="true">
            <div className="process-indicator">
              <span className="process-indicator__current">{processSteps[active].number}</span>
              <span className="process-indicator__divider" />
              <span className="process-indicator__total">{String(processSteps.length).padStart(2, '0')}</span>
              <p className="process-indicator__label">{processSteps[active].title}</p>
            </div>
          </aside>

          <ol className="process-steps">
            <span className="process-steps__rail" aria-hidden="true">
              <span className="process-steps__rail-fill" style={{ height: `${progress}%` }} />
            </span>

            {processSteps.map((step, i) => (
              <li
                key={step.number}
                data-index={i}
                ref={(n) => { stepRefs.current[i] = n; }}
                className={`process-step ${i <= active ? 'is-passed' : ''} ${i === active ? 'is-active' : ''}`}
              >
                <span className="process-step__dot" aria-hidden="true" />
                <p className="zmk-micro process-step__n">{step.number}</p>
                <h3 className="process-step__title">{step.title}</h3>
                <p className="process-step__text">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
