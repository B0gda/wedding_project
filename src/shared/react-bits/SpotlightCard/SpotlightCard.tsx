import type { CSSProperties, PointerEvent, ReactNode } from 'react';
import clsx from 'clsx';
import './SpotlightCard.css';

type SpotlightStyle = CSSProperties & Record<string, string | number | undefined>;

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
};

export function SpotlightCard({
  children,
  className,
  spotlightColor = 'rgba(241, 234, 223, 0.2)'
}: SpotlightCardProps) {
  const style: SpotlightStyle = {
    '--spotlight-color': spotlightColor
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      '--spotlight-x',
      `${String(((event.clientX - rect.left) / rect.width) * 100)}%`
    );
    event.currentTarget.style.setProperty(
      '--spotlight-y',
      `${String(((event.clientY - rect.top) / rect.height) * 100)}%`
    );
  };

  return (
    <div
      className={clsx('spotlight-card', className)}
      style={style}
      onPointerMove={handlePointerMove}
    >
      <div className="spotlight-card__content">{children}</div>
    </div>
  );
}
