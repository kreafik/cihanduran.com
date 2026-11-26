# Tasarım turu 3 (portfolyo, proje ve hizmet sayfaları) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** ~144 çekimi ve 24 yazılım işini tek bir iş modelinde birleştirip her birine sinema hero'lu + galerili sayfa vermek; hizmet sayfalarını ve ana sayfadaki işler bölümünü ana sayfa diline taşımak. Her şey localde çalışır; medya yayında R2'den gelir.

**Architecture:** Medya git dışında (`media/`), adresi `PUBLIC_MEDIA_BASE`'ten. Manifest `src/data/media-manifest.json` (repoda). `src/lib/media.ts` adres/srcset üretir; `src/lib/work.ts` yazılım işleri + çekimleri birleştirir. Sinema hero genelleştirilir (`MediaCinema.astro`).

**Tech Stack:** Astro 7, saf CSS + küçük betikler, `<dialog>` tabanlı görüntüleyici, node:test.

**Spec:** `docs/superpowers/specs/2026-11-26-cihanduran-astro-cloudflare-design.md` (Ek B)

## Global Constraints

- Önceki turların kuralları geçerli (canonical, mobil önce, testler, TODO sızmaz, Kreafik yok, rakamlar yalnız `stats`).
- Medya adresi: `import.meta.env.PUBLIC_MEDIA_BASE` (local `.env`: `http://127.0.0.1:4400`; yayın: `https://media.cihanduran.com`). Kodda sabit medya adresi yok.
- Fotoğraf `<img>`: `srcset` 640w/1600w, `width`/`height` manifest'ten (CLS 0), galeri `loading="lazy"`, ilk kare `eager`.
- Video: `muted playsinline`, hero'da `autoplay loop`, galeride kontrollü; `preload="metadata"`.
- CSP: `media-src 'self' https://media.cihanduran.com`, `img-src` mevcut (`https:`).
- Her çekim sayfası: benzersiz `<title>` ≤ 60, açıklama ≤ 155 (adı içerir), alt metinler "{ad}, fotoğraf N".
- `/isler` tek sayfa, görseller lazy; filtre JS'siz çalışır.

## Review Focus

1. Aynı müşteri hem site hem çekimde → tek sayfa, çift sayfa/yinelenen slug yok.
2. Medya sunucusu kapalıyken (ör. CI build) build kırılmaz; sayfalar boyutları manifest'ten alır.
3. Dikey video/fotoğraf sinema hero'sunda ve galeride bozulmadan görünür (object-fit, oran).
4. Görüntüleyici: Esc, ok tuşları, kaydırma (dokunmatik) ve odak yönetimi; JS yoksa bağlantı 1600px görsele gider.
5. 168 kartlık `/isler` mobilde akıcı (lazy, 640px), yatay taşma yok.

---

### Task P1: Medya altyapısı
**Files:** `scripts/optimize-media.mjs` (manifest'i `src/data/`'ya da yaz), `scripts/media-server.mjs` (Range destekli statik sunucu, port 4400), `package.json` (`media` betiği), `.env` / `.env.example`, `src/lib/media.ts`, `worker/index.mjs` (CSP media-src), Test `tests/media.test.mjs`
- **Produces:** `mediaUrl(cat: string, slug: string, file: string): string`; `photoSrc(p, size: 640|1600)`; `photoSrcset(p)`; `videoSrc(v)`; `posterSrc(v)`.
- [ ] Failing tests: base sonda `/` olsa da tek `/`; `photoSrcset` → `"…-640.webp 640w, …-1600.webp 1600w"`; base yoksa `/media` (göreli).
- [ ] Uygula → PASS; `npm run media` ile örnek dosya 206 (Range) döner. Commit.

### Task P2: İş modeli
**Files:** `src/lib/work.ts`, `src/content.config.ts` (`isler.shoot?: string`), eşleşen 5 iş dosyasına `shoot:`, Test `tests/work.test.mjs` (saf fonksiyon `mergeWork(sites, shoots)`)
- **Produces:** `type Work = { slug, name, kind: 'site'|'shoot'|'both', group: string /* Yazılım | çekim kategorisi */, groupSlug, location?, cover: {type:'photo'|'shot', ...}, shoot?: ShootEntry, site?: CollectionEntry<'isler'>, order }`; `getAllWork(): Promise<Work[]>`.
- [ ] Failing tests: `shoot` bağlı site + çekim → tek `both`; bağlanmamış çekim → `shoot`; slug çakışması hata fırlatır; gruplar doğru.
- [ ] Uygula → PASS. Commit.

### Task P3: Proje sayfası
**Files:** `src/components/MediaCinema.astro` (DroneCinema genelleştirilir; ana sayfa da bunu kullanır), `src/components/Gallery.astro` + `src/scripts/lightbox.ts`, `src/pages/isler/[slug].astro` (Work'ten), `src/lib/schema.mjs` (çekim için `CreativeWork` + `ImageGallery`)
- [ ] Sıra: sinema hero → bilgi şeridi → galeri (masonry, ilk 2 eager) → videolar → web sitesi (varsa pencere + telefon) → benzer işler (aynı grup) → teklif.
- [ ] Görüntüleyici: `<dialog>`, ←/→/Esc, kaydırma, sayaç, odak geri dönüşü; JS yoksa `<a href=1600>`.
- [ ] Build + build-output testleri (168 sayfa) PASS. Commit.

### Task P4: İşler listesi
**Files:** `src/pages/isler/index.astro`, `src/components/WorkCard.astro`
- [ ] Kategoriler + sayılar, JS'siz radyo filtre, kart: kapak (çekim 640 webp / site ekranı), ad, grup, konum; site işlerinde pencere çerçevesi, çekimlerde fotoğraf kartı + video rozeti. Commit.

### Task P5: Hizmet sayfaları (ana sayfa dili)
**Files:** `src/pages/[hizmet].astro`, `src/components/service/*`
- [ ] Drone: MediaCinema (hero videosu) + drone ağırlıklı çekim seçkisi; Fotoğraf: kapak fotoğraflı tam genişlik hero + kategori karoları (oteller, yatlar, villalar…) + çekim seçkisi; Yazılım: iş duvarı + teknoloji şeridi + site seçkisi. Ortak: rakam şeridi, parıltılı kapsam kartları, süreç, SSS, teklif. Commit.

### Task P6: Ana sayfa "Son işler"
**Files:** `src/components/home/WorkShowcase.astro`, `src/pages/index.astro`
- [ ] Karışık bento seçki (2 büyük + 6 küçük; site + çekim), grup sayıları satırı, "Tüm işler" bağlantısı. Eski ProjectCard ızgarası kalkar. Commit.

### Task P7: Doğrulama
- [ ] `npm run build && npm test`; taşma 15+ sayfa × 5 genişlik; Lighthouse mobil (ana sayfa, bir çekim, bir hizmet); ekran görüntüleri. Commit.
