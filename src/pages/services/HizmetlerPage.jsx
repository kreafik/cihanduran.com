import React from "react";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { Plane, Camera, Globe, Palette } from "lucide-react";
import { BentoGrid } from "@components/ui/bento-grid";
import ServiceLayout from "./ServiceLayout";

const Hero = styled.section`
	position: relative;
	overflow: hidden;
	background: linear-gradient(160deg, #0d1117 0%, #161b22 100%);
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

const HeroEyebrow = styled.p`
	font-size: 0.8rem;
	font-weight: 600;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	color: #58a6ff;
	margin-bottom: 1rem;
`;

const HeroTitle = styled.h1`
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
	max-width: 560px;
	margin: 0 auto 2rem;
	line-height: 1.7;
`;

const Grid = styled.section`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
	gap: 1.5rem;
	max-width: 1100px;
	margin: 0 auto;
	padding: 4rem 2rem;
`;

const Card = styled(Link)`
	background: #161b22;
	border: 1px solid rgba(255,255,255,0.08);
	border-radius: 1rem;
	padding: 2rem;
	display: block;
	transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
	&:hover {
		border-color: rgba(88, 166, 255, 0.4);
		transform: translateY(-3px);
		box-shadow: 0 12px 40px rgba(0,0,0,0.3);
	}
`;

const CardIcon = styled.div`
	font-size: 2.25rem;
	margin-bottom: 1.25rem;
`;

const CardTitle = styled.h2`
	font-size: 1.2rem;
	font-weight: 700;
	color: #e6edf3;
	margin-bottom: 0.75rem;
	letter-spacing: -0.01em;
`;

const CardDesc = styled.p`
	font-size: 0.9rem;
	color: rgba(230, 237, 243, 0.55);
	line-height: 1.65;
	margin-bottom: 1.25rem;
`;

const CardLink = styled.span`
	font-size: 0.85rem;
	font-weight: 600;
	color: #58a6ff;
`;

const Tags = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.4rem;
	margin-top: 1rem;
`;

const Tag = styled.span`
	font-size: 0.72rem;
	padding: 0.2rem 0.6rem;
	border-radius: 2rem;
	background: rgba(88, 166, 255, 0.1);
	border: 1px solid rgba(88, 166, 255, 0.2);
	color: rgba(88, 166, 255, 0.8);
`;

const LocationsSection = styled.section`
	max-width: 1100px;
	margin: 0 auto;
	padding: 0 2rem 4rem;
`;

const SectionEyebrow = styled.p`
	font-size: 0.75rem;
	font-weight: 600;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	color: rgba(88, 166, 255, 0.75);
	margin-bottom: 0.5rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;

	&::before {
		content: "";
		display: inline-block;
		width: 1.5rem;
		height: 1px;
		background: rgba(88, 166, 255, 0.4);
	}
`;

const SectionTitle = styled.h2`
	font-size: 1.5rem;
	font-weight: 700;
	color: #e6edf3;
	letter-spacing: -0.02em;
	margin-bottom: 0.4rem;
`;

const SectionDesc = styled.p`
	font-size: 0.875rem;
	color: rgba(230, 237, 243, 0.4);
	margin-bottom: 1.5rem;
`;

const LocationGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 0.75rem;

	@media (max-width: 900px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 500px) {
		grid-template-columns: 1fr;
	}
`;

const LocDotBg = styled.div`
	position: absolute;
	inset: 0;
	background-image: radial-gradient(circle, rgba(255,255,255,0.025) 1px, transparent 1px);
	background-size: 4px 4px;
	opacity: 0;
	transition: opacity 0.3s;
	pointer-events: none;
`;

const LocGradBorder = styled.div`
	position: absolute;
	inset: 0;
	z-index: -1;
	border-radius: 0.75rem;
	padding: 1px;
	background: linear-gradient(135deg, transparent, rgba(255,255,255,0.08), transparent);
	opacity: 0;
	transition: opacity 0.3s;
	pointer-events: none;
