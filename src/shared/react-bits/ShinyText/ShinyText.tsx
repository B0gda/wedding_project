import type { CSSProperties } from 'react';
import clsx from 'clsx';
import './ShinyText.css';

type ShinyTextStyle = CSSProperties & Record<string, string | number | undefined>;

type ShinyTextProps = {
  text: string;
  speed?: number;
  delay?: number;
  color?: string;
  shineColor?: string;
  spread?: number;
  className?: string;
};

export function ShinyText({
  text,
  speed = 2,
  delay = 0,
  color = '#8b6b55',
  shineColor = '#5a4436',
  spread = 120,
  className
}: ShinyTextProps) {
  const style: ShinyTextStyle = {
    '--shiny-speed': `${String(speed)}s`,
    '--shiny-delay': `${String(delay)}s`,
    '--shiny-color': color,
    '--shiny-shine': shineColor,
    '--shiny-spread': `${String(spread)}%`
  };

  return (
    <span className={clsx('shiny-text', className)} style={style}>
      {text}
    </span>
  );
}
