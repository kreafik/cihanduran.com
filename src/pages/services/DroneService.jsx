import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ServiceLayout from "./ServiceLayout";
import CrossLinks from "./CrossLinks";

const Hero = styled.section`
	position: relative;
	overflow: hidden;
	background: linear-gradient(160deg, #0d1117 0%, #0f1a2e 60%, #0d1117 100%);
	border-bottom: 1px solid rgba(255,255,255,0.08);
	padding: 6rem 2rem 4rem;
	text-align: center;

	&::before {
		content: "";
		position: absolute;
		inset: 0;
		background-image: radial-gradient(circle, rgba(255,255,255,0.022) 1px, transparent 1px);
		background-size: 4px 4px;
		pointer-events: none;
	}

	&::after {
		content: "";
		position: absolute;
		bottom: 0;
		left: 15%;
		right: 15%;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(88,166,255,0.35), transparent);
		pointer-events: none;
	}
`;

const Eyebrow = styled.p`
	font-size: 0.78rem;
	font-weight: 600;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	color: #58a6ff;
	margin-bottom: 1rem;
`;

const H1 = styled.h1`
	font-size: clamp(2rem, 5vw, 3.25rem);
	font-weight: 800;
	letter-spacing: -0.03em;
	line-height: 1.15;
	color: #e6edf3;
	margin-bottom: 1.25rem;
`;

const HeroDesc = styled.p`
	font-size: 1.125rem;
	color: rgba(230, 237, 243, 0.6);
	max-width: 600px;
	margin: 0 auto 2.5rem;
	line-height: 1.7;
`;

const HeroBadges = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	justify-content: center;
`;

const Badge = styled.span`
	background: rgba(88, 166, 255, 0.12);
	border: 1px solid rgba(88, 166, 255, 0.25);
	color: #79c0ff;
	font-size: 0.8rem;
	font-weight: 600;
	padding: 0.3rem 0.85rem;
	border-radius: 2rem;
`;

const Content = styled.div`
	max-width: 860px;
	margin: 0 auto;
	padding: 4rem 2rem;
`;

const Section = styled.section`
	margin-bottom: 3.5rem;
`;

const H2 = styled.h2`
	font-size: 1.4rem;
	font-weight: 700;
	color: #e6edf3;
	letter-spacing: -0.02em;
	margin-bottom: 1rem;

	&::before {
		content: "";
		display: block;
		width: 1.75rem;
		height: 2px;
		background: rgba(88, 166, 255, 0.45);
		border-radius: 1px;
		margin-bottom: 0.6rem;
	}
`;

const P = styled.p`
	color: rgba(230, 237, 243, 0.7);
	line-height: 1.8;
	font-size: 1rem;
	margin-bottom: 1rem;
`;

const ServiceGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
	gap: 1rem;
	margin-top: 1.5rem;
`;

const ServiceCard = styled.div`
	position: relative;
	overflow: hidden;
	background: #000;
	border: 1px solid rgba(255,255,255,0.08);
	border-radius: 0.75rem;
	padding: 1.5rem;
	transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;

	&::before {
		content: "";
		position: absolute;
		inset: 0;
		background-image: radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px);
		background-size: 4px 4px;
		opacity: 0;
		transition: opacity 0.3s;
		pointer-events: none;
	}

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 2px 12px rgba(255,255,255,0.04);
		border-color: rgba(255,255,255,0.14);
	}

	&:hover::before { opacity: 1; }
`;

const ServiceCardIcon = styled.div`
	font-size: 1.75rem;
	margin-bottom: 0.75rem;
`;

const ServiceCardTitle = styled.h3`
	font-size: 1rem;
	font-weight: 700;
	color: #e6edf3;
	margin-bottom: 0.5rem;
`;

const ServiceCardDesc = styled.p`
	font-size: 0.875rem;
	color: rgba(230, 237, 243, 0.5);
	line-height: 1.6;
`;

