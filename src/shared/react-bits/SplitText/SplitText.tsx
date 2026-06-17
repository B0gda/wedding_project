import { type CSSProperties, type ElementType, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import './SplitText.css';

gsap.registerPlugin(useGSAP);

type SplitTextProps = {
  id?: string;
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words';
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  textAlign?: CSSProperties['textAlign'];
  onLetterAnimationComplete?: () => void;
};

export function SplitText({
  id,
  text,
  className,
  delay = 50,
  duration = 1.1,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 36 },
  to = { opacity: 1, y: 0 },
  tag = 'p',
  textAlign = 'center',
  onLetterAnimationComplete
}: SplitTextProps) {
  const scope = useRef<HTMLElement | null>(null);
  const tokenGroups = useMemo(() => splitText(text, splitType), [text, splitType]);
  const Tag = tag as ElementType;

  useGSAP(
    () => {
      if (!scope.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const targets = scope.current.querySelectorAll('.split-text__token');

      gsap.fromTo(targets, from, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        onComplete: onLetterAnimationComplete
      });
    },
    { dependencies: [text, delay, duration, ease, splitType], scope }
  );

  return (
    <Tag
      ref={scope}
      id={id}
      className={clsx('split-text', className)}
      style={{ textAlign }}
      aria-label={text}
      data-testid="split-text"
    >
      {tokenGroups.map((group, groupIndex) => (
        <span
          className={clsx('split-text__word', group.hasLineBreak && 'split-text__word--line')}
          key={`${group.value}-${String(groupIndex)}`}
        >
          {group.tokens.map((token, tokenIndex) => (
            <span
              className="split-text__token"
              key={`${token}-${String(groupIndex)}-${String(tokenIndex)}`}
              aria-hidden="true"
            >
              {token}
            </span>
          ))}
          {group.hasTrailingSpace ? (
            <span className="split-text__space" aria-hidden="true">
              {'\u00A0'}
            </span>
          ) : null}
        </span>
      ))}
    </Tag>
  );
}

function splitText(text: string, splitType: 'chars' | 'words') {
  const parts = text.split(/(\s+)/u).filter(Boolean);

  return parts
    .map((value, partIndex) => {
      if (value.trim().length === 0) {
        return null;
      }

      const separator = parts[partIndex + 1] ?? '';

      return {
        value,
        tokens: splitType === 'words' ? [value] : Array.from(value),
        hasTrailingSpace: separator.includes(' ') && !separator.includes('\n'),
        hasLineBreak: separator.includes('\n')
      };
    })
    .filter((group) => group !== null);
}
