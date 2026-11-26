# Tasarım turu 2 ("show") Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ana sayfayı tam genişlik, "oha" etkili hale getirmek (hero, iş duvarı, rakam ve teknoloji şeritleri, bento pano, drone sinema geçişi), terminali büyütülebilir yapmak, dock'a Ana sayfa ikonu eklemek, rakamları ve WordPress işlerini siteye işlemek.

**Architecture:** Mevcut Astro sitesi üzerine. Efektler saf CSS (animasyon, maske, perspektif) + küçük istemci betikleri / React adaları; Tailwind yok. Rakamlar `site.config.mjs` → `stats`. Teknoloji logoları `simple-icons` (CC0) SVG yollarından.

**Tech Stack:** Astro 7, React 18 (adalar), `simple-icons`, `cobe` (WebGL küre, `client:visible`), node:test, Playwright.

**Spec:** `docs/superpowers/specs/2026-11-26-cihanduran-astro-cloudflare-design.md` (Ek A)

## Global Constraints

- Önceki planın tüm kuralları geçerli (tek canonical, mobil önce, testler yeşil, Kreafik yok, TODO sızmaz).
- Rakamlar yalnız `stats`'tan: `300+` yazılım projesi teslim edildi, `200+` fotoğraf ve video çekimi teslim edildi, `10+` yıl deneyim. Başka sayı uydurulmaz; yayındaki site sayısı koleksiyondan hesaplanır.
- Teknoloji şeridinde yalnız Cihan'ın repolarında görülenler: Astro, TypeScript, React, Next.js, Tailwind CSS, Cloudflare Workers, Hono, Supabase, Prisma, Zod, TanStack Query, Three.js, Python, Solidity, WordPress, Claude (AI).
- Tüm hareket `prefers-reduced-motion: reduce` altında durur; mobilde (< 900px) ağır efektler sadeleşir.
- İçerik genişliği `--container: 1440px`; hero, duvar ve sinema bölümü kenardan kenara.
- Lighthouse mobil: Performans ≥ 90, SEO/BP 100, A11y ≥ 95. CLS < 0.05.

## Review Focus

