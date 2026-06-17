import { invitationCopy } from '@constants/copy';
import { Carousel } from '@shared/react-bits/Carousel/Carousel';
import { Section } from '@shared/ui/section/Section';
import './TimelineSection.css';

export function TimelineSection() {
  const { program } = invitationCopy.sections;

  return (
    <Section id="program" label={program.label} title={program.title}>
      <div className="timeline-stage">
        <Carousel
          items={invitationCopy.timeline}
          baseWidth={360}
          autoplay={false}
          pauseOnHover
          loop={false}
          round={false}
        />
      </div>
    </Section>
  );
}
