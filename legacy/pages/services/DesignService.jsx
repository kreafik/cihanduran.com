import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ServiceLayout from "./ServiceLayout";
import CrossLinks from "./CrossLinks";

const Hero = styled.section`
	position: relative;
	overflow: hidden;
	background: linear-gradient(160deg, #0d1117 0%, #1a0d2e 60%, #0d1117 100%);
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
		background: linear-gradient(90deg, transparent, rgba(163,113,247,0.4), transparent);
		pointer-events: none;
	}
`;

const Eyebrow = styled.p`
	font-size: 0.78rem;
	font-weight: 600;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	color: #a371f7;
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
	background: rgba(163, 113, 247, 0.12);
	border: 1px solid rgba(163, 113, 247, 0.25);
	color: #a371f7;
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
		background: rgba(163, 113, 247, 0.5);
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
		color: #a371f7;
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
		background: linear-gradient(90deg, transparent, rgba(163,113,247,0.4), transparent);
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

const DesignService = () => {
	return (
		<ServiceLayout
			title="Bodrum Grafik Tasarım — Logo, Kurumsal Kimlik & Dijital Tasarım"
			description="Bodrum'da profesyonel grafik tasarım hizmetleri. Logo tasarımı, kurumsal kimlik, sosyal medya tasarımı ve baskı materyalleri. Cihan Duran."
			canonical="/hizmetler/grafik-tasarim-bodrum"
		>
			<Hero>
				<Eyebrow>Bodrum · Muğla · Grafik Tasarım</Eyebrow>
				<H1>Bodrum Grafik Tasarım Hizmetleri</H1>
				<HeroDesc>
					Markanızın görsel kimliğini oluşturun. Logo, kurumsal kimlik,
					sosyal medya ve baskı tasarımlarında Bodrum'un estetik anlayışını
					yansıtan profesyonel çözümler.
				</HeroDesc>
				<HeroBadges>
					{["Logo", "Kurumsal Kimlik", "Sosyal Medya", "Baskı", "Figma", "Ambalaj", "Bodrum"].map(b => (
						<Badge key={b}>{b}</Badge>
					))}
				</HeroBadges>
			</Hero>

			<Content>
				<Section>
					<H2>Bodrum'da Marka Kimliği Neden Önemli?</H2>
					<P>
						Bodrum'da faaliyet gösteren her işletme — pansiyon, restoran, tekne
						kiralama şirketi veya butik mağaza — rakip dolu bir pazarda var olmak
						zorundadır. Güçlü bir görsel kimlik, potansiyel müşterin aklında
						kalmayı ve güven oluşturmayı sağlar.
					</P>
					<P>
						Bodrum'un lüks ve estetik odaklı müşteri profili göz önüne alındığında,
						tasarım kalitesi direkt olarak işletmenizin algısını şekillendirir.
						Doğru renk paleti, tipografi ve logo ile rakiplerinizden kolayca
						ayrışabilirsiniz.
					</P>
				</Section>

				<Section>
					<H2>Grafik Tasarım Hizmetleri</H2>
					<ServiceGrid>
						<ServiceCard>
							<ServiceCardIcon>✏️</ServiceCardIcon>
							<ServiceCardTitle>Logo Tasarımı</ServiceCardTitle>
							<ServiceCardDesc>
								Markanızı tek bakışta anlatan, farklı boyutlarda kullanılabilir,
								vektörel logo tasarımı. 3 konsept + revizyonlar.
							</ServiceCardDesc>
						</ServiceCard>
						<ServiceCard>
							<ServiceCardIcon>📁</ServiceCardIcon>
							<ServiceCardTitle>Kurumsal Kimlik</ServiceCardTitle>
							<ServiceCardDesc>
								Kartvizit, antet, klasör, imza şablonu — tüm dokunuş
								noktalarında tutarlı marka görünümü.
							</ServiceCardDesc>
						</ServiceCard>
						<ServiceCard>
							<ServiceCardIcon>📱</ServiceCardIcon>
							<ServiceCardTitle>Sosyal Medya Tasarımı</ServiceCardTitle>
							<ServiceCardDesc>
								Instagram, Facebook ve LinkedIn için post, story, highlight
								kapağı ve profil görselleri.
							</ServiceCardDesc>
						</ServiceCard>
						<ServiceCard>
							<ServiceCardIcon>🖨️</ServiceCardIcon>
							<ServiceCardTitle>Baskı & Tanıtım</ServiceCardTitle>
							<ServiceCardDesc>
								Broşür, katalog, afiş, tabela ve ambalaj tasarımları.
								Baskıya hazır dosya formatlarında teslim.
							</ServiceCardDesc>
						</ServiceCard>
					</ServiceGrid>
				</Section>

				<Section>
					<H2>Tasarım Sürecim</H2>
					<P>
						<strong style={{ color: "#e6edf3" }}>Brifing:</strong> İşletmenizi,
						hedef kitlenizi, rakiplerinizi ve beğendiğiniz tasarım örneklerini
						konuşarak başlıyoruz.
					</P>
					<P>
						<strong style={{ color: "#e6edf3" }}>Konsept Geliştirme:</strong> Moodboard
						ve renk paleti çalışmasının ardından 2–3 farklı logo konsepti sunulur.
					</P>
					<P>
						<strong style={{ color: "#e6edf3" }}>Revizyon:</strong> Seçtiğiniz
						konsept üzerinde onaya kadar revizyonlar yapılır.
					</P>
					<P>
						<strong style={{ color: "#e6edf3" }}>Teslim:</strong> AI, EPS, PDF,
						PNG, SVG formatlarında tüm kaynak dosyalar size aittir.
					</P>
				</Section>

				<Section>
					<H2>Paketlerimize Dahil</H2>
					<BenefitList>
						<BenefitItem>Tüm kaynak dosyalar (Figma, AI, EPS, PDF, PNG, SVG)</BenefitItem>
						<BenefitItem>Beyaz ve koyu arka plan versiyonları</BenefitItem>
						<BenefitItem>Yatay ve dikey logo varyantları</BenefitItem>
						<BenefitItem>Renk kodu kılavuzu (HEX, RGB, CMYK, Pantone)</BenefitItem>
						<BenefitItem>Tipografi önerileri ve kullanım kılavuzu</BenefitItem>
						<BenefitItem>Sosyal medya profil görseli optimizasyonu</BenefitItem>
					</BenefitList>
				</Section>
				<CrossLinks currentService="design" />
			</Content>

			<CTA>
				<CTATitle>Markanızı Birlikte Tasarlayalım</CTATitle>
				<CTADesc>
					Bodrum'da grafik tasarım için hemen teklif alın.
				</CTADesc>
				<BtnPrimary href="https://wa.me/905415755520?text=Merhaba%20Cihan%2C%20grafik%20tasar%C4%B1m%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noreferrer">
					WhatsApp ile Yaz
				</BtnPrimary>
				<BtnSecondary href="tel:+905415755520">
					+90 541 575 55 20
				</BtnSecondary>
			</CTA>
		</ServiceLayout>
	);
};

export default DesignService;
