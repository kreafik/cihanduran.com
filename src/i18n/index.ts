import { tr, type UiKey } from './tr';

export type Lang = 'tr' | 'en';
export const DEFAULT_LANG: Lang = 'tr';
/** Yayındaki diller. İngilizce eklendiğinde buraya 'en' yazılır. */
export const LANGS: Lang[] = ['tr'];

const dictionaries: Record<Lang, Partial<Record<UiKey, string>>> = { tr, en: {} };

export function t(key: UiKey, lang: Lang = DEFAULT_LANG): string {
  return dictionaries[lang][key] ?? tr[key];
}

/** Varsayılan dil kökte, diğerleri /<lang> önekiyle. */
export function localizedPath(path: string, lang: Lang = DEFAULT_LANG): string {
  if (lang === DEFAULT_LANG) return path;
  return path === '/' ? `/${lang}` : `/${lang}${path}`;
}

/**
 * Bir sayfanın dil karşılıkları. İngilizce slug'lar farklı olacağı için
 * çeviri eklendiğinde sayfa kendi `alternates` haritasını verir.
 */
export function alternates(path: string, map: Partial<Record<Lang, string>> = {}) {
  return LANGS.map((lang) => ({ lang, path: map[lang] ?? localizedPath(path, lang) }));
}
