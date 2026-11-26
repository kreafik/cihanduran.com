// JSON-LD üreticileri. Yalnız sayfada gerçekten görünen bilgiler kullanılır.
import { site } from '../site.config.mjs';

const ctx = 'https://schema.org';
const abs = (p) => (p === '/' ? `${site.origin}/` : `${site.origin}${p}`);
export const ORG_ID = `${site.origin}/#cihanduran`;
export const PERSON_ID = `${site.origin}/#kisi`;

const address = { '@type': 'PostalAddress', addressLocality: site.locality, addressRegion: site.region, addressCountry: site.country };
const areaServed = [
  { '@type': 'City', name: 'Bodrum' },
  { '@type': 'AdministrativeArea', name: 'Muğla' },
];

/** @param {{ name: string, path?: string }[]} items */
export function buildBreadcrumb(items) {
  return {
    '@context': ctx,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      ...(it.path && { item: abs(it.path) }),
    })),
  };
}

export function buildHomeSchema() {
  return [
    {
      '@context': ctx,
      '@type': 'ProfessionalService',
      '@id': ORG_ID,
      name: site.name,
      url: abs('/'),
      image: `${site.origin}/og-default.png`,
      telephone: site.phone.replace(/\s/g, ''),
      ...(site.email && { email: site.email }),
      address,
      geo: { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng },
      areaServed,
      founder: { '@id': PERSON_ID },
      sameAs: [site.github],
    },
    {
      '@context': ctx,
      '@type': 'Person',
      '@id': PERSON_ID,
      name: site.name,
      url: abs('/hakkimda'),
      jobTitle: 'Drone pilotu ve yapay zeka destekli yazılım geliştiricisi',
      address,
      worksFor: { '@id': ORG_ID },
      sameAs: [site.github],
    },
    {
      '@context': ctx,
      '@type': 'WebSite',
      url: abs('/'),
      name: site.name,
      inLanguage: 'tr-TR',
      publisher: { '@id': ORG_ID },
    },
  ];
}

/** @param {{ id: string, data: any }} entry */
export function buildServiceSchema(entry) {
  const d = entry.data;
  const path = `/${entry.id}`;
  return [
    {
      '@context': ctx,
      '@type': 'Service',
      name: d.title,
      serviceType: d.name,
      description: d.description,
      url: abs(path),
      provider: { '@id': ORG_ID },
      areaServed: d.workCategory === 'yazilim' ? { '@type': 'Country', name: 'Türkiye' } : areaServed,
    },
    buildBreadcrumb([{ name: 'Ana sayfa', path: '/' }, { name: d.name, path }]),
    {
      '@context': ctx,
      '@type': 'FAQPage',
      mainEntity: d.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];
}

/** @param {{ id: string, data: any }} entry @param {string} [image] */
export function buildProjectSchema(entry, image) {
  const d = entry.data;
  const path = `/isler/${entry.id}`;
  return [
    {
      '@context': ctx,
      '@type': 'CreativeWork',
      name: `${d.name} web sitesi`,
      description: d.summary,
      url: abs(path),
      ...(d.year && { dateCreated: String(d.year) }),
      creator: { '@id': PERSON_ID },
      ...(image && { image: new URL(image, site.origin).href }),
      inLanguage: d.languages,
      about: { '@type': 'Organization', name: d.name, ...(d.url && { url: d.url }) },
    },
    buildBreadcrumb([{ name: 'Ana sayfa', path: '/' }, { name: 'İşler', path: '/isler' }, { name: d.name, path }]),
  ];
}

/** Basit sayfalar (işler listesi, hakkımda, iletişim). */
export function buildPageSchema(type, name, path) {
  return [
    {
      '@context': ctx,
      '@type': type,
      name,
      url: abs(path),
      ...(type === 'ProfilePage' ? { mainEntity: { '@id': PERSON_ID } } : { about: { '@id': ORG_ID } }),
    },
    buildBreadcrumb([{ name: 'Ana sayfa', path: '/' }, { name, path }]),
  ];
}

/**
 * İş sayfası (site, çekim ya da ikisi). Çekim varsa ImageGallery de eklenir.
 * @param {{ slug: string, name: string, kind: string, summary?: string, groups: {label: string}[], site?: any, shoot?: any }} work
 * @param {string | undefined} image mutlak ya da kök göreli kapak adresi
 * @param {string[]} [photoUrls] galeri görselleri (mutlak)
 */
export function buildWorkSchema(work, image, photoUrls = []) {
  const path = `/isler/${work.slug}`;
  const d = work.site?.data;
  const what = work.kind === 'site' ? 'web sitesi' : work.kind === 'shoot' ? 'fotoğraf ve video çekimi' : 'çekim ve web sitesi';
  const blocks = [
    {
      '@context': ctx,
      '@type': 'CreativeWork',
      name: `${work.name} ${what}`,
      ...(work.summary && { description: work.summary }),
      url: abs(path),
      creator: { '@id': PERSON_ID },
      genre: work.groups.map((g) => g.label).join(', '),
      ...(image && { image: new URL(image, site.origin).href }),
      ...(d?.year && { dateCreated: String(d.year) }),
      ...(d?.languages && { inLanguage: d.languages }),
      about: { '@type': 'Organization', name: work.name, ...(d?.url && { url: d.url }) },
    },
    buildBreadcrumb([{ name: 'Ana sayfa', path: '/' }, { name: 'Projeler', path: '/isler' }, { name: work.name, path }]),
  ];
  if (photoUrls.length) {
    blocks.push({
      '@context': ctx,
      '@type': 'ImageGallery',
      name: `${work.name} galerisi`,
      url: abs(path),
      creator: { '@id': PERSON_ID },
      image: photoUrls.slice(0, 20).map((u) => ({ '@type': 'ImageObject', contentUrl: u, creator: { '@id': PERSON_ID } })),
    });
  }
  return blocks;
}
