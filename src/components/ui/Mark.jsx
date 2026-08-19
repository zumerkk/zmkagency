import React from 'react';

/**
 * The ZMK mark's geometry, isolated as a reusable graphic.
 *
 * In the official lockup the gold element is the crossing point between the M
 * and the K: two triangular planes meeting at a waist, upper plane bright and
 * lower plane falling to bronze. That shape — not the wordmark — is the piece
 * of the identity that can be reused as a design element, which is why this
 * component draws the planes rather than embedding the logo.
 *
 * Use it as a divider, a placeholder mark, a section pivot or a loading state.
 * Never as a substitute for the logo itself in the header or footer.
 */
const Mark = ({ size = 40, className = '', title }) => {
  // A stable id per instance so multiple marks on one page do not collide
  // over the gradient definition.
  const gradId = React.useId();

  return (
    <svg
      className={`zmk-mark ${className}`}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : 'true'}
      focusable="false"
    >
      {title && <title>{title}</title>}
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor="var(--gold-light)" />
          <stop offset="46%" stopColor="var(--gold)" />
          <stop offset="100%" stopColor="var(--gold-deep)" />
        </linearGradient>
      </defs>

      {/* Upper plane: descends left-to-right into the waist. */}
      <path d="M62 4 L96 4 L50 52 Z" fill={`url(#${gradId})`} />
      {/* Lower plane: opens back out from the waist. */}
      <path d="M50 52 L84 96 L20 96 Z" fill={`url(#${gradId})`} opacity="0.92" />
    </svg>
  );
};

/**
 * Full-bleed divider built from the same diagonal.
 * Used to pivot between chapters without resorting to another 1px border.
 */
export const MarkDivider = ({ className = '' }) => (
  <div className={`zmk-mark-divider ${className}`} aria-hidden="true">
    <span className="zmk-mark-divider__rule" />
    <Mark size={22} />
    <span className="zmk-mark-divider__rule" />
  </div>
);

export default Mark;
