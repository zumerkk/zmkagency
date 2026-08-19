/**
 * ZMK client work.
 *
 * Extracted from PortfolioPage so the homepage, the /calismalar index and any
 * future case-study page read from one list.
 *
 * RULES FOR THIS FILE — do not break them:
 *  - No performance metrics unless the number is verified and the client has
 *    agreed to publication. There is deliberately no `results` field here yet.
 *  - No testimonials, no awards, no ratings.
 *  - `disciplines` must match pillar ids in capabilities.js.
 *
 * `featured: true` promotes an entry to the homepage strip.
 */

export const works = [
  {
    id: 'ilan-port',
    title: 'İlanPort',
    sector: 'Emlak',
    summary: 'Emlak ilan platformu: harita entegrasyonu, gelişmiş filtreleme ve arayüz tasarımı.',
    image: '/media/work/ilan-port.webp',
    disciplines: ['software', 'brand'],
    deliverables: ['Platform', 'UI/UX', 'Harita Entegrasyonu'],
    featured: true,
  },
  {
    id: 'tencere-app',
    title: 'TencereApp',
    sector: 'Yeme & İçme',
    summary: 'Yemek tarifi ve sipariş uygulaması: restoran entegrasyonu, kullanıcı paneli, bildirim altyapısı.',
    image: '/media/work/tencere-app.webp',
    disciplines: ['software'],
    deliverables: ['Mobil Uygulama', 'API', 'Panel'],
    featured: true,
  },
  {
    id: 'atlas-derslik',
    title: 'Atlas Derslik',
    sector: 'Eğitim',
    summary: 'Eğitim kurumu için online ders platformu, öğrenci takip sistemi ve SEO çalışması.',
    image: '/media/work/atlas-derslik.webp',
    disciplines: ['software', 'growth'],
    deliverables: ['Web Platformu', 'Öğrenci Paneli', 'SEO'],
    featured: true,
  },
  {
    id: 'mert-nakliyat',
    title: 'Mert Nakliyat',
    sector: 'Lojistik',
    summary: 'SEO odaklı kurumsal web sitesi, Google İşletme Profili optimizasyonu ve teklif formu entegrasyonu.',
    image: '/media/work/mert-nakliyat.webp',
    disciplines: ['growth', 'software'],
    deliverables: ['Web Sitesi', 'Lokal SEO', 'Teklif Formu'],
    featured: true,
  },
  {
    id: 'kafkas-cigkofte',
    title: 'Kafkas Çiğköfte',
    sector: 'Yeme & İçme',
    summary: 'Restoran zinciri için menü tasarımı, QR sipariş sistemi ve sosyal medya içerik üretimi.',
    image: '/media/work/kafkas-cigkofte.webp',
    disciplines: ['brand', 'software', 'studio'],
    deliverables: ['Menü Tasarımı', 'QR Sipariş', 'İçerik'],
    featured: true,
  },
  {
    id: 'hira-butik',
    title: 'Hira Butik',
    sector: 'Perakende',
    summary: 'Butik moda markası: logo tasarımı, e-ticaret altyapısı ve sosyal medya yönetimi.',
    image: '/media/work/hira-butik.webp',
    disciplines: ['brand', 'software', 'growth'],
    deliverables: ['Kurumsal Kimlik', 'E-Ticaret', 'Sosyal Medya'],
    featured: true,
  },
  {
    id: 'olimpiyat-spor',
    title: 'Olimpiyat Spor Kulübü',
    sector: 'Spor',
    summary: 'Üye kayıt sistemi, etkinlik takvimi ve Google Ads kampanya yönetimi.',
    image: '/media/work/olimpiyat-spor.webp',
    disciplines: ['software', 'growth'],
    deliverables: ['Üye Sistemi', 'Google Ads', 'CRM'],
  },
  {
    id: 'pedalset',
    title: 'Pedalset',
    sector: 'Perakende',
    summary: 'Bisiklet ekipman markası: kurumsal kimlik, ürün fotoğrafçılığı ve sosyal medya stratejisi.',
    image: '/media/work/pedalset.webp',
    disciplines: ['brand', 'studio', 'growth'],
    deliverables: ['Kurumsal Kimlik', 'Ürün Çekimi', 'Sosyal Medya'],
  },
  {
    id: 'tunc-kuruyemis',
    title: 'Tunç Kuruyemiş',
    sector: 'Gıda',
    summary: 'Yerel gıda markası: e-ticaret sitesi, ürün çekimi ve Meta reklam yönetimi.',
    image: '/media/work/tunc-kuruyemis.webp',
    disciplines: ['software', 'studio', 'growth'],
    deliverables: ['E-Ticaret', 'Ürün Çekimi', 'Meta Ads'],
  },
];

export const featuredWorks = works.filter((work) => work.featured);

/** Discipline id → short label, for tagging work entries in the UI. */
export const disciplineLabels = {
  brand: 'Marka',
  growth: 'Büyüme',
  software: 'Yazılım',
  studio: 'Prodüksiyon',
};
