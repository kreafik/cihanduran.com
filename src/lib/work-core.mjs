// İş modeli (saf): yazılım işleri (isler koleksiyonu) + çekimler (medya manifesti) → tek liste.
// Aynı müşterinin sitesi ve çekimi `shoot:` alanıyla bağlanır ve tek sayfa olur.

export const SOFTWARE_GROUP = { slug: 'yazilim', label: 'Yazılım' };

/**
 * @param {{ id: string, data: any }[]} sites
 * @param {{ category: string, categorySlug: string, project: string, slug: string, photos: any[], videos: any[] }[]} shoots
 */
export function mergeWork(sites, shoots) {
  const bySlug = new Map(shoots.map((s) => [s.slug, s]));
  const linked = new Set();
  const out = [];

  for (const site of sites) {
    const d = site.data;
    let shoot;
    if (d.shoot) {
      shoot = bySlug.get(d.shoot);
      if (!shoot) throw new Error(`"${site.id}" işinin bağlandığı çekim bulunamadı: ${d.shoot}`);
      linked.add(d.shoot);
    }
    out.push({
      slug: site.id,
      name: d.name,
      kind: shoot ? 'both' : 'site',
      groups: shoot ? [{ slug: shoot.categorySlug, label: shoot.category }, SOFTWARE_GROUP] : [SOFTWARE_GROUP],
      location: d.location,
      sector: d.sector,
      summary: d.summary,
      featured: Boolean(d.featured),
      order: d.order ?? 100,
      site,
      shoot,
      cover: shoot?.photos.length ? { kind: 'photo', shoot, photo: shoot.photos[0] } : { kind: 'shot', site },
    });
  }

  shoots.forEach((shoot, i) => {
    if (linked.has(shoot.slug)) return;
    if (!shoot.photos.length && !shoot.videos.length) return;
    out.push({
      slug: shoot.slug,
      name: shoot.project,
      kind: 'shoot',
      groups: [{ slug: shoot.categorySlug, label: shoot.category }],
      featured: false,
      order: 1000 + i,
      shoot,
      cover: shoot.photos.length ? { kind: 'photo', shoot, photo: shoot.photos[0] } : { kind: 'poster', shoot, video: shoot.videos[0] },
    });
  });

  const seen = new Set();
  for (const w of out) {
    if (seen.has(w.slug)) throw new Error(`Adres çakışması: /isler/${w.slug}`);
    seen.add(w.slug);
  }

  return out.sort((a, b) => Number(b.featured) - Number(a.featured) || a.order - b.order);
}
