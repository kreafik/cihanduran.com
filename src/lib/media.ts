// Site genelinde kullanılan medya yardımcıları + manifest tipleri.
import { createMedia } from './media-core.mjs';
import manifestJson from '../data/media-manifest.json';

export interface ShootPhoto { name: string; w: number; h: number }
export interface ShootVideo { name: string; poster: string | null; w: number; h: number; duration: number }
export interface Shoot {
  category: string;
  categorySlug: string;
  project: string;
  slug: string;
  photos: ShootPhoto[];
  videos: ShootVideo[];
}

// .env yoksa: yayın derlemesi R2 alan adını, geliştirme /media'yı kullanır.
export const media = createMedia(
  import.meta.env.PUBLIC_MEDIA_BASE ?? (import.meta.env.PROD ? 'https://media.cihanduran.com' : '/media'),
);
export const shoots = manifestJson as Shoot[];
