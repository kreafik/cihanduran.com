# cihanduran.com — SEO planı

## Neden indekslenmiyordu (2026-11-26 tespiti)

1. Vercel middleware Googlebot'a içeriksiz, kendine `meta refresh` yapan bir sayfa veriyordu.
2. Apex `cihanduran.com` → `www` 307, ama tüm canonical'lar apex'i gösteriyordu: döngü.
3. React SPA: HTML gövdesi boştu.
4. Bilinmeyen adresler 200 dönüyordu (soft 404).
5. 48 lokasyon sayfası şehir adı değiştirilmiş kopyaydı (doorway page).

Yeni sitede beşi de çözüldü: statik HTML, tek canonical host, tek adımlı 301'ler, gerçek 404, kopya sayfalar kaldırılıp yönlendirildi.

## Yayından hemen sonra (Cihan + Claude)

- [ ] **Google Search Console** → "Alan adı" mülkü ekle: `cihanduran.com`. Doğrulama TXT kaydını Cloudflare DNS'e ekle.
- [ ] Search Console → Site haritaları → `https://cihanduran.com/sitemap-index.xml` gönder.
- [ ] URL denetimi → şu adresler için "Dizine eklenmesini iste": `/`, `/drone-cekimi-bodrum`, `/fotograf-video-cekimi-bodrum`, `/yapay-zeka-yazilim`, `/isler`, `/hakkimda`, `/iletisim`.
- [ ] Eski Vercel mülkü (`www.cihanduran.com`) varsa Search Console'da "Adres değişikliği" gerekmez (aynı alan adı); yalnız eski mülkü izlemeye devam et.
- [ ] **Bing Webmaster Tools** → "Search Console'dan içe aktar".
- [ ] 1–2 hafta sonra: Search Console → Sayfalar raporu; "Yönlendirmeli sayfa" ve "Bulunamadı (404)" listelerini kontrol et.

## Site dışı (en büyük etki)

- [ ] **Google İşletme Profili**: ad "Cihan Duran", kategori (Drone fotoğrafçısı / Web tasarımcısı), hizmet bölgesi Bodrum + Muğla, telefon `+90 541 575 55 20`, web sitesi `https://cihanduran.com`. Drone ve fotoğraf işlerinden en az 10 görsel.
- [ ] **Müşterilerden yorum iste**: `/isler`'deki 20 işletmeden. İşletme Profili yorumları yerel sıralamanın en güçlü sinyali.
- [ ] **Müşteri sitelerinden geri bağlantı**: her müşteri sitesinin footer'ına "Web tasarım: Cihan Duran" → `https://cihanduran.com/isler/<ad>` (nofollow olmadan). 20 ilgili, yerel bağlantı.
- [ ] NAP tutarlılığı: ad, telefon ve şehir her yerde (Instagram, LinkedIn, İşletme Profili, dizinler) aynı.

## İçerik (sürekli)

- [ ] Hizmet sayfalarına gerçek görseller (drone, fotoğraf) — `npm run check:placeholders`.
- [ ] Her vaka sayfasına "müşterinin ihtiyacı ve sonuç" paragrafı (YAML'deki `TODO(cihan)` notu).
- [ ] İngilizce sürüm (yabancı villa sahipleri, yat sahipleri).
