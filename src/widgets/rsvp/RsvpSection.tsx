import { invitationCopy } from '@constants/copy';
import { SpotlightCard } from '@shared/react-bits/SpotlightCard/SpotlightCard';
import { Section } from '@shared/ui/section/Section';
import './RsvpSection.css';

type RsvpSectionProps = {
  salutation: string;
};

export function RsvpSection({ salutation }: RsvpSectionProps) {
  const { rsvp } = invitationCopy.sections;

  return (
    <Section id="rsvp" label={rsvp.label} title={rsvp.title}>
      <div className="rsvp-grid">
        <SpotlightCard
          className="rsvp-card rsvp-card--accent"
          spotlightColor="rgba(241, 234, 223, 0.22)"
        >
          <div className="rsvp-card__copy">
            <h3>
              {salutation}, {rsvp.heading}
            </h3>
            <p>{rsvp.text}</p>
          </div>
          <div className="rsvp-card__actions" aria-label={rsvp.actionsLabel}>
            <a
              className="rsvp-card__button rsvp-card__button--telegram"
              href={rsvp.telegramHref}
              target="_blank"
              rel="noreferrer"
            >
              <TelegramIcon />
              <span>
                <strong>{rsvp.telegram}</strong>
                <small>{rsvp.telegramCaption}</small>
              </span>
            </a>
            <a
              className="rsvp-card__button rsvp-card__button--vk"
              href={rsvp.vkHref}
              target="_blank"
              rel="noreferrer"
            >
              <span className="rsvp-card__vk" aria-hidden="true">
                VK
              </span>
              <span>
                <strong>{rsvp.vk}</strong>
                <small>{rsvp.vkCaption}</small>
              </span>
            </a>
          </div>
          <div className="rsvp-card__guide">
            <p>{rsvp.guideText}</p>
            <a
              className="rsvp-card__guide-button"
              href={rsvp.guideHref}
              target="_blank"
              rel="noreferrer"
            >
              {rsvp.guideButton}
            </a>
          </div>
        </SpotlightCard>
      </div>
    </Section>
  );
}

function TelegramIcon() {
  return (
    <svg aria-hidden="true" className="rsvp-card__telegram-icon" viewBox="0 0 24 24">
      <path
        d="M21.7 3.4 18.4 20c-.2 1.2-.9 1.5-1.9.9l-5.1-3.8-2.5 2.4c-.3.3-.5.5-1 .5l.4-5.3 9.7-8.8c.4-.4-.1-.6-.7-.2L5.3 13.3.1 11.7c-1.1-.4-1.1-1.1.2-1.6L20.5 2.3c.9-.3 1.7.2 1.2 1.1Z"
        fill="currentColor"
      />
    </svg>
  );
}
