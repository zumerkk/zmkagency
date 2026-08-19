import React from 'react';
import { Link } from 'react-router-dom';
import { DisplayHeading, Button } from './index';

/**
 * Shared page hero.
 *
 * Every non-home route opens with this, so /calismalar, /iletisim,
 * /hakkimizda, /hizmetler and the 84 local landing pages all inherit the same
 * entrance grammar as the homepage: masked line reveal, gold micro label,
 * breadcrumbs, and the same button family.
 *
 * `accent` and `ground` let a route carry its own temperature without
 * inventing a second design system.
 */
const PageHero = ({
  label,
  lines,
  lead,
  crumbs = [],
  actions,
  ground = 'obsidian',
  accent = 'var(--gold)',
  wash = 'rgba(201,154,61,0.12)',
  size = 'display',
  children,
}) => (
  <header
    className={`page-hero page-hero--${ground} zmk-grain`}
    style={{ '--pillar-accent': accent, '--pillar-wash': wash }}
  >
    <div className="page-hero__wash" aria-hidden="true" />

    <div className="zmk-container page-hero__inner">
      {crumbs.length > 0 && (
        <nav className="pillar-crumbs" aria-label="Sayfa yolu">
          {crumbs.map((crumb, i) => (
            <React.Fragment key={crumb.label}>
              {crumb.to ? <Link to={crumb.to}>{crumb.label}</Link> : <span aria-current="page">{crumb.label}</span>}
              {i < crumbs.length - 1 && <span aria-hidden="true">/</span>}
            </React.Fragment>
          ))}
        </nav>
      )}

      {label && <p className="zmk-micro page-hero__label">{label}</p>}

      <DisplayHeading as="h1" size={size} className="page-hero__title" lines={lines} />

      {lead && <p className="zmk-lead page-hero__lead">{lead}</p>}

      {actions && <div className="page-hero__actions">{actions}</div>}

      {children}
    </div>
  </header>
);

/** The two CTAs almost every page ends on. */
export const HeroActions = ({ primary = 'Projeni Konuşalım', secondaryTo = '/calismalar', secondary = 'Çalışmalarımızı İncele' }) => (
  <>
    <Button to="/iletisim">{primary}</Button>
    {secondary && <Button to={secondaryTo} variant="ghost">{secondary}</Button>}
  </>
);

export default PageHero;
