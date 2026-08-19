import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Confetti from 'react-confetti';
import SEO from '../components/SEO';
import PageHero from '../components/ui/PageHero';
import Reveal from '../components/ui/Reveal';
import { Button, ArrowRight } from '../components/ui';
import siteConfig from '../config/siteConfig';
import '../styles/home.css';
import '../styles/page.css';

/**
 * Conversion confirmation page.
 *
 * The GTM `conversion_lead` event is unchanged — this page is a tracked
 * conversion point and the event name must keep matching the tag configuration.
 *
 * Viewport size is now read in an effect instead of during render. Reading
 * `window.innerWidth` in the render body crashes the prerender step, which runs
 * this component in Node before a window exists; it also produced a wrong size
 * on the first paint after hydration.
 */
const ThankYou = () => {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Trigger the GTM conversion event.
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'conversion_lead',
        conversion_type: 'contact_form',
      });
    }

    const measure = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Respect reduced-motion: confetti is decorative and can be disorienting.
  const reduced = typeof window !== 'undefined'
    && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  return (
    <>
      <SEO
        title="Teşekkürler"
        description="Mesajınız bize ulaştı. En kısa sürede dönüş yapacağız."
        noindex
      />

      {size.width > 0 && !reduced && (
        <Confetti
          width={size.width}
          height={size.height}
          recycle={false}
          numberOfPieces={180}
          colors={['#d8a428', '#f0c04a', '#a8761a', '#f6f4ef']}
          style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}
        />
      )}

      <PageHero
        label="Teşekkürler"
        lines={['Mesajınız', <span className="zmk-gold" key="2">bize ulaştı.</span>]}
        lead="En kısa sürede size dönüş yapacağız. Acil bir konuysa doğrudan arayabilir veya WhatsApp'tan yazabilirsiniz."
        actions={
          <>
            <Button href={siteConfig.contact.whatsapp}>WhatsApp'tan Yaz</Button>
            <Button to="/calismalar" variant="ghost">Çalışmalarımızı İncele</Button>
          </>
        }
      />

      <section className="zmk-chapter zmk-chapter--carbon zmk-chapter--tight">
        <div className="zmk-container">
          <Reveal className="page-head">
            <p className="zmk-micro">Bu arada</p>
            <h2 className="zmk-h2 r-up">Beklerken göz atabilirsiniz</h2>
          </Reveal>

          <Reveal className="local-related">
            <Link className="local-related__item r-up" to="/hizmetler">
              <span className="local-related__title">Hizmetler</span>
              <span className="local-related__cue" aria-hidden="true"><ArrowRight /></span>
            </Link>
            <Link className="local-related__item r-up" to="/zmk-360">
              <span className="local-related__title">ZMK 360</span>
              <span className="local-related__cue" aria-hidden="true"><ArrowRight /></span>
            </Link>
            <Link className="local-related__item r-up" to="/blog">
              <span className="local-related__title">Magazine</span>
              <span className="local-related__cue" aria-hidden="true"><ArrowRight /></span>
            </Link>
          </Reveal>

          <Reveal className="r-up notfound-contact">
            <p>
              <a href={`tel:${siteConfig.contact.phone}`}>{siteConfig.contact.phoneDisplay}</a>
              {' · '}
              <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default ThankYou;
