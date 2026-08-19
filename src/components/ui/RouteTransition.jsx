import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Route transition — the ZMK signature move.
 *
 * Two diagonal planes, cut from the same geometry as the gold mark, sweep
 * across the viewport when the path changes and then retract. The whole move
 * is ~620ms and the overlay is pointer-events:none throughout, so it is never
 * capable of blocking or delaying navigation — the new route renders
 * underneath while the planes are still clearing.
 *
 * Implemented with direct class toggling on a ref rather than React state.
 * Setting state on every route change re-renders the whole app subtree for a
 * purely visual effect, and setting it synchronously inside the effect is what
 * triggers the cascading-render lint rule. A class on one DOM node costs
 * nothing and cannot cascade.
 */
const RouteTransition = () => {
  const ref = useRef(null);
  const { pathname } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    // Do not play on the very first paint — the hero has its own entrance.
    if (first.current) {
      first.current = false;
      return;
    }

    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    el.classList.remove('is-playing');
    // Force a reflow so removing and re-adding the class restarts the
    // animation even when two navigations land in the same frame.
    void el.offsetWidth;
    el.classList.add('is-playing');

    const timer = setTimeout(() => el.classList.remove('is-playing'), 700);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="route-transition" ref={ref} aria-hidden="true">
      <span className="route-transition__plane route-transition__plane--a" />
      <span className="route-transition__plane route-transition__plane--b" />
    </div>
  );
};

/**
 * Scroll progress rail.
 *
 * A one-pixel gold rule across the top of the viewport. Written as a CSS
 * custom property from a rAF-throttled scroll listener — no state, no
 * re-render, one style write per frame at most.
 */
export const ScrollProgress = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const progress = max > 0 ? doc.scrollTop / max : 0;
      el.style.setProperty('--scroll-progress', progress.toFixed(4));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <div className="scroll-progress" ref={ref} aria-hidden="true" />;
};

export default RouteTransition;
