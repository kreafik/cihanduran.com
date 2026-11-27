// Sitenin tek doğruluk kaynağı: kimlik ve iletişim bilgileri.
export const site = {
  name: 'Cihan Duran',
  origin: 'https://cihanduran.com',
  phone: '+90 541 575 55 20',
  phoneHref: 'tel:+905415755520',
  whatsapp: 'https://wa.me/905415755520',
  // TODO(cihan): iletişim e-postanı buraya yaz (CLAUDE.md → "İletişim Bilgileri"). Boşken sitede e-posta gösterilmez.
  email: '',
  locality: 'Bodrum',
  region: 'Muğla',
  country: 'TR',
  geo: { lat: 37.0344, lng: 27.4305 },
  github: 'https://github.com/kreafik',
  // Cihan'ın beyanı (2026-11-26). Sitedeki bütün rakamlar buradan gelir; başka sayı uydurulmaz.
  stats: { software: '300+', shoots: '200+', years: '10+' },
  // Hero arka plan videosu (kendi drone çekimin): public/video/ altına koy. Boşken aurora tek başına kalır.
  // Kaynak: Cihan'ın Axopar çekimi (Portfolyo/02 Yatlar & Tekneler/Axopar), ilk 12 sn: Bodrum Kalesi önü + yukarıdan dönüş. Sessiz döngü.
  heroVideo: { mp4: '/video/hero-drone.mp4', webm: '', poster: '/video/hero-drone.jpg' },
  // Cloudflare Web Analytics zone'da "otomatik ekleme" ile açık: beacon'ı Cloudflare kenarda ekliyor (token 3bba…).
  // Burayı doldurmak beacon'ı ikinci kez ekler; otomatik ekleme kapatılırsa token buraya yazılır.
  cfAnalyticsToken: '',
  // Google Etiket Yöneticisi kapsayıcısı (cihandran@gmail.com). İçinde GA4 etiketi G-ZP72V4T1DG var.
  // Consent Mode v2: analitik çerezleri yalnız çerez bandında onay verilince yazılır. Boşken GTM eklenmez.
  gtmId: 'GTM-PSP78T7T',
  // TODO(cihan): portre fotoğrafı eklenince src/assets/ altına koyup yolu yazın; boşken portre alanları gizli.
  portrait: '',
  // TODO(cihan): ekipman ve belge satırları (ör. 'DJI ...', 'SHGM İHA pilot lisansı ...'); boşken bölüm gizli.
  equipment: [],
};

/** WhatsApp bağlantısı, isteğe bağlı ön dolu mesajla. */
export function whatsappLink(message) {
  return message ? `${site.whatsapp}?text=${encodeURIComponent(message)}` : site.whatsapp;
}
