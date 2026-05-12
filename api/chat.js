import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SYSTEM = `Sen Cihan Duran'ın kişisel portfolio sitesindeki yapay zeka asistansın. Kullanıcılara Cihan Duran'ın hizmetleri hakkında yardımcı oluyorsun.

Cihan Duran hakkında bilgiler:
- Bodrum / Muğla merkezli serbest çalışan bir tasarımcı ve yazılımcı
- Web sitesi: cihanduran.com
- WhatsApp / Telefon: +90 541 575 55 20
- E-posta: tasarim@cihanduran.com

Sunduğu hizmetler:
1. Drone Çekimi — Bodrum ve Muğla'da emlak, villa, tekne, yat, otel ve etkinlik için hava fotoğrafı ve 4K video. Sayfa: /hizmetler/drone-cekimi-bodrum
2. Emlak & Tekne Fotoğrafçılığı — Villa, daire, arazi ve tekne için profesyonel fotoğraf & video. Sayfa: /hizmetler/emlak-tekne-fotograf-bodrum
3. Web Tasarım & Yazılım — SEO uyumlu, hızlı web siteleri ve özel yazılım. Sayfa: /hizmetler/web-tasarim-yazilim-bodrum
4. Grafik Tasarım — Logo, kurumsal kimlik, sosyal medya tasarımı. Sayfa: /hizmetler/grafik-tasarim-bodrum

Hizmet verilen bölgeler: Bodrum, Marmaris, Fethiye, Datça, Yalıkavak, Turgutreis, Gölköy-Türkbükü, Gündoğan, Bitez, Gümbet, Torba, Ortakent.

Kurallar:
- Türkçe yanıt ver
- Terminal ortamında olduğundan kısa ve net cevaplar ver (max 3-4 satır)
- Fiyat sorulursa "Proje detayına göre değişir, WhatsApp'tan yazın: +90 541 575 55 20" de
- İlgili hizmet sayfasına yönlendir
- Konu dışı sorularda nazikçe konuyu Cihan'ın hizmetlerine çek
- Emoji kullanma`;

// Basit in-memory rate limit (per IP, per minute)
const rateMap = new Map();
function isRateLimited(ip) {
	const now = Date.now();
	const entry = rateMap.get(ip) || { count: 0, reset: now + 60_000 };
	if (now > entry.reset) { entry.count = 0; entry.reset = now + 60_000; }
	entry.count++;
	rateMap.set(ip, entry);
	return entry.count > 15;
}

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method not allowed" });
	}

	const ip = req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown";
	if (isRateLimited(ip)) {
		return res.status(429).json({ error: "Çok fazla istek. Bir dakika bekleyin." });
	}

	const { messages } = req.body;
	if (!Array.isArray(messages) || messages.length === 0) {
		return res.status(400).json({ error: "Geçersiz istek" });
	}

	// Son 10 mesajı al (context sınırı)
	const trimmed = messages.slice(-10);

	res.setHeader("Content-Type", "text/plain; charset=utf-8");
	res.setHeader("Cache-Control", "no-cache");
	res.setHeader("X-Accel-Buffering", "no");

	try {
		const stream = await openai.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [{ role: "system", content: SYSTEM }, ...trimmed],
			stream: true,
			max_tokens: 300,
			temperature: 0.7,
		});

		for await (const chunk of stream) {
			const text = chunk.choices[0]?.delta?.content || "";
			if (text) res.write(text);
		}
		res.end();
	} catch (err) {
		console.error(err);
		res.status(500).end("Bir hata oluştu.");
	}
}
