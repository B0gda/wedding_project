import { Fragment } from 'react';
import { invitationCopy } from '@constants/copy';
import { CircularGallery } from '@shared/react-bits/CircularGallery/CircularGallery';
import { TextPressure } from '@shared/react-bits/TextPressure/TextPressure';
import { GlassCard } from '@shared/ui/glass-card/GlassCard';
import { Section } from '@shared/ui/section/Section';
import './DressCodeSection.css';

export function DressCodeSection() {
  const { dressCode } = invitationCopy.sections;

  return (
    <Section id="dress-code" label={dressCode.label} title={dressCode.title}>
      <div className="dress-code">
        <div className="dress-code__pressure">
          {dressCode.pressure.split(' ').map((word) => (
            <TextPressure
              className="dress-code__pressure-line"
              text={word}
              flex
              alpha
              stroke
              width
              weight
              italic
              textColor="#5a4436"
              strokeColor="#8b6b55"
              minFontSize={56}
              key={word}
            />
          ))}
          <p>{dressCode.subtitle}</p>
        </div>
        <GlassCard className="dress-code__main">
          {dressCode.text.split('\n\n').map((paragraph) => (
            <p key={paragraph}>{formatDressCodeParagraph(paragraph)}</p>
          ))}
        </GlassCard>
        <CircularGallery
          items={dressCode.palette}
          bend={1}
          textColor="#5a4436"
          borderRadius={0.05}
          scrollEase={0.05}
          font="700 30px var(--font-display)"
          scrollSpeed={1.1}
        />
      </div>
    </Section>
  );
}

function formatDressCodeParagraph(paragraph: string) {
  return paragraph.split('\n').map((line, index, lines) => (
    <Fragment key={`${line}-${String(index)}`}>
      {line.startsWith('Единственная просьба:') ? (
        <>
          <strong>Единственная просьба:</strong>
          {line.replace('Единственная просьба:', '')}
        </>
      ) : ['Для девушек:', 'Для мужчин:'].includes(line) ? (
        <strong>{line}</strong>
      ) : (
        line
      )}
      {index < lines.length - 1 ? <br /> : null}
    </Fragment>
  ));
}
