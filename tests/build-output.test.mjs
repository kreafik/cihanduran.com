// dist/ çıktısının SEO denetimi. Önce `npm run build` çalıştırılmalı.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { NOINDEX_PATHS, CANONICAL_ORIGIN } from '../src/lib/routing.mjs';

const DIST = 'dist';
const walk = (dir) => readdirSync(dir).flatMap((f) => {
  const p = join(dir, f);
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const toPath = (file) => {
  const rel = relative(DIST, file).split(sep).join('/').replace(/\.html$/, '');
  return rel === 'index' ? '/' : `/${rel}`;
};

const pages = walk(DIST)
  .filter((f) => f.endsWith('.html'))
  .map((file) => ({ file, path: toPath(file), html: readFileSync(file, 'utf8') }))
  .filter((p) => p.path !== '/404');
const indexable = pages.filter((p) => !NOINDEX_PATHS.has(p.path));
const noindex = pages.filter((p) => NOINDEX_PATHS.has(p.path));

const one = (html, re) => html.match(re)?.[1];
const title = (h) => one(h, /<title>([^<]*)<\/title>/);
const desc = (h) => one(h, /<meta name="description" content="([^"]*)"/);
const decode = (s) => s.replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"');
const abs = (p) => (p === '/' ? `${CANONICAL_ORIGIN}/` : CANONICAL_ORIGIN + p);
const jsonLd = (h) => [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
const types = (h) => jsonLd(h).flatMap((d) => [d['@type'], ...(d['@graph'] ?? []).map((g) => g['@type'])]);

const sitemapLocs = () => {
  const files = readdirSync(DIST).filter((f) => /^sitemap-\d+\.xml$/.test(f));
  return files.flatMap((f) => [...readFileSync(join(DIST, f), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]));
};

test('beklenen sayfalar üretildi', () => {
  const paths = new Set(pages.map((p) => p.path));
  for (const p of ['/', '/drone-cekimi-bodrum', '/fotograf-video-cekimi-bodrum', '/yapay-zeka-yazilim', '/isler', '/hakkimda', '/iletisim', '/iban', '/vscode', '/qemu', '/git', '/danger-zone']) {
    assert.ok(paths.has(p), p);
  }
  assert.ok(existsSync(join(DIST, '404.html')));
  assert.ok(pages.filter((p) => p.path.startsWith('/isler/')).length >= 20);
});

test('yayın derlemesinde yerel adres yok (medya R2 adresinden gelir)', () => {
  for (const p of pages) {
    assert.ok(!/127\.0\.0\.1|localhost:\d/.test(p.html), `${p.path}: yerel adres`);
  }
  const home = pages.find((p) => p.path === '/').html;
  assert.ok(home.includes('https://media.cihanduran.com/'), 'medya R2 adresinden gelmeli');
});

test('her indekslenen sayfada tek <h1>', () => {
  for (const p of indexable) assert.equal((p.html.match(/<h1[\s>]/g) ?? []).length, 1, p.path);
});

test('başlıklar ≤ 60 karakter ve benzersiz', () => {
  const seen = new Map();
  for (const p of indexable) {
    const t = decode(title(p.html) ?? '');
    assert.ok(t.length > 0 && t.length <= 60, `${p.path}: "${t}" (${t.length})`);
    assert.ok(!seen.has(t), `${p.path} ile ${seen.get(t)} aynı başlık`);
    seen.set(t, p.path);
  }
});

test('açıklamalar ≤ 155 karakter ve benzersiz', () => {
  const seen = new Map();
  for (const p of indexable) {
    const d = decode(desc(p.html) ?? '');
    assert.ok(d.length >= 50 && d.length <= 155, `${p.path}: (${d.length}) ${d}`);
    assert.ok(!seen.has(d), `${p.path} ile ${seen.get(d)} aynı açıklama`);
    seen.set(d, p.path);
  }
});

test('canonical mutlak ve sayfanın kendisi; hreflang tr + x-default', () => {
  for (const p of indexable) {
    assert.equal(one(p.html, /<link rel="canonical" href="([^"]+)"/), abs(p.path), p.path);
    assert.match(p.html, new RegExp(`hreflang="tr" href="${abs(p.path).replace(/[.?]/g, '\\$&')}"`), p.path);
    assert.match(p.html, /hreflang="x-default"/, p.path);
  }
});

test('noindex sayfalar işaretli, canonical yok, sitemap\'te yok', () => {
  const locs = new Set(sitemapLocs());
  for (const p of noindex) {
    assert.match(p.html, /<meta name="robots" content="noindex, nofollow"/, p.path);
    assert.doesNotMatch(p.html, /rel="canonical"/, p.path);
    assert.ok(!locs.has(abs(p.path)), p.path);
  }
});

test('sitemap tam olarak indekslenen sayfaları içerir; www ve sonda / yok', () => {
  const locs = sitemapLocs();
  assert.deepEqual(new Set(locs), new Set(indexable.map((p) => abs(p.path))));
  for (const l of locs) {
    assert.ok(l.startsWith(`${CANONICAL_ORIGIN}/`), l);
    assert.ok(l === `${CANONICAL_ORIGIN}/` || !l.endsWith('/'), l);
  }
});

test('JSON-LD geçerli ve sayfa türüne uygun', () => {
  for (const p of indexable) {
    const blocks = jsonLd(p.html);
    assert.ok(blocks.length > 0, `${p.path}: JSON-LD yok`);
    for (const b of blocks) assert.equal(b['@context'], 'https://schema.org', p.path);
  }
  const by = (path) => types(indexable.find((p) => p.path === path).html);
  assert.ok(by('/').includes('ProfessionalService') && by('/').includes('Person') && by('/').includes('WebSite'));
  for (const s of ['/drone-cekimi-bodrum', '/fotograf-video-cekimi-bodrum', '/yapay-zeka-yazilim']) {
    assert.ok(by(s).includes('Service') && by(s).includes('BreadcrumbList') && by(s).includes('FAQPage'), s);
  }
  assert.ok(by('/isler/narin-mermer').includes('CreativeWork'));
});

test('yasaklı içerik yok: Kreafik markası, AI sohbet kalıntısı', () => {
  for (const p of pages) {
    assert.ok(!p.html.includes('Kreafik'), `${p.path}: "Kreafik"`);
    assert.ok(!/openai|\/api\/chat/i.test(p.html), `${p.path}: AI sohbet kalıntısı`);
    assert.ok(!p.html.includes('TODO'), `${p.path}: iç not (TODO) yayına sızmış`);
  }
});

test('analitik: her sayfada GTM, onay varsayılanları GTM\'den önce, çerez bandı var', () => {
  for (const p of pages) {
    const consent = p.html.indexOf("gtag('consent','default'");
    const gtm = p.html.indexOf('googletagmanager.com/gtm.js?id=GTM-PSP78T7T');
    assert.ok(consent > -1 && gtm > -1, `${p.path}: GTM ya da onay varsayılanı yok`);
    assert.ok(consent < gtm, `${p.path}: onay varsayılanı GTM'den sonra`);
    assert.match(p.html, /analytics_storage:c==='granted'\?'granted':'denied'/, p.path);
    assert.match(p.html, /id="cerez-bandi"[^>]*hidden/, `${p.path}: çerez bandı yok`);
    assert.ok(!p.html.includes('ns.html?id=GTM'), `${p.path}: noscript GTM onaysız çerez yazar`);
  }
});

test('indekslenen sayfalarda emoji yok', () => {
  for (const p of indexable) assert.doesNotMatch(p.html, /\p{Emoji_Presentation}/u, p.path);
});

test('robots.txt sitemap\'i gösterir, varsayılan OG görseli var', () => {
  const robots = readFileSync(join(DIST, 'robots.txt'), 'utf8');
  assert.match(robots, /^Sitemap: https:\/\/cihanduran\.com\/sitemap-index\.xml$/m);
  assert.ok(existsSync(join(DIST, 'og-default.png')));
});

test('dock: ayrı Ana sayfa ve Terminal (#terminal) girişleri', () => {
  const home = pages.find((p) => p.path === '/').html;
  const dock = home.slice(home.indexOf('class="dock"'));
  assert.match(dock, /href="\/"[^>]*data-dock-item[^>]*><span class="tip"[^>]*>Ana sayfa</);
  assert.match(dock, /href="\/#terminal"[^>]*data-dock-item[^>]*><span class="tip"[^>]*>Terminal</);
});

test('rakamlar sitede: 300+, 200+, 10+; yer tutucu sayı kalmadı', () => {
  for (const path of ['/', '/hakkimda']) {
    const html = pages.find((p) => p.path === path).html;
    for (const n of ['300+', '200+', '10+']) assert.ok(html.includes(n), `${path}: ${n}`);
  }
  for (const p of pages) assert.ok(!p.html.includes('Sayı eklenecek'), p.path);
});
