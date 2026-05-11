# cihanduran.com — SEO Planı

**Hedef:** Muğla / Bodrum yerel aramalarında ilk sayfaya çıkmak  
**Hizmetler:** Yazılım · Tasarım · Fotoğraf & Video (Emlak & Tekne) · Drone Çekimi  
**Alan:** Muğla, Bodrum

---

## Durum Tespiti

| Konu | Mevcut Durum | Sorun |
|------|-------------|-------|
| Site tipi | React SPA | Tarayıcılar JS çalıştırmadan içeriği göremez |
| Meta etiketler | Kısmen var | Keywords, description lokasyon odaklı değil |
| JSON-LD Schema | Yok | Google iş bilgilerini tanımıyor |
| sitemap.xml | Yok | Google sayfaları keşfedemiyor |
| robots.txt | Var ama eksik | Sitemap referansı yok |
| Prerender | Yok | Sosyal medya botları ve bazı crawler'lar boş sayfa görüyor |
| Google Business | Bilinmiyor | Yerel arama sıralamasının %40'ı buradan geliyor |

---

## Hedef Anahtar Kelimeler

### Birincil (Yüksek öncelik)
- `Bodrum web tasarım`
- `Bodrum yazılım geliştirme`
- `Bodrum drone çekimi`
- `Bodrum emlak fotoğraf çekimi`
- `Muğla web tasarım`
- `Bodrum fotoğrafçı`

### İkincil
- `Bodrum yazılımcı`
- `Muğla drone pilotu`
- `Bodrum emlak videosu`
- `Bodrum grafik tasarım`
- `Bodrum tekne fotoğraf çekimi`
- `Muğla fotoğrafçı`

### Long-tail (Uzun kuyruk)
- `Bodrum'da web sitesi yaptırmak`
- `Bodrum emlak drone çekimi fiyat`
- `Muğla Bodrum yazılım geliştirici`
- `Bodrum'da drone ile çekim hizmeti`
- `Bodrum tekneleri fotoğraf video`

---

## Uygulama Planı

### Faz 1 — Teknik Temel (Bu oturumda yapılacak)

- [x] **index.html** → Title, description, keywords lokasyon odaklı yeniden yazıldı ✅
- [x] **JSON-LD LocalBusiness Schema** → Google'a iş bilgilerini tanıttı ✅
- [x] **JSON-LD Person Schema** → Kişisel profil tanımlandı ✅
- [x] **Open Graph & Twitter Card** → Paylaşımlarda doğru önizleme ✅
- [x] **sitemap.xml** → Tüm route'lar listelendi ✅
- [x] **robots.txt** → Sitemap referansı eklendi ✅
- [x] **react-helmet-async** → Her sayfa için ayrı title/description eklendi ✅
- [x] **geo meta tagları** → `geo.region: TR-MU`, `geo.placename: Bodrum, Muğla` ✅
- [x] **canonical URL** → Her sayfada canonical link ✅

### Faz 2 — İçerik (Sonraki oturum)

- [ ] **Hizmetler sayfası** → Her hizmet için ayrı bölüm, keyword açısından zengin Türkçe metin
- [ ] **Hakkımda bölümü** → "Bodrum merkezli" ifadeleri içeren biyografi
- [ ] **Referans/Portfolio** → Fotoğraf galerisi, yapılan işler
- [ ] **Blog / Haberler** → "Bodrum drone çekimi nasıl yapılır" gibi içerikler (uzun vadeli)

### Faz 3 — Off-Page (Kendin yapacaksın — kod dışı)

- [ ] **Google Business Profile** → `business.google.com` → En kritik adım
  - Firma adı, telefon, adres eksiksiz girilmeli
  - Hizmet kategorileri seçilmeli
  - Fotoğraflar yüklenmeli (drone çekimleri, tasarım örnekleri)
  - Müşteri yorumları istenmeli
- [ ] **Yandex Business** → `business.yandex.com.tr` → Ek görünürlük
- [ ] **Sosyal Medya Profilleri** → Instagram, LinkedIn, Behance → NAP tutarlılığı
- [ ] **Dizin Siteleri** → kobisi.com, esnafbul.com, sahibinden, yerelrehber.com
- [ ] **Backlink** → Bodrum turizm siteleri, emlak siteleri, marina siteleri

---

## Kritik Not: SPA + SEO

Bu site React SPA olduğu için HTML başlangıçta boş gelir, içerik JavaScript ile doldurulur.

**Google Çözümü:** Google, JavaScript render ediyor — yani google için meta taglar yeterli.  
**Sosyal Medya Çözümü:** Facebook, WhatsApp, Twitter botları JS çalıştırmaz → `vite-plugin-prerender` ile her route için statik HTML üretilecek.

---

## Öncelik Sırası

1. Google Business Profile kur (kod dışı, en büyük etki)
2. JSON-LD schema ekle (bu oturumda)
3. index.html meta tagları güçlendir (bu oturumda)
4. sitemap.xml oluştur (bu oturumda)
5. Hizmetler sayfası ekle (sonraki oturum)
6. Prerender ekle (sonraki oturum)
