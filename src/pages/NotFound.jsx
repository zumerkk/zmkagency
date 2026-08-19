import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import { Button, ArrowRight } from '../components/ui';
import { pillars } from '../data/capabilities';
import siteConfig from '../config/siteConfig';
import '../styles/home.css';
import '../styles/page.css';

const DESTINATIONS = [
  { to: '/calismalar', label: 'Çalışmalar', text: 'Marka, yazılım ve büyüme alanındaki işlerimiz.' },
  { to: '/hizmetler', label: 'Hizmetler', text: 'Dört disiplin altındaki tüm hizmetler ve fiyatlar.' },
  { to: '/zmk-360', label: 'ZMK 360', text: 'Aylık yürüyen bütünleşik çalışma modeli.' },
  { to: '/iletisim', label: 'İletişim', text: 'Projenizi konuşmak için bize ulaşın.' },
];

/**
 * 404.
 *
 * A designed page rather than a bare message: someone landing here followed a
 * broken or stale link, so the job is to get them somewhere useful in one
 * click. `noindex` keeps it out of search results.
 */
const NotFound = () => (
  <>
    <SEO
      title="Sayfa Bulunamadı"
      description="Aradığınız sayfa bulunamadı. ZMK Agency hizmetlerine ve çalışmalarına göz atabilirsiniz."
      noindex
    />

    <PageHero
      label="404"
      crumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'Sayfa bulunamadı' }]}
      lines={['Bu sayfayı', <span className="zmk-dim" key="2">bulamadık.</span>]}
      lead="Bağlantı eskimiş veya sayfa taşınmış olabilir. Aşağıdan devam edebilirsiniz."
      actions={
        <>
          <Button to="/">Ana Sayfaya Dön</Button>
          <Button to="/iletisim" variant="ghost">Projeni Konuşalım</Button>
        </>
      }
    />

    <section className="zmk-chapter zmk-chapter--carbon">
      <div className="zmk-container">
        <Reveal className="page-head">
          <p className="zmk-micro">Nereye gitmek istersiniz?</p>
          <h2 className="zmk-h2 r-up">Sık gidilen sayfalar</h2>
        </Reveal>

        <Reveal className="tile-grid">
          {DESTINATIONS.map((d, i) => (
            <Link className="tile r-up" to={d.to} key={d.to} style={{ transitionDelay: `${i * 70}ms` }}>
              <h3 className="tile__title">{d.label}</h3>
              <p className="tile__text">{d.text}</p>
              <span className="pillar-other__cue" aria-hidden="true"><ArrowRight /></span>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>

    <section className="zmk-chapter zmk-chapter--obsidian zmk-chapter--tight">
      <div className="zmk-container">
        <Reveal className="page-head">
          <p className="zmk-micro">Disiplinler</p>
        </Reveal>
        <Reveal className="local-related">
          {pillars.map((p, i) => (
            <Link className="local-related__item r-up" to={`/${p.slug}`} key={p.id} style={{ transitionDelay: `${i * 50}ms` }}>
              <span className="local-related__title">{p.title}</span>
              <span className="local-related__cue" aria-hidden="true"><ArrowRight /></span>
            </Link>
          ))}
        </Reveal>

        <Reveal className="r-up notfound-contact">
          <p>
            Aradığınızı bulamadıysanız{' '}
            <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phoneDisplay}</a>
            {' '}numarasından ulaşabilirsiniz.
          </p>
        </Reveal>
      </div>
    </section>
  </>
);

export default NotFound;
