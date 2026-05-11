# cihanduran.com — Claude Kod Kılavuzu

Bu dosya Claude Code'un her oturumda otomatik okuduğu proje rehberidir.
Değişiklik yapmadan önce mutlaka oku.

---

## Proje Özeti

Cihan Duran'ın kişisel portfolio ve hizmet sitesi. Bodrum / Muğla merkezli
4 hizmet alanı: **Web Tasarım & Yazılım**, **Drone Çekimi**,
**Emlak & Tekne Fotoğrafçılığı**, **Grafik Tasarım**.

- **Canlı:** `cihanduran.com`
- **Telefon:** +90 541 575 55 20
- **E-posta:** tasarim@cihanduran.com

---

## Tech Stack

| Araç | Versiyon | Not |
|------|----------|-----|
| Vite | 6.x | `treat-js-files-as-jsx` plugin mevcut |
| React | 18.x | — |
| styled-components | 6.x | Transient props: `$prop` |
| react-helmet-async | — | `<HelmetProvider>` App.jsx'te sarıyor |
| framer-motion | — | IBAN kartları animasyonu |
| lucide-react | — | BentoGrid ikonları |
| react-router-dom | — | BrowserRouter |
| axios | — | GitHub API |
| simplebar-react | — | Git sayfası scroll |

**Tailwind YOK.** Daha önce denendi, styled-components ile çakıştı, tamamen kaldırıldı.

---

## KRİTİK KURAL — İki Ayrı Sayfa Sistemi

Projede **iki tamamen farklı** sayfa tipi var. Bunları karıştırma.

### 1. macOS Simülasyon Sayfaları (DOKUNMA)
Orijinal portfolio teması. Masaüstü simülasyonu, sürüklenebilir pencereler.

| Route | Bileşen | İçerik |
|-------|---------|--------|
| `/` | `Window.jsx` | Terminal (TerminalContent) |
| `/contact` | `Contact.jsx` | İletişim (ContactContent) |
| `/iban` | `IBAN.jsx` | Banka kartları (IBANContent) |
| `/git` | `Git.jsx` | GitHub repo listesi (GitContent) |
| `/projects` | `Projects.jsx` | Placeholder |
| `/resume` | `Resume.jsx` | CV placeholder |
| `/vscode` | `VSCode.jsx` | VSCode simülasyonu |
| `/qemu` | `Linux.jsx` | Linux simülasyonu |

**Bu sayfaların stiline, layout'una, wrapper'ına dokunma.**
Kullandıkları bileşenler: `Default`, `BodyContent`, `HeadingBar`, `DockContent`, `MenuContent`.

### 2. ServiceLayout Sayfaları (HİZMETLER)
Tam sayfa koyu tema. Tüm yeni SEO sayfaları burada.

| Route | Dosya |
|-------|-------|
| `/hizmetler` | `HizmetlerPage.jsx` |
| `/hizmetler/drone-cekimi-bodrum` | `DroneService.jsx` |
| `/hizmetler/emlak-tekne-fotograf-bodrum` | `PhotoService.jsx` |
| `/hizmetler/web-tasarim-yazilim-bodrum` | `WebService.jsx` |
| `/hizmetler/grafik-tasarim-bodrum` | `DesignService.jsx` |
| `/hizmetler/*-marmaris` | `LocationServicePage.jsx` |
| `/hizmetler/*-fethiye` | `LocationServicePage.jsx` |
| `/hizmetler/*-datca` | `LocationServicePage.jsx` |

---

## ServiceLayout Tasarım Sistemi (BentoGrid Dili)

Tüm `/hizmetler` sayfaları aynı görsel dili kullanır.

### Renk Paleti

```
Arka plan (genel):  #0d1117
Kart arka planı:    #000
Border:             rgba(255,255,255,0.08)
Başlık metni:       #e6edf3
Soluk metin:        rgba(230,237,243,0.55)
```

### Hizmet Renkleri (accent)

| Hizmet | Renk |
|--------|------|
| Drone / Genel / Lokasyon | `#58a6ff` (mavi) |
| Web Tasarım | `#3fb950` (yeşil) |
| Fotoğraf & Video | `#d29922` (sarı/amber) |
| Grafik Tasarım | `#a371f7` (mor) |

### Kart Stili (BentoGrid)

Her içerik kartı şu pattern'i izler:
```css
position: relative;
overflow: hidden;
background: #000;
border: 1px solid rgba(255,255,255,0.08);
border-radius: 0.75rem;

/* Dot pattern — hover'da beliriyor */
&::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 4px 4px;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

&:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 12px rgba(255,255,255,0.04);
  border-color: rgba(255,255,255,0.14);
}

&:hover::before { opacity: 1; }
```

### Bölüm Başlığı Stili

```jsx
<SectionEyebrow>Küçük Etiket</SectionEyebrow>  {/* mavi, üstünde — çizgi */}
<SectionTitle>Ana Başlık</SectionTitle>
<SectionDesc>Açıklama metni</SectionDesc>
```

