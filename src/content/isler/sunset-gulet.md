---
name: "Sunset Gulet"
sector: "Gulet kiralama"
location: "Göcek"
category: [yazilim]
url: "https://sunsetgulet.com"
shoot: "ssunset-gulet"
year: 2026
summary: "Göcek çıkışlı özel gulet kiralaması için iki dilli tanıtım sitesi."
languages: ["İngilizce","Türkçe"]
stack: ["Astro (statik site)","Cloudflare Workers"]
featured: true
order: 2
desktopShot: "../../assets/isler/sunset-gulet/desktop.jpg"
mobileShot: "../../assets/isler/sunset-gulet/mobile.jpg"
# TODO(cihan): müşterinin ihtiyacı ve sonuç (ör. "eski site mobilde açılmıyordu", "rezervasyonlar WhatsApp'tan gelmeye başladı"). Gerçek değilse boş bırak.
---

## Proje hakkında

Sunset Gulet, Göcek'ten kalkan 22,5 metrelik ahşap bir gulet: 3 kabin, en fazla 6 misafir. Günlük, hafta sonu ve haftalık özel turlar düzenliyor.

## Yapılan çalışma

- Astro ile statik site olarak geliştirildi; sayfalar hazır HTML olarak sunulduğu için hızlı açılır ve arama motorlarınca doğrudan okunur.
- Cloudflare Workers altyapısında yayınlanır.
- İngilizce, Türkçe sürümleri bulunur; dil sürümleri arama motorları için birbirine bağlanmıştır.
