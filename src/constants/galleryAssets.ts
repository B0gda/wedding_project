import rest1 from '@constants/rest-1.png';
import rest2 from '@constants/rest-2.jpeg';
import rest3 from '@constants/rest-3.jpg';
import rest4 from '@constants/rest-4.jpg';
import rest5 from '@constants/rest-5.jpg';
import ro1 from '@constants/ro-1.jpg';
import ro2 from '@constants/ro-2.png';
import ro3 from '@constants/ro-3.png';
import ro4 from '@constants/ro-4.png';
import ro5 from '@constants/ro-5.png';
import ro6 from '@constants/ro-6.png';
import ro7 from '@constants/ro-7.png';
import ro8 from '@constants/ro-8.png';
import ro9 from '@constants/ro-9.png';

export const restaurantImages = [
  { src: rest1, alt: 'Ресторан, фото 1' },
  { src: rest2, alt: 'Ресторан, фото 2' },
  { src: rest3, alt: 'Ресторан, фото 3' },
  { src: rest4, alt: 'Ресторан, фото 4' },
  { src: rest5, alt: 'Ресторан, фото 5' }
] as const;

export const registryOfficeImages = [
  { id: 'ro-1', img: ro1, url: ro1, height: 420 },
  { id: 'ro-2', img: ro2, url: ro2, height: 300 },
  { id: 'ro-3', img: ro3, url: ro3, height: 520 },
  { id: 'ro-4', img: ro4, url: ro4, height: 360 },
  { id: 'ro-5', img: ro5, url: ro5, height: 470 },
  { id: 'ro-6', img: ro6, url: ro6, height: 330 },
  { id: 'ro-7', img: ro7, url: ro7, height: 560 },
  { id: 'ro-8', img: ro8, url: ro8, height: 390 },
  { id: 'ro-9', img: ro9, url: ro9, height: 500 }
] as const;

export const registryOfficeGalleryImages = [
  { src: ro1, alt: 'ЗАГС, фото 1' },
  { src: ro2, alt: 'ЗАГС, фото 2' },
  { src: ro3, alt: 'ЗАГС, фото 3' },
  { src: ro4, alt: 'ЗАГС, фото 4' },
  { src: ro5, alt: 'ЗАГС, фото 5' },
  { src: ro6, alt: 'ЗАГС, фото 6' },
  { src: ro7, alt: 'ЗАГС, фото 7' },
  { src: ro8, alt: 'ЗАГС, фото 8' },
  { src: ro9, alt: 'ЗАГС, фото 9' }
] as const;
