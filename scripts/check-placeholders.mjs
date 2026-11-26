// Cihan'ın doldurması gereken yerleri listeler: kaynakta TODO(cihan), sayfalarda <Placeholder> kullanımı.
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const rows = [];
for (const file of walk('src').filter((f) => /\.(astro|md|mjs|ts|jsx)$/.test(f))) {
  const text = readFileSync(file, 'utf8');
  const todos = (text.match(/TODO\(cihan\)/g) ?? []).length;
  const placeholders = (text.match(/<Placeholder\b/g) ?? []).length;
  if ((todos || placeholders) && !file.endsWith('check-placeholders.mjs')) rows.push({ file, todos, placeholders });
}
console.table(rows);
console.log(`Toplam: ${rows.reduce((a, r) => a + r.todos, 0)} TODO(cihan), ${rows.reduce((a, r) => a + r.placeholders, 0)} görsel yer tutucusu.`);
