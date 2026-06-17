import { motion } from 'motion/react';
import clsx from 'clsx';
import './BlurText.css';

type BlurTextProps = {
  id?: string;
  text: string;
  delay?: number;
  animateBy?: 'words' | 'chars';
  direction?: 'top' | 'bottom';
  className?: string;
  tag?: 'h2' | 'h3' | 'p' | 'span';
};

export function BlurText({
  id,
  text,
  delay = 80,
  animateBy = 'words',
  direction = 'top',
  className,
  tag = 'h2'
}: BlurTextProps) {
  const Tag = motion[tag];
  const tokens = animateBy === 'words' ? text.split(/(\s+)/u) : Array.from(text);
  const offset = direction === 'top' ? -18 : 18;

  return (
    <Tag id={id} className={clsx('blur-text', className)} aria-label={text}>
      {tokens.map((token, index) => (
        <motion.span
          aria-hidden="true"
          className="blur-text__token"
          initial={{ opacity: 0, filter: 'blur(14px)', y: offset }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.72, delay: (delay / 1000) * index, ease: 'easeOut' }}
          key={`${token}-${String(index)}`}
        >
          {token}
        </motion.span>
      ))}
    </Tag>
  );
}
