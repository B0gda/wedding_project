import { Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { invitationCopy } from '@constants/copy';
import { FluidGlass } from '@shared/react-bits/FluidGlass/FluidGlass';
import { SpotlightCard } from '@shared/react-bits/SpotlightCard/SpotlightCard';
import { Section } from '@shared/ui/section/Section';
import './CoordinatorSection.css';

export function CoordinatorSection() {
  const { coordinator } = invitationCopy.sections;

  return (
    <Section id="coordinator" label={coordinator.label} title={coordinator.title}>
      <div className="coordinator">
        <SpotlightCard className="coordinator__card" spotlightColor="rgba(255, 250, 244, 0.34)">
          <FluidGlass mode="lens" />
          <div className="coordinator__content">
            <p>{coordinator.text}</p>
            <div className="coordinator__actions" aria-label="Контакты координатора">
              <a className="coordinator__button" href={coordinator.phoneHref}>
                <Phone aria-hidden="true" />
                <span>{coordinator.phone}</span>
              </a>
              <a
                className="coordinator__button"
                href={coordinator.telegramHref}
                target="_blank"
                rel="noreferrer"
              >
                <TelegramIcon />
                <span>{coordinator.telegram}</span>
              </a>
            </div>
            <ScaleInText text={coordinator.warning} />
          </div>
        </SpotlightCard>
      </div>
    </Section>
  );
}

function TelegramIcon() {
  return (
    <svg aria-hidden="true" className="coordinator__telegram-icon" viewBox="0 0 24 24">
      <path
        d="M21.7 3.4 18.4 20c-.2 1.2-.9 1.5-1.9.9l-5.1-3.8-2.5 2.4c-.3.3-.5.5-1 .5l.4-5.3 9.7-8.8c.4-.4-.1-.6-.7-.2L5.3 13.3.1 11.7c-1.1-.4-1.1-1.1.2-1.6L20.5 2.3c.9-.3 1.7.2 1.2 1.1Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ScaleInText({ text }: { text: string }) {
  return (
    <strong className="coordinator__warning" aria-label={text}>
      {text.split('').map((char, index) => (
        <motion.span
          aria-hidden="true"
          className="coordinator__warning-char"
          initial={{ opacity: 0, scale: 0 }}
          key={`${char}-${String(index)}`}
          transition={{ delay: index * 0.035, type: 'spring', stiffness: 150, damping: 10 }}
          viewport={{ once: true, amount: 0.65 }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </strong>
  );
}
