// Arayüz metinleri (Türkçe). İngilizce eklendiğinde aynı anahtarlarla en.ts yazılır.
export const tr = {
  'nav.drone': 'Drone',
  'nav.photo': 'Fotoğraf',
  'nav.ai': 'AI Yazılım',
  'nav.work': 'Projeler',
  'nav.about': 'Hakkımda',
  'nav.contact': 'İletişim',
  'nav.home': 'Ana sayfa',
  'nav.menu': 'Menü',
  'nav.close': 'Kapat',
  'nav.main': 'Ana gezinme',
  'dock.terminal': 'Terminal',
  'dock.iban': 'Banka hesapları',
  'cta.whatsapp': "WhatsApp'tan yazın",
  'cta.whatsappAria': 'WhatsApp ile mesaj gönder',
  'cta.call': 'Ara',
  'cta.work': 'Projeleri inceleyin',
  'footer.rights': 'Tüm hakları saklıdır.',
  'footer.location': 'Bodrum, Muğla',
  'placeholder.image': 'GÖRSEL',
  'breadcrumb.label': 'Konum',
} as const;

export type UiKey = keyof typeof tr;
