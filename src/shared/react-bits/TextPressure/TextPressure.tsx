import type { CSSProperties } from 'react';
import { useMemo, useRef, useState } from 'react';
import clsx from 'clsx';
import './TextPressure.css';

type TextPressureProps = {
  text: string;
  className?: string;
  textColor?: string;
  strokeColor?: string;
  minFontSize?: number;
  flex?: boolean;
  alpha?: boolean;
  stroke?: boolean;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
};

type PointerPosition = {
  x: number;
  y: number;
};

export function TextPressure({
  text,
  className,
  textColor = '#ffffff',
  strokeColor = '#8b6b55',
  minFontSize = 36,
  flex = false,
  alpha = false,
  stroke = true,
  width = true,
  weight = true,
  italic = false
}: TextPressureProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pointer, setPointer] = useState<PointerPosition | null>(null);
  const letters = useMemo(() => Array.from(text), [text]);

  const style: CSSProperties = {
    color: textColor,
    fontSize: `max(${String(minFontSize)}px, clamp(4.6rem, 19vw, 17rem))`
  };

  return (
    <div
      className={clsx('text-pressure', flex && 'text-pressure--flex', className)}
      ref={ref}
      style={style}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPointer({
          x: (event.clientX - rect.left) / rect.width,
          y: (event.clientY - rect.top) / rect.height
        });
      }}
      onPointerLeave={() => setPointer(null)}
    >
      {letters.map((letter, index) => {
        const pressure = getLetterPressure(pointer, index, letters.length);
        const letterStyle = getLetterStyle({
          alpha,
          italic,
          pressure,
          stroke,
          strokeColor,
          weight,
          width
        });

        return (
          <span
            className={letter === ' ' ? 'text-pressure__space' : 'text-pressure__letter'}
            style={letterStyle}
            key={`${letter}-${String(index)}`}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        );
      })}
    </div>
  );
}

function getLetterPressure(pointer: PointerPosition | null, index: number, length: number) {
  if (!pointer) {
    return 0;
  }

  const denominator = Math.max(length - 1, 1);
  const x = index / denominator;
  const distance = Math.hypot((pointer.x - x) * 1.45, (pointer.y - 0.5) * 0.9);

  return Math.max(0, 1 - distance * 1.85);
}

function getLetterStyle({
  alpha,
  italic,
  pressure,
  stroke,
  strokeColor,
  weight,
  width
}: {
  alpha: boolean;
  italic: boolean;
  pressure: number;
  stroke: boolean;
  strokeColor: string;
  weight: boolean;
  width: boolean;
}): CSSProperties {
  const scaleX = width ? 0.78 + pressure * 0.58 : 1;
  const scaleY = 1 + pressure * 0.16;
  const skew = italic ? -pressure * 10 : 0;

  return {
    opacity: alpha ? 0.62 + pressure * 0.38 : 1,
    WebkitTextStroke: stroke ? `${String(0.4 + pressure * 1.15)}px ${strokeColor}` : undefined,
    fontWeight: weight ? 680 + Math.round(pressure * 220) : undefined,
    transform: `scaleX(${String(scaleX)}) scaleY(${String(scaleY)}) skewX(${String(skew)}deg) translateY(${String(-pressure * 0.08)}em)`
  };
}