1. Terminal tam ekrandayken Esc, yeşil düğme ve arka plan tıklaması küçültür; odak terminal içinde kalır, kapanınca tetikleyiciye döner.
2. `/#terminal` adresi (dock'taki terminal ikonu) sayfa açılınca terminali büyütür; telefonda tam ekran açılır, sayfa arkada kaymaz.
3. İş duvarı ve şeritler 360px'te yatay taşma yaratmaz (kapsayıcı `overflow: hidden`).
4. Drone sinema bölümü JS kapalıyken ve azaltılmış harekette statik, okunur bir görsel + başlık olarak görünür.
5. WebGL olmayan tarayıcıda küre kutusu boş kalmaz (statik noktalı yedek).

---

### Task R1: Tam genişlik, rakamlar, dock'ta Ana sayfa ikonu

**Files:** Modify `src/styles/global.css` (`--container: 1440px`), `src/site.config.mjs` (`stats`), `src/lib/nav.ts`, `src/components/Dock.astro`, `src/components/AppIcon.astro` (`home` uygulaması), `src/content/hizmetler/*.md` (TODO kanıtları → stats), `src/pages/hakkimda.astro`, `src/pages/index.astro` (description'da sabit "20" yerine hesap); Test: `tests/build-output.test.mjs`

**Interfaces:**
- Produces: `site.stats: { software: '300+', shoots: '200+', years: '10+' }`; dock sırası: Ana sayfa (`/`), Terminal (`/#terminal`), | hizmetler… | IBAN.

- [ ] **Step 1: Failing tests:** ana sayfa HTML'inde dock'ta `href="/"` + "Ana sayfa" ve `href="/#terminal"` + "Terminal" var; `dist`'te "Sayı eklenecek" geçmiyor; ana sayfa ve hakkımda HTML'inde `300+`, `200+`, `10+` geçiyor.
- [ ] **Step 2:** `npm run build && npm test` → FAIL.
- [ ] **Step 3:** Uygula. Hizmet `proof` değerleri: drone → `{200+ , teslim edilen çekim}`, foto → aynı, yazılım → `{300+, teslim edilen yazılım projesi}`; hakkımda "kısa geçmiş" maddesi → "10 yılı aşkın süredir…".
- [ ] **Step 4:** PASS → commit `feat: tam genişlik, rakamlar, dock'ta Ana sayfa`.

### Task R2: Büyüyen terminal

**Files:** Modify `src/islands/terminal/Terminal.jsx`, `src/islands/terminal/terminal.css`; Create `src/islands/terminal/expand.mjs`; Test `tests/terminal-expand.test.mjs`

**Interfaces:**
- Produces: `shouldOpenFromHash(hash: string): boolean` (`#terminal` → true); Terminal prop `{ compact?: boolean }`.

- [ ] **Step 1: Failing test:** `shouldOpenFromHash('#terminal') === true`, `('#TERMINAL')` true, `('')`/`('#isler')` false.
- [ ] **Step 2:** FAIL → uygula → PASS.
- [ ] **Step 3:** Terminal: küçük haldeyken tıklama/Enter → `expanded` (fixed, inset 4vh 4vw, macOS yakınlaştırma animasyonu, arkada karartma); Esc / yeşil düğme / karartma tıklaması → küçül; açılışta `location.hash` kontrolü; `body` kaydırması kilitli; odak girişe. Telefonda inset 0.
- [ ] **Step 4:** Tarayıcıda Review Focus 1–2 elle doğrulanır. Commit `feat: tıklayınca büyüyen terminal`.

### Task R3: Hero, rakam şeridi, teknoloji şeridi

**Files:** Create `src/components/home/Hero.astro`, `StatStrip.astro`, `TechMarquee.astro`; Modify `src/pages/index.astro`; `npm i simple-icons`

- [ ] **Step 1:** Hero: aurora (3 radyal degrade, yavaş kayma animasyonu) + maskeli ızgara; rozet "Bodrum, yeni projelere açık" (yeşil nabız); `<h1>` "Havadan çekiyorum. Yapay zekayla kodluyorum." (ikinci cümle degrade metin); açıklama; WhatsApp + İşleri gör; sağda küçük terminal + "tıkla, büyüsün" ipucu.
- [ ] **Step 2:** StatStrip: `stats` + yayındaki site sayısı; büyük rakam + etiket; görünür olunca bir kez sayan animasyon (azaltılmış harekette yok, HTML'de son değer).
- [ ] **Step 3:** TechMarquee: 16 logo (simple-icons yolu, tek renk, hover'da marka rengi) + ad; iki kopya, CSS `translateX(-50%)` sonsuz; kenarlarda maske.
- [ ] **Step 4:** 390/1440 ekran görüntüsü. Commit `feat: hero, rakam ve teknoloji şeritleri`.

### Task R4: İş duvarı (3D marquee)

**Files:** Create `src/components/home/WorkWall.astro`

- [ ] **Step 1:** 3 sıra, her sıra işlerin `desktopShot`'larından (astro:assets 520px), iki kopya, sıralar zıt yönde 40–55 sn; kapsayıcı `perspective` + `rotateX(28deg) rotateZ(-8deg)`; üst/alt/yan maske; altta başlık "N site yayında" (koleksiyondan) + "Tümünü gör" bağlantısı. Görseller `loading="lazy"`, `alt=""` (dekoratif), duvar `aria-hidden`; bağlantı ayrı.
- [ ] **Step 2:** 360px taşma kontrolü. Commit `feat: iş duvarı`.

### Task R5: Bento pano

**Files:** Create `src/components/home/Bento.astro`, `src/islands/Globe.jsx` (`cobe`), `src/scripts/spotlight.ts`; `npm i cobe`

- [ ] **Step 1:** Izgara (6 sütun, mobilde 1–2): (a) 300+ kartı, dönen konik degrade kenar; (b) drone kutusu (heroImage/yer tutucu; video gelince `<video muted loop playsinline>`); (c) küre: `cobe` ile Bodrum (37.03, 27.43) + müşteri konumları (Göcek 36.75, 28.94; Marmaris 36.85, 28.27; Yalıkavak 37.10, 27.29), `client:visible`, WebGL yoksa CSS noktalı yedek; (d) üç hizmet kartı, imleç konumunu `--mx/--my` ile izleyen parıltı; (e) "Siteden fazlası": CRM, paneller, QR menüler, Three.js oyun (metin + ikon).
- [ ] **Step 2:** Commit `feat: bento pano`.

### Task R6: Drone sinema geçişi

**Files:** Create `src/components/home/DroneCinema.astro`

- [ ] **Step 1:** 220vh yüksek bölüm, içinde `position: sticky` sahne; kaydırma ilerlemesi (0–1) küçük betikle `--p`'ye yazılır; medya `scale` 0.45 → 1 ve köşe 24px → 0; "Havadan." sola, "Koddan." sağa `translateX` ile açılır; sonda alt yazı + "Drone çekimi" bağlantısı. Azaltılmış hareket/JS yok → statik tam genişlik görsel + başlık.
- [ ] **Step 2:** Commit `feat: drone sinema geçişi`.

### Task R7: WordPress işleri

**Files:** Create `src/content/isler/{dr-ismet-hisar,artunc-otel,berevint,akademi-analiz,halikarya-hotel}.md`; `npm run screenshots -- …`

- [ ] **Step 1:** Her birinin canlı sitesinden başlık/açıklama; stack `WordPress`; özet tek satır; ekran görüntüleri. Canlı değilse atla.
- [ ] **Step 2:** `npm run build && npm test`. Commit `feat: WordPress dönemi işleri`.

### Task R8: Doğrulama

- [ ] **Step 1:** `npm run build && npm test` → PASS.
- [ ] **Step 2:** Taşma betiği (15 sayfa × 5 genişlik) → taşma yok.
- [ ] **Step 3:** Lighthouse mobil ana sayfa → Global Constraints hedefleri; CLS < 0.05.
- [ ] **Step 4:** 1440 ve 390 tam sayfa ekran görüntüsü Cihan'a. Commit.
