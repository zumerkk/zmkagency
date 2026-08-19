import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/home/Hero';
import BrandChapter from '../components/home/BrandChapter';
import GrowthChapter from '../components/home/GrowthChapter';
import SoftwareChapter from '../components/home/SoftwareChapter';
import StudioChapter from '../components/home/StudioChapter';
import WorkGallery from '../components/home/WorkGallery';
import Convergence from '../components/home/Convergence';
import ProcessTimeline from '../components/home/ProcessTimeline';
import { Zmk360Chapter, IndustriesChapter, ClosingChapter, DisciplineIndex } from '../components/home/Flagship';
import FAQ from '../components/FAQ';
import '../styles/home.css';

/**
 * Homepage.
 *
 * Read as a sequence of chapters, each with its own ground colour, so the page
 * has rhythm instead of one continuous black scroll:
 *
 *   obsidian   hero
 *   obsidian   discipline index          — establishes range
 *   ivory      brand                     — first inversion, warm
 *   carbon     growth                    — the system, not the channel list
 *   graphite   software (blue)           — pinned; the one cool chapter
 *   obsidian   selected work             — proof
 *   umber      studio                    — the warm chapter
 *   graphite   convergence               — the differentiator
 *   carbon     process                   — timeline
 *   gold       ZMK 360                   — flagship, the colour peak
 *   obsidian   industries                — range, editorially
 *   carbon     FAQ                       — objections
 *   ivory      closing                   — final inversion, the ask
 */
const Home = ({ t }) => {
  const faqSchema = t.faq?.items
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: t.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      }
    : null;

  return (
    <>
      <SEO
        title="Markanızın Büyüme Departmanı"
        description="ZMK AGENCY; marka, yazılım, dijital pazarlama ve prodüksiyonu tek merkezde birleştirir. Kırıkkale merkezli, Türkiye çapında çalışan büyüme ve teknoloji ortağınız."
        keywords="kırıkkale reklam ajansı, kırıkkale yazılım firması, kırıkkale web tasarım, marka stratejisi, dijital pazarlama ajansı, kurumsal kimlik"
        schema={faqSchema ? [faqSchema] : null}
      />

      <Hero />
      <DisciplineIndex />
      <BrandChapter />
      <GrowthChapter />
      <SoftwareChapter />
      <WorkGallery />
      <StudioChapter />
      <Convergence />
      <ProcessTimeline />
      <Zmk360Chapter />
      <IndustriesChapter />
      <FAQ t={t.faq} />
      <ClosingChapter />
    </>
  );
};

export default Home;
