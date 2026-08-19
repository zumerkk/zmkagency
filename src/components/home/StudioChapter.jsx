import React from 'react';
import { DisplayHeading, TextCTA, MediaFrame } from '../ui';
import Reveal from '../ui/Reveal';

/**
 * Studio chapter — the page's warm chapter.
 *
 * The umber ground is the only place the site leaves its cool temperature. It
 * is doing real work: production is the most physical of the four
 * disciplines, and the warmth reads as tungsten light rather than as a
 * different design system.
 *
 * Layout is a cinematic mosaic — one wide frame, two portraits, one detail —
 * rather than four equal tiles, so it already has the shape of a photo essay
 * before the photography exists.
 */
const setups = [
  { name: 'Kurumsal Set', use: 'Yönetici röportajı, şirket tanıtımı, LinkedIn içeriği' },
  { name: 'Ürün Seti', use: 'E-ticaret görselleri, katalog, ambalaj detayı' },
  { name: 'Creator Seti', use: 'Reels, kısa video, sosyal medya serileri' },
];

const StudioChapter = () => (
  <section className="zmk-chapter zmk-chapter--umber chapter-studio zmk-grain" aria-labelledby="studio-title">
    <div className="zmk-container">
      <div className="chapter-studio__head">
        <Reveal>
          <p className="zmk-micro">04 — Studio</p>
          <DisplayHeading
            as="h2"
            id="studio-title"
            className="chapter-studio__title"
            lines={['Markanızın görüntüsünü', <span className="chapter-studio__title-2" key="2">içeriden üretiyoruz.</span>]}
          />
        </Reveal>
        <Reveal delay={110}>
          <p className="zmk-lead r-up chapter-studio__lead">
            Prodüksiyonu dışarıdan almak; her kampanyada yeniden pazarlık, yeniden brief ve
            yeniden farklı bir görsel dil demek. Kendi stüdyomuzda ürettiğimiz için içerik
            kampanya hızında çıkıyor ve marka dili tutarlı kalıyor.
          </p>
        </Reveal>
      </div>

      <Reveal className="studio-mosaic">
        <MediaFrame
          src="/media/studio/studio-loop.mp4" poster="/media/studio/studio-wide.webp"
          tone="umber" ratio="16 / 9" label="Stüdyo · Geniş plan"
          alt="ZMK Studio çekim alanı" className="studio-mosaic__wide"
        />
        <MediaFrame
          src="/media/studio/product-set.webp"
          tone="umber" ratio="3 / 4" label="Ürün seti"
          alt="Ürün çekimi" className="studio-mosaic__tall-a"
        />
        <MediaFrame
          src="/media/studio/interview-set.webp"
          tone="umber" ratio="3 / 4" label="Röportaj düzeni"
          alt="Röportaj çekimi" className="studio-mosaic__tall-b"
        />
        <MediaFrame
          src="/media/studio/equipment-detail.webp"
          tone="umber" ratio="1 / 1" label="Işık & ekipman detayı"
          alt="Stüdyo ekipman detayı" className="studio-mosaic__detail"
        />
      </Reveal>

      <div className="studio-setups">
        {setups.map((setup, i) => (
          <Reveal className="studio-setup r-up" key={setup.name} delay={i * 90}>
            <h3 className="studio-setup__name">{setup.name}</h3>
            <p className="studio-setup__use">{setup.use}</p>
          </Reveal>
        ))}
      </div>

      <Reveal className="chapter-studio__foot r-up">
        <TextCTA to="/studio">Stüdyo yetkinliklerini gör</TextCTA>
      </Reveal>
    </div>
  </section>
);

export default StudioChapter;
