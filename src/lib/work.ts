// Sitenin iş listesi: yazılım işleri + portfolyo çekimleri (bkz. work-core.mjs).
import { getCollection, type CollectionEntry } from 'astro:content';
import { mergeWork, SOFTWARE_GROUP } from './work-core.mjs';
import { shoots, type Shoot, type ShootPhoto, type ShootVideo } from './media';

export interface WorkGroup { slug: string; label: string }
export type WorkCover =
  | { kind: 'photo'; shoot: Shoot; photo: ShootPhoto }
  | { kind: 'poster'; shoot: Shoot; video: ShootVideo }
  | { kind: 'shot'; site: CollectionEntry<'isler'> };
export interface Work {
  slug: string;
  name: string;
  kind: 'site' | 'shoot' | 'both';
  groups: WorkGroup[];
  location?: string;
  sector?: string;
  summary?: string;
  featured: boolean;
  order: number;
  site?: CollectionEntry<'isler'>;
  shoot?: Shoot;
  cover: WorkCover;
}

let cache: Work[] | undefined;
export async function getAllWork(): Promise<Work[]> {
  cache ??= mergeWork(await getCollection('isler'), shoots) as Work[];
  return cache;
}

/** Filtre sırası: Yazılım + manifestteki kategori sırası. */
export function workGroups(all: Work[]): (WorkGroup & { count: number })[] {
  const order = [SOFTWARE_GROUP, ...shoots.map((s) => ({ slug: s.categorySlug, label: s.category }))];
  const uniq = order.filter((g, i) => order.findIndex((x) => x.slug === g.slug) === i);
  return uniq.map((g) => ({ ...g, count: all.filter((w) => w.groups.some((x) => x.slug === g.slug)).length })).filter((g) => g.count > 0);
}
