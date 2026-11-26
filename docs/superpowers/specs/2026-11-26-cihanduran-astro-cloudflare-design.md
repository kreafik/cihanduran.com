# cihanduran.com — Astro + Cloudflare Workers ile yeniden kurulum

**Tarih:** 2026-11-26 · **Durum:** Onay bekliyor · **Sahip:** Cihan Duran

## 1. Amaç ve neden

cihanduran.com, Cihan Duran'ın işinin vitrini ("bu web sitesi bizim her şeyimiz"). Bugün iki ciddi sorunu var:

1. **Google siteyi görmüyor.** Vercel'deki ara katman Googlebot'a içeriksiz bir `meta refresh` sayfası veriyor. Bu sayfa apex'e, apex 307 ile www'ye, www yine aynı sayfaya yönlendiriyor: döngü ve sıfır içerik. Ayrıca bilinmeyen adresler 200 dönüyor (soft 404). Site bir React SPA olduğu için HTML gövdesi boş.
2. **İç sayfalar güven vermiyor.** "AI slop" görünümündeler: emoji ikonlar, şablon metinler, ana siteden (macOS/terminal) kopuk bir tema, hiç gerçek iş görseli yok. Bunlara şehir adı değiştirilmiş 48 kopya lokasyon sayfası ekleniyor; Google bu kalıbı "doorway page" olarak cezalandırıyor.

**Hedef his:** Siteye giren biri "bu kişi işini iyi yapıyor, onunla çalışmalıyım" demeli. Öne çıkacak iki şey var: **güven** ve **işler**.

