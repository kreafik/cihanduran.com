// Medya adresleri (saf; testlenebilir). Medya git dışında: localde `npm run media`, yayında R2.

/**
 * @param {string | undefined} base PUBLIC_MEDIA_BASE (ör. https://media.cihanduran.com)
 */
export function createMedia(base) {
  const root = (base ?? '/media').replace(/\/+$/, '');
  const dir = (s) => `${root}/${s.categorySlug}/${s.slug}`;
  return {
    root,
    photoSrc: (s, p, size) => `${dir(s)}/${p.name}-${size}.webp`,
    photoSrcset: (s, p) => `${dir(s)}/${p.name}-640.webp 640w, ${dir(s)}/${p.name}-1600.webp 1600w`,
    videoSrc: (s, v) => `${dir(s)}/${v.name}.mp4`,
    posterSrc: (s, v) => (v.poster ? `${dir(s)}/${v.poster}.webp` : null),
  };
}
