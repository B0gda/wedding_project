import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

type CountUpProps = {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  separator?: string;
  className?: string;
};

export function CountUp({
  from = 0,
  to,
  duration = 1,
  delay = 0,
  separator = ' ',
  className
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(from);
  const [isVisible, setIsVisible] = useState(
    () => typeof window !== 'undefined' && !('IntersectionObserver' in window)
  );

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    let frameId = 0;
    const timeout = window.setTimeout(() => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / (duration * 1000), 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(from + (to - from) * eased));

        if (progress < 1) {
          frameId = window.requestAnimationFrame(tick);
        }
      };

      frameId = window.requestAnimationFrame(tick);
    }, delay * 1000);

    return () => {
      window.clearTimeout(timeout);
      window.cancelAnimationFrame(frameId);
    };
  }, [delay, duration, from, isVisible, to]);

  return (
    <span className={clsx('count-up-text', className)} ref={ref}>
      {value.toLocaleString('ru-RU').replace(/\s/g, separator)}
    </span>
  );
}
