import { restaurantImages, registryOfficeGalleryImages } from '@constants/galleryAssets';

let hasPreloadedDeferredAssets = false;

export function preloadDeferredInvitationAssets() {
  if (hasPreloadedDeferredAssets || typeof window === 'undefined') {
    return;
  }

  hasPreloadedDeferredAssets = true;

  [...restaurantImages, ...registryOfficeGalleryImages].forEach((image) => {
    const src = typeof image === 'string' ? image : image.src;
    const preloadImage = new Image();
    preloadImage.decoding = 'async';
    preloadImage.loading = 'eager';
    preloadImage.src = src;
  });
}