`SectionEyebrow` → `::before` ile kısa yatay çizgi + uppercase mavi metin

### H2 Başlıkları (İçerik Sayfaları)

`border-bottom` YOK. Bunun yerine `::before` ile renkli accent çizgi:
```css
&::before {
  content: "";
  display: block;
  width: 1.75rem;
  height: 2px;
  background: rgba(88,166,255,0.45); /* sayfanın rengiyle */
  border-radius: 1px;
  margin-bottom: 0.6rem;
}
```

### Hero, CTA, Footer — Ortak Pattern

Hepsi aynı yapıyı kullanır:
```css
position: relative;
overflow: hidden;
background: #000; /* veya gradient */

/* Dot dokusu */
&::before { ... radial-gradient dot ... }

/* Gradient çizgi (hero: alt kenar, CTA/footer: üst kenar) */
&::after {
  content: "";
  position: absolute;
  [top/bottom]: 0;
  left: 15%;
  right: 15%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(RENK,0.35), transparent);
  pointer-events: none;
}
```

---

## Dosya Yapısı

```
src/
├── App.jsx                    # HelmetProvider sarmalı
├── main.jsx
├── components/
│   ├── Default.jsx            # macOS pencere wrapper (DOKUNMA)
│   ├── SEO.jsx                # Helmet wrapper
│   ├── Window.jsx             # / rotası — macOS terminal
│   ├── Contact.jsx            # /contact — macOS
│   ├── IBAN.jsx               # /iban — macOS
│   ├── Git.jsx                # /git — macOS
│   ├── Projects.jsx           # /projects — macOS
│   ├── Resume.jsx             # /resume — macOS
│   └── ui/
│       └── bento-grid.jsx     # BentoGrid bileşeni (styled-components)
├── pages/
│   ├── Routes.jsx             # Tüm rotalar + global WhatsApp butonu
│   └── services/
│       ├── ServiceLayout.jsx  # Paylaşılan layout (nav + footer)
│       ├── HizmetlerPage.jsx  # /hizmetler ana sayfa
│       ├── DroneService.jsx
│       ├── PhotoService.jsx
│       ├── WebService.jsx
│       ├── DesignService.jsx
│       └── locations/
│           ├── locationData.js        # 3 lokasyon × 4 hizmet verisi
│           └── LocationServicePage.jsx # Şablon sayfa
├── elements/
│   ├── Contact/ContactContent.jsx
│   ├── IBAN/IBANContent.jsx
│   ├── Git/GitContent.jsx
│   ├── Terminal/TerminalContent.jsx
│   ├── Dock/DockContent.jsx
│   └── ...
├── styles/
│   ├── index.scss
│   └── theme.js               # macOS tema renkleri
└── static/                    # SVG ikonlar (dock için)
```

---

## SEO Yapısı

- `index.html` → JSON-LD `LocalBusiness` + `Person` şemaları, geo meta tagları
- `ServiceLayout.jsx` → her sayfaya `<Helmet>` ile title/description/canonical
- `public/sitemap.xml` → 21 URL (home, contact, 4 Bodrum hizmet, 12 lokasyon)
- `public/robots.txt` → sitemap referansı
- Her lokasyon sayfası → `Service` + `FAQPage` JSON-LD (dangerouslySetInnerHTML)

### Mevcut Lokasyonlar

`locationData.js` dosyasında tanımlı:
- **Marmaris** (slug: `marmaris`)
- **Fethiye** (slug: `fethiye`)
- **Datça** (slug: `datca`)

Her lokasyon 4 hizmet içeriyor: `drone`, `photo`, `web`, `design`

Route formatı: `/hizmetler/{hizmet-slug}-{lokasyon-slug}`

---

## Komutlar

```bash
npm run dev      # Geliştirme sunucusu
npm run build    # Production build (dist/)
npm run preview  # Build önizleme
```

---

## İletişim Bilgileri (Sabit)

```
WhatsApp / Tel: +90 541 575 55 20
E-posta:        tasarim@cihanduran.com
wa.me linki:    https://wa.me/905415755520
tel linki:      tel:+905415755520
mailto:         mailto:tasarim@cihanduran.com
```

---

## Dikkat Edilecekler

1. **Tailwind ekleme** — Denendi, styled-components ile çakıştı. Ekleme.
2. **macOS sayfalarına stil değişikliği** — Kullanıcı açıkça istemediği sürece dokunma.
3. **BentoGrid bileşeni** — `src/components/ui/bento-grid.jsx` tamamen styled-components ile yazılmış, Tailwind class'ları yok.
4. **Yeni lokasyon eklemek** — Sadece `locationData.js`'e obje ekle + `Routes.jsx`'e 4 route ekle + `sitemap.xml` güncelle.
5. **Yeni hizmet sayfası eklemek** — `ServiceLayout` kullan, mevcut sayfaları örnek al, renk temasını yukarıdan seç.
6. **`$` prefix** — styled-components v6'da transient prop'lar `$colSpan`, `$lifted` gibi `$` ile başlar.
