import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';

test('build ana sayfayı Türkçe HTML olarak üretir', () => {
  assert.ok(existsSync('dist/index.html'), 'dist/index.html yok — önce npm run build');
  assert.match(readFileSync('dist/index.html', 'utf8'), /<html lang="tr"/);
});
