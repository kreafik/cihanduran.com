# cihanduran.com

Cihan Duran'ın kişisel portfolio ve hizmet sitesi.
Bodrum / Muğla merkezli web tasarım, drone çekimi, fotoğrafçılık ve grafik tasarım hizmetleri.

## Tech Stack

- **Vite 6** + **React 18**
- **styled-components v6**
- **react-helmet-async** (SEO)
- **framer-motion** (animasyonlar)
- **lucide-react** (ikonlar)

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/ klasörüne production build
npm run preview  # build önizleme
```

## Proje Yapısı

İki ayrı sayfa sistemi vardır:

- **macOS Simülasyon** (`/`, `/contact`, `/git`, `/iban`, `/projects`, `/resume`)  
  Orijinal portfolio teması — sürüklenebilir pencereler, terminal simülasyonu.

- **ServiceLayout** (`/hizmetler/*`)  
  Tam sayfa koyu tema — SEO odaklı hizmet ve lokasyon sayfaları.

Detaylar için [`CLAUDE.md`](./CLAUDE.md) dosyasına bak.
