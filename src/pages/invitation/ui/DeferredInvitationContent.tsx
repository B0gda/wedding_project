import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps';
import { restaurantImages, registryOfficeGalleryImages } from '@constants/galleryAssets';
import { invitationCopy } from '@constants/copy';
import invitationDecorRight from '@constants/shape1.3adb10d11826d7957c4a.png';
import { weddingLocations } from '@constants/locations';
import { CoordinatorSection } from '@widgets/coordinator/CoordinatorSection';
import { DressCodeSection } from '@widgets/dress-code/DressCodeSection';
import { WeddingFooter } from '@widgets/footer/WeddingFooter';
import { RsvpSection } from '@widgets/rsvp/RsvpSection';
import { TimelineSection } from '@widgets/timeline/TimelineSection';
import { DomeGallery } from '@shared/react-bits/DomeGallery/DomeGallery';
import { Section } from '@shared/ui/section/Section';

type WeddingLocation = (typeof weddingLocations)[number];

type DeferredInvitationContentProps = {
  salutation: string;
};

export function DeferredInvitationContent({ salutation }: DeferredInvitationContentProps) {
  const { invitation } = invitationCopy.sections;
  const [restaurantLocation, registryOfficeLocation] = weddingLocations;

  return (
    <>
      <Section
        id="invitation"
        label={invitation.label}
        title={invitation.title}
        decorRightSrc={invitationDecorRight}
      >
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
      <RsvpSection salutation={salutation} />
      <WeddingFooter />
    </>
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
