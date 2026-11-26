import { test } from 'node:test';
import assert from 'node:assert/strict';
import { resolve, LEGACY_REDIRECTS } from '../src/lib/routing.mjs';

const r = (u) => resolve(new URL(u));
const redirect = (location) => ({ action: 'redirect', location });

test('www → apex, yol korunur', () => {
  assert.deepEqual(r('https://www.cihanduran.com/isler'), redirect('https://cihanduran.com/isler'));
});

test('http → https', () => {
  assert.deepEqual(r('http://cihanduran.com/'), redirect('https://cihanduran.com/'));
});

test('sondaki / kaldırılır, kök hariç', () => {
  assert.deepEqual(r('https://cihanduran.com/isler/'), redirect('https://cihanduran.com/isler'));
  assert.deepEqual(r('https://cihanduran.com/'), { action: 'serve', indexable: true, path: '/' });
});

test('büyük harfli sayfa yolu küçük harfe yönlenir', () => {
  assert.deepEqual(r('https://cihanduran.com/Iletisim'), redirect('https://cihanduran.com/iletisim'));
});

test('eski lokasyon sayfası yeni hizmete gider', () => {
  assert.deepEqual(r('https://cihanduran.com/hizmetler/drone-cekimi-marmaris'), redirect('https://cihanduran.com/drone-cekimi-bodrum'));
  assert.deepEqual(r('https://cihanduran.com/hizmetler/emlak-tekne-fotograf-yalikavak'), redirect('https://cihanduran.com/fotograf-video-cekimi-bodrum'));
  assert.deepEqual(r('https://cihanduran.com/hizmetler/web-tasarim-yazilim-bodrum'), redirect('https://cihanduran.com/yapay-zeka-yazilim'));
});

test('www + http + büyük harf + sonda / + eski adres → tek adımda nihai adres', () => {
  assert.deepEqual(
    r('http://www.cihanduran.com/Hizmetler/Drone-Cekimi-Marmaris/'),
    redirect('https://cihanduran.com/drone-cekimi-bodrum'),
  );
});

test('grafik tasarım ve hizmetler kökü', () => {
  assert.deepEqual(r('https://cihanduran.com/hizmetler/grafik-tasarim-datca'), redirect('https://cihanduran.com/yapay-zeka-yazilim'));
  assert.deepEqual(r('https://cihanduran.com/hizmetler'), redirect('https://cihanduran.com/'));
});

test('eski İngilizce adresler ve sorgu dizesi korunur', () => {
  assert.deepEqual(r('https://cihanduran.com/contact?utm_source=ig'), redirect('https://cihanduran.com/iletisim?utm_source=ig'));
  assert.deepEqual(r('https://cihanduran.com/projects'), redirect('https://cihanduran.com/isler'));
  assert.deepEqual(r('https://cihanduran.com/resume'), redirect('https://cihanduran.com/hakkimda'));
});

test('eski site haritası adresleri yenisine 301 (Search Console kayıtları)', () => {
  assert.deepEqual(r('https://cihanduran.com/sitemap.xml'), redirect('https://cihanduran.com/sitemap-index.xml'));
  assert.deepEqual(r('https://cihanduran.com/sitemap_index.xml'), redirect('https://cihanduran.com/sitemap-index.xml'));
  assert.deepEqual(r('https://www.cihanduran.com/sitemap.xml'), redirect('https://cihanduran.com/sitemap-index.xml'));
});

test('tablo 12 lokasyon × 4 hizmet + 4 sayfa içerir', () => {
  assert.equal(Object.keys(LEGACY_REDIRECTS).length, 12 * 4 + 4);
});

test('hashli varlık yolları büyük/küçük harf korunarak sunulur', () => {
  assert.deepEqual(r('https://cihanduran.com/_astro/Index.AbC123.css'), { action: 'serve', indexable: true, path: '/_astro/Index.AbC123.css' });
  assert.deepEqual(r('https://cihanduran.com/assets/favicon/Logo.png'), { action: 'serve', indexable: true, path: '/assets/favicon/Logo.png' });
});

test('noindex sayfalar ve canonical olmayan host', () => {
  assert.deepEqual(r('https://cihanduran.com/iban'), { action: 'serve', indexable: false, path: '/iban' });
  assert.deepEqual(r('https://cihanduran.kreafik.workers.dev/isler'), { action: 'serve', indexable: false, path: '/isler' });
  assert.deepEqual(r('https://cihanduran.com/isler'), { action: 'serve', indexable: true, path: '/isler' });
});

test('önizleme host\'unda yol normalizasyonu aynı host içinde kalır', () => {
  assert.deepEqual(r('https://cihanduran.kreafik.workers.dev/contact'), redirect('https://cihanduran.kreafik.workers.dev/iletisim'));
});
