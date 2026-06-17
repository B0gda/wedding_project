import type { CSSProperties, PointerEvent } from 'react';
import { useRef } from 'react';
import './DomeGallery.css';

type DomeGalleryImage = string | { src: string; alt?: string };

type DomeGalleryStyle = CSSProperties & Record<string, string | number | undefined>;

type DomeGalleryProps = {
  images: readonly DomeGalleryImage[];
  fit?: number;
  minRadius?: number;
  maxVerticalRotationDeg?: number;
  segments?: number;
  dragDampening?: number;
  grayscale?: boolean;
};

export function DomeGallery({
  images,
  fit = 0.8,
  minRadius = 600,
  maxVerticalRotationDeg = 0,
  segments = 34,
  dragDampening = 2,
  grayscale = true
}: DomeGalleryProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragStartRef = useRef<{ x: number; scrollLeft: number } | null>(null);
  const style: DomeGalleryStyle = {
    '--dome-fit': fit,
    '--dome-min-radius': `${String(minRadius)}px`,
    '--dome-vertical-rotation': `${String(maxVerticalRotationDeg)}deg`,
    '--dome-segments': segments,
    '--dome-drag-dampening': dragDampening
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const node = trackRef.current;

    if (!node) {
      return;
    }

    dragStartRef.current = { x: event.clientX, scrollLeft: node.scrollLeft };
    node.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const node = trackRef.current;
    const drag = dragStartRef.current;

    if (!node || !drag) {
      return;
    }

    node.scrollLeft = drag.scrollLeft - (event.clientX - drag.x) * dragDampening;
  };

  const handlePointerUp = () => {
    dragStartRef.current = null;
  };

  return (
    <div className="dome-gallery" style={style}>
      <div
        className="dome-gallery__track"
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerCancel={handlePointerUp}
        onPointerUp={handlePointerUp}
      >
        {images.map((image, index) => {
          const src = typeof image === 'string' ? image : image.src;
          const alt = typeof image === 'string' ? `Фото ресторана ${String(index + 1)}` : image.alt;

          return (
            <figure className="dome-gallery__tile" key={`${src}-${String(index)}`}>
              <img
                className={
                  grayscale
                    ? 'dome-gallery__image dome-gallery__image--gray'
                    : 'dome-gallery__image'
                }
                src={src}
                alt={alt ?? ''}
              />
            </figure>
          );
        })}
      </div>
    </div>
  );
}
