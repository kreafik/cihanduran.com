# cihanduran.com — Claude kılavuzu

Cihan Duran'ın sitesi (Bodrum). Üç hizmet: **Drone Çekimi**, **Fotoğraf & Video**, **AI Destekli Yazılım**. Hedef his: "bu kişi işini iyi yapıyor, onunla çalışmalıyım"; öne çıkanlar **güven** ve **işler**.

Mimari, komutlar ve yayın adımları: [README.md](README.md). Tasarım kararları: `docs/superpowers/specs/`.

## Değişmez kurallar

1. **Tek adres `https://cihanduran.com`** (www yok, sonda `/` yok, küçük harf, ASCII slug). Yönlendirme kuralları yalnız `src/lib/routing.mjs`'te.
2. **Yayındaki adresi değiştirme.** Zorunluysa `LEGACY_REDIRECTS`'e 301 ekle ve `tests/routing.test.mjs`'e test yaz.
3. **Kullanıcı ajanına göre farklı içerik verme** (eski Vercel middleware'i Google'ı bu yüzden kaybetti).
4. **Uydurma güven sinyali yok:** sayı, lisans, müşteri yorumu, ekipman. Bilinmeyen → `TODO(cihan)` + görünür yer tutucu. `dist/`'e "TODO" sızmaz (test var).
5. **Kimlik yalnız "Cihan Duran".** "Kreafik" sitede geçmez (test var).
6. **AI sohbeti yok** (maliyet). `openai` / `/api/chat` eklenmez.
7. **Emoji ikon yok, Tailwind yok.** İkonlar `src/components/Icon.astro`.
8. **Mobil önce:** 360/390/768/1024/1440'ta yatay taşma yok; dokunma hedefi ≥ 44px; < 900px'te dock yerine `MobileTabBar`.
9. Her indekslenen sayfa: tek `<h1>`, benzersiz `<title>` ≤ 60, benzersiz description ≤ 155, JSON-LD. `npm test` bunları denetler.
10. Değişiklikten sonra: `npm run build && npm test`.

## Tasarım dili

macOS koyu görünümü: menü çubuğu, dock, pencere çerçevesi (`Window.astro`), widget kartları. Değişkenler `src/styles/global.css` (`--c-*`, `--fs-*`). Renk yükünü fotoğraflar taşır; terminal yeşili yalnız terminalde. Beyaz metinli mavi düğme `#0071e3` (AA kontrast).

## İletişim bilgileri

`src/site.config.mjs` tek kaynak. E-posta alanı boşsa sitede e-posta gösterilmez.

## Bilinen açık işler

- Görseller: `npm run check:placeholders`.
- Cloudflare Web Analytics token'ı: `site.config.mjs` → `cfAnalyticsToken`.
- İngilizce sürüm: `src/i18n/en.ts` + `LANGS`'e `'en'` + içeriklerde `lang: en` ve İngilizce slug'lar.
