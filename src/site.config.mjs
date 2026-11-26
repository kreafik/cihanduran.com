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
  // TODO(cihan): 10–20 sn sessiz döngü; mp4 (H.264) + webm, ~1080p, 3–5 MB; poster = ilk kare (jpg).
  heroVideo: { mp4: '', webm: '', poster: '' },
  // TODO(cihan): Cloudflare Web Analytics token'ı (panel → Analytics & Logs → Web Analytics). Boşken beacon eklenmez.
  cfAnalyticsToken: '',
};

/** WhatsApp bağlantısı, isteğe bağlı ön dolu mesajla. */
export function whatsappLink(message) {
  return message ? `${site.whatsapp}?text=${encodeURIComponent(message)}` : site.whatsapp;
}
