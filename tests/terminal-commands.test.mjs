import { test } from 'node:test';
import assert from 'node:assert/strict';
import { run, INTRO } from '../src/islands/terminal/commands.mjs';

const text = (res) => res.output.map((line) => line.map((s) => s.text).join('')).join('\n');

test('help görünür komutları listeler, ai yoktur', () => {
  const out = text(run('help'));
  for (const c of ['drone', 'foto', 'yazilim', 'isler', 'iletisim', 'hakkimda', 'clear']) assert.match(out, new RegExp(`\\b${c}\\b`), c);
  assert.doesNotMatch(out, /\bai\b/);
});

test('ai komutu artık yok', () => {
  assert.match(text(run('ai')), /command not found: ai/);
});

test('hizmet ve sayfa komutları doğru adrese gider', () => {
  const cases = {
    drone: '/drone-cekimi-bodrum',
    foto: '/fotograf-video-cekimi-bodrum',
    fotograf: '/fotograf-video-cekimi-bodrum',
    web: '/yapay-zeka-yazilim',
    yazilim: '/yapay-zeka-yazilim',
    isler: '/isler',
    projects: '/isler',
    iletisim: '/iletisim',
    contact: '/iletisim',
    hakkimda: '/hakkimda',
    iban: '/iban',
    code: '/vscode',
    qemu: '/qemu',
    git: '/git',
    danger: '/danger-zone',
  };
  for (const [cmd, path] of Object.entries(cases)) assert.equal(run(cmd).navigate, path, cmd);
});

test('büyük harf, boşluk ve Türkçe karakter fark etmez', () => {
  assert.equal(run('  DRONE ').navigate, '/drone-cekimi-bodrum');
  assert.equal(run('İletişim').navigate, '/iletisim');
  assert.equal(run('işler').navigate, '/isler');
});

test('whoami ve ls hizmetler/', () => {
  assert.match(text(run('whoami')), /Cihan Duran/);
  const ls = text(run('ls hizmetler/'));
  for (const d of ['drone-cekimi/', 'fotograf-video/', 'yapay-zeka-yazilim/']) assert.ok(ls.includes(d), d);
});

test('ls çıktısındaki klasörler tıklanabilir bağlantıdır', () => {
  const seg = run('ls hizmetler/').output.flat().find((s) => s.text === 'drone-cekimi/');
  assert.equal(seg.href, '/drone-cekimi-bodrum');
});

test('clear ekranı temizler, boş girdi hiçbir şey yapmaz', () => {
  assert.equal(run('clear').clear, true);
  assert.deepEqual(run('   '), { output: [] });
});

test('bilinmeyen komut zsh hatası verir ve girdiyi aynen yazar', () => {
  const res = run('<b>xyz</b>');
  assert.equal(res.output[0][0].tone, 'error');
  assert.match(text(res), /zsh: command not found: <b>xyz<\/b>/);
});

test('açılış komutları', () => {
  assert.deepEqual(INTRO, ['whoami', 'ls hizmetler/']);
});
