import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { restaurantImages, registryOfficeGalleryImages } from '@constants/galleryAssets';
import { invitationCopy } from '@constants/copy';
import { weddingLocations } from '@constants/locations';
import { useGuestPersonalization } from '@features/guest-personalization/useGuestPersonalization';
import { CoordinatorSection } from '@widgets/coordinator/CoordinatorSection';
import { DressCodeSection } from '@widgets/dress-code/DressCodeSection';
import { WeddingFooter } from '@widgets/footer/WeddingFooter';
import { HeroSection } from '@widgets/hero/HeroSection';
import { AnchorNavigation } from '@widgets/navigation/AnchorNavigation';
import { RsvpSection } from '@widgets/rsvp/RsvpSection';
import { TimelineSection } from '@widgets/timeline/TimelineSection';
import { Aurora } from '@shared/react-bits/Aurora/Aurora';
import { DomeGallery } from '@shared/react-bits/DomeGallery/DomeGallery';
import { Section } from '@shared/ui/section/Section';
import './InvitationPage.css';

type WeddingLocation = (typeof weddingLocations)[number];

export function InvitationPage() {
  const guest = useGuestPersonalization();
  const heroTitle = getHeroTitle(guest.salutation, guest.people.length);
  const daysLeft = getDaysUntilWedding();
  const { invitation } = invitationCopy.sections;
  const [restaurantLocation, registryOfficeLocation] = weddingLocations;

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
        <Section id="invitation" label={invitation.label} title={invitation.title}>
          <YMaps query={{ lang: 'ru_RU', load: 'package.full' }}>
            <div className="invitation-page__experience">
              <DomeGallery
                images={restaurantImages}
                fit={0.8}
                minRadius={600}
                maxVerticalRotationDeg={0}
                segments={34}
                dragDampening={2}
                grayscale={false}
              />
              <p className="invitation-page__place-note">{invitation.restaurantIntro}</p>
              <LocationMap location={restaurantLocation} />
              <div className="invitation-page__statement invitation-page__statement--solo">
                <p className="invitation-page__lead">
                  <strong>{invitation.registryTitle}</strong>
                </p>
                {invitation.registryText.split('\n\n').map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="invitation-page__registry">
                <DomeGallery
                  images={registryOfficeGalleryImages}
                  fit={0.8}
                  minRadius={600}
                  maxVerticalRotationDeg={0}
                  segments={34}
                  dragDampening={2}
                  grayscale={false}
                />
                <p>{invitation.registryAddress}</p>
              </div>
              <LocationMap location={registryOfficeLocation} />
            </div>
          </YMaps>
        </Section>
        <TimelineSection />
        <DressCodeSection />
        <CoordinatorSection />
        <RsvpSection salutation={guest.salutation} />
      </main>
      <WeddingFooter />
    </div>
  );
}

function LocationMap({ location }: { location: WeddingLocation }) {
  return (
    <article className="invitation-page__map-card">
      <h3>{location.title}</h3>
      <Map
        className="invitation-page__map"
        defaultState={{ center: location.center, controls: ['zoomControl'], zoom: location.zoom }}
        options={{ suppressMapOpenBlock: true }}
      >
        <Placemark geometry={location.center} />
      </Map>
    </article>
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
