# cihanduran.com Astro + Cloudflare Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mevcut Vite/React SPA'yı, Cloudflare Workers (static assets + Worker) üzerinde çalışan, her sayfası gerçek içerikli statik HTML olan Astro sitesine dönüştürmek; yeni bilgi mimarisi ve "ferah sayfa + macOS dokunuşları" tasarımıyla.

**Architecture:** Astro 7 statik çıktı (`build.format: 'file'`, `trailingSlash: 'never'`). Önde çalışan bir Worker (`run_worker_first`) host/yol normalizasyonunu, eski adres yönlendirmelerini (tek 301), noindex başlıklarını ve 404 durum kodunu yönetir; kararları saf bir modül (`src/lib/routing.mjs`) verir. macOS sayfaları mevcut React kodundan `client:only` adalar olarak taşınır; ana sayfa terminali `client:idle` adasıdır.

**Tech Stack:** Astro ^7.4, @astrojs/react ^7.1, @astrojs/sitemap, sharp, React 18 + styled-components (yalnız adalarda), Wrangler ^4.16x, node:test, Playwright (yalnız ekran görüntüsü scripti).

**Spec:** `docs/superpowers/specs/2026-11-26-cihanduran-astro-cloudflare-design.md`

## Global Constraints

- Canonical origin: `https://cihanduran.com`. www ve http → tek adımda 301.
- Adresler: küçük harf, ASCII, tire, **sonda `/` yok**.
- İndekslenen sayfalar: `/`, `/drone-cekimi-bodrum`, `/fotograf-video-cekimi-bodrum`, `/yapay-zeka-yazilim`, `/isler`, `/isler/<slug>`, `/hakkimda`, `/iletisim`. noindex: `/iban`, `/vscode`, `/qemu`, `/git`, `/danger-zone`.
- Kimlik yalnız "Cihan Duran"; "Kreafik" sitede geçmez.
- İletişim (sabit): Tel/WhatsApp `+90 541 575 55 20`, `https://wa.me/905415755520`, `tel:+905415755520`, e-posta: `CLAUDE.md` → "İletişim Bilgileri" bölümündeki adres (Cihan `src/site.config.mjs`'e kendisi girer).
- Uydurma olgu yok: bilinmeyen sayı/lisans/ekipman/yorum ve eksik görsel → görünür yer tutucu + kaynakta `TODO(cihan):`.
- Emoji ikon yok; Tailwind yok.
- AI sohbeti yok: `openai`, `/api/chat`, `ai` komutu kaldırılır.
- i18n: `defaultLocale: 'tr'`, `prefixDefaultLocale: false`; tüm arayüz metni `src/i18n/tr.ts` içinden.
- Mobil önce: 360/390/768/1024/1440 genişliklerinde yatay kaydırma yok, dokunma hedefi ≥ 44px.
- Lighthouse mobil hedefi: Performans ≥ 95, SEO 100, Erişilebilirlik ≥ 95, Best Practices 100.
- Worker adı: `cihanduran`. Özel alan adları geçiş onayına kadar `wrangler.jsonc`'de yorum satırı.
- İş dalı `astro-cloudflare`; `main`'e birleştirme ve push yalnız Cihan'ın onayıyla (Vercel Git bağlantısı kesildikten sonra).

## Review Focus

1. Eski adres sonda `/` veya büyük harfle gelirse (`/Hizmetler/Drone-Cekimi-Marmaris/`) → zincir değil, tek 301 ile `/drone-cekimi-bodrum`.
2. Yönlendirmelerde sorgu dizesi korunur (`/contact?utm_source=ig` → `/iletisim?utm_source=ig`).
3. `/_astro/*` gibi hash'li varlık yolları **küçük harfe çevrilmez**; normalizasyon yalnız sayfa yollarına uygulanır.
4. Bilinmeyen adres 404 durum koduyla döner, `HEAD` de; Googlebot UA'sı normal kullanıcıyla aynı yanıtı alır.
5. 360px telefonda WhatsApp düğmesi alt sekme çubuğunun üstüne binmez; terminal iOS klavyesiyle komut gönderebilir.

---

### Task 1: Astro iskeleti, eski SPA'nın kaldırılması, Cloudflare yapılandırması

**Files:**
- Move: `src/{elements,components,contexts,utils,styles,static}` → `legacy/` (`git mv`; Task 10'da silinir)
- Delete: kalan `src/`, `index.html`, `public/index.html`, `vite.config.js`, `craco.config.js`, `jsconfig.json`, `vercel.json`, `middleware.js`, `api/`, `yarn.lock`, `public/sitemap.xml`, `public/robots.txt`
- Create: `package.json`, `astro.config.mjs`, `wrangler.jsonc`, `worker/index.mjs` (geçici), `.node-version` (`22`), `src/pages/index.astro` (geçici), `tests/smoke.test.mjs`
- Modify: `.gitignore` (`dist/`, `.wrangler/`, `.astro/`)

**Interfaces:**
- Produces: `npm run dev | build | test | preview | deploy | versions:upload | check:placeholders | screenshots`; `dist/`.

- [ ] **Step 1:** `git switch -c astro-cloudflare`; taşıma ve silmeler.
- [ ] **Step 2:** `package.json`: deps `astro`, `@astrojs/react`, `@astrojs/sitemap`, `sharp`, `react`, `react-dom`, `styled-components`, `dompurify`, `react-draggable`, `simplebar-react`, `@radix-ui/react-menubar`, `framer-motion`, `color`, `hack-font`; devDeps `wrangler`, `playwright`. Scripts: `test: node --test tests/`, `preview: npm run build && wrangler dev`, `deploy: npm run build && wrangler deploy`, `versions:upload: npm run build && wrangler versions upload`, `check:placeholders: node scripts/check-placeholders.mjs`, `screenshots: node scripts/screenshots.mjs`.
- [ ] **Step 3:** `astro.config.mjs`: `site: 'https://cihanduran.com'`, `output: 'static'`, `trailingSlash: 'never'`, `build: { format: 'file' }`, i18n (Global Constraints), `integrations: [react(), sitemap({ filter })]` (filter Task 11), `devToolbar: { enabled: false }`.
- [ ] **Step 4:** `wrangler.jsonc`: `name: "cihanduran"`, `main: "worker/index.mjs"`, `compatibility_date: "2026-11-24"`, `assets: { directory: "./dist/", binding: "ASSETS", run_worker_first: true, not_found_handling: "404-page", html_handling: "drop-trailing-slash" }`, `workers_dev: true`, `preview_urls: true`, `observability.enabled: true`, routes yorum satırı (spec §10). Geçici Worker: `env.ASSETS.fetch(request)`.
- [ ] **Step 5:** `tests/smoke.test.mjs` → `dist/index.html` var ve `<html lang="tr">` içeriyor.
- [ ] **Step 6:** `npm install && npm run build && npm test` → PASS.
- [ ] **Step 7:** Commit `chore: Astro iskeleti, Vercel/SPA dosyaları kaldırıldı`.

### Task 2: Yönlendirme ve yol çözümleme modülü

**Files:** Create `src/lib/routing.mjs`, `tests/routing.test.mjs`

**Interfaces:**
- Produces:
  - `CANONICAL_ORIGIN = 'https://cihanduran.com'`, `CANONICAL_HOST = 'cihanduran.com'`, `REDIRECT_HOSTS = ['www.cihanduran.com']`
  - `NOINDEX_PATHS: Set<string>` = `/iban`, `/vscode`, `/qemu`, `/git`, `/danger-zone`
  - `LEGACY_REDIRECTS: Record<string,string>` (spec §5; 12 lokasyon × 4 hizmet + `/hizmetler`, `/contact`, `/projects`, `/resume`)
  - `resolve(url: URL): { action: 'redirect', location: string } | { action: 'serve', indexable: boolean, path: string }`

- [ ] **Step 1: Failing tests:**
  - `https://www.cihanduran.com/isler` → redirect `https://cihanduran.com/isler`
  - `http://cihanduran.com/` → redirect `https://cihanduran.com/`
  - `/isler/` → redirect `https://cihanduran.com/isler`; `/` → serve
  - `/Iletisim` → redirect `.../iletisim`
  - `/hizmetler/drone-cekimi-marmaris` → `.../drone-cekimi-bodrum`; `http://www.cihanduran.com/Hizmetler/Drone-Cekimi-Marmaris/` → aynı hedef, tek adım
  - `/hizmetler/grafik-tasarim-datca` → `.../yapay-zeka-yazilim`; `/hizmetler` → `.../`
  - `/contact?utm_source=ig` → `.../iletisim?utm_source=ig`
  - `/_astro/Index.AbC123.css` → serve, path aynen
  - `/iban` → serve `indexable: false`; `https://cihanduran.kreafik.workers.dev/isler` → serve `indexable: false`; `https://cihanduran.com/isler` → serve `indexable: true`
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Uygula. Normalizasyon (küçük harf + sondaki `/`) yalnız uzantısız ve `/_astro/` dışı yollara; eski tablo normalize yola bakar; host/protokol/yol/eski adres değişiklikleri tek `location`'da birleşir.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** Commit `feat: tek adımlı yönlendirme ve yol çözümleme`.

### Task 3: Worker

**Files:** Modify `worker/index.mjs`; Create `tests/worker.test.mjs`

**Interfaces:**
- Consumes: `resolve()` (Task 2)
- Produces: `export default { fetch(request, env) }`

- [ ] **Step 1: Failing tests** (sahte `env.ASSETS.fetch`: bilinmeyen yol için 404 + gövde):
  - redirect → 301, doğru `Location`
  - indexable → `X-Robots-Tag` yok; non-indexable → `X-Robots-Tag: noindex, nofollow`
  - bilinmeyen yol → 404 `text/html`; `HEAD` → 404
  - `POST /` → 405, `Allow: GET, HEAD`
  - her yanıtta `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`, `Content-Security-Policy`; canonical host'ta `Strict-Transport-Security: max-age=31536000`
  - `/_astro/x.css` → `Cache-Control: public, max-age=31536000, immutable`
  - Googlebot UA ile `/` gövdesi normal UA ile aynı
- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Uygula. CSP başlangıç: `default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' https://static.cloudflareinsights.com; connect-src 'self' https://api.github.com https://cloudflareinsights.com; frame-src <VSCode iframe kaynağı>; frame-ancestors 'none'; base-uri 'self'; form-action 'self'`.
- [ ] **Step 4:** `npm test` → PASS; `npm run preview` + `curl -I`: `/isler/` 301, `/yok` 404, `/iban` noindex.
- [ ] **Step 5:** Commit `feat: Worker — yönlendirme, başlıklar, gerçek 404`.

### Task 4: Tasarım sistemi, Base layout, masaüstü kabuğu

**Files:** Create `src/styles/{tokens,global}.css`, `src/site.config.mjs`, `src/i18n/{tr.ts,index.ts}`, `src/layouts/{Base,Desktop}.astro`, `src/components/{MenuBar,Dock,MobileTabBar,Window,Placeholder,Icon,WhatsAppButton,Footer,Hreflang}.astro`, `public/fonts/hack-*.woff2`, `public/bg-desktop.jpg` (legacy `bg-new.jpeg`); `public/assets/favicon` korunur.

**Interfaces:**
- Produces:
  - `site`: `{ name: 'Cihan Duran', origin, phone: '+90 541 575 55 20', phoneHref: 'tel:+905415755520', whatsapp: 'https://wa.me/905415755520', email: '' /* TODO(cihan) */, locality: 'Bodrum', region: 'Muğla', country: 'TR', geo: { lat: 37.0344, lng: 27.4305 }, github: 'https://github.com/kreafik' }`
  - `t(key): string`, `localizedPath(path, lang: 'tr'|'en'): string`
  - `Base.astro` props `{ title, description, path, noindex?, ogImage?, jsonLd?: object[] }` — tek title, description, mutlak canonical, OG/Twitter, `<Hreflang path>` (tr + x-default), noindex meta, Cloudflare Web Analytics beacon (token `TODO(cihan)`), JSON-LD blokları.
  - `Desktop.astro`: MenuBar + slot + Dock (≥ 768px) / MobileTabBar (< 768px) + WhatsAppButton + Footer.
  - `Window.astro` props `{ title?, variant?: 'dark'|'light' }`; `Placeholder.astro` props `{ label, ratio? }` → görünür "GÖRSEL: {label}", `data-todo="cihan"`.
- [ ] **Step 1:** Görsel uygulama `frontend-design` rehberliğinde (spec §6).
- [ ] **Step 2:** Geçici ana sayfa ile 390 ve 1440px ekran görüntüsü: menü, dock/sekme çubuğu, WhatsApp çakışmaması.
- [ ] **Step 3:** Commit `feat: tasarım sistemi ve masaüstü kabuğu`.

### Task 5: İçerik koleksiyonları

**Files:** Create `src/content.config.ts`, `src/content/hizmetler/{drone-cekimi-bodrum,fotograf-video-cekimi-bodrum,yapay-zeka-yazilim}.md`, `src/content/isler/*.md`

**Interfaces:**
- Produces:
  - `hizmetler`: `{ lang ('tr'), title, seoTitle, description, eyebrow, lead, heroImage?: image(), proof: {value,label}[], scope: {title,desc,icon}[], process: {title,desc}[], faq: {q,a}[], workCategory: 'yazilim'|'drone'|'fotograf', order }`
  - `isler`: `{ lang, name, sector, category: ('yazilim'|'drone'|'fotograf')[], url?, year, summary, stack?: string[], featured, cover?: image(), desktopShot?: image(), mobileShot?: image(), testimonial?: {quote, author} }`; gövde "Ne istendi / Ne yapıldı".
- [ ] **Step 1:** Hizmet metinleri sıfırdan, birinci tekil şahıs; bilinmeyen kanıtlar `TODO(cihan)`.
- [ ] **Step 2:** İşler: aday listesi (spec §9); her biri için repo açıklaması + canlı siteden doğrulanan bilgi; canlı olmayanlar atlanıp raporlanır.
- [ ] **Step 3:** `npm run build` → şema hatası yok. Commit `feat: hizmet ve iş içerikleri`.

### Task 6: Ana sayfa ve terminal adası

**Files:** Create `src/islands/terminal/*` (legacy terminal, responseFetcher, commands, DataContext), `src/pages/index.astro`, `src/components/{ServiceWidget,ProjectCard}.astro`

**Interfaces:**
- Produces: `<Terminal client:idle />`; `ProjectCard` props `{ entry: CollectionEntry<'isler'> }`

- [ ] **Step 1:** Terminal: `ai`/AIChat/fetch silinir; `navigate` → `window.location.assign`; hedefler yeni adreslere; açılışta otomatik `whoami` + `ls hizmetler/`; `localStorage` ve tarih yalnız effect içinde; iOS "Done" korunur.
- [ ] **Step 2:** Sayfa spec §6 sırası; tek `<h1>` "Drone çekimi ve yapay zeka destekli yazılım."
- [ ] **Step 3:** 390/1440 ekran görüntüsü; `help`, `drone`, `clear` denenir; konsol temiz. Commit `feat: ana sayfa ve terminal adası`.

### Task 7: Hizmet sayfaları

**Files:** Create `src/pages/[hizmet].astro`, `src/components/{ServiceHero,ProofStrip,Faq,QuoteCta}.astro`

- [ ] **Step 1:** Spec §6 iskeleti; WhatsApp ön dolu mesaj `Merhaba Cihan, {hizmet} için teklif almak istiyorum.`
- [ ] **Step 2:** Üç sayfa 390/1440 ekran görüntüsü. Commit `feat: hizmet sayfaları`.

### Task 8: İşler ve ekran görüntüleri

**Files:** Create `scripts/screenshots.mjs`, `src/pages/isler/index.astro`, `src/pages/isler/[slug].astro`, `src/assets/isler/<slug>/{desktop,mobile}.png`

**Interfaces:** `scripts/screenshots.mjs [slug...]` → `url`'li her iş için 1440×900 ve 390×844, 2 sn bekleme.

- [ ] **Step 1:** Script çalıştırılır, çıktılar göz ile kontrol edilir; sorunlular raporlanır.
- [ ] **Step 2:** Liste (filtre JS'siz çalışır) ve vaka sayfası (spec §6). Commit `feat: işler ve vaka sayfaları`.

### Task 9: Hakkımda, İletişim, 404

**Files:** Create `src/pages/{hakkimda,iletisim,404}.astro`

- [ ] **Step 1:** Hakkımda (ekipman/belgeler `TODO(cihan)`, portre: legacy `founder.jpg` uygunsa). İletişim: kanallar + WhatsApp mesaj formu (küçük satır içi script). 404: terminal temalı, noindex.
- [ ] **Step 2:** Commit `feat: hakkımda, iletişim, 404`.

### Task 10: macOS sayfaları → adalar

**Files:** Create `src/islands/macos/{Iban,VSCode,Qemu,Git,Danger}.jsx`, `src/pages/{iban,vscode,qemu,git,danger-zone}.astro`; Delete `legacy/`

- [ ] **Step 1:** Her biri `Base noindex` + Desktop + `client:only="react"`; router bağımlılığı kalkar.
- [ ] **Step 2:** Beşi tarayıcıda açılır, konsol temiz, IBAN kopyalama çalışır; `legacy/` silinir. Commit `feat: macOS sayfaları Astro adaları`.

### Task 11: SEO katmanı ve build denetimleri

**Files:** Create `src/lib/schema.mjs`, `public/robots.txt`, `scripts/check-placeholders.mjs`, `tests/build-output.test.mjs`; Modify `astro.config.mjs`, sayfalar

**Interfaces:** `buildHomeSchema(): object[]`, `buildServiceSchema(entry, path): object[]`, `buildProjectSchema(entry, path): object[]`, `buildBreadcrumb(items: {name, path}[]): object`

- [ ] **Step 1: Failing tests** (`dist/` üzerinde):
  - indekslenen her sayfada tek `<h1>`; `<title>` ≤ 60 ve benzersiz; description ≤ 155 ve benzersiz; canonical `https://cihanduran.com{path}`; `hreflang="tr"` ve `x-default`
  - noindex sayfalarda noindex meta var, sitemap'te yok; sitemap'te tüm indekslenen sayfalar var, `www` / sonda `/` yok
  - JSON-LD blokları parse edilir, `@context` içerir
  - hiçbir HTML'de `Kreafik`, `openai`, `/api/chat` yok
  - indekslenen sayfalarda `\p{Extended_Pictographic}` yok
- [ ] **Step 2:** FAIL → uygula → PASS. `robots.txt`: `Allow: /` + `Sitemap: https://cihanduran.com/sitemap-index.xml`. `check-placeholders` dosya bazında sayar, çıkış 0.
- [ ] **Step 3:** Commit `feat: SEO şemaları ve build denetimleri`.

### Task 12: Doğrulama, belgeler, önizleme

**Files:** Modify `README.md`, `CLAUDE.md`, `SEO_PLAN.md`

- [ ] **Step 1:** `npm run preview` üzerinde Review Focus 1–4 `curl` ile.
- [ ] **Step 2:** Lighthouse mobil (ana sayfa, bir hizmet, bir vaka) → hedefler.
- [ ] **Step 3:** 360/390/768/1024/1440 ekran görüntüsü, yatay kaydırma yok.
- [ ] **Step 4:** Belgeler (README: komutlar, yapı, Workers Builds ayarları, canlıya alma; CLAUDE.md: yeni mimari; SEO_PLAN: Search Console/Bing/Business Profile). Commit `docs: yeni mimari ve yayın rehberi`.
- [ ] **Step 5:** Cihan'ın onayıyla push + Workers Builds bağlantısı + `workers.dev` önizlemesi. Canlıya geçiş ayrı onay.
