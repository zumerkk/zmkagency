import React, { useEffect, useRef } from 'react';

/**
 * Scroll-reveal wrapper.
 *
 * Adds `reveal` on mount (JS-only, so no-JS visitors and prerendered HTML are
 * never left invisible) and `is-in` when the element enters the viewport.
 * The actual animation is chosen by the child's class — `r-up`, `r-line`,
 * `r-media`, `r-scale` — all defined in tokens.css. Keeping the motion in CSS
 * means the global prefers-reduced-motion rule disables it with no JS branch.
 *
 * One shared observer per element, disconnected after firing once.
 */
const Reveal = ({
  as: Tag = 'div',
  className = '',
  delay = 0,
  threshold = 0.18,
  rootMargin = '0px 0px -10% 0px',
  once = true,
  children,
  ...rest
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add('reveal');
    if (delay) el.style.setProperty('--reveal-delay', `${delay}ms`);

    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove('is-in');
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold, rootMargin, once]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
};

export default Reveal;