`;

const LocationCard = styled.div`
	position: relative;
	background: #000;
	border: 1px solid rgba(255,255,255,0.08);
	border-radius: 0.75rem;
	padding: 1rem;
	overflow: hidden;
	transition: transform 0.3s, box-shadow 0.3s;

	&:hover {
		transform: translateY(-2px);
		box-shadow: 0 2px 12px rgba(255,255,255,0.04);
	}

	&:hover ${LocDotBg} { opacity: 1; }
	&:hover ${LocGradBorder} { opacity: 1; }
`;

const LocTop = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 0.75rem;
`;

const LocIconBox = styled.div`
	width: 2rem;
	height: 2rem;
	border-radius: 0.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	background: rgba(255,255,255,0.08);
	font-size: 1rem;
	transition: background 0.3s;

	${LocationCard}:hover & {
		background: linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06));
	}
`;

const LocStatus = styled.span`
	font-size: 0.72rem;
	font-weight: 600;
	padding: 0.2rem 0.6rem;
	border-radius: 0.5rem;
	background: rgba(255,255,255,0.08);
	color: rgba(230,237,243,0.7);
	backdrop-filter: blur(4px);
	transition: background 0.3s;

	${LocationCard}:hover & {
		background: rgba(255,255,255,0.14);
	}
`;

const LocationName = styled.div`
	font-size: 0.9375rem;
	font-weight: 600;
	color: #e6edf3;
	letter-spacing: -0.01em;
	margin-bottom: 0.15rem;
`;

const LocationRegion = styled.div`
	font-size: 0.75rem;
	color: rgba(230, 237, 243, 0.4);
	margin-bottom: 0.75rem;
`;

const ServiceLinks = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.25rem;
`;

const ServiceLink = styled(Link)`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-size: 0.8rem;
	color: rgba(230, 237, 243, 0.5);
	padding: 0.35rem 0.5rem;
	border-radius: 0.375rem;
	transition: background 0.15s, color 0.15s;
	&:hover {
		background: rgba(255,255,255,0.07);
		color: #e6edf3;
	}
`;

const ServiceLinkIcon = styled.span`
	font-size: 0.85rem;
	flex-shrink: 0;
`;

const Arrow = styled.span`
	margin-left: auto;
	color: rgba(230, 237, 243, 0.18);
	font-size: 0.7rem;
	transition: color 0.15s;

	${ServiceLink}:hover & {
		color: rgba(230, 237, 243, 0.5);
	}
`;

const DistrictHeader = styled.div`
	margin-bottom: 0.75rem;
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

const CTAButtons = styled.div`
	display: flex;
	gap: 1rem;
	justify-content: center;
	flex-wrap: wrap;
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
	transition: border-color 0.2s;
	&:hover { border-color: rgba(255,255,255,0.5); }
`;

const bentoItems = [
	{
		title: "Drone Çekimi",
		meta: "Bodrum · Marmaris · Fethiye",
		description: "DJI ekipmanlarıyla 4K hava fotoğrafı ve video. Emlak, tekne, otel ve etkinlik çekimleri.",
		icon: <Plane className="w-4 h-4 text-blue-400" />,
		status: "Aktif",
		tags: ["Emlak", "Tekne & Yat", "Etkinlik"],
		cta: "Hizmeti Gör →",
		colSpan: 2,
		hasPersistentHover: true,
		href: "/hizmetler/drone-cekimi-bodrum",
	},
	{
		title: "Grafik Tasarım",
		meta: "Logo · Kimlik · Baskı",
		description: "Marka kimliği, logo ve sosyal medya tasarımı. Bodrum pazarına özel estetik anlayış.",
		icon: <Palette className="w-4 h-4 text-purple-400" />,
		status: "Aktif",
		tags: ["Logo", "Sosyal Medya"],
		href: "/hizmetler/grafik-tasarim-bodrum",
	},
	{
		title: "Emlak & Tekne Fotoğraf",
		meta: "Villa · Daire · Yat",
		description: "Satışı hızlandıran profesyonel fotoğraf ve video. Sahibinden ve Airbnb ilanlarına özel paketler.",
		icon: <Camera className="w-4 h-4 text-yellow-400" />,
		status: "Aktif",
		tags: ["Villa", "Tekne", "Airbnb"],
		href: "/hizmetler/emlak-tekne-fotograf-bodrum",
	},
	{
		title: "Web Tasarım & Yazılım",
		meta: "React · SEO · E-Ticaret",
		description: "Hızlı, SEO uyumlu ve mobil dostu web siteleri. Bodrum işletmeleri için lokal arama optimizasyonu dahil.",
		icon: <Globe className="w-4 h-4 text-green-400" />,
		status: "Aktif",
		tags: ["Web Sitesi", "SEO", "E-Ticaret"],
		cta: "Hizmeti Gör →",
		colSpan: 2,
		href: "/hizmetler/web-tasarim-yazilim-bodrum",
	},
];

