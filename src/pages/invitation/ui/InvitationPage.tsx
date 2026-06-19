import { Suspense, lazy } from 'react';
import { invitationCopy } from '@constants/copy';
import { useGuestPersonalization } from '@features/guest-personalization/useGuestPersonalization';
import { HeroSection } from '@widgets/hero/HeroSection';
import { AnchorNavigation } from '@widgets/navigation/AnchorNavigation';
import { Aurora } from '@shared/react-bits/Aurora/Aurora';
import './InvitationPage.css';

const DeferredInvitationContent = lazy(() =>
  import('./DeferredInvitationContent').then((module) => ({
    default: module.DeferredInvitationContent
  }))
);

export function InvitationPage() {
  const guest = useGuestPersonalization();
  const heroTitle = getHeroTitle(guest.salutation, guest.people.length);
  const daysLeft = getDaysUntilWedding();

  return (
    <div className="invitation-page">
      <Aurora
        colorStops={['#b8afa3', '#f1eadf', '#8b6b55']}
        blend={0.48}
        amplitude={1}
        speed={0.85}
      />
      <AnchorNavigation items={invitationCopy.navigation} />
      <main>
        <HeroSection title={heroTitle} daysLeft={daysLeft} />
        <Suspense fallback={<InvitationContentSkeleton />}>
          <DeferredInvitationContent salutation={guest.salutation} />
        </Suspense>
      </main>
    </div>
  );
}

function InvitationContentSkeleton() {
  return (
    <section className="invitation-page__skeleton" aria-label="Загрузка приглашения">
      <div className="invitation-page__skeleton-inner">
        <span />
        <span />
        <span />
        <span />
      </div>
    </section>
  );
}

function getHeroTitle(salutation: string, guestCount: number) {
  if (guestCount === 0) {
    return 'Приглашаем\nна свадьбу';
  }

  if (guestCount === 1) {
    return salutation;
  }

  return guestCount > 2
    ? salutation.replace(', ', '\n').replaceAll(' и ', '\nи\n')
    : salutation.replace(' и ', '\nи\n');
}

function getDaysUntilWedding() {
  const weddingDate = new Date('2026-10-06T00:00:00+03:00').getTime();
  const today = Date.now();

  return Math.max(0, Math.ceil((weddingDate - today) / 86_400_000));
}
