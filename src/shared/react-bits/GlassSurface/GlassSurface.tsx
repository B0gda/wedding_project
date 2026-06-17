import type { CSSProperties, ReactNode } from 'react';
import clsx from 'clsx';
import './GlassSurface.css';

type GlassSurfaceStyle = CSSProperties & Record<string, string | number | undefined>;

type GlassSurfaceProps = {
  children: ReactNode;
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  borderWidth?: number;
  brightness?: number;
  opacity?: number;
  blur?: number;
  backgroundOpacity?: number;
  saturation?: number;
  className?: string;
  style?: CSSProperties;
};

export function GlassSurface({
  children,
  width = '100%',
  height = 'auto',
  borderRadius = 8,
  borderWidth = 0.07,
  brightness = 58,
  opacity = 0.92,
  blur = 16,
  backgroundOpacity = 0.3,
  saturation = 1.16,
  className,
  style
}: GlassSurfaceProps) {
  const surfaceStyle: GlassSurfaceStyle = {
    width,
    height,
    borderRadius,
    '--glass-radius': `${String(borderRadius)}px`,
    '--glass-border-width': borderWidth,
    '--glass-brightness': `${String(brightness)}%`,
    '--glass-opacity': opacity,
    '--glass-blur': `${String(blur)}px`,
    '--glass-background-opacity': backgroundOpacity,
    '--glass-saturation': saturation,
    ...style
  };

  return (
    <div className={clsx('glass-surface', className)} style={surfaceStyle}>
      <div className="glass-surface__edge" />
      <div className="glass-surface__content">{children}</div>
    </div>
  );
}
