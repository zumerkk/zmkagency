import React from 'react';
import { Link } from 'react-router-dom';
import { DisplayHeading, TextCTA, ArrowRight } from '../ui';
import Reveal from '../ui/Reveal';
import { featuredWorks, disciplineLabels } from '../../data/workData';

/**
 * Featured work — large case blocks, not feature cards.
 *
 * Each entry gets a full media slot with the project identity overlaid, so
 * the section reads as a portfolio rather than a comparison table. The first
 * entry is deliberately given more width than the rest: an evenly weighted
 * grid tells the reader every project is equally important, which is never
 * true and reads as filler.
 *
 * Media slots are labelled placeholders until real project imagery exists.
 * The moment `image` is present on a work entry it renders instead, with the
 * aspect ratio already reserved so nothing shifts.
 */
const WorkGallery = () => (
  <section className="zmk-chapter zmk-chapter--obsidian chapter-work zmk-grain" aria-labelledby="work-title">
    <div className="zmk-container">
      <div className="chapter-work__head">
        <Reveal>
          <p className="zmk-micro">Seçilmiş İşler</p>
          <DisplayHeading
            as="h2"
            id="work-title"
            className="chapter-work__title"
            lines={['Teslim ettiğimiz projeler değil,', <span className="zmk-dim" key="2">kurduğumuz sistemler.</span>]}
          />
        </Reveal>
        <Reveal delay={120} className="chapter-work__head-cta r-up">
          <TextCTA to="/calismalar">Tüm çalışmalar</TextCTA>
        </Reveal>
      </div>

      <div className="work-gallery">
        {featuredWorks.map((work, i) => (
          <Reveal
            key={work.id}
            className={`work-case work-case--${i === 0 ? 'lead' : 'standard'}`}
            delay={i === 0 ? 0 : 80}
          >
            <Link to="/calismalar" className="work-case__link">
              <div className="work-case__media r-media">
                {work.image ? (
                  <img className="work-case__img r-scale" src={work.image} alt={work.title} loading="lazy" decoding="async" />
                ) : (
                  <div className="work-case__placeholder" aria-hidden="true">
                    <span className="work-case__monogram">
                      {work.title.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                    </span>
                  </div>
                )}
                <span className="work-case__scrim" aria-hidden="true" />
              </div>

              <div className="work-case__meta">
                <p className="zmk-micro work-case__sector">{work.sector}</p>
                <h3 className="work-case__name">{work.title}</h3>
                <p className="work-case__summary">{work.summary}</p>
                <ul className="work-case__disciplines">
                  {work.disciplines.map((d) => (
                    <li key={d}>{disciplineLabels[d]}</li>
                  ))}
                </ul>
                <span className="work-case__cue">
                  Projeyi İncele <ArrowRight />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default WorkGallery;
