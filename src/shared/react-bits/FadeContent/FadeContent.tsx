import { type ReactNode, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import './FadeContent.css';

type FadeContentProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
};

export function FadeContent({ children, className, delay = 0, duration = 0.8 }: FadeContentProps) {
  const scope = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!scope.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      gsap.fromTo(
        scope.current,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration, delay, ease: 'power3.out' }
      );
    },
    { dependencies: [delay, duration], scope }
  );

  return (
    <div ref={scope} className={clsx('fade-content', className)}>
      {children}
    </div>
  );
}
