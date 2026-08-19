import React from 'react';
import { Link } from 'react-router-dom';

/* ==========================================================================
   Shared UI primitives.
   Small, unopinionated, and the only place these shapes are defined — so a
   button or an arrow looks identical on every route.
   ========================================================================== */

export const ArrowRight = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
  </svg>
);

/**
 * Display heading that reveals line by line behind a mask.
 *
 * `lines` is an array of strings or nodes — one per visual line. Each line is
 * wrapped in an overflow-hidden block so the inner span can slide up from
 * below it. The stagger is applied per line via a CSS custom property rather
 * than per-element JS timers.
 */
export const DisplayHeading = ({
  lines,
  as: Tag = 'h2',
  className = '',
  size = 'display',
  stagger = 90,
}) => (
  <Tag className={`${size === 'mega' ? 'zmk-mega' : 'zmk-display'} ${className}`}>
    {lines.map((line, i) => (
      <span className="r-line" key={i}>
        <span style={{ transitionDelay: `${i * stagger}ms` }}>{line}</span>
      </span>
    ))}
  </Tag>
);

/**
 * Chapter opener. Deliberately NOT a label-above-every-heading component —
 * `index` is optional and is meant to be used a few times per page, where the
 * numbering itself carries meaning.
 */
export const ChapterIntro = ({ index, title, lead, className = '', align = 'start' }) => (
  <header className={`chapter-intro chapter-intro--${align} ${className}`}>
    {index && <p className="zmk-micro chapter-intro__index">{index}</p>}
    <div className="chapter-intro__title r-up">{title}</div>
    {lead && <p className="zmk-lead chapter-intro__lead r-up">{lead}</p>}
  </header>
);

/** Primary / ghost button. `to` renders a Link, `href` an anchor. */
export const Button = ({ to, href, variant = 'solid', children, className = '', ...rest }) => {
  const cls = `zmk-btn ${variant === 'ghost' ? 'zmk-btn--ghost' : ''} ${className}`;
  const inner = (<>{children}<ArrowRight /></>);

  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  if (href) return <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>{inner}</a>;
  return <button type="button" className={cls} {...rest}>{inner}</button>;
};

/** Underlined text CTA with a travelling arrow. */
export const TextCTA = ({ to, href, children, className = '', ...rest }) => {
  const cls = `zmk-cta ${className}`;
  const inner = (<>{children}<ArrowRight /></>);

  if (to) return <Link to={to} className={cls} {...rest}>{inner}</Link>;
  return <a href={href} className={cls} target="_blank" rel="noopener noreferrer" {...rest}>{inner}</a>;
};

/**
 * Media slot.
 *
 * Renders responsive imagery, silent loop video, or a composed placeholder.
 * A video is selected by its file extension and uses `poster` as both its
 * loading state and reduced-motion fallback.
 *
 * `ratio` keeps the box reserved before the image loads, so adding real media
 * later cannot introduce layout shift.
 */
export const MediaFrame = ({
  src,
  alt = '',
  ratio = '16 / 9',
  label,
  caption,
  tone = 'carbon',
  diagonal = false,
  className = '',
  priority = false,
  poster,
}) => (
  <figure className={`media-frame media-frame--${tone} ${diagonal ? 'zmk-diagonal' : ''} ${className}`}>
    <div className="media-frame__box r-media" style={{ aspectRatio: ratio }}>
      {src && /\.(mp4|webm|mov)(\?.*)?$/i.test(src) ? (
        <video
          className="media-frame__img r-scale"
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? 'auto' : 'metadata'}
          aria-label={alt}
        >
          <source src={src} media="(prefers-reduced-motion: no-preference)" />
        </video>
      ) : src ? (
        <img
          className="media-frame__img r-scale"
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : undefined}
        />
      ) : (
        <div className="media-frame__placeholder" role="img" aria-label={alt || label || 'Görsel alanı'}>
          <span className="media-frame__mark" aria-hidden="true" />
          {label && <span className="media-frame__label">{label}</span>}
        </div>
      )}
    </div>
    {caption && <figcaption className="media-frame__caption zmk-micro">{caption}</figcaption>}
  </figure>
);
