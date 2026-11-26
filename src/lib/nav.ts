import type { UiKey } from '../i18n/tr';
import type { AppName } from '../components/AppIcon.astro';
import type { IconName } from '../components/Icon.astro';

export interface NavItem { key: UiKey; href: string; app: AppName; icon: IconName }

/** Ana gezinme: menü çubuğu, dock ve mobil sekme çubuğu aynı listeden beslenir. */
export const mainNav: NavItem[] = [
  { key: 'nav.drone', href: '/drone-cekimi-bodrum', app: 'drone', icon: 'drone' },
  { key: 'nav.photo', href: '/fotograf-video-cekimi-bodrum', app: 'photo', icon: 'camera' },
  { key: 'nav.ai', href: '/yapay-zeka-yazilim', app: 'ai', icon: 'code' },
  { key: 'nav.work', href: '/isler', app: 'work', icon: 'folder' },
  { key: 'nav.about', href: '/hakkimda', app: 'about', icon: 'user' },
  { key: 'nav.contact', href: '/iletisim', app: 'contact', icon: 'chat' },
];

/** Dock'ta ana gezinmeye ek olarak duranlar. */
export const dockExtras: NavItem[] = [
  { key: 'dock.iban', href: '/iban', app: 'iban', icon: 'bank' },
];

/** Mobil sekme çubuğu: en çok kullanılan beş hedef. */
export const tabNav = mainNav.filter((i) => i.key !== 'nav.about');

export function isActive(current: string, href: string) {
  return current === href || (href !== '/' && current.startsWith(href + '/'));
}
