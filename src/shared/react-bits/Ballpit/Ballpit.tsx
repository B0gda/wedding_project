import type { CSSProperties } from 'react';
import { useCallback, useMemo, useRef } from 'react';
import './Ballpit.css';

type BallpitProps = {
  count?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  followCursor?: boolean;
  colors?: string[];
  ambientColor?: number;
  ambientIntensity?: number;
  lightIntensity?: number;
  minSize?: number;
  maxSize?: number;
  size0?: number;
  maxVelocity?: number;
  maxX?: number;
  maxY?: number;
  maxZ?: number;
};

type BallStyle = CSSProperties & Record<string, string | number>;

export function Ballpit({
  count = 100,
  gravity = 0.01,
  friction = 0.9975,
  wallBounce = 0.95,
  followCursor = false,
  colors = ['#5a4436', '#8b6b55', '#b8afa3', '#f1eadf'],
  ambientColor = 0xffffff,
  ambientIntensity = 1,
  lightIntensity = 200,
  minSize = 0.5,
  maxSize = 1,
  size0 = 1,
  maxVelocity = 0.15,
  maxX = 5,
  maxY = 5,
  maxZ = 2
}: BallpitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const balls = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const left = (index * 37) % 100;
        const scale = minSize + (((index * 11) % 100) / 100) * (maxSize - minSize);
        const size = 20 + scale * 38;
        const delay = -((index * 17) % 90) / 10;
        const duration = Math.max(3, 12 - maxVelocity * 18 + ((index * 13) % 70) / 10);
        const color = colors[index % colors.length] ?? '#b8afa3';
        const drift = ((index * 19) % 36) - 18;
        const lift = 20 + ((index * 23) % 24);

        return { color, delay, drift, duration, left, lift, size };
      }),
    [colors, count, maxSize, maxVelocity, minSize]
  );
  const handlePointerMove = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!followCursor || !containerRef.current) {
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      containerRef.current.style.setProperty('--ballpit-cursor-x', `${String(x)}%`);
      containerRef.current.style.setProperty('--ballpit-cursor-y', `${String(y)}%`);
    },
    [followCursor]
  );

  return (
    <div
      ref={containerRef}
      className="ballpit"
      data-follow-cursor={String(followCursor)}
      onPointerMove={handlePointerMove}
      style={
        {
          '--ballpit-gravity': gravity,
          '--ballpit-friction': friction,
          '--ballpit-wall-bounce': wallBounce,
          '--ballpit-ambient-color': ambientColor,
          '--ballpit-ambient-intensity': ambientIntensity,
          '--ballpit-light-intensity': lightIntensity,
          '--ballpit-size-0': size0,
          '--ballpit-max-x': maxX,
          '--ballpit-max-y': maxY,
          '--ballpit-max-z': maxZ
        } as BallStyle
      }
      aria-hidden="true"
    >
      {balls.map((ball, index) => (
        <span
          className="ballpit__ball"
          key={index}
          style={
            {
              '--ball-left': `${String(ball.left)}%`,
              '--ball-size': `${String(ball.size)}px`,
              '--ball-color': ball.color,
              '--ball-delay': `${String(ball.delay)}s`,
              '--ball-duration': `${String(ball.duration)}s`,
              '--ball-drift': `${String(ball.drift)}%`,
              '--ball-lift': `-${String(ball.lift)}rem`
            } as BallStyle
          }
        />
      ))}
    </div>
  );
}
