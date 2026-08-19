/**
 * Single source of truth for ZMK's identity and contact details.
 *
 * These values were previously duplicated across SEO.jsx, Home.jsx, Footer.jsx,
 * Contact.jsx and several landing pages, which is how contact data drifts out
 * of sync. Every component must read from here — never hardcode a phone
 * number, address or social URL again.
 *
 * All values below are taken from what already existed in the repository.
 * Nothing here is invented.
 */

export const siteConfig = {
  name: 'ZMK AGENCY',
  legalName: 'ZMK Agency',
  tagline: 'Markanızın büyüme departmanı.',
  disciplines: 'Brand · Software · Growth · Studio',
  url: 'https://zmkagency.com',

  contact: {
    phone: '+905413812114',
    phoneDisplay: '0541 381 21 14',
    email: 'iletisim@zmkagency.com',
    whatsapp: 'https://wa.me/905413812114',
  },

  address: {
    street: 'Delice İş Hanı, Yenidoğan, Hürriyet Cd. No: 6/50 Kat: 5',
    locality: 'Kırıkkale',
    postalCode: '71200',
    country: 'TR',
    geo: { lat: 39.8468, lng: 33.5153 },
  },

  hours: {
    display: 'Pazartesi–Cumartesi · 09:00–19:00',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '19:00',
    note: 'Strateji görüşmeleri randevu ile gerçekleştirilmektedir.',
  },

  social: [
    { label: 'Instagram', url: 'https://www.instagram.com/agencyzmk/' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/company/zmkagency' },
    { label: 'YouTube', url: 'https://www.youtube.com/@ZMKAGENCY' },
    { label: 'TikTok', url: 'https://www.tiktok.com/@zmkagency' },
    { label: 'X', url: 'https://x.com/zmkagency' },
  ],
};

/** Social URLs only — for schema.org `sameAs`. */
export const sameAs = siteConfig.social.map((s) => s.url);

export default siteConfig;
