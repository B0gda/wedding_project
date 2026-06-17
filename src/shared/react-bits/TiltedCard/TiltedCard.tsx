import type { ReactNode } from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import './TiltedCard.css';

type TiltedCardProps = {
  color: string;
  title: string;
  captionText: string;
  overlayContent?: ReactNode;
  className?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
};

export function TiltedCard({
  color,
  title,
  captionText,
  overlayContent,
  className,
  rotateAmplitude = 10,
  scaleOnHover = 1.04
}: TiltedCardProps) {
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg) scale(1)');

  return (
    <article
      className={clsx('tilted-card', className)}
      style={{ transform }}
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        setTransform(
          `rotateX(${String(-y * rotateAmplitude)}deg) rotateY(${String(x * rotateAmplitude)}deg) scale(${String(scaleOnHover)})`
        );
      }}
      onPointerLeave={() => setTransform('rotateX(0deg) rotateY(0deg) scale(1)')}
    >
      <span className="tilted-card__color" style={{ backgroundColor: color }} />
      <span className="tilted-card__hex">{color}</span>
      <h3>{title}</h3>
      <p>{captionText}</p>
      {overlayContent ? <div className="tilted-card__overlay">{overlayContent}</div> : null}
    </article>
  );
}
