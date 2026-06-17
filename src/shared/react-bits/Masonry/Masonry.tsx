import type { CSSProperties } from 'react';
import './Masonry.css';

export type MasonryItem = {
  id: string;
  img: string;
  url: string;
  height: number;
};

type MasonryProps = {
  items: readonly MasonryItem[];
  scaleOnHover?: boolean;
  hoverScale?: number;
  blurToFocus?: boolean;
};

export function Masonry({
  items,
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true
}: MasonryProps) {
  return (
    <div className="masonry">
      {items.map((item, index) => (
        <a
          className="masonry__item"
          href={item.url}
          style={
            {
              '--masonry-height': `${String(item.height)}px`,
              '--masonry-delay': `${String(index * 0.05)}s`,
              '--masonry-hover-scale': hoverScale
            } as CSSProperties
          }
          data-scale={scaleOnHover}
          data-blur={blurToFocus}
          key={item.id}
        >
          <img src={item.img} alt={`Фото ЗАГСа ${String(index + 1)}`} />
        </a>
      ))}
    </div>
  );
}
