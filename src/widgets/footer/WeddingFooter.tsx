import { invitationCopy } from '@constants/copy';
import './WeddingFooter.css';

export function WeddingFooter() {
  const { footer } = invitationCopy.sections;

  return (
    <footer className="wedding-footer">
      <div className="wedding-footer__content">
        <span>{footer.label}</span>
        {footer.text.split('\n\n').map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </footer>
  );
}
