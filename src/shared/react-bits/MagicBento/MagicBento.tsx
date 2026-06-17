import type { CSSProperties, PointerEvent, ReactNode } from 'react';
import clsx from 'clsx';
import './MagicBento.css';

type MagicBentoStyle = CSSProperties & Record<string, string | number | undefined>;

type MagicBentoProps = {
  children: ReactNode;
  className?: string;
  clickEffect?: boolean;
  enableTilt?: boolean;
  glowColor?: string;
};

export function MagicBento({
  children,
  className,
  clickEffect = true,
  enableTilt = true,
  glowColor = '180, 140, 255'
}: MagicBentoProps) {
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      '--pointer-x',
      `${String(((event.clientX - rect.left) / rect.width) * 100)}%`
    );
    event.currentTarget.style.setProperty(
      '--pointer-y',
      `${String(((event.clientY - rect.top) / rect.height) * 100)}%`
    );
  };
  const style: MagicBentoStyle = {
    '--magic-glow': glowColor
  };

  return (
    <div
      className={clsx(
        'magic-bento',
        clickEffect && 'magic-bento--click',
        enableTilt && 'magic-bento--tilt',
        className
      )}
      style={style}
      onPointerMove={handlePointerMove}
    >
      <div className="magic-bento__stars" aria-hidden="true" />
      <div className="magic-bento__spotlight" aria-hidden="true" />
      <div className="magic-bento__content">{children}</div>
    </div>
  );
}
