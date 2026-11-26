import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createMedia } from '../src/lib/media-core.mjs';

const shoot = { categorySlug: 'yatlar-tekneler', slug: 'axopar' };
const photo = { name: 'axopar-01', w: 1600, h: 900 };
const video = { name: 'axopar-video-1', poster: 'axopar-video-1-poster' };

test('tabanın sonundaki / tek eğik çizgiye iner', () => {
  const m = createMedia('https://media.cihanduran.com/');
  assert.equal(m.photoSrc(shoot, photo, 640), 'https://media.cihanduran.com/yatlar-tekneler/axopar/axopar-01-640.webp');
});

test('srcset 640w ve 1600w içerir', () => {
  const m = createMedia('http://127.0.0.1:4400');
  assert.equal(
    m.photoSrcset(shoot, photo),
    'http://127.0.0.1:4400/yatlar-tekneler/axopar/axopar-01-640.webp 640w, http://127.0.0.1:4400/yatlar-tekneler/axopar/axopar-01-1600.webp 1600w',
  );
});

test('video ve kapak adresleri', () => {
  const m = createMedia('https://media.cihanduran.com');
  assert.equal(m.videoSrc(shoot, video), 'https://media.cihanduran.com/yatlar-tekneler/axopar/axopar-video-1.mp4');
  assert.equal(m.posterSrc(shoot, video), 'https://media.cihanduran.com/yatlar-tekneler/axopar/axopar-video-1-poster.webp');
  assert.equal(m.posterSrc(shoot, { name: 'x', poster: null }), null);
});

test('taban yoksa göreli /media', () => {
  const m = createMedia(undefined);
  assert.equal(m.photoSrc(shoot, photo, 1600), '/media/yatlar-tekneler/axopar/axopar-01-1600.webp');
});
