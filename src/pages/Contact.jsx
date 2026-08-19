import React, { useState } from 'react';
import SEO from '../components/SEO';
import Reveal from '../components/ui/Reveal';
import PageHero from '../components/ui/PageHero';
import { ArrowRight } from '../components/ui';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import siteConfig from '../config/siteConfig';
import '../styles/home.css';
import '../styles/page.css';
import '../styles/pages/contact.css';

const SERVICES = [
  'Web / Yazılım',
  'Sosyal Medya',
  'Reklam & SEO',
  'Tümü (Büyüme)',
];

const BUDGETS = [
  '8.000₺ - 15.000₺',
  '15.000₺ - 30.000₺',
  '30.000₺ - 60.000₺',
  '60.000₺ - 120.000₺+',
  'Sadece Proje (Tek Seferlik)',
];

const EMPTY_FORM = { name: '', phone: '', service: '', budget: '', message: '' };

/**
 * /iletisim — the conversion page.
 *
 * Submit behaviour is unchanged: the lead still goes to the same Firestore
 * `leads` collection with the same shape and `type: 'Contact Page Form'`, so
 * the admin dashboard keeps working.
 *
 * Two functional fixes made while migrating:
 *  - The success handler reset only { name, phone, message }, leaving `service`
 *    and `budget` populated after a successful send and dropping them from the
 *    state shape entirely. It now resets to EMPTY_FORM.
 *  - Labels were floating text with no association to their controls. Every
 *    control now has an id and a real <label htmlFor>, so screen readers and
 *    tap-on-label both work.
 */
const Contact = ({ t }) => {
  const contactData = t.contact || t;
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [status, setStatus] = useState(''); // '' | 'loading' | 'success' | 'error'

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'loading') return; // guard against double submit
    setStatus('loading');

    try {
      await addDoc(collection(db, 'leads'), {
        ...formData,
        type: 'Contact Page Form',
        status: 'New',
        timestamp: serverTimestamp(),
      });
      setStatus('success');
      setFormData(EMPTY_FORM);
      setTimeout(() => setStatus(''), 5000);
    } catch (error) {
      console.error('Error adding document: ', error);
      setStatus('error');
    }
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'ZMK Agency İletişim',
    url: `${siteConfig.url}/iletisim`,
    mainEntity: {
      '@type': 'Organization',
      '@id': `${siteConfig.url}/#organization`,
      telephone: siteConfig.contact.phone,
      email: siteConfig.contact.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.locality,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.country,
      },
    },
  };

  return (
    <>
      <SEO
        title={contactData.title}
        description={contactData.subtitle}
        keywords="iletisim, contact, kirikkale reklam ajansi adresi, zmk agency telefon"
        schema={contactSchema}
      />

      <PageHero
        label="İletişim"
        crumbs={[{ label: 'Ana Sayfa', to: '/' }, { label: 'İletişim' }]}
        lines={['Projeni konuşalım.']}
        lead="Nereden başlayacağınızı bilmeniz gerekmiyor. Mevcut durumu birlikte değerlendirelim, hangi adımın önce geldiğini konuşalım."
      />

      <section className="zmk-chapter zmk-chapter--carbon">
        <div className="zmk-container">
          <div className="contact-layout">
            {/* ---- Form ---- */}
            <Reveal className="contact-form-wrap r-up">
              <h2 className="zmk-h3 contact-form__title">Proje formu</h2>
              <p className="contact-form__hint">
                Formu doldurun, 1 iş günü içinde dönüş yapalım.
              </p>

              <form onSubmit={handleSubmit} className="contact-form" noValidate={false}>
                <div className="field">
                  <label htmlFor="cf-name">{contactData.namePlaceholder || 'Adınız Soyadınız'}</label>
                  <input
                    id="cf-name" name="name" type="text" required
                    value={formData.name} onChange={handleInput}
                    autoComplete="name"
                  />
                </div>

                <div className="field">
                  <label htmlFor="cf-phone">{contactData.phonePlaceholder || 'Telefon Numaranız'}</label>
                  <input
                    id="cf-phone" name="phone" type="tel" required
                    value={formData.phone} onChange={handleInput}
                    autoComplete="tel"
                  />
                </div>

                <div className="field">
                  <label htmlFor="cf-service">İlgilendiğiniz hizmet</label>
                  <select id="cf-service" name="service" required value={formData.service} onChange={handleInput}>
                    <option value="" disabled>Seçiniz…</option>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="field">
                  <label htmlFor="cf-budget">Aylık reklam / proje bütçesi</label>
                  <select id="cf-budget" name="budget" required value={formData.budget} onChange={handleInput}>
                    <option value="" disabled>Seçiniz…</option>
                    {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>

                <div className="field field--full">
                  <label htmlFor="cf-message">
                    {contactData.messagePlaceholder || 'Proje detayları ve hedefleriniz'}
                  </label>
                  <textarea
                    id="cf-message" name="message" rows="5" required
                    value={formData.message} onChange={handleInput}
                  />
                </div>

                <button type="submit" className="zmk-btn contact-form__submit" disabled={status === 'loading'}>
                  {status === 'loading' ? 'Gönderiliyor…' : 'Gönder'} <ArrowRight />
                </button>

                {/* Status is announced, not just coloured. */}
                <p className="form-status" role="status" aria-live="polite">
                  {status === 'success' && (
                    <span className="form-status__ok">
                      Teşekkürler — mesajınız ulaştı. En kısa sürede dönüş yapacağız.
                    </span>
                  )}
                  {status === 'error' && (
                    <span className="form-status__err">
                      Gönderilemedi. Lütfen tekrar deneyin veya {siteConfig.contact.phoneDisplay} numarasından ulaşın.
                    </span>
                  )}
                </p>
              </form>
            </Reveal>

            {/* ---- Details ---- */}
            <Reveal className="contact-side r-up" delay={120}>
              <h2 className="zmk-h3 contact-side__title">Doğrudan ulaşın</h2>

              <div className="contact-detail">
                <p className="zmk-micro contact-detail__label">Telefon</p>
                <a className="contact-detail__value" href={`tel:${siteConfig.contact.phone}`}>
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>

              <div className="contact-detail">
                <p className="zmk-micro contact-detail__label">E-posta</p>
                <a className="contact-detail__value" href={`mailto:${siteConfig.contact.email}`}>
                  {siteConfig.contact.email}
                </a>
              </div>

              <div className="contact-detail">
                <p className="zmk-micro contact-detail__label">WhatsApp</p>
                <a
                  className="contact-detail__value"
                  href={siteConfig.contact.whatsapp}
                  target="_blank" rel="noopener noreferrer"
                >
                  Mesaj gönder
                </a>
              </div>

              <div className="contact-detail">
                <p className="zmk-micro contact-detail__label">Ofis</p>
                <address className="contact-detail__value contact-detail__address">
                  {siteConfig.address.street}<br />
                  {siteConfig.address.postalCode} {siteConfig.address.locality}
                </address>
              </div>

              <div className="contact-detail">
                <p className="zmk-micro contact-detail__label">Çalışma saatleri</p>
                <p className="contact-detail__value">{siteConfig.hours.display}</p>
                <p className="contact-detail__note">{siteConfig.hours.note}</p>
              </div>

              <ul className="contact-social">
                {siteConfig.social.map((s) => (
                  <li key={s.label}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
