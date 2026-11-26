# cihanduran.com

Cihan Duran'ın sitesi: Bodrum'da drone çekimi, fotoğraf & video, yapay zeka destekli yazılım.
Astro ile statik üretim, Cloudflare Workers (static assets + Worker) üzerinde yayın, GitHub → Workers Builds ile otomatik dağıtım.

## Komutlar

| Komut | Ne yapar |
|---|---|
| `npm run dev` | Geliştirme sunucusu (http://localhost:4321) |
| `npm run media` | Yerel medya sunucusu (http://127.0.0.1:4400, `media/` klasörü). Geliştirirken `npm run dev` ile birlikte açık olmalı |
| `npm run media:optimize` | Masaüstü'ndeki `Portfolyo/` arşivini küçültür → `media/` + `src/data/media-manifest.json` |
| `npm run build` | `dist/` üretir |
| `npm test` | Yönlendirme, Worker, terminal ve `dist/` SEO testleri (önce `npm run build`) |
| `npm run preview` | Build + `wrangler dev`: Worker dahil gerçek davranış |
| `npm run check:placeholders` | Doldurulması gereken yerler (`TODO(cihan)`, görsel yer tutucuları) |
| `npm run screenshots [-- slug]` | Müşteri sitelerinin ekran görüntülerini yeniden alır |
| `node scripts/og-image.mjs` | Varsayılan paylaşım görselini (`public/og-default.png`) üretir |
| `npm run deploy` | Build + `wrangler deploy` (**canlı**, yalnız onaydan sonra) |
| `npm run versions:upload` | Build + önizleme sürümü yükler (canlıyı değiştirmez) |

## Yapı

```
src/site.config.mjs          Ad, telefon, WhatsApp, e-posta, analitik token (tek doğruluk kaynağı)
src/lib/routing.mjs          Adres kuralları: canonical host, noindex sayfalar, eski adres → yeni adres (301)
src/lib/schema.mjs           JSON-LD üreticileri
src/lib/nav.ts               Menü, dock ve mobil sekme çubuğu listesi
src/i18n/                    Arayüz metinleri (tr). İngilizce: en.ts + LANGS'e 'en'
src/content/hizmetler/*.md   Üç hizmet sayfası (dosya adı = adres)
src/content/isler/*.md       Müşteri işleri (dosya adı = /isler/<ad>)
src/assets/isler/<ad>/       İşlerin masaüstü/mobil ekran görüntüleri
src/layouts/                 Base (head/SEO), Desktop (macOS kabuğu), MacWindowPage
src/components/              MenuBar, Dock, MobileTabBar, Window, Placeholder, ProjectCard, ...
src/islands/terminal/        Ana sayfa terminali (React adası; komutlar commands.mjs'te, testli)
src/islands/macos/           /iban, /git, /qemu React adaları
worker/index.mjs             Yönlendirmeler, güvenlik başlıkları, noindex, gerçek 404
tests/                       node:test
```

### Nasıl çalışır

- Tüm sayfalar statik HTML. Googlebot ve kullanıcı aynı içeriği alır; kullanıcı ajanına göre dallanma yoktur.
- Worker her istekte önce çalışır (`run_worker_first`) ve **tek adımda** 301 yapar: `www` / `http` / büyük harf / sonda `/` / eski Vercel adresleri → `https://cihanduran.com/...`. Sorgu dizesi korunur.
- Eski 48 lokasyon sayfası ilgili hizmete, `/contact` → `/iletisim`, `/projects` → `/isler`, `/resume` → `/hakkimda`.
- `/iban`, `/vscode`, `/qemu`, `/git`, `/danger-zone` sitede durur ama `noindex`; site haritasında yoktur.
- Canonical olmayan her host (`*.workers.dev`, sürüm önizlemeleri, localhost) `X-Robots-Tag: noindex, nofollow` alır.
- Bilinmeyen adres `404.html` gövdesiyle **404** döner.

## Medya (portfolyo çekimleri)

- Ham arşiv repo **dışında** durur: `~/OneDrive/Masaüstü/Portfolyo` (başka yer için `PORTFOLYO_DIR`). Yapı: `<Kategori>/<Proje>/proje-01.jpg … proje-video-1.mp4` (01 = kapak).
- `npm run media:optimize` → `media/` (640/1600px WebP, 720p H.264 video, WebP kapak). Var olan çıktılar atlanır. `media/` git'e girmez.
- Proje listesi ve görsel boyutları `src/data/media-manifest.json`'dadır (repoda); site build'i medya dosyalarına değil bu listeye bakar.
- Adres `PUBLIC_MEDIA_BASE`'ten gelir: local `.env` → `http://127.0.0.1:4400`; yayında tanımsızsa `https://media.cihanduran.com` (Cloudflare R2).
- Bir çekimi bir web sitesiyle birleştirmek için iş dosyasına `shoot: "<çekim-slug>"` yazın (tek sayfa olur).
- Yayına almadan önce: `media/` içeriğini R2 bucket'ına yükleyin, `media.cihanduran.com`'u bucket'a bağlayın.

## İçerik düzenleme

- **Yeni iş:** `src/content/isler/<ad>.md` (mevcut bir dosyayı örnek alın), sonra `npm run screenshots -- <ad>`.
- **Hizmet metni:** `src/content/hizmetler/*.md`. `proof` değeri `"TODO(cihan): …"` ile başlıyorsa sitede "Sayı eklenecek" olarak görünür; uydurma sayı yazmayın.
- **Görsel:** `src/assets/` altına koyup frontmatter'da (`heroImage`) ya da sayfada `<Image>` ile kullanın; `<Placeholder>` kullanımlarını kaldırın.
- **Yayındaki bir adresi değiştirmeyin.** Gerekirse `src/lib/routing.mjs` → `LEGACY_REDIRECTS`'e eski → yeni ekleyin.

## Cloudflare Workers Builds ayarları

> **Durum (2026-11-26):** Site canlıda (`wrangler deploy`, özel alan adları `cihanduran.com` + `www`). Vercel projesi kaldırıldı,
> apex ve www'nin Vercel CNAME'leri silindi (yedek: Masaüstü `cihanduran-dns-yedek-2026-11-26.txt`). Medya R2 `cihanduran-media`
> → `media.cihanduran.com`. **Kalan:** Workers Builds'i GitHub reposuna bağlamak (Cloudflare paneli → Workers → cihanduran →
> Settings → Builds → Connect; dal `main`, derleme `npm run build`, dağıtım `npx wrangler deploy`), Search Console / Bing.
> `360` ve `sare` alt alan adları hâlâ Vercel'de; onlara dokunulmadı.

Panel: **Workers & Pages → Create → Import a repository → kreafik/cihanduran.com**

| Ayar | Değer |
|---|---|
| Worker adı | `cihanduran` (`wrangler.jsonc` → `name` ile aynı) |
| Production branch | `main` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Non-production branch deploy command | `npx wrangler versions upload` |
| Build variables / secrets | Gerekmez |
| Node | `.node-version` → 22 |

## Canlıya alma (Vercel → Cloudflare)

1. **Vercel'de Git bağlantısını kes** (Project → Settings → Git → Disconnect). Aksi halde `main`'e birleştirme yeni siteyi yönlendirmesiz haliyle Vercel'e yayınlar.
2. `astro-cloudflare` dalını `main`'e birleştir; Workers Builds ilk dağıtımı yapar. `https://cihanduran.<hesap>.workers.dev` üzerinde kontrol et (noindex).
3. Cloudflare DNS'te **önce tüm kayıtları dışa aktar** (DNS → Records → Export). Apex ve `www` için Vercel'i gösteren `A`/`CNAME` kayıtlarını sil. **MX ve TXT (SPF/DKIM/DMARC) kayıtlarına dokunma.**
4. `wrangler.jsonc` içindeki `routes` bloğunun yorumunu kaldır, `main`'e gönder. Custom domain kayıtları ve sertifikalar otomatik oluşur.
5. Doğrula:
   ```bash
   curl -sI https://cihanduran.com/                          # 200
   curl -sI https://www.cihanduran.com/isler                 # 301 → https://cihanduran.com/isler
   curl -sI http://cihanduran.com/contact                    # 301 → https://cihanduran.com/iletisim
   curl -sI https://cihanduran.com/hizmetler/drone-cekimi-marmaris   # 301 → /drone-cekimi-bodrum
   curl -sI https://cihanduran.com/olmayan                   # 404
   ```
6. Vercel projesinden alan adını kaldır; projeyi bir hafta duraklatılmış tut, sonra sil.
7. Google Search Console ve Bing adımları: [SEO_PLAN.md](SEO_PLAN.md).

## Belgeler

- [docs/superpowers/specs/2026-11-26-cihanduran-astro-cloudflare-design.md](docs/superpowers/specs/2026-11-26-cihanduran-astro-cloudflare-design.md): tasarım kararları
- [SEO_PLAN.md](SEO_PLAN.md): Google'a kayıt ve site dışı SEO
