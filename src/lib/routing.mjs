// Adres kuralları: Worker ve testler bu modülü ortak kullanır.
// Her yönlendirme TEK adımda nihai adrese gider (host, protokol, yol, eski adres birlikte çözülür).

export const CANONICAL_HOST = 'cihanduran.com';
export const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;
export const REDIRECT_HOSTS = ['www.cihanduran.com'];

/** Sitede duran ama Google'a kapalı sayfalar. */
export const NOINDEX_PATHS = new Set(['/iban', '/vscode', '/qemu', '/git', '/danger-zone']);

const LOCATIONS = [
  'bodrum', 'marmaris', 'fethiye', 'datca', 'yalikavak', 'turgutreis',
  'golturkbuku', 'gundogan', 'bitez', 'gumbet', 'torba', 'ortakent',
];

const SERVICE_MAP = {
  'drone-cekimi': '/drone-cekimi-bodrum',
  'emlak-tekne-fotograf': '/fotograf-video-cekimi-bodrum',
  'web-tasarim-yazilim': '/yapay-zeka-yazilim',
  'grafik-tasarim': '/yapay-zeka-yazilim',
};

/** Eski (Vercel dönemi) adres → yeni adres. Anahtarlar normalize edilmiş yoldur. */
export const LEGACY_REDIRECTS = {
  ...Object.fromEntries(
    Object.entries(SERVICE_MAP).flatMap(([service, target]) =>
      LOCATIONS.map((loc) => [`/hizmetler/${service}-${loc}`, target]),
    ),
  ),
  '/hizmetler': '/',
  '/contact': '/iletisim',
  '/projects': '/isler',
  '/resume': '/hakkimda',
};

/** Sayfa yolu mu? Uzantılı dosyalar ve Astro varlıkları büyük/küçük harf duyarlıdır, dokunulmaz. */
function isPagePath(path) {
  if (path.startsWith('/_astro/')) return false;
  const last = path.split('/').pop() ?? '';
  return !last.includes('.');
}

function normalizePath(path) {
  if (!isPagePath(path)) return path;
  let p = path.toLowerCase();
  if (p.length > 1) p = p.replace(/\/+$/, '') || '/';
  return LEGACY_REDIRECTS[p] ?? p;
}

/**
 * @param {URL} url
 * @returns {{ action: 'redirect', location: string } | { action: 'serve', indexable: boolean, path: string }}
 */
export function resolve(url) {
  const host = url.host.toLowerCase();
  const isRedirectHost = REDIRECT_HOSTS.includes(host);
  const isCanonical = host === CANONICAL_HOST;
  const path = normalizePath(url.pathname);

  const origin = isRedirectHost || isCanonical ? CANONICAL_ORIGIN : url.origin;
  const needsRedirect =
    isRedirectHost || (isCanonical && url.protocol === 'http:') || path !== url.pathname;

  if (needsRedirect) return { action: 'redirect', location: origin + path + url.search };

  return { action: 'serve', indexable: isCanonical && !NOINDEX_PATHS.has(path), path };
}
