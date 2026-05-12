// Vercel Edge Middleware
// Sosyal medya crawler'larına sayfa bazlı OG tagları döndürür

export const config = { matcher: ["/((?!_next|api|assets|static|favicon).*)"] };

const BASE = "https://cihanduran.com";
const IMG  = `${BASE}/assets/favicon/logo1200.png`;

const PAGES = {
	"/": {
		title: "Cihan Duran | Bodrum Web Tasarım, Yazılım & Drone Çekimi",
		desc:  "Bodrum ve Muğla'da web tasarım, yazılım, drone çekimi ve emlak fotoğrafçılığı hizmetleri.",
	},
	"/contact": {
		title: "İletişim | Cihan Duran — Bodrum",
		desc:  "WhatsApp, telefon veya e-posta ile Cihan Duran'a ulaşın. +90 541 575 55 20",
	},
	"/hizmetler": {
		title: "Hizmetler | Cihan Duran — Bodrum",
		desc:  "Web tasarım, drone çekimi, emlak fotoğrafçılığı ve grafik tasarım hizmetleri. Bodrum & Muğla.",
	},
	"/hizmetler/drone-cekimi-bodrum": {
		title: "Drone Çekimi Bodrum | Cihan Duran",
		desc:  "Bodrum'da profesyonel drone fotoğraf ve video çekimi. Emlak, tekne, etkinlik ve tanıtım hava çekimleri.",
	},
	"/hizmetler/emlak-tekne-fotograf-bodrum": {
		title: "Emlak & Tekne Fotoğrafçılığı Bodrum | Cihan Duran",
		desc:  "Bodrum'da villa, yazlık ve tekne profesyonel fotoğraf & video çekimi.",
	},
	"/hizmetler/web-tasarim-yazilim-bodrum": {
		title: "Web Tasarım & Yazılım Bodrum | Cihan Duran",
		desc:  "Bodrum'da özel web sitesi tasarımı ve yazılım geliştirme hizmetleri.",
	},
	"/hizmetler/grafik-tasarim-bodrum": {
		title: "Grafik Tasarım Bodrum | Cihan Duran",
		desc:  "Bodrum'da logo, kurumsal kimlik ve dijital grafik tasarım hizmetleri.",
	},
};

const LOCATION_TITLES = {
	drone:  (loc) => `Drone Çekimi ${loc}`,
	photo:  (loc) => `Emlak & Tekne Fotoğrafçılığı ${loc}`,
	web:    (loc) => `Web Tasarım & Yazılım ${loc}`,
	design: (loc) => `Grafik Tasarım ${loc}`,
};

const LOCATION_DESCS = {
	drone:  (loc) => `${loc}'da profesyonel drone fotoğraf ve video çekimi. Cihan Duran ile hava çekimleri.`,
	photo:  (loc) => `${loc}'da emlak ve tekne profesyonel fotoğraf & video çekimi.`,
	web:    (loc) => `${loc}'da özel web sitesi tasarımı ve yazılım geliştirme hizmetleri.`,
	design: (loc) => `${loc}'da logo, kurumsal kimlik ve grafik tasarım hizmetleri.`,
};

const LOC_NAMES = {
	marmaris: "Marmaris", fethiye: "Fethiye", datca: "Datça",
	yalikavak: "Yalıkavak", turgutreis: "Turgutreis", golturkbuku: "Gölköy-Türkbükü",
	gundogan: "Gündoğan", bitez: "Bitez", gumbet: "Gümbet",
	torba: "Torba", ortakent: "Ortakent",
};

const SERVICE_SLUGS = {
	"drone-cekimi": "drone",
	"emlak-tekne-fotograf": "photo",
	"web-tasarim-yazilim": "web",
	"grafik-tasarim": "design",
};

const CRAWLERS = [
	"facebookexternalhit", "twitterbot", "linkedinbot", "whatsapp",
	"slackbot", "telegrambot", "discordbot", "googlebot", "bingbot",
	"applebot", "pinterest", "semrushbot", "ahrefsbot",
];

function isCrawler(ua) {
	const lower = (ua || "").toLowerCase();
	return CRAWLERS.some(c => lower.includes(c));
}

function getPageMeta(pathname) {
	if (PAGES[pathname]) return PAGES[pathname];

	// Lokasyon sayfaları: /hizmetler/{service}-{location}
	const m = pathname.match(/^\/hizmetler\/([a-z-]+)-([a-z]+)$/);
	if (m) {
		const [, servicePart, locationSlug] = m;
		const serviceType = SERVICE_SLUGS[servicePart];
		const locName = LOC_NAMES[locationSlug];
		if (serviceType && locName) {
			return {
				title: `${LOCATION_TITLES[serviceType](locName)} | Cihan Duran`,
				desc:  LOCATION_DESCS[serviceType](locName),
			};
		}
	}

	return {
		title: "Cihan Duran | Bodrum Web Tasarım, Yazılım & Drone Çekimi",
		desc:  "Bodrum ve Muğla'da web tasarım, yazılım, drone çekimi ve fotoğrafçılık hizmetleri.",
	};
}

function buildHtml(url, meta) {
	const canonical = `${BASE}${new URL(url).pathname}`;
	return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8"/>
<title>${meta.title}</title>
<meta name="description" content="${meta.desc}"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="${canonical}"/>
<meta property="og:title" content="${meta.title}"/>
<meta property="og:description" content="${meta.desc}"/>
<meta property="og:image" content="${IMG}"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:locale" content="tr_TR"/>
<meta property="og:site_name" content="Cihan Duran"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${meta.title}"/>
<meta name="twitter:description" content="${meta.desc}"/>
<meta name="twitter:image" content="${IMG}"/>
<link rel="canonical" href="${canonical}"/>
<meta http-equiv="refresh" content="0;url=${canonical}"/>
</head>
<body><p><a href="${canonical}">${meta.title}</a></p></body>
</html>`;
}

export default async function middleware(req) {
	const ua = req.headers.get("user-agent") || "";
	if (!isCrawler(ua)) return; // normal kullanıcılar → SPA'ya devam

	const url = req.url;
	const pathname = new URL(url).pathname;
	const meta = getPageMeta(pathname);

	return new Response(buildHtml(url, meta), {
		status: 200,
		headers: { "Content-Type": "text/html; charset=utf-8" },
	});
}