const FAQ = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	margin-top: 1.5rem;
`;

const FAQItem = styled.div`
	position: relative;
	overflow: hidden;
	background: #000;
	border: 1px solid rgba(255,255,255,0.08);
	border-radius: 0.75rem;
	padding: 1.25rem 1.5rem;
	transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;

	&::before {
		content: "";
		position: absolute;
		inset: 0;
		background-image: radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px);
		background-size: 4px 4px;
		opacity: 0;
		transition: opacity 0.3s;
		pointer-events: none;
	}

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 2px 12px rgba(255,255,255,0.04);
		border-color: rgba(255,255,255,0.14);
	}

	&:hover::before { opacity: 1; }
`;

const FAQQuestion = styled.h3`
	font-size: 0.975rem;
	font-weight: 700;
	color: #e6edf3;
	margin-bottom: 0.5rem;
`;

const FAQAnswer = styled.p`
	font-size: 0.9rem;
	color: rgba(230, 237, 243, 0.55);
	line-height: 1.65;
`;

const DistrictGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
	gap: 0.75rem;
	margin-top: 1.25rem;
`;

const DistrictCard = styled(Link)`
	position: relative;
	overflow: hidden;
	background: #000;
	border: 1px solid rgba(255,255,255,0.08);
	border-radius: 0.75rem;
	padding: 1rem 1.25rem;
	display: flex;
	align-items: center;
	gap: 0.6rem;
	text-decoration: none;
	transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;

	&::before {
		content: "";
		position: absolute;
		inset: 0;
		background-image: radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px);
		background-size: 4px 4px;
		opacity: 0;
		transition: opacity 0.3s;
		pointer-events: none;
	}

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 2px 12px rgba(255,255,255,0.04);
		border-color: rgba(255,255,255,0.14);
	}

	&:hover::before { opacity: 1; }
`;

const DistrictTitle = styled.div`
	font-size: 0.85rem;
	font-weight: 700;
	color: #e6edf3;
`;

const DistrictSub = styled.div`
	font-size: 0.75rem;
	color: rgba(230, 237, 243, 0.4);
	margin-top: 0.1rem;
`;

const CTA = styled.section`
	position: relative;
	overflow: hidden;
	background: #000;
	border-top: 1px solid rgba(255,255,255,0.08);
	padding: 5rem 2rem;
	text-align: center;

	&::before {
		content: "";
		position: absolute;
		inset: 0;
		background-image: radial-gradient(circle, rgba(255,255,255,0.018) 1px, transparent 1px);
		background-size: 4px 4px;
		pointer-events: none;
	}

	&::after {
		content: "";
		position: absolute;
		top: 0;
		left: 15%;
		right: 15%;
		height: 1px;
		background: linear-gradient(90deg, transparent, rgba(88,166,255,0.35), transparent);
		pointer-events: none;
	}
`;

const CTATitle = styled.h2`
	font-size: clamp(1.5rem, 3vw, 2.25rem);
	font-weight: 700;
	color: #e6edf3;
	margin-bottom: 1rem;
	letter-spacing: -0.02em;
`;

const CTADesc = styled.p`
	color: rgba(230, 237, 243, 0.55);
	font-size: 1rem;
	margin-bottom: 2rem;
`;

const BtnPrimary = styled.a`
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	background: #25d366;
	color: #fff;
	font-weight: 700;
	font-size: 0.95rem;
	padding: 0.75rem 1.75rem;
	border-radius: 2rem;
	transition: background 0.2s, transform 0.2s;
	text-decoration: none;
	margin: 0 0.5rem;
	&:hover { background: #20ba5a; transform: scale(1.03); }
`;

const BtnSecondary = styled.a`
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	background: transparent;
	color: #e6edf3;
	font-weight: 600;
	font-size: 0.95rem;
	padding: 0.75rem 1.75rem;
	border-radius: 2rem;
	border: 1px solid rgba(255,255,255,0.2);
	text-decoration: none;
	margin: 0 0.5rem;
	transition: border-color 0.2s;
	&:hover { border-color: rgba(255,255,255,0.5); }
`;

