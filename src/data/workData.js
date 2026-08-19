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
    id: 'kahvalti-konagi',
    title: 'Kahvaltı Konağı',
    sector: 'Gastronomi',
    summary: 'Gastronomi markası için marka dili, içerik üretimi ve sosyal medya odaklı bütüncül iletişim sistemi.',
    image: '/media/work/kahvalti-konagi.webp',
    disciplines: ['brand', 'studio', 'growth'],
    deliverables: ['Marka Dili', 'İçerik Üretimi', 'Sosyal Medya'],
    featured: true,
  },
  {
    id: '71ev',
    title: '71EV',
    sector: 'Gayrimenkul',
    summary: 'Gayrimenkul portföyünü dönüşüm odaklı bir web deneyimi ve güçlü bir dijital sunum diliyle bir araya getiren yapı.',
    image: '/media/work/71ev.webp',
    disciplines: ['brand', 'software', 'growth'],
    deliverables: ['Web Deneyimi', 'Portföy Sunumu', 'Dijital Büyüme'],
    featured: true,
  },
  {
    id: 'entas-group',
    title: 'ENTAŞ Group',
    sector: 'Sanayi',
    summary: 'Grup şirketlerini tek bir kurumsal dil altında buluşturan marka, web ve içerik iletişimi sistemi.',
    image: '/media/work/entas-group.webp',
    disciplines: ['brand', 'software', 'studio'],
    deliverables: ['Kurumsal Web', 'Marka Sistemi', 'Kurumsal İçerik'],
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
    id: 'gm-planlama',
    title: 'GM Planlama',
    sector: 'Planlama & Mimarlık',
    summary: 'Planlama ve proje uzmanlığını görünür kılan kurumsal kimlik, web deneyimi ve proje sunum altyapısı.',
    image: '/media/work/gm-planlama.webp',
    disciplines: ['brand', 'software'],
    deliverables: ['Kurumsal Kimlik', 'Web Sitesi', 'Proje Sunumu'],
    featured: true,
  },
  {
    id: 'gizli-home',
    title: 'Gizli Home',
    sector: 'Ev & Yaşam',
    summary: 'Ev yaşam markası için ürün odaklı görsel dünya, e-ticaret deneyimi ve sosyal medya iletişimi.',
    image: '/media/work/gizli-home.webp',
    disciplines: ['brand', 'software', 'studio', 'growth'],
    deliverables: ['E-Ticaret', 'Ürün İçeriği', 'Sosyal Medya'],
    featured: true,
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
