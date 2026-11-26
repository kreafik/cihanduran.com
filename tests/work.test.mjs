import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mergeWork } from '../src/lib/work-core.mjs';

const shoot = (slug, category = 'Oteller', categorySlug = 'oteller') => ({
  category, categorySlug, project: slug.toUpperCase(), slug,
  photos: [{ name: `${slug}-01`, w: 1600, h: 1067 }, { name: `${slug}-02`, w: 1067, h: 1600 }], videos: [],
});
const site = (id, data = {}) => ({ id, data: { name: id.toUpperCase(), sector: 'Otel', location: 'Bodrum', summary: 's', order: 5, featured: false, ...data } });

test('shoot alanıyla bağlı site + çekim tek "both" iş olur, site slug\'ını alır', () => {
  const w = mergeWork([site('noa-suite-hotel', { shoot: 'noa-suite-hotel-cekim' })], [shoot('noa-suite-hotel-cekim')]);
  assert.equal(w.length, 1);
  assert.equal(w[0].slug, 'noa-suite-hotel');
  assert.equal(w[0].kind, 'both');
  assert.deepEqual(w[0].groups.map((g) => g.slug), ['oteller', 'yazilim']);
  assert.equal(w[0].cover.kind, 'photo');
});

test('bağlanmamış çekim kendi işi olur, adı klasör adı', () => {
  const w = mergeWork([], [shoot('axopar', 'Yatlar & Tekneler', 'yatlar-tekneler')]);
  assert.equal(w[0].kind, 'shoot');
  assert.equal(w[0].name, 'AXOPAR');
  assert.deepEqual(w[0].groups.map((g) => g.label), ['Yatlar & Tekneler']);
});

test('yalnız site: Yazılım grubu, kapak ekran görüntüsü', () => {
  const w = mergeWork([site('narin-mermer')], []);
  assert.equal(w[0].kind, 'site');
  assert.equal(w[0].cover.kind, 'shot');
  assert.deepEqual(w[0].groups.map((g) => g.slug), ['yazilim']);
});

test('slug çakışması hata fırlatır', () => {
  assert.throws(() => mergeWork([site('axopar')], [shoot('axopar')]), /çakışma/);
});

test('olmayan çekime bağlanan site hata fırlatır', () => {
  assert.throws(() => mergeWork([site('x', { shoot: 'yok' })], []), /bulunamadı/);
});

test('sıralama: öne çıkanlar önce, sonra order', () => {
  const w = mergeWork([site('b', { order: 2 }), site('a', { order: 9, featured: true })], [shoot('c')]);
  assert.deepEqual(w.map((x) => x.slug).slice(0, 2), ['a', 'b']);
});
