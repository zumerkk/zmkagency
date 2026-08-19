import React from 'react';
import { DisplayHeading } from '../ui';
import Reveal from '../ui/Reveal';
import { fragmentedRoles } from '../../data/capabilities';
import { pillars } from '../../data/capabilities';

/**
 * "Tek ajans. Birden fazla disiplin."
 *
 * The argument is coordination cost, and the visual makes it before the copy
 * does: eight scattered supplier nodes converge onto one ZMK node, which then
 * resolves into the four disciplines.
 *
 * Built as an inline SVG with CSS-driven motion rather than a canvas or a
 * physics library — the whole thing is a handful of transforms, animates on
 * the compositor, and disappears cleanly under prefers-reduced-motion. The
 * SVG is aria-hidden; the same information is present as real text below it,
 * so nothing is lost to a screen reader or with motion disabled.
 */

// Scatter positions for the supplier nodes, on a 1000×420 viewBox.
const scatter = [
  { x: 70, y: 60 }, { x: 250, y: 34 }, { x: 430, y: 78 }, { x: 620, y: 40 },
  { x: 120, y: 210 }, { x: 300, y: 250 }, { x: 520, y: 236 }, { x: 700, y: 190 },
];

const HUB = { x: 850, y: 150 };

const Convergence = () => (
  <section className="zmk-chapter zmk-chapter--graphite chapter-converge zmk-grain" aria-labelledby="converge-title">
    <div className="zmk-container">
      <Reveal className="chapter-converge__head">
        <p className="zmk-micro">Neden ZMK</p>
        <DisplayHeading
          as="h2"
          id="converge-title"
          className="chapter-converge__title"
          lines={['Tek ajans.', <span className="zmk-dim" key="2">Birden fazla disiplin.</span>]}
        />
        <p className="zmk-lead r-up chapter-converge__lead">
          Markanın farklı parçalarını farklı insanlara anlatmak yerine, bütün sistemi aynı
          masada yönetiyoruz.
        </p>
      </Reveal>

      <Reveal className="converge">
        <svg className="converge__svg" viewBox="0 0 1000 420" role="presentation" aria-hidden="true" focusable="false">
          {/* Connection lines draw themselves toward the hub */}
          <g className="converge__links">
            {scatter.map((p, i) => (
              <line
                key={i}
                x1={p.x} y1={p.y} x2={HUB.x} y2={HUB.y}
                style={{ transitionDelay: `${200 + i * 70}ms` }}
              />
            ))}
          </g>

          {/* Scattered supplier nodes */}
          <g className="converge__nodes">
            {scatter.map((p, i) => (
              <g key={i} style={{ transitionDelay: `${i * 60}ms` }}>
                <circle cx={p.x} cy={p.y} r="4" />
                <text x={p.x} y={p.y - 14}>{fragmentedRoles[i]}</text>
              </g>
            ))}
          </g>

          {/* The ZMK hub */}
          <g className="converge__hub">
            <circle cx={HUB.x} cy={HUB.y} r="46" className="converge__hub-ring" />
            <circle cx={HUB.x} cy={HUB.y} r="7" className="converge__hub-core" />
            <text x={HUB.x} y={HUB.y + 76}>ZMK</text>
          </g>
        </svg>

        {/* Text equivalent — carries the same information without the graphic. */}
        <div className="converge__legend">
          <div className="converge__col">
            <p className="zmk-micro">Normalde</p>
            <p className="converge__col-text">
              {fragmentedRoles.join(' · ')} — her biriyle ayrı görüşür, her birine markanızı
              baştan anlatırsınız.
            </p>
          </div>
          <div className="converge__col converge__col--after">
            <p className="zmk-micro">ZMK ile</p>
            <p className="converge__col-text">
              {pillars.map((p) => p.title).join(' · ')} — tek strateji, tek ekip, tek raporlama.
            </p>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Convergence;
