// Varsayılan paylaşım görselini (public/og-default.png, 1200×630) üretir. Elle çalıştırılır: node scripts/og-image.mjs
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const bg = `data:image/jpeg;base64,${readFileSync('src/assets/desktop.jpeg').toString('base64')}`;
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  * { margin: 0; box-sizing: border-box; }
  body { width: 1200px; height: 630px; font-family: -apple-system, 'Segoe UI', Roboto, sans-serif; color: #f5f5f7;
    background: #000 url('${bg}') 85% 40% / cover no-repeat; display: flex; align-items: center; padding: 0 84px; }
  .win { width: 760px; background: rgb(28 28 30 / 0.86); border-radius: 18px; overflow: hidden;
    box-shadow: 0 0 0 1px rgb(0 0 0 / .6), 0 30px 80px rgb(0 0 0 / .6); }
  .bar { height: 44px; display: flex; align-items: center; gap: 10px; padding: 0 18px; background: linear-gradient(#3a3a3c, #323234); position: relative; }
  .bar i { width: 14px; height: 14px; border-radius: 50%; background: #ff5f57; display: block; }
  .bar i:nth-child(2) { background: #febc2e; } .bar i:nth-child(3) { background: #28c840; }
  .bar span { position: absolute; inset: 0; display: grid; place-items: center; font-size: 17px; font-weight: 600; color: rgb(245 245 247 / .75); }
  .body { padding: 44px 48px 48px; }
  h1 { font-size: 64px; line-height: 1.02; letter-spacing: -0.035em; font-weight: 750; }
  p { margin-top: 22px; font-size: 26px; color: rgb(245 245 247 / .8); }
  .mono { font-family: Consolas, Menlo, monospace; color: rgb(40 254 14); font-size: 22px; margin-top: 26px; }
</style></head><body>
  <div class="win"><div class="bar"><i></i><i></i><i></i><span>cihanduran.com</span></div>
  <div class="body"><h1>Drone çekimi ve yapay zeka destekli yazılım.</h1><p>Cihan Duran, Bodrum</p><p class="mono">~ % whoami</p></div></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: 'load' });
await page.screenshot({ path: 'public/og-default.png' });
await browser.close();
console.log('public/og-default.png yazıldı');
