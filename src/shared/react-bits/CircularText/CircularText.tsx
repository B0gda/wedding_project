import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import clsx from 'clsx';
import './CircularText.css';

type CircularTextStyle = CSSProperties & Record<string, string | number | undefined>;

type CircularTextProps = {
  text: string;
  spinDuration?: number;
  className?: string;
};

export function CircularText({ text, spinDuration = 20, className }: CircularTextProps) {
  const [isFast, setIsFast] = useState(false);
  const characters = useMemo(() => Array.from(text), [text]);
  const style: CircularTextStyle = {
    '--circular-duration': `${String(spinDuration)}s`
  };

  return (
    <a
      className={clsx('circular-text', className, isFast && 'circular-text--fast')}
      href="#hero"
      aria-label="Вернуться наверх"
      style={style}
      onMouseEnter={() => setIsFast(true)}
      onMouseLeave={() => setIsFast(false)}
    >
      <span className="circular-text__ring" aria-hidden="true">
        {characters.map((char, index) => (
          <span
            className="circular-text__char"
            style={{
              transform: `rotate(${String((360 / characters.length) * index)}deg) translateY(-2.05rem)`
            }}
            key={`${char}-${String(index)}`}
          >
            {char}
          </span>
        ))}
      </span>
      <span className="circular-text__center">
        <span>Богдан</span>
        <span>&</span>
        <span>Вероника</span>
      </span>
    </a>
  );
}
