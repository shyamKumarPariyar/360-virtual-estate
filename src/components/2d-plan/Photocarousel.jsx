import { useCallback, useEffect, useRef, useState } from 'react';

export default function PhotoCarousel({ photos = [], start = 0, onChange }) {
    const [index, setIndex] = useState(start);
    const touchStart = useRef(null);
    const rootRef = useRef(null);

    const goTo = useCallback(
        (next, via) => {
        if (!photos.length) return;
        const wrapped = (next + photos.length) % photos.length;
        setIndex(wrapped);
        onChange?.({ index: wrapped, photo: photos[wrapped], via });
        },
        [photos, onChange]
    );

    const prev = useCallback(() => goTo(index - 1, 'arrow'), [goTo, index]);
    const next = useCallback(() => goTo(index + 1, 'arrow'), [goTo, index]);

    const onKeyDown = useCallback(
        (e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
        if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
        },
        [prev, next]
    );

    const onTouchStart = (e) => {
        touchStart.current = e.touches[0].clientX;
    };

    const onTouchEnd = (e) => {
        if (touchStart.current == null) return;
        const delta = e.changedTouches[0].clientX - touchStart.current;
        touchStart.current = null;
        if (Math.abs(delta) < 50) return;
        delta > 0 ? goTo(index - 1, 'swipe') : goTo(index + 1, 'swipe');
    };

    useEffect(() => {
        if (photos.length < 2) return;
        [index + 1, index - 1].forEach((i) => {
        const p = photos[(i + photos.length) % photos.length];
        if (p) new Image().src = p.src;
        });
    }, [index, photos]);

    if (!photos.length) return null;

    const photo = photos[index];

    return (
        <div
            ref={rootRef}
            className="pc"
            tabIndex={0}
            role="region"
            aria-roledescription="carousel"
            aria-label={photo.title ?? 'Photos'}
            onKeyDown={onKeyDown}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
        <img className="pc__img" src={photo.src} alt={photo.alt} />

        {(photo.room || photo.alt) && (
            <div className="pc__overlay">
            {photo.room && <h3 className="pc__room">{photo.room}</h3>}
            {photo.alt && <p className="pc__alt">{photo.alt}</p>}
            </div>
        )}

        {photos.length > 1 && (
            <>
            <button className="pc__nav pc__nav--prev" onClick={prev} aria-label="Previous photo">‹</button>
            <button className="pc__nav pc__nav--next" onClick={next} aria-label="Next photo">›</button>

            <div className="pc__dots" role="tablist">
                {photos.map((p, i) => (
                <button
                    key={p.src}
                    className={`pc__dot${i === index ? ' is-active' : ''}`}
                    onClick={() => goTo(i, 'dot')}
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Photo ${i + 1} of ${photos.length}`}
                />
                ))}
            </div>
            </>
        )}
        </div>
    );
}