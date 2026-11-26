// Terminal komut yorumlayıcısı (saf modül; DOM yok, HTML string yok).
// Çıktı: satır dizisi; her satır { text, tone?, href? } parçalarından oluşur.

/** @typedef {{ text: string, tone?: 'accent'|'muted'|'error'|'link'|'title', href?: string }} Seg */
/** @typedef {{ output: Seg[][], navigate?: string, clear?: boolean }} Result */

export const INTRO = ['whoami', 'ls hizmetler/'];

const seg = (text, tone, href) => ({ text, ...(tone && { tone }), ...(href && { href }) });
const line = (...segs) => segs;

/** Görünür komutlar (help sırası). aliases ilk eleman = gösterilen ad. */
const PAGES = [
  { aliases: ['drone', 'hava', 'aerial'], path: '/drone-cekimi-bodrum', desc: 'drone çekimi' },
  { aliases: ['foto', 'fotograf', 'photo', 'video', 'emlak', 'tekne'], path: '/fotograf-video-cekimi-bodrum', desc: 'fotoğraf ve video çekimi' },
  { aliases: ['yazilim', 'web', 'software', 'website', 'grafik', 'design'], path: '/yapay-zeka-yazilim', desc: 'yapay zeka destekli yazılım' },
  { aliases: ['isler', 'projects', 'portfolio', 'work', 'proje'], path: '/isler', desc: 'yaptığım işler' },
  { aliases: ['hakkimda', 'about', 'resume', 'cv', 'ozgecmis'], path: '/hakkimda', desc: 'hakkımda' },
  { aliases: ['iletisim', 'contact', 'whatsapp', 'mesaj'], path: '/iletisim', desc: 'iletişim' },
  { aliases: ['iban', 'banka', 'bank'], path: '/iban', desc: 'banka hesapları' },
];

/** Gizli sayfa komutları (help'te yok). */
const HIDDEN_PAGES = [
  { aliases: ['code', 'vscode'], path: '/vscode' },
  { aliases: ['qemu', 'linux', 'vm'], path: '/qemu' },
  { aliases: ['git', 'github'], path: '/git' },
  { aliases: ['danger'], path: '/danger-zone' },
  { aliases: ['hizmetler', 'services', 'home', 'cd ~'], path: '/' },
];

const SERVICES_LS = [
  ['drone-cekimi/', '/drone-cekimi-bodrum'],
  ['fotograf-video/', '/fotograf-video-cekimi-bodrum'],
  ['yapay-zeka-yazilim/', '/yapay-zeka-yazilim'],
];

function normalize(input) {
  return input
    .trim()
    .replace(/\s+/g, ' ')
    .toLocaleLowerCase('tr-TR')
    .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
    .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u');
}

function help() {
  const width = Math.max(...PAGES.map((p) => p.aliases[0].length), 5) + 3;
  return [
    line(seg('Komutlar:', 'muted')),
    ...PAGES.map((p) => line(seg(p.aliases[0].padEnd(width), 'accent'), seg(p.desc))),
    line(seg('ls'.padEnd(width), 'accent'), seg('dosyaları listele')),
    line(seg('clear'.padEnd(width), 'accent'), seg('ekranı temizle')),
    line(seg('Ve birkaç gizli komut daha…', 'muted')),
  ];
}

const FIXED = {
  whoami: () => [
    line(seg('Cihan Duran', 'title')),
    line(seg('Bodrum. Drone pilotu ve yapay zeka destekli yazılım geliştiricisi.')),
  ],
  'ls hizmetler': () => [
    line(...SERVICES_LS.flatMap(([name, href], i) => [i ? seg('   ') : null, seg(name, 'link', href)].filter(Boolean))),
  ],
  ls: () => [
    line(seg('hizmetler/', 'link', '/'), seg('   '), seg('isler/', 'link', '/isler'), seg('   '), seg('hakkimda.txt', 'link', '/hakkimda'), seg('   '), seg('iletisim.sh', 'link', '/iletisim')),
  ],
  help: help,
  '?': help,
  man: help,
  uname: () => [line(seg('Darwin cihanduran.local 24.0.0 arm64'))],
  pwd: () => [line(seg('/Users/cihanduran'))],
  date: () => [line(seg(new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul', dateStyle: 'full', timeStyle: 'short' })))],
  'curl cihanduran.com': () => [line(seg('HTTP/2 200', 'accent')), line(seg('server: cloudflare')), line(seg('Zaten buradasın :)', 'muted'))],
  sudo: () => [line(seg('Bu olay rapor edilecek.', 'error'))],
};

/**
 * @param {string} input
 * @returns {Result}
 */
export function run(input) {
  const cmd = normalize(input).replace(/\/+$/, '');
  if (!cmd) return { output: [] };
  if (cmd === 'clear' || cmd === 'cls') return { output: [], clear: true };

  const page = [...PAGES, ...HIDDEN_PAGES].find((p) => p.aliases.includes(cmd) || p.aliases.some((a) => cmd === `./${a}` || cmd === `cd ${a}` || cmd === `open ${a}`));
  if (page) return { output: [line(seg(`${page.path} açılıyor…`, 'muted'))], navigate: page.path };

  const fixed = FIXED[cmd];
  if (fixed) return { output: fixed() };

  return { output: [line(seg(`zsh: command not found: ${input.trim()}`, 'error'))] };
}
