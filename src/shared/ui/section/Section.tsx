import type { ReactNode } from 'react';
import clsx from 'clsx';
import sectionDecorLeft from '@constants/shape1.3adb10d11826d7957c4a.png';
import sectionDecorRight from '@constants/shape2.8fd5a21bd082015846e4.png';
import { BlurText } from '@shared/react-bits/BlurText/BlurText';
import { FadeContent } from '@shared/react-bits/FadeContent/FadeContent';
import { ShinyText } from '@shared/react-bits/ShinyText/ShinyText';
import './Section.css';

type SectionProps = {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
  className?: string;
  decorRightSrc?: string;
};

export function Section({ id, label, title, children, className, decorRightSrc }: SectionProps) {
  const titleId = `${id}-title`;
  const labelId = `${id}-label`;

  return (
    <section
      className={clsx('section', className)}
      id={id}
      aria-labelledby={title ? titleId : labelId}
    >
      <img className="section__decor section__decor--left" src={sectionDecorLeft} alt="" />
      <img
        className="section__decor section__decor--right"
        src={decorRightSrc ?? sectionDecorRight}
        alt=""
      />
      <FadeContent className="section__inner">
        <p className="section__label" id={labelId}>
          <ShinyText text={label} speed={2.7} />
        </p>
        {title ? (
          <BlurText id={titleId} text={title} className="section__title" tag="h2" delay={70} />
        ) : null}
        {children}
      </FadeContent>
    </section>
  );
}
