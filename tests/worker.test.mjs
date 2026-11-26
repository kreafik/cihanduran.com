import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from '../worker/index.mjs';

// Sahte ASSETS: bilinen yollar 200, bilinmeyenler not_found_handling gibi 404 + 404 sayfası.
const KNOWN = new Set(['/', '/isler', '/iban', '/_astro/x.css']);
const env = {
  ASSETS: {
    async fetch(req) {
      const { pathname } = new URL(req.url);
      if (KNOWN.has(pathname)) {
        const type = pathname.endsWith('.css') ? 'text/css' : 'text/html; charset=utf-8';
        return new Response(`<p>${pathname}</p>`, { status: 200, headers: { 'Content-Type': type } });
      }
      return new Response('<p>404</p>', { status: 404, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
    },
  },
};

const call = (url, init) => worker.fetch(new Request(url, init), env);

test('yönlendirme 301 ve doğru Location', async () => {
  const res = await call('https://www.cihanduran.com/contact?x=1');
  assert.equal(res.status, 301);
  assert.equal(res.headers.get('Location'), 'https://cihanduran.com/iletisim?x=1');
});

test('indekslenen sayfada X-Robots-Tag yok', async () => {
  const res = await call('https://cihanduran.com/isler');
  assert.equal(res.status, 200);
  assert.equal(res.headers.get('X-Robots-Tag'), null);
});

test('noindex sayfa ve önizleme host\'u X-Robots-Tag alır', async () => {
  for (const u of ['https://cihanduran.com/iban', 'https://cihanduran.kreafik.workers.dev/isler']) {
    const res = await call(u);
    assert.equal(res.headers.get('X-Robots-Tag'), 'noindex, nofollow', u);
  }
});

test('bilinmeyen adres 404 döner, HEAD de', async () => {
  const get = await call('https://cihanduran.com/bulunmayan');
  assert.equal(get.status, 404);
  assert.match(get.headers.get('Content-Type'), /text\/html/);
  const head = await call('https://cihanduran.com/bulunmayan', { method: 'HEAD' });
  assert.equal(head.status, 404);
});

test('GET/HEAD dışı istekler 405', async () => {
  const res = await call('https://cihanduran.com/', { method: 'POST' });
  assert.equal(res.status, 405);
  assert.equal(res.headers.get('Allow'), 'GET, HEAD');
});

test('güvenlik başlıkları her yanıtta, HSTS yalnız canonical host\'ta', async () => {
  const res = await call('https://cihanduran.com/');
  assert.equal(res.headers.get('X-Content-Type-Options'), 'nosniff');
  assert.equal(res.headers.get('X-Frame-Options'), 'DENY');
  assert.equal(res.headers.get('Referrer-Policy'), 'strict-origin-when-cross-origin');
  assert.ok(res.headers.get('Permissions-Policy'));
  assert.match(res.headers.get('Content-Security-Policy'), /frame-src https:\/\/github1s\.com/);
  assert.equal(res.headers.get('Strict-Transport-Security'), 'max-age=31536000');
  const preview = await call('https://cihanduran.kreafik.workers.dev/');
  assert.equal(preview.headers.get('Strict-Transport-Security'), null);
});

test('hashli Astro varlıkları immutable önbelleklenir', async () => {
  const res = await call('https://cihanduran.com/_astro/x.css');
  assert.equal(res.headers.get('Cache-Control'), 'public, max-age=31536000, immutable');
});

test('Googlebot normal kullanıcıyla aynı içeriği alır', async () => {
  const bot = await call('https://cihanduran.com/', { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' } });
  const user = await call('https://cihanduran.com/', { headers: { 'User-Agent': 'Mozilla/5.0 Chrome/140' } });
  assert.equal(bot.status, 200);
  assert.equal(await bot.text(), await user.text());
});