const mainLocations = [
	{ name: "Bodrum", region: "Muğla", slug: "bodrum" },
	{ name: "Marmaris", region: "Muğla", slug: "marmaris" },
	{ name: "Fethiye", region: "Muğla", slug: "fethiye" },
	{ name: "Datça", region: "Muğla", slug: "datca" },
];

const bodrumDistricts = [
	{ name: "Yalıkavak", region: "Bodrum", slug: "yalikavak" },
	{ name: "Turgutreis", region: "Bodrum", slug: "turgutreis" },
	{ name: "Gölköy-Türkbükü", region: "Bodrum", slug: "golturkbuku" },
	{ name: "Gündoğan", region: "Bodrum", slug: "gundogan" },
	{ name: "Bitez", region: "Bodrum", slug: "bitez" },
	{ name: "Gümbet", region: "Bodrum", slug: "gumbet" },
	{ name: "Torba", region: "Bodrum", slug: "torba" },
	{ name: "Ortakent", region: "Bodrum", slug: "ortakent" },
];

const serviceList = [
	{ icon: "🚁", label: "Drone Çekimi", slug: "drone-cekimi" },
	{ icon: "📸", label: "Emlak & Tekne Fotoğraf", slug: "emlak-tekne-fotograf" },
	{ icon: "💻", label: "Web Tasarım & Yazılım", slug: "web-tasarim-yazilim" },
	{ icon: "🎨", label: "Grafik Tasarım", slug: "grafik-tasarim" },
];

const services = [
	{
		icon: "🚁",
		title: "Drone Çekimi",
		desc: "Bodrum ve Muğla'da emlak, tekne, yat, otel ve etkinlik amaçlı profesyonel hava fotoğrafı ve video çekimi.",
		href: "/hizmetler/drone-cekimi-bodrum",
		tags: ["Emlak", "Tekne & Yat", "Etkinlik", "Turizm", "DJI"],
	},
	{
		icon: "📸",
		title: "Emlak & Tekne Fotoğrafçılığı",
		desc: "Villa, daire, arazi ve tekne satışlarınızı hızlandıran, profesyonel ışık ve kompozisyonla gerçekleştirilen fotoğraf ve video çekimleri.",
		href: "/hizmetler/emlak-tekne-fotograf-bodrum",
		tags: ["Villa Çekimi", "Tekne Fotoğraf", "Video", "Sanal Tur"],
	},
	{
		icon: "💻",
		title: "Web Tasarım & Yazılım",
		desc: "Bodrum'daki işletmeniz için hızlı, SEO uyumlu, mobil dostu web sitesi tasarımı ve özel yazılım geliştirme.",
		href: "/hizmetler/web-tasarim-yazilim-bodrum",
		tags: ["Web Sitesi", "E-Ticaret", "React", "SEO", "Uygulama"],
	},
	{
		icon: "🎨",
		title: "Grafik Tasarım",
		desc: "Logo, kurumsal kimlik, sosyal medya tasarımı ve baskı materyalleri. Markanızı güçlü ve akılda kalıcı hale getiriyoruz.",
		href: "/hizmetler/grafik-tasarim-bodrum",
		tags: ["Logo", "Kurumsal Kimlik", "Sosyal Medya", "Baskı"],
	},
];

