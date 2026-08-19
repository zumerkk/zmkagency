/**
 * ZMK capability model — the four pillars.
 *
 * This is the single source of truth for what ZMK does. It feeds the homepage
 * capability grid, the /hizmetler overview and each pillar's detail page, so
 * adding a service in one place propagates everywhere.
 *
 * Copy rule: every `outcome` describes a business result, not a deliverable.
 * "Web sitesi yapıyoruz" is a deliverable. "Satış ve güven altyapısını
 * kuruyoruz" is an outcome. Keep it that way.
 */

export const pillars = [
  {
    id: 'brand',
    number: '01',
    slug: 'marka',
    label: 'BRAND',
    title: 'Marka',
    headline: 'Markanız nasıl göründüğüne değil, nasıl hatırlandığına yatırım yapar.',
    outcome:
      'İşletmenizin ne olduğunu, kime hitap ettiğini ve neden tercih edilmesi gerektiğini tutarlı tek bir dile dönüştürüyoruz. Logodan tabelaya, ambalajdan sunuma kadar aynı marka konuşur.',
    services: [
      'Marka Stratejisi & Konumlandırma',
      'Kurumsal Kimlik Sistemleri',
      'Logo & Marka Rehberi',
      'Grafik Tasarım',
      'Ambalaj Tasarımı',
      'Basılı Materyal & Katalog',
      'Tabela & Fiziksel Uygulamalar',
      'Rebranding',
    ],
  },
  {
    id: 'growth',
    number: '02',
    slug: 'dijital',
    label: 'GROWTH',
    title: 'Dijital Büyüme',
    headline: 'Reklam bütçesini görünürlüğe değil, ölçülebilir büyümeye dönüştürüyoruz.',
    outcome:
      'İçeriği rastgele paylaşmıyoruz. Hangi kanalın ne getirdiği ölçülen, aylık raporlanan ve veriye göre yeniden kurgulanan bir iletişim sistemi işletiyoruz.',
    services: [
      'Sosyal Medya Yönetimi',
      'İçerik Stratejisi',
      'Meta Ads',
      'Google Ads',
      'SEO & Teknik SEO',
      'Google İşletme Profili',
      'Performance Marketing',
      'Kampanya Yönetimi',
      'Analitik & Raporlama',
    ],
  },
  {
    id: 'software',
    number: '03',
    slug: 'yazilim',
    label: 'SOFTWARE',
    title: 'Yazılım',
    headline: 'İşletmenizde tekrar eden süreçleri dijital sisteme dönüştürüyoruz.',
    outcome:
      'Excel dosyalarında, WhatsApp gruplarında ve defterlerde yürüyen işler yazılıma taşınır. Sipariş, stok, rezervasyon, teklif ve müşteri takibi tek panelden yönetilir.',
    services: [
      'Kurumsal Web Siteleri',
      'E-Ticaret Sistemleri',
      'Özel Yazılım Geliştirme',
      'Yönetim Panelleri',
      'CRM Sistemleri',
      'Rezervasyon Sistemleri',
      'Stok & Kasa Sistemleri',
      'İş Akışı Otomasyonları',
      'API & AI Entegrasyonları',
    ],
  },
  {
    id: 'studio',
    number: '04',
    slug: 'studio',
    label: 'STUDIO',
    title: 'Prodüksiyon',
    headline: 'Markanızın görüntüsünü dışarıdan satın almıyor, içeriden üretiyoruz.',
    outcome:
      'Reklam filminden ürün çekimine kadar görsel üretim kendi ekibimizde. Bu, hem tutarlı bir görsel dil hem de kampanya hızında içerik üretimi demek.',
    services: [
      'Reklam Filmi',
      'Sosyal Medya Prodüksiyonu',
      'Reels & Kısa Video',
      'Ürün Fotoğrafçılığı',
      'Kurumsal Fotoğraf',
      'Mekân Çekimi',
      'Röportaj & Marka Hikâyesi',
      'Post Prodüksiyon',
    ],
  },
];

/**
 * Delivery process. Numbered because the sequence itself is the argument:
 * we do not start producing before we have understood and planned.
 */
export const processSteps = [
  { number: '01', title: 'Analiz', text: 'İşletmeyi, rakipleri ve asıl problemi anlıyoruz. Varsayımla başlamıyoruz.' },
  { number: '02', title: 'Strateji', text: 'Marka ve büyüme planını, ölçülecek hedeflerle birlikte oluşturuyoruz.' },
  { number: '03', title: 'Üretim', text: 'Tasarım, yazılım, reklam ve prodüksiyon aynı plana göre paralel ilerliyor.' },
  { number: '04', title: 'Yayın', text: 'Sistemler canlıya alınır, ölçüm altyapısı ilk günden kurulu gelir.' },
  { number: '05', title: 'Ölçüm', text: 'Neyin çalıştığı ve neyin çalışmadığı raporlanır. Tahmin yok, veri var.' },
  { number: '06', title: 'Büyüme', text: 'Veriye göre yeni aksiyonlar planlanır. Süreç burada bitmez, döner.' },
];

/**
 * Sectors ZMK is set up to serve. Deliberately no claims of sector-specific
 * certification — this communicates capability and range, nothing more.
 */
export const industries = [
  'Sanayi & Üretim',
  'İnşaat & Gayrimenkul',
  'Yeme & İçme',
  'Perakende & E-Ticaret',
  'Sağlık & Klinik',
  'Eğitim',
  'Otomotiv',
  'Profesyonel Hizmetler',
];

/**
 * What a business normally has to coordinate alone. Used by the "Why ZMK"
 * section — the argument is the coordination cost, not our headcount.
 */
export const fragmentedRoles = [
  'Tasarımcı',
  'Yazılımcı',
  'Reklam ajansı',
  'Fotoğrafçı',
  'Video editörü',
  'SEO uzmanı',
  'Matbaa',
  'Sosyal medya ekibi',
];
