import { invitationCopy } from '@constants/copy';
import { Ballpit } from '@shared/react-bits/Ballpit/Ballpit';
import './WeddingFooter.css';

export function WeddingFooter() {
  const { footer } = invitationCopy.sections;

  return (
    <footer className="wedding-footer">
      <Ballpit
        count={160}
        gravity={0.18}
        friction={0.9975}
        wallBounce={0.95}
        followCursor
        colors={['#5a4436', '#8b6b55', '#b8afa3', '#f1eadf']}
        minSize={0.55}
        maxSize={1.15}
        maxVelocity={0.2}
      />
      <div className="wedding-footer__content">
        <span>{footer.label}</span>
        {footer.text.split('\n\n').map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </footer>
  );
}
