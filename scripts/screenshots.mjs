// Müşteri sitelerinin ekran görüntülerini alır ve iş kayıtlarına bağlar.
// Kullanım: npm run screenshots [-- slug1 slug2 ...]
// Çıktı: src/assets/isler/<slug>/{desktop,mobile}.jpg + .md frontmatter'ına desktopShot/mobileShot.
// Elle çalıştırılır; çıktılar repoya girer (build sırasında çalışmaz).
import { chromium } from 'playwright';
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const CONTENT = 'src/content/isler';
const ASSETS = 'src/assets/isler';
const only = process.argv.slice(2);

const entries = readdirSync(CONTENT)
  .filter((f) => f.endsWith('.md'))
  .map((f) => ({ slug: basename(f, '.md'), file: join(CONTENT, f), text: readFileSync(join(CONTENT, f), 'utf8') }))
  .map((e) => ({ ...e, url: e.text.match(/^url:\s*"?([^"\n]+)"?/m)?.[1] }))
  .filter((e) => e.url && (only.length === 0 || only.includes(e.slug)));

const shots = [
  { name: 'desktop', viewport: { width: 1440, height: 900 }, scale: 1, mobile: false },
  { name: 'mobile', viewport: { width: 390, height: 844 }, scale: 2, mobile: true },
];

function setFrontmatter(text, key, value) {
  const line = `${key}: "${value}"`;
  const re = new RegExp(`^${key}:.*$`, 'm');
  if (re.test(text)) return text.replace(re, line);
  return text.replace(/^---\n([\s\S]*?)\n---/, (m, body) => `---\n${body}\n${line}\n---`);
}

const browser = await chromium.launch();
const failed = [];
for (const e of entries) {
  mkdirSync(join(ASSETS, e.slug), { recursive: true });
  let text = e.text;
  for (const s of shots) {
    const ctx = await browser.newContext({ viewport: s.viewport, deviceScaleFactor: s.scale, isMobile: s.mobile, hasTouch: s.mobile, locale: 'tr-TR' });
    const page = await ctx.newPage();
    try {
      await page.goto(e.url, { waitUntil: 'networkidle', timeout: 30_000 });
      await page.waitForTimeout(1500);
      // Çerez bandı varsa kapat (reddet tercih edilir; yoksa kabul).
      for (const label of [/^(Reddet|Decline|Reject|Отклонить)$/i, /^(Kabul et|Accept|Tamam|OK)$/i]) {
        const btn = page.getByRole('button', { name: label }).first();
        if (await btn.isVisible().catch(() => false)) { await btn.click().catch(() => {}); break; }
      }
      await page.waitForTimeout(800);
      const out = join(ASSETS, e.slug, `${s.name}.jpg`);
      await page.screenshot({ path: out, type: 'jpeg', quality: 82 });
      text = setFrontmatter(text, `${s.name}Shot`, `../../assets/isler/${e.slug}/${s.name}.jpg`);
      console.log(`✓ ${e.slug} ${s.name}`);
    } catch (err) {
      failed.push(`${e.slug} ${s.name}: ${err.message.split('\n')[0]}`);
      console.log(`✗ ${e.slug} ${s.name}`);
    } finally {
      await ctx.close();
    }
  }
  writeFileSync(e.file, text);
}
await browser.close();
if (failed.length) {
  console.log('\nBaşarısız:\n' + failed.join('\n'));
  process.exitCode = 1;
}
