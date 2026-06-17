import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';
import './CircularGallery.css';

export type CircularGalleryItem = {
  color: string;
  title: string;
  text: string;
};

type CircularGalleryStyle = CSSProperties & Record<string, string | number | undefined>;

type CircularGalleryProps = {
  items: readonly CircularGalleryItem[];
  bend?: number;
  textColor?: string;
  borderRadius?: number;
  scrollEase?: number;
  font?: string;
  scrollSpeed?: number;
};

export function CircularGallery({
  items,
  bend = 1,
  textColor = '#5a4436',
  borderRadius = 0.05,
  scrollEase = 0.05,
  font = '700 1rem var(--font-ui)',
  scrollSpeed = 1.1
}: CircularGalleryProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const style: CircularGalleryStyle = {
    '--circular-gallery-bend': bend,
    '--circular-gallery-text': textColor,
    '--circular-gallery-radius': `${String(borderRadius * 100)}%`,
    '--circular-gallery-ease': `${String(scrollEase * 1000)}ms`,
    '--circular-gallery-font': font,
    '--circular-gallery-speed': scrollSpeed
  };
  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return undefined;
    }

    const handleWheel = (event: WheelEvent) => {
      const node = trackRef.current;

      if (!node || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      event.preventDefault();
      node.scrollBy({
        left: event.deltaY * scrollSpeed,
        behavior: 'smooth'
      });
    };

    root.addEventListener('wheel', handleWheel, { passive: false });

    return () => root.removeEventListener('wheel', handleWheel);
  }, [scrollSpeed]);

  return (
    <div className="circular-gallery" style={style} aria-label="Цвета под запретом" ref={rootRef}>
      <div className="circular-gallery__track" ref={trackRef}>
        {items.map((item, index) => (
          <article className="circular-gallery__card" key={item.color}>
            <span
              className="circular-gallery__swatch"
              style={{ '--circular-gallery-color': item.color } as CircularGalleryStyle}
              aria-hidden="true"
            />
            <div className="circular-gallery__copy">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <strong>{item.color}</strong>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
