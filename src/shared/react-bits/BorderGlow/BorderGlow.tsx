import type { CSSProperties, PointerEvent, ReactNode } from 'react';
import clsx from 'clsx';
import './BorderGlow.css';

type BorderGlowStyle = CSSProperties & Record<string, string | number | undefined>;

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  colors?: string[];
  interactive?: boolean;
};

export function BorderGlow({
  children,
  className,
  glowColor = '241 234 223',
  backgroundColor = 'rgba(241, 234, 223, 0.52)',
  borderRadius = 8,
  glowRadius = 42,
  glowIntensity = 1,
  colors = ['#b8afa3', '#f1eadf', '#8b6b55'],
  interactive = true
}: BorderGlowProps) {
  const style: BorderGlowStyle = {
    '--border-glow-color': glowColor,
    '--border-glow-bg': backgroundColor,
    '--border-glow-radius': `${String(borderRadius)}px`,
    '--border-glow-size': `${String(glowRadius)}px`,
    '--border-glow-intensity': glowIntensity,
    '--border-glow-a': colors[0],
    '--border-glow-b': colors[1],
    '--border-glow-c': colors[2]
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty(
      '--border-glow-x',
      `${String(((event.clientX - rect.left) / rect.width) * 100)}%`
    );
    event.currentTarget.style.setProperty(
      '--border-glow-y',
      `${String(((event.clientY - rect.top) / rect.height) * 100)}%`
    );
  };

  return (
    <div
      className={clsx('border-glow', !interactive && 'border-glow--static', className)}
      style={style}
      onPointerMove={handlePointerMove}
    >
      <div className="border-glow__content">{children}</div>
    </div>
  );
}