const DroneService = () => {
	return (
		<ServiceLayout
			title="Drone Çekimi Bodrum — Hava Fotoğraf & Video"
			description="Bodrum ve Muğla'da profesyonel drone çekimi. Emlak, villa, tekne, yat, otel ve etkinlik için DJI ile hava fotoğrafı ve 4K video hizmetleri. Cihan Duran."
			canonical="/hizmetler/drone-cekimi-bodrum"
		>
			<Hero>
				<Eyebrow>Bodrum · Muğla · Drone Çekimi</Eyebrow>
				<H1>Bodrum Drone Çekimi</H1>
				<HeroDesc>
					Muğla ve Bodrum'da profesyonel hava fotoğrafı ve 4K video çekimi.
					Emlaktan tekneye, otelden etkinliğe — markanızı yukarıdan görün.
				</HeroDesc>
				<HeroBadges>
					{["Emlak", "Villa", "Tekne & Yat", "Otel", "Etkinlik", "DJI 4K", "Bodrum", "Muğla"].map(b => (
						<Badge key={b}>{b}</Badge>
					))}
				</HeroBadges>
			</Hero>

			<Content>
				<Section>
					<H2>Bodrum'da Drone Çekimi Neden Önemli?</H2>
					<P>
						Bodrum ve Muğla'nın eşsiz coğrafyası — turkuaz körfezler, zeytinlikler,
						lüks villalar ve yatlar — yalnızca havadan tam anlamıyla görülebilir.
						Profesyonel drone çekimi, özellikle emlak ve tekne sektöründe satış
						sürecini dramatik biçimde hızlandırır; potansiyel alıcıların konumu
						bütünüyle kavramasını sağlar.
					</P>
					<P>
						DJI serisi profesyonel ekipmanlarla gerçekleştirilen 4K çekimler;
						gün batımı ışığı, alacakaranlık ve mavi saat gibi altın anlarda
						planlanarak en etkileyici görüntüler elde edilir.
					</P>
				</Section>

				<Section>
					<H2>Drone Çekimi Hizmet Alanları</H2>
					<ServiceGrid>
						<ServiceCard>
							<ServiceCardIcon>🏡</ServiceCardIcon>
							<ServiceCardTitle>Emlak & Villa Drone Çekimi</ServiceCardTitle>
							<ServiceCardDesc>
								Bodrum'daki villa, daire ve arazilerinizin havadan fotoğraf
								ve video çekimi. Satış ilanlarınızı rakiplerinizden ayrıştırın.
							</ServiceCardDesc>
						</ServiceCard>
						<ServiceCard>
							<ServiceCardIcon>⛵</ServiceCardIcon>
							<ServiceCardTitle>Tekne & Yat Drone Çekimi</ServiceCardTitle>
							<ServiceCardDesc>
								Bodrum marinasında, açık denizde veya körfezde tekne ve yat
								tanıtım çekimleri. Satış ve kiralama ilanları için ideal.
							</ServiceCardDesc>
						</ServiceCard>
						<ServiceCard>
							<ServiceCardIcon>🏨</ServiceCardIcon>
							<ServiceCardTitle>Otel & Tesis Tanıtım Çekimi</ServiceCardTitle>
							<ServiceCardDesc>
								Oteller, butik pansiyonlar, plajlar ve tesisler için
								havadan tanıtım videoları ve fotoğraf paketleri.
							</ServiceCardDesc>
						</ServiceCard>
						<ServiceCard>
							<ServiceCardIcon>🎉</ServiceCardIcon>
							<ServiceCardTitle>Etkinlik & Düğün Drone Çekimi</ServiceCardTitle>
							<ServiceCardDesc>
								Bodrum'daki açık hava etkinlikleri, düğünler ve organizasyonlar
								için sinematik hava çekimleri.
							</ServiceCardDesc>
						</ServiceCard>
					</ServiceGrid>
				</Section>

				<Section>
					<H2>Çekim Süreci</H2>
					<P>
						<strong style={{ color: "#e6edf3" }}>1. Keşif ve Planlama:</strong> Lokasyon
						analizi, ışık durumu ve uçuş planı ön görüşmede belirlenir. Bodrum'daki
						hava sahası kısıtlamaları ve gerekli izinler proaktif olarak takip edilir.
					</P>
					<P>
						<strong style={{ color: "#e6edf3" }}>2. Çekim Günü:</strong> Altın saat
						(gün doğumu / gün batımı) veya talep edilen saatte DJI ekipmanlarıyla
						çekim gerçekleştirilir. Ham görüntüler aynı gün aktarılır.
					</P>
					<P>
						<strong style={{ color: "#e6edf3" }}>3. Post-Prodüksiyon:</strong> Renk
						düzeltme, müzik yerleşimi ve kurgu tamamlandıktan sonra teslim formatı
						(MP4, RAW, vb.) tercihlerinize göre hazırlanır.
					</P>
					<P>
						<strong style={{ color: "#e6edf3" }}>4. Teslim:</strong> Genellikle 2–5
						iş günü içinde dijital olarak teslim edilir.
					</P>
				</Section>

				<Section>
					<H2>Sıkça Sorulan Sorular</H2>
					<FAQ>
						<FAQItem>
							<FAQQuestion>Bodrum'da drone çekimi için izin gerekli mi?</FAQQuestion>
							<FAQAnswer>
								Bodrum'da bazı bölgeler (Milas Havalimanı çevresi, askeri alanlar)
								uçuşa kısıtlıdır. Diğer alanlarda ticari çekimler için SHGM'den
								izin alınması gerekmektedir. Bu süreç bizim tarafımızdan yönetilir.
							</FAQAnswer>
						</FAQItem>
						<FAQItem>
							<FAQQuestion>Hava koşulları çekimi etkiliyor mu?</FAQQuestion>
							<FAQAnswer>
								Rüzgar hızı ve yağışlı hava çekim kalitesini doğrudan etkiler.
								Kötü hava koşullarında çekim ertelenir ve yeni bir tarih belirlenir.
								Bodrum'un iklimi sayesinde çoğu gün çekim yapılabilmektedir.
							</FAQAnswer>
						</FAQItem>
						<FAQItem>
							<FAQQuestion>Teslim formatları nelerdir?</FAQQuestion>
							<FAQAnswer>
								Fotoğraflar JPEG ve RAW, videolar MP4 (H.264/H.265) olarak teslim
								edilir. Sosyal medya formatları (Reels, YouTube) için ayrıca
								optimize edilmiş versiyonlar hazırlanabilir.
							</FAQAnswer>
						</FAQItem>
						<FAQItem>
							<FAQQuestion>Bodrum dışında da çekim yapıyor musunuz?</FAQQuestion>
							<FAQAnswer>
								Evet. Muğla iline bağlı Marmaris, Fethiye, Datça ve çevre ilçelerde
								de hizmet vermekteyiz. Bodrum dışı çekimler için ulaşım ücreti ayrıca hesaplanır.
							</FAQAnswer>
						</FAQItem>
					</FAQ>
				</Section>

				<CrossLinks currentService="drone" />
			</Content>

			<CTA>
				<CTATitle>Drone Çekimi için Teklif Alın</CTATitle>
				<CTADesc>
					Bodrum'da drone çekimi için hemen iletişime geçin, 24 saat içinde dönüş sağlıyoruz.
				</CTADesc>
				<BtnPrimary href="https://wa.me/905415755520?text=Merhaba%20Cihan%2C%20drone%20%C3%A7ekimi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noreferrer">
					WhatsApp ile Yaz
				</BtnPrimary>
				<BtnSecondary href="tel:+905415755520">
					+90 541 575 55 20
				</BtnSecondary>
			</CTA>
		</ServiceLayout>
	);
};

export default DroneService;
