import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ServiceLayout from "./ServiceLayout";
import CrossLinks from "./CrossLinks";

const Hero = styled.section`
	position: relative;
	overflow: hidden;
	background: linear-gradient(160deg, #0d1117 0%, #1a1200 60%, #0d1117 100%);
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
		background: linear-gradient(90deg, transparent, rgba(210,153,34,0.4), transparent);
		pointer-events: none;
	}
`;

const Eyebrow = styled.p`
	font-size: 0.78rem;
	font-weight: 600;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	color: #d29922;
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
	background: rgba(210, 153, 34, 0.12);
	border: 1px solid rgba(210, 153, 34, 0.25);
	color: #d29922;
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
		background: rgba(210, 153, 34, 0.5);
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

const BenefitList = styled.ul`
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: 0.6rem;
	margin-top: 1rem;
`;

const BenefitItem = styled.li`
	display: flex;
	align-items: flex-start;
	gap: 0.65rem;
	color: rgba(230, 237, 243, 0.7);
	font-size: 0.95rem;
	line-height: 1.6;
	&::before {
		content: "✓";
		color: #d29922;
		font-weight: 700;
		flex-shrink: 0;
		margin-top: 0.05rem;
	}
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
		background: linear-gradient(90deg, transparent, rgba(210,153,34,0.4), transparent);
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

const PhotoService = () => {
	return (
		<ServiceLayout
			title="Bodrum Emlak ve Tekne Fotoğraf Çekimi"
			description="Bodrum'da profesyonel emlak fotoğrafçılığı. Villa, daire, arazi ve tekne fotoğraf & video çekimi. Satışlarınızı hızlandıran profesyonel görüntüler. Cihan Duran."
			canonical="/hizmetler/emlak-tekne-fotograf-bodrum"
		>
			<Hero>
				<Eyebrow>Bodrum · Muğla · Fotoğraf & Video</Eyebrow>
				<H1>Bodrum Emlak & Tekne Fotoğrafçılığı</H1>
				<HeroDesc>
					Villa, daire, arazi veya teknenizi en iyi açıdan, doğru ışıkta
					görüntüleyin. Profesyonel fotoğraflar satış sürenizi kısaltır,
					değerinizi artırır.
				</HeroDesc>
				<HeroBadges>
					{["Villa", "Daire", "Tekne", "Yat", "Otel", "Airbnb", "Sahibinden", "Bodrum"].map(b => (
						<Badge key={b}>{b}</Badge>
					))}
				</HeroBadges>
			</Hero>

			<Content>
				<Section>
					<H2>Profesyonel Fotoğrafın Satışa Etkisi</H2>
					<P>
						Bodrum emlak piyasasında yüzlerce ilan arasından sıyrılmak için
						fotoğraf kalitesi belirleyici faktördür. Araştırmalar, profesyonel
						fotoğraflı ilanların ortalama <strong style={{ color: "#e6edf3" }}>%32 daha hızlı</strong> satıldığını
						ve <strong style={{ color: "#e6edf3" }}>%5–15 daha yüksek fiyat</strong> aldığını göstermektedir.
					</P>
					<P>
						Tekne ve yat pazarında ise alıcıların büyük çoğunluğu satın alma
						kararını fotoğraf ve videoya bakarak verir. Denizde çekilmiş,
						güneş ışığının suya yansıdığı anlardaki görüntüler teknenizi
						satış platformlarında öne çıkarır.
					</P>
				</Section>

				<Section>
					<H2>Fotoğraf Çekim Hizmetleri</H2>
					<ServiceGrid>
						<ServiceCard>
							<ServiceCardIcon>🏡</ServiceCardIcon>
							<ServiceCardTitle>Villa & Müstakil Ev</ServiceCardTitle>
							<ServiceCardDesc>
								İç mekan ve dış cephe çekimleri, havuz, bahçe ve
								panoramik görüntüler. Sahibinden ve Emlakjet ilanları için optimize edilmiş.
							</ServiceCardDesc>
						</ServiceCard>
						<ServiceCard>
							<ServiceCardIcon>🏢</ServiceCardIcon>
							<ServiceCardTitle>Daire & Residence</ServiceCardTitle>
							<ServiceCardDesc>
								Dar alanlarda bile geniş açılı çekim teknikleriyle
								ferah ve cazip mekan görselleri.
							</ServiceCardDesc>
						</ServiceCard>
						<ServiceCard>
							<ServiceCardIcon>⛵</ServiceCardIcon>
							<ServiceCardTitle>Tekne & Gulet</ServiceCardTitle>
							<ServiceCardDesc>
								Marina'da ve açık denizde tekne, gulet, yat ve
								sürat teknesi fotoğraf & video çekimi.
							</ServiceCardDesc>
						</ServiceCard>
						<ServiceCard>
							<ServiceCardIcon>🏠</ServiceCardIcon>
							<ServiceCardTitle>Airbnb & Kiralık</ServiceCardTitle>
							<ServiceCardDesc>
								Kısa dönem kiralık mülkler için Airbnb ve Booking
								platformlarına özel çekim paketleri.
							</ServiceCardDesc>
						</ServiceCard>
					</ServiceGrid>
				</Section>

				<Section>
					<H2>Neden Cihan Duran ile Çalışmalısınız?</H2>
					<BenefitList>
						<BenefitItem>Bodrum'un ışık koşullarını ve en iyi çekim saatlerini bilirim</BenefitItem>
						<BenefitItem>Drone + yer çekimi paketi: tek bir randevuda tüm açılar</BenefitItem>
						<BenefitItem>Renk düzeltme ve retüş dahil; kullanıma hazır görseller</BenefitItem>
						<BenefitItem>Sahibinden, Emlakjet, Airbnb ve sosyal medya formatlarında teslim</BenefitItem>
						<BenefitItem>Hızlı teslimat — genellikle 48 saat içinde</BenefitItem>
						<BenefitItem>Drone çekimi ile birleştirilebilir, komple paket avantajı</BenefitItem>
					</BenefitList>
				</Section>

				<Section>
					<H2>Video & Sanal Tur Seçenekleri</H2>
					<P>
						Fotoğrafın ötesinde, mülkünüzü veya teknenizi <strong style={{ color: "#e6edf3" }}>60 saniyelik tanıtım
						videosu</strong> ya da <strong style={{ color: "#e6edf3" }}>Instagram Reels</strong> formatında sunmak
						satış potansiyelini katlar. Alıcılar mekanı daha gerçekçi
						değerlendirebilir ve görüntüleme talepleri kaliteli adaylara odaklanır.
					</P>
					<P>
						Muğla ve Bodrum'daki otel, pansiyon ve tatil köyleri için
						tanıtım videoları da aynı ekip tarafından gerçekleştirilmektedir.
					</P>
				</Section>
				<CrossLinks currentService="photo" />
			</Content>

			<CTA>
				<CTATitle>Çekim Tarihi Belirleyelim</CTATitle>
				<CTADesc>
					Bodrum'da emlak veya tekne fotoğraf çekimi için hemen ulaşın.
				</CTADesc>
				<BtnPrimary href="https://wa.me/905415755520?text=Merhaba%20Cihan%2C%20emlak%2Ftekne%20foto%C4%9Fraf%20%C3%A7ekimi%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noreferrer">
					WhatsApp ile Yaz
				</BtnPrimary>
				<BtnSecondary href="tel:+905415755520">
					+90 541 575 55 20
				</BtnSecondary>
			</CTA>
		</ServiceLayout>
	);
};

export default PhotoService;