const HizmetlerPage = () => {
	const navigate = useNavigate();

	return (
		<ServiceLayout
			title="Bodrum Hizmetler — Web Tasarım, Drone, Fotoğraf & Grafik"
			description="Bodrum ve Muğla'da web tasarım, yazılım geliştirme, drone çekimi, emlak fotoğrafçılığı ve grafik tasarım hizmetleri. Cihan Duran ile iletişime geçin."
			canonical="/hizmetler"
		>
			<Hero>
				<HeroEyebrow>Bodrum · Muğla</HeroEyebrow>
				<HeroTitle>Profesyonel Dijital&nbsp;Hizmetler</HeroTitle>
				<HeroDesc>
					Bodrum ve çevresinde işletmenizi büyütecek, markanızı öne çıkaracak
					dijital hizmetler. Yazılımdan drone çekimine, fotoğraftan tasarıma
					tek elden çözüm.
				</HeroDesc>
			</Hero>

			<BentoGrid
				items={bentoItems.map(item => ({
					...item,
					onClick: () => navigate(item.href),
				}))}
			/>

			<LocationsSection>
				<SectionEyebrow>Kapsama Alanı</SectionEyebrow>
				<SectionTitle>Hizmet Verdiğimiz Bölgeler</SectionTitle>
				<SectionDesc>Bodrum merkezli olarak Muğla genelinde hizmet veriyoruz.</SectionDesc>
				<LocationGrid>
					{mainLocations.map(loc => (
						<LocationCard key={loc.slug}>
							<LocDotBg />
							<LocGradBorder />
							<LocTop>
								<LocIconBox>📍</LocIconBox>
								<LocStatus>Aktif</LocStatus>
							</LocTop>
							<LocationName>{loc.name}</LocationName>
							<LocationRegion>{loc.region} İli</LocationRegion>
							<ServiceLinks>
								{serviceList.map(svc => (
									<ServiceLink
										key={svc.slug}
										to={`/hizmetler/${svc.slug}-${loc.slug}`}
									>
										<ServiceLinkIcon>{svc.icon}</ServiceLinkIcon>
										{svc.label}
										<Arrow>→</Arrow>
									</ServiceLink>
								))}
							</ServiceLinks>
						</LocationCard>
					))}
				</LocationGrid>

				<DistrictHeader>
					<SectionEyebrow style={{ marginTop: "2.5rem" }}>Bodrum İlçeleri</SectionEyebrow>
					<SectionDesc>Yalıkavak, Turgutreis, Gölköy-Türkbükü ve daha fazlası.</SectionDesc>
				</DistrictHeader>
				<LocationGrid $cols={4}>
					{bodrumDistricts.map(loc => (
						<LocationCard key={loc.slug}>
							<LocDotBg />
							<LocGradBorder />
							<LocTop>
								<LocIconBox>🏘️</LocIconBox>
								<LocStatus>Aktif</LocStatus>
							</LocTop>
							<LocationName>{loc.name}</LocationName>
							<LocationRegion>{loc.region} İlçesi</LocationRegion>
							<ServiceLinks>
								{serviceList.map(svc => (
									<ServiceLink
										key={svc.slug}
										to={`/hizmetler/${svc.slug}-${loc.slug}`}
									>
										<ServiceLinkIcon>{svc.icon}</ServiceLinkIcon>
										{svc.label}
										<Arrow>→</Arrow>
									</ServiceLink>
								))}
							</ServiceLinks>
						</LocationCard>
					))}
				</LocationGrid>
			</LocationsSection>

			<CTA>
				<CTATitle>Projenizi Konuşalım</CTATitle>
				<CTADesc>
					Bodrum'da ihtiyacınıza özel teklif almak için hemen ulaşın.
				</CTADesc>
				<CTAButtons>
					<BtnPrimary href="https://wa.me/905415755520" target="_blank" rel="noreferrer">
						WhatsApp ile Yaz
					</BtnPrimary>
					<BtnSecondary href="tel:+905415755520">
						+90 541 575 55 20
					</BtnSecondary>
				</CTAButtons>
			</CTA>
		</ServiceLayout>
	);
};

export default HizmetlerPage;
