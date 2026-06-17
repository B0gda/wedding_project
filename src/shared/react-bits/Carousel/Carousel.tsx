import type { CSSProperties } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import './Carousel.css';

export type CarouselItem = {
  time: string;
  title: string;
  text: string;
};

type CarouselProps = {
  items: readonly CarouselItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
};

type CarouselStyle = CSSProperties & Record<string, string | number | undefined>;

export function Carousel({
  items,
  baseWidth = 340,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = true,
  loop = false,
  round = false
}: CarouselProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isHoveringRef = useRef(false);
  const style: CarouselStyle = { '--carousel-base-width': `${String(baseWidth)}px` };

  useEffect(() => {
    if (!autoplay) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      if (pauseOnHover && isHoveringRef.current) {
        return;
      }

      scrollCarousel(trackRef.current, 1, loop);
    }, autoplayDelay);

    return () => window.clearInterval(interval);
  }, [autoplay, autoplayDelay, loop, pauseOnHover]);

  return (
    <div
      className="carousel"
      style={style}
      onPointerEnter={() => {
        isHoveringRef.current = true;
      }}
      onPointerLeave={() => {
        isHoveringRef.current = false;
      }}
    >
      <button
        className="carousel__button carousel__button--prev"
        type="button"
        aria-label="Предыдущий пункт программы"
        onClick={() => scrollCarousel(trackRef.current, -1, loop)}
      >
        <ChevronLeft aria-hidden="true" />
      </button>
      <div className="carousel__viewport" ref={trackRef} tabIndex={0}>
        {items.map((item, index) => (
          <article
            className={round ? 'carousel__card carousel__card--round' : 'carousel__card'}
            key={`${item.time}-${item.title}`}
          >
            <span className="carousel__index">{String(index + 1).padStart(2, '0')}</span>
            <p className="carousel__time">{item.time}</p>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
      <button
        className="carousel__button carousel__button--next"
        type="button"
        aria-label="Следующий пункт программы"
        onClick={() => scrollCarousel(trackRef.current, 1, loop)}
      >
        <ChevronRight aria-hidden="true" />
      </button>
    </div>
  );
}

function scrollCarousel(node: HTMLDivElement | null, direction: -1 | 1, loop: boolean) {
  if (!node) {
    return;
  }

  const card = node.querySelector<HTMLElement>('.carousel__card');
  const step = card ? card.offsetWidth + 24 : 360;
  const nextLeft = node.scrollLeft + step * direction;
  const maxLeft = node.scrollWidth - node.clientWidth;

  if (loop && nextLeft > maxLeft - 4) {
    node.scrollTo({ left: 0, behavior: 'smooth' });
    return;
  }

  if (loop && nextLeft < 0) {
    node.scrollTo({ left: maxLeft, behavior: 'smooth' });
    return;
  }

  node.scrollBy({ left: step * direction, behavior: 'smooth' });
}
