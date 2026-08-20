import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Single-row horizontal rail with arrow controls.
 *
 * The arrows are driven by measured overflow rather than a breakpoint: they
 * appear only when the content is actually wider than the track, and each one
 * hides when that end is reached. A breakpoint would guess wrong whenever the
 * item count or card width changes.
 */
export default function ScrollRail({ children, className = '', ariaLabel }) {
  const trackRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);
  const [overflowing, setOverflowing] = useState(false);

  const measure = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;

    const max = el.scrollWidth - el.clientWidth;
    // 1px of slack absorbs sub-pixel rounding, which otherwise leaves the
    // end arrow enabled when the track is already fully scrolled.
    setOverflowing(max > 1);
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft >= max - 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    measure();
    el.addEventListener('scroll', measure, { passive: true });

    // Cards contain lazily-loaded 3D viewers, so the track's scrollWidth
    // changes after first paint. A ResizeObserver catches that; a one-shot
    // measurement would not.
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    for (const child of el.children) ro.observe(child);

    return () => {
      el.removeEventListener('scroll', measure);
      ro.disconnect();
    };
  }, [measure, children]);

  const scrollBy = useCallback((direction) => {
    const el = trackRef.current;
    if (!el) return;
    // Page by one card width so items land on a snap point rather than
    // stopping mid-card.
    const card = el.querySelector(':scope > *');
    const step = card ? card.getBoundingClientRect().width + 14 : el.clientWidth * 0.8;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  }, []);

  return (
    <div className={`rail ${className}`}>
      {overflowing && (
        <button
          type="button"
          className="rail__arrow rail__arrow--prev"
          onClick={() => scrollBy(-1)}
          disabled={atStart}
          aria-label="Scroll left"
        >
          <Chevron direction="left" />
        </button>
      )}

      <ul ref={trackRef} className="rail__track" aria-label={ariaLabel}>
        {children}
      </ul>

      {overflowing && (
        <button
          type="button"
          className="rail__arrow rail__arrow--next"
          onClick={() => scrollBy(1)}
          disabled={atEnd}
          aria-label="Scroll right"
        >
          <Chevron direction="right" />
        </button>
      )}
    </div>
  );
}

function Chevron({ direction }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}