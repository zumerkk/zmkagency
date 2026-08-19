import React from 'react';
import SEO from '../../components/SEO';
import PageHero from '../../components/ui/PageHero';
import Reveal from '../../components/ui/Reveal';
import '../../styles/home.css';
import '../../styles/page.css';

/**
 * Legal document template (KVKK, privacy, terms).
 *
 * Long prose, so the only thing that matters here is reading comfort: a
 * 68ch measure, generous leading, and `white-space: pre-wrap` preserved so the
 * paragraph breaks in the source text still land.
 *
 * `noindex` — these pages have no search value and would otherwise compete
 * with real content for crawl budget.
 */
const LegalPage = ({ title, text, date }) => (
  <>
    <SEO title={title} description={`${title} — ZMK Agency`} noindex />

    <PageHero
      label="Yasal"
      crumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: title }]}
      lines={[title]}
      lead={date ? `Son güncelleme: ${date}` : undefined}
    />

    <section className="zmk-chapter zmk-chapter--carbon">
      <div className="zmk-container zmk-container--narrow">
        <Reveal className="legal-body r-up">
          <p>{text}</p>
        </Reveal>
      </div>
    </section>
  </>
);

export default LegalPage;