**Kimlik: sadece "Cihan Duran".** Sitede ajans/şirket adı (Kreafik) geçmiyor; müşteri doğrudan Cihan'la çalıştığını hissediyor. JSON-LD'deki kuruluş adı, footer ve tüm metinler buna göre (Cihan'ın kararı).

**Konumlanma değişiyor.** İnsanlar artık web veya grafik tasarımcı aramıyor; yapay zekayı iyi yöneten birini arıyor. Hizmetler üçe iniyor: **Drone Çekimi**, **Fotoğraf & Video**, **Yapay Zeka Destekli Yazılım**. "AI Developer" bir hizmet değil, Cihan'ın unvanı olarak ana sayfada ve hakkımda sayfasında yer alıyor.

## 2. Hedefler, kapsam dışı, kaçınılacaklar

**Hedefler**
- Her indekslenebilir sayfa gerçek içerikli statik HTML olarak sunuluyor. Google'ın gördüğü ile kullanıcının gördüğü aynı.
- Tek adres: `https://cihanduran.com`. Diğer her varyant tek adımda 301 ile oraya gidiyor.
- Ana sayfada ilk 5 saniyede ne iş yapıldığı anlaşılıyor (drone, fotoğraf, AI destekli yazılım).
- Gerçek müşteri işleri isimleri, ekran görüntüleri ve linkleriyle gösteriliyor (`/isler`).
- Mobilde kusursuz çalışıyor. Her ekran önce telefonda tasarlanıp test ediliyor.
- Diğer kreafik siteleriyle aynı kurulum: GitHub → Cloudflare Workers Builds.
- İngilizce sürüm için altyapı hazır; sonradan eklemek sadece çeviri işi olacak.

**Kapsam dışı (şimdilik)**
- İngilizce içerik (sadece altyapısı kuruluyor).
- AI sohbeti. Kaldırılıyor; trafik artarsa API maliyeti kontrolsüz büyüyebilir. Terminaldeki `ai` komutu ve `/api/chat` siliniyor.
- Blog.
- Google Business Profile, dizinler, backlink gibi site dışı SEO işleri. Bunları Cihan yapıyor, rehber `SEO_PLAN.md`'de güncelleniyor.

**Kaçınılacaklar (çalışsa bile başarısızlık sayılır)**
- **Uydurma güven sinyali yok.** Sahte sayı ("120+ çekim"), sahte yorum, sahte lisans iddiası, sahte müşteri olmayacak. Bilinmeyen her bilgi görünür bir yer tutucu olarak kalıyor ve Cihan tarafından dolduruluyor.
- Şablon hissi yok: emoji ikon, jenerik "profesyonel çözümler" dili, şehir adı değiştirilmiş kopya sayfalar.
- Googlebot'a farklı içerik sunmak (cloaking) yok.
- Hizmet sayfalarında gereksiz JavaScript yok.

## 3. Kısıtlar

- Cloudflare hesabı: **Kreafik**. `cihanduran.com` zone'u bu hesapta zaten aktif (Free plan); DNS bugün Vercel IP'lerini gösteriyor (proxy kapalı).
- Repo: `kreafik/cihanduran.com` (public), dal `main`.
- Wrangler OAuth token'ında DNS okuma/yazma yetkisi yok. DNS değişikliği panelden ya da yetkili bir token ile yapılacak.
- Görsellerin çoğu (drone/fotoğraf) henüz repoda yok. Cihan sağlayacak; o zamana kadar yer tutucular kullanılıyor.
- Tailwind kullanılmıyor (proje kararı, `CLAUDE.md`).

## 4. Yaklaşımlar

| Yaklaşım | Artı | Eksi |
|---|---|---|
| **A. Mevcut Vite/React'i koruyup build'de prerender** | macOS sayfaları olduğu gibi kalır | Her sayfa ~150KB+ React/styled-components taşır; mobil hız düşer; hydration uyumsuzlukları; diğer sitelerden farklı bir altyapı |
| **B. Astro'ya geçiş (seçilen)** | Saf HTML sayfalar, en iyi mobil hız ve SEO; diğer 25 kreafik sitesiyle aynı altyapı; `/isler` için içerik koleksiyonu | macOS sayfalarının (terminal, IBAN, VSCode, qemu, git) React adası olarak taşınması gerekir |
| C. Next.js / vinext | — | Bu site için avantajı yok, sunucu tarafı gereksiz |

**Seçim: B, Astro.** Cihan seçti. İç sayfalar zaten baştan yazılacağı için taşıma maliyeti iki yolda da benzer.

## 5. Bilgi mimarisi ve adresler

Kurallar: küçük harf, ASCII (ç→c, ğ→g, ı→i, ö→o, ş→s, ü→u), tireyle ayrılmış kelimeler, **sonda `/` yok**. Yerel hizmetlerin adresinde "bodrum" var; konumdan bağımsız hizmetlerde yok.

| Adres | Sayfa | İndeks |
|---|---|---|
| `/` | Ana sayfa (masaüstü + hizmetler + işler özeti) | ✔ |
| `/drone-cekimi-bodrum` | Drone Çekimi | ✔ |
| `/fotograf-video-cekimi-bodrum` | Fotoğraf & Video (emlak, tekne, otel) | ✔ |
| `/yapay-zeka-yazilim` | AI Destekli Yazılım (web siteleri, otomasyon, CRM, AI asistanları) | ✔ |
| `/isler` | Tüm işler (filtre: Yazılım / Drone / Fotoğraf) | ✔ |
| `/isler/<proje>` | Vaka sayfası (ör. `/isler/narin-mermer`) | ✔ |
| `/hakkimda` | Cihan, ekipman, çalışma şekli, belgeler | ✔ |
| `/iletisim` | WhatsApp, telefon, e-posta, WhatsApp mesaj formu | ✔ |
| `/iban` | Banka hesapları (macOS penceresi) | ✘ noindex |
| `/vscode`, `/qemu`, `/git`, `/danger-zone` | macOS eğlence sayfaları | ✘ noindex |
| 404 | Gerçek 404 durum kodu, macOS/terminal temalı | ✘ |

### Eski adreslerin yönlendirmesi (301, tek adım)

| Eski | Yeni |
|---|---|
| `/hizmetler/drone-cekimi-{bodrum,marmaris,fethiye,datca,yalikavak,turgutreis,golturkbuku,gundogan,bitez,gumbet,torba,ortakent}` | `/drone-cekimi-bodrum` |
| `/hizmetler/emlak-tekne-fotograf-{…aynı liste}` | `/fotograf-video-cekimi-bodrum` |
| `/hizmetler/web-tasarim-yazilim-{…aynı liste}` | `/yapay-zeka-yazilim` |
| `/hizmetler/grafik-tasarim-{…aynı liste}` | `/yapay-zeka-yazilim` |
| `/hizmetler` | `/` |
| `/contact` | `/iletisim` |
| `/projects` | `/isler` |
| `/resume` | `/hakkimda` |

Yönlendirme tablosu tek bir modülde tutuluyor (`src/lib/redirects.mjs`); Worker ve testler bu modülü ortak kullanıyor.

## 6. Görsel tasarım

**Yön: "Ferah sayfa, macOS dokunuşları"** (görsel karşılaştırmada B seçildi). Ana siteyle bağı detaylar kuruyor; okunabilirlik ve görseller önde.

**Ortak kabuk (tüm sayfalar)**
- **Üst menü çubuğu**, macOS menubar dili: solda "Cihan Duran", sonra Drone · Fotoğraf · AI Yazılım · İşler · Hakkımda; sağda WhatsApp ve saat. Saat istemcide çiziliyor, HTML'de yok.
- **Dock**, masaüstünde altta duruyor: Terminal, Drone, Fotoğraf, AI Yazılım, İşler, İletişim, IBAN.
- İşler ve ekran görüntüleri **macOS pencere çerçevesi** (trafik ışıkları + başlık çubuğu) içinde gösteriliyor. Fotoğraflar Quick Look benzeri bir görüntüleyicide açılıyor.
- Renk: koyu zemin (`rgb(23,23,23)` / `#0b0b0c`), macOS trafik ışığı renkleri (`#ff5f57`, `#febc2e`, `#28c840`), terminal yeşili (`rgb(40,254,14)`) sadece terminal bağlamında. Hizmet vurgu renkleri sade ve tutarlı.
- Yazı: arayüz için sistem fontu (SF/Segoe/Roboto yığını), terminal ve küçük teknik etiketler için self-host **Hack** monospace.
- İkonlar: tutarlı bir SVG ikon seti. **Emoji yok.**
- Metin kontrastı WCAG AA'yı geçiyor; bugünkü soluk gri metinler kalkıyor.

**Ana sayfa (`/`)**, görsel karşılaştırmada B seçildi:
1. İlk ekran masaüstü: duvar kâğıdı, menü çubuğu, dock. Solda büyük başlık ("Drone çekimi ve yapay zeka destekli yazılım."), bir cümlelik açıklama, "WhatsApp'tan yaz" ve "İşleri gör" düğmeleri. Sağda terminal penceresi; açılışta kendiliğinden `whoami` / `ls hizmetler/` yazıyor, sonra etkileşimli oluyor.
2. Altında üç hizmet, **macOS widget'ı** gibi kartlar: görsel, başlık ve kısa alt başlık; her biri hizmet sayfasına gidiyor.
3. Kaydırınca: öne çıkan işler (pencere çerçeveli ekran görüntüleri), kısa "hakkımda" bölümü, iletişim çağrısı.
4. Başlık, açıklama ve hizmet kartları statik HTML. Terminal bir React adası; bunun dışındaki her şey HTML.

**Hizmet sayfaları** (üçü aynı iskelet, içerik tamamen özgün):
Tam genişlik görsel/video hero → kanıt şeridi (gerçek sayılar; bilinmiyorsa yer tutucu) → bu hizmette yapılan işler (pencere çerçeveli) → kapsam (ne alırsınız) → süreç (nasıl çalışıyoruz) → sık sorulan sorular (gerçek sorular, sayfada görünür) → teklif çağrısı (WhatsApp ön dolu mesajla).
- Drone: hizmet bölgesi metinle anlatılıyor (Bodrum yarımadası, Muğla). Ayrı lokasyon sayfası yok.
- AI Yazılım: web siteleri, otomasyon, CRM/panel, AI asistanları; her biri `/isler`'den gerçek örneklere bağlanıyor.

**İşler (`/isler`)**: Kart ızgarası, filtre (Tümü / Yazılım / Drone / Fotoğraf). Her kartta pencere çerçeveli ekran görüntüsü, müşteri adı, sektör ve tek satır sonuç.
**Vaka sayfası (`/isler/<proje>`)**: müşteri ve sektör, ne istendi, ne yapıldı (kullanılan teknoloji ve AI'ın rolü), masaüstü + mobil ekran görüntüleri, canlı site linki, varsa müşteri sözü (sadece gerçekse), ilgili hizmete link.

**Mobil kuralları**
- Önce 360–390px genişlikte tasarlanıyor; 768, 1024 ve 1440'ta test ediliyor.
- Menü çubuğu mobilde sade bir üst bar oluyor (isim + menü düğmesi). Dock **alt sekme çubuğuna** dönüşüyor (Drone, Fotoğraf, AI, İşler, İletişim). WhatsApp düğmesi bu çubukla çakışmayacak şekilde konumlanıyor.
- Ana sayfada başlık → hizmet widget'ları → terminal kartı sırası; terminal tam genişlik ve iOS klavyesiyle çalışıyor (mevcut "Done" düzeltmesi korunuyor).
- Dokunma hedefleri ≥ 44px. Yatay kaydırma yok. Görseller `srcset` ile boyutlandırılıyor.

## 7. Teknik mimari

**Altyapı:** Astro 7 (statik çıktı), React adaları için `@astrojs/react`, `@astrojs/sitemap`, görseller için `astro:assets` + `sharp`. Wrangler `devDependencies`'de. Node sürümü `.node-version` ile sabitleniyor.

```
astro.config.mjs        site: https://cihanduran.com, trailingSlash: 'never', build.format: 'file',
                        i18n: { defaultLocale: 'tr', locales: ['tr'], routing: { prefixDefaultLocale: false } }
wrangler.jsonc          name: "cihanduran", main: worker/index.mjs, assets: dist/, binding ASSETS,
                        run_worker_first: true, not_found_handling: "404-page", html_handling: "drop-trailing-slash"
worker/index.mjs        host/yönlendirme/başlıklar (bkz. Worker)
src/lib/redirects.mjs   eski → yeni adres tablosu (Worker + testler ortak)
src/i18n/               tr.ts (arayüz metinleri), yardımcılar (t(), hreflang üretimi)
src/content/isler/      her proje bir .md (frontmatter: ad, sektör, kategori, url, yıl, görseller, öne çıkan, lang)
src/content/hizmetler/  üç hizmetin metinleri (lang alanıyla)
src/layouts/            Base (head/SEO/JSON-LD), Desktop (macOS kabuk)
src/components/         MenuBar, Dock, MobileTabBar, Window(çerçeve), Widget, ProjectCard, ...
src/islands/            Terminal (React, mevcut kod sadeleştirilerek), IBAN, VSCode, Qemu, Git (React, client:only)
scripts/screenshots.mjs müşteri sitelerinin masaüstü/mobil ekran görüntülerini alır (Playwright), src/assets/isler/'e yazar; elle çalıştırılır, çıktılar repoya girer
tests/                  node:test: yönlendirme tablosu, Worker davranışı, build çıktısı denetimleri
```

**React adaları:** macOS sayfaları mevcut React + styled-components koduyla `client:only="react"` olarak taşınıyor (SEO değeri yok, hepsi noindex). Ana sayfa terminali `client:idle` ile yükleniyor ve kabuk HTML'i statik kalıyor. `react-router` bağımlılığı kalkıyor; sayfalar arası geçiş normal linklerle yapılıyor. Terminalde `ai` komutu ve `openai` bağımlılığı siliniyor; `help` listesi yeni adreslere göre güncelleniyor.

**Worker** (`kreafik/sareperdecioglu.av.tr` deseni):
- Canonical host `cihanduran.com`. `www.cihanduran.com` ve `http://` istekleri yolu ve sorguyu koruyarak **tek adımda 301** ile `https://cihanduran.com`'a gidiyor.
- Yol normalizasyonu (sonda `/`, büyük harf) ve eski adres tablosu da aynı tek 301'de çözülüyor (zincir yok).
- Canonical olmayan host'lar (`*.workers.dev`, sürüm önizlemeleri, localhost) içerik + `X-Robots-Tag: noindex, nofollow` alıyor.
- noindex sayfalar (`/iban`, `/vscode`, `/qemu`, `/git`, `/danger-zone`) hem `<meta name="robots">` hem başlık ile işaretleniyor.
- Bilinmeyen adres: 404.html gövdesi **404 durum koduyla** dönüyor.
- Güvenlik başlıkları: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY`, `Permissions-Policy`, `Strict-Transport-Security`; CSP'yi builder belirliyor (Cloudflare Web Analytics ve gerekiyorsa VSCode iframe'i için izinli).
- `/_astro/*` ve fontlar `immutable` önbellekleniyor.

**Analitik:** Vercel Analytics kalkıyor. Yerine Cloudflare Web Analytics geliyor (çerezsiz, çerez bandı gerektirmiyor).

## 8. SEO

- Her sayfada özgün `<title>` (≤ 60 karakter) ve `description` (≤ 155 karakter), tek bir `<h1>`, mutlak `canonical`, Open Graph/Twitter etiketleri. Vaka sayfalarının OG görseli kendi ekran görüntüsü; diğerleri 1200×630 varsayılan görsel.
- **JSON-LD** (sadece sayfada gerçekten görünen bilgilerle):
  - Ana sayfa: `ProfessionalService` (ad, telefon, e-posta, Bodrum/Muğla adresi, hizmet bölgesi, `sameAs`) + `Person` (Cihan Duran, `jobTitle`) + `WebSite`.
  - Hizmet sayfaları: `Service` (provider → ana kuruluş) + `BreadcrumbList`; SSS görünürse `FAQPage`.
  - Vaka sayfaları: `CreativeWork` (creator → Person, url → müşteri sitesi) + `BreadcrumbList`.
- `sitemap-index.xml` `@astrojs/sitemap` ile otomatik üretiliyor; noindex sayfalar hariç. `robots.txt` sitemap'i gösteriyor.
- i18n hazırlığı: her sayfa `hreflang` üretecek bir bileşenden geçiyor. Bugün sadece `tr` ve `x-default`; İngilizce eklenince `/en/...` adresleri (İngilizce slug'larla) otomatik bağlanıyor.
- İç linkleme: hizmet ↔ ilgili işler ↔ hakkımda; menü ve footer'da tüm ana sayfalar.
- Performans hedefi (mobil, Lighthouse): Performans ≥ 95, SEO 100, Erişilebilirlik ≥ 95, Best Practices 100. LCP < 2,0 sn.
- Yayın sonrası (Cihan ile birlikte):
  - Google Search Console'da alan adı mülkü (Cloudflare'de DNS TXT ile doğrulama), sitemap gönderimi, ana sayfalar için URL denetimi + dizine ekleme isteği.
  - Bing Webmaster Tools (Search Console'dan içe aktarma).

## 9. İçerik ve yer tutucular

- Metinler sıfırdan, Cihan'ın sesiyle yazılıyor: birinci tekil şahıs, somut, kısa. Mevcut sayfalardan sadece doğru olgular alınıyor.
- **Yer tutucu kuralı:** Bilinmeyen her olgu (sayılar, lisans/belge, ekipman, müşteri sözü) ve her eksik görsel, sayfada görünür biçimde işaretleniyor (ör. kesikli çerçeve + "GÖRSEL: drone — villa, gün batımı"). Kaynakta `TODO(cihan):` ile işaretleniyor. `npm run check:placeholders` hepsini listeliyor. Yer tutucusu kalan sayfalarla canlıya geçiş Cihan'ın kararı.
- `/isler` aday listesi (GitHub'daki müşteri siteleri, son seçim Cihan'ın): Narin Mermer, Sunset Gulet, Noa Suite Hotel, Yıldız Garage, Av. Sare Perdecioğlu, Safir Villaları, Lets Dance Yacht, Mak-El, Halikarya Hotel, Dr. Sword, Dr. İsmet Hisar, Aş-Mak Karot, Artunç Otel, Aslantaş İnşaat, Akyalı Butik Hotel, Aquas Fuels, Bodrum Alfa, Bodrum Massage (HTB), Gündoğan Suites, Pearl Beauty, İnce Rent a Car, Mucho Real Estate, CRM/panel işleri (May Ajans CRM, Mucho Lab Dental CRM, Eser Teknik Panel). Canlı olmayan ya da gösterilmesi istenmeyen işler çıkarılıyor.
- Ekran görüntüleri canlı sitelerden script ile alınıyor (masaüstü 1440 + mobil 390). İsimler ve linkler Cihan'ın onayıyla kullanılıyor (onay verildi).

## 10. Yayına alma

1. Astro sitesi yeni bir dalda geliştiriliyor. **Vercel hâlâ `main`'e bağlı:** birleştirmeden önce Vercel projesinin Git bağlantısı kesiliyor, yoksa yeni site yönlendirmesiz haliyle Vercel'e yayınlanır. Geçiş anına kadar canlı site Vercel'de olduğu gibi kalıyor.
2. Cloudflare panelinde **Workers & Pages → Import a repository**: Worker adı `cihanduran`, production dalı `main`, build `npm run build`, deploy `npx wrangler deploy`, önizleme komutu `npx wrangler versions upload`. Gizli değer gerekmiyor.
3. Önce `cihanduran.<hesap>.workers.dev` üzerinde inceleme (noindex). Cihan onaylayınca:
4. Cloudflare DNS'te Vercel'i gösteren apex ve `www` kayıtları siliniyor. `wrangler.jsonc`'ye `routes: [{ pattern: "cihanduran.com", custom_domain: true }, { pattern: "www.cihanduran.com", custom_domain: true }]` ekleniyor (custom domain kayıtları ve sertifikaları otomatik oluşuyor). Kesinti birkaç dakika sürüyor. **E-posta kayıtlarına (MX, SPF/DKIM TXT) dokunulmuyor**; silmeden önce kayıt listesi yedekleniyor.
5. Doğrulama: apex 200; www/http 301 → apex; eski adresler 301; bilinmeyen adres 404; Googlebot UA ile istek normal kullanıcıyla aynı HTML'i alıyor.
6. Vercel projesinden alan adı kaldırılıyor. Proje bir hafta geri dönüş için duraklatılmış bekliyor, sonra siliniyor.
7. Search Console / Bing adımları (§8).

## 11. Builder'a bırakılanlar

- Tam renk/aralık değerleri, ikon seti, animasyon detayları (yön ve kurallar yukarıda; uygulama sırasında `frontend-design` rehberi kullanılır).
- Hizmet sayfası metinlerinin ilk taslağı (Cihan düzeltecek).
- CSP'nin kesin içeriği.
- Terminal komut setinin sadeleştirilmesi (hangi komutlar kalır). Kural: `ai` gider, yeni adreslere gidenler eklenir.

## 12. Benim kararlarım (Cihan'ın onayından geçmedi, itiraz edilebilir)

- AI Yazılım ve grafik tasarım lokasyon sayfaları `/yapay-zeka-yazilim`'e, `/hizmetler` ana sayfaya yönleniyor.
- `/git`, `/vscode`, `/qemu`, `/danger-zone`, `/iban` duruyor ama noindex.
- Analitik: Cloudflare Web Analytics.
- Ekran görüntüleri script'le alınıp repoya giriyor (build sırasında değil).
- Yer tutucusu kalan sayfa canlıya engel değil; karar Cihan'ın.

---

## Ek A — Tasarım turu 2 (2026-11-26): "show"

Cihan'ın geri bildirimi: ilk sürüm sade, boş ve sıkışık. İstek: tam genişlik, ilk bakışta "oha, neler yapmış" etkisi, 21st.dev bileşenlerinden esinlenme.

**Seçilen yön: A (canlı masaüstü + iş duvarı), B'nin drone hero'su sayfanın aşağısında.**

Ana sayfa sırası:
1. **Hero (tam genişlik):** aurora ışıklı + ızgara dokulu arka plan, dev başlık ("Havadan çekiyorum. Yapay zekayla kodluyorum."), canlı "yeni projelere açık" rozeti, sağda küçük terminal.
2. **İş duvarı:** müşteri sitelerinin eğik, sürekli akan 3 sıralı ekran görüntüsü duvarı (21st.dev "3D Marquee" esinli).
3. **Rakam şeridi:** sayılar `src/site.config.mjs` → `stats` içinden; değerleri Cihan verir (bkz. aşağı).
4. **Teknoloji şeridi:** gerçekten kullanılan teknolojilerin logolu, akan şeridi (GitHub repolarından: Astro, TypeScript, React, Next.js, Tailwind CSS, Cloudflare Workers, Hono, Supabase, Prisma, Zod, TanStack Query, Three.js, Python, Solidity, WordPress + AI araçları).
5. **Bento pano:** dönen ışık kenarlı rakam kartı, drone video kutusu, Bodrum pinli noktalı küre, imleci takip eden parıltılı hizmet kartları, ek işler (CRM/panel/QR/oyun).
6. **Drone sinema geçişi (B'nin hero'su):** kaydırdıkça ortadaki drone videosu/fotoğrafı tam ekrana büyür, "Havadan." / "Koddan." iki yana açılır.
7. Hakkımda özeti, iletişim çağrısı.

Genel: tüm sayfalarda tam genişlik düzen (içerik genişliği 1120 → ~1440px, hero ve duvarlar kenardan kenara). Dock'ta terminalden ayrı **Ana sayfa** ikonu. Terminal tıklanınca macOS "yakınlaştır" animasyonuyla tam ekrana büyür (Esc/yeşil düğme ile küçülür; telefonda tam ekran açılır). Hareket `prefers-reduced-motion`'a saygılı.

**İşler kapsamı genişliyor:** Cloudflare'deki 20 siteye ek olarak WordPress'teki müşteri siteleri ve ekran görüntüsü alınabilen diğer işler.

**Rakamlar ve iddialar (Ek A ile değişen kural):** Sayılar ve öne çıkan iddialar Cihan'ın beyanıdır; `site.config.mjs` → `stats` içinde tek yerde durur ve Cihan tarafından verilir. Claude kendi başına sayı uydurmaz.

**Teknik karar (Claude'un kararı):** 21st.dev bileşenleri Tailwind ile yazılı; efektler kendi CSS değişkenlerimize ve küçük React adalarına çevrilir, Tailwind eklenmez (tek stil sistemi, sayfa başına daha az CSS).
