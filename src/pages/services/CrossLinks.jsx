import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SERVICES = [
	{ key: "drone",  icon: "🚁", label: "Drone Çekimi",           slug: "drone-cekimi",          color: "#58a6ff", desc: "Hava fotoğrafı ve 4K video çekimi." },
	{ key: "photo",  icon: "📸", label: "Emlak & Tekne Fotoğraf", slug: "emlak-tekne-fotograf",   color: "#d29922", desc: "Profesyonel emlak ve tekne fotoğrafçılığı." },
	{ key: "web",    icon: "💻", label: "Web Tasarım & Yazılım",  slug: "web-tasarim-yazilim",    color: "#3fb950", desc: "SEO uyumlu, hızlı web siteleri." },
	{ key: "design", icon: "🎨", label: "Grafik Tasarım",         slug: "grafik-tasarim",         color: "#a371f7", desc: "Logo, kimlik ve sosyal medya tasarımı." },
];

const LOCATIONS = [
	{ name: "Marmaris",        slug: "marmaris",    region: "Muğla" },
	{ name: "Fethiye",         slug: "fethiye",     region: "Muğla" },
	{ name: "Datça",           slug: "datca",       region: "Muğla" },
	{ name: "Yalıkavak",       slug: "yalikavak",   region: "Bodrum" },
	{ name: "Turgutreis",      slug: "turgutreis",  region: "Bodrum" },
	{ name: "Gölköy-Türkbükü", slug: "golturkbuku", region: "Bodrum" },
	{ name: "Gündoğan",        slug: "gundogan",    region: "Bodrum" },
	{ name: "Bitez",           slug: "bitez",       region: "Bodrum" },
	{ name: "Gümbet",          slug: "gumbet",      region: "Bodrum" },
	{ name: "Torba",           slug: "torba",       region: "Bodrum" },
	{ name: "Ortakent",        slug: "ortakent",    region: "Bodrum" },
];

const Wrap = styled.div`
	margin-top: 1rem;
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
		background: ${p => p.$color || "rgba(88,166,255,0.45)"};
		border-radius: 1px;
		margin-bottom: 0.6rem;
	}
`;

const Sub = styled.p`
	font-size: 0.875rem;
	color: rgba(230, 237, 243, 0.4);
	margin-bottom: 1.25rem;
`;

const LocGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
	gap: 0.65rem;
`;

const LocCard = styled(Link)`
	position: relative;
	overflow: hidden;
	background: #000;
	border: 1px solid rgba(255,255,255,0.08);
	border-radius: 0.75rem;
	padding: 0.85rem 1rem;
	display: flex;
	align-items: center;
	gap: 0.55rem;
	transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;

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
		border-color: rgba(255,255,255,0.16);
		box-shadow: 0 2px 12px rgba(255,255,255,0.04);
	}

	&:hover::before { opacity: 1; }
`;

const LocIcon = styled.span`
	font-size: 1rem;
	flex-shrink: 0;
`;

const LocText = styled.div``;

const LocName = styled.div`
	font-size: 0.82rem;
	font-weight: 700;
	color: #e6edf3;
`;

const LocRegion = styled.div`
	font-size: 0.72rem;
	color: rgba(230, 237, 243, 0.38);
	margin-top: 0.05rem;
`;

const SvcGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
	gap: 0.85rem;
`;

const SvcCard = styled(Link)`
	position: relative;
	overflow: hidden;
	background: #000;
	border: 1px solid rgba(255,255,255,0.08);
	border-radius: 0.75rem;
	padding: 1.25rem 1.5rem;
	display: block;
	transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;

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
		border-color: rgba(255,255,255,0.16);
		box-shadow: 0 2px 12px rgba(255,255,255,0.04);
	}

	&:hover::before { opacity: 1; }
`;

const SvcIcon = styled.div`
	font-size: 1.5rem;
	margin-bottom: 0.6rem;
`;

const SvcLabel = styled.div`
	font-size: 0.9rem;
	font-weight: 700;
	color: #e6edf3;
	margin-bottom: 0.35rem;
`;

const SvcDesc = styled.div`
	font-size: 0.8rem;
	color: rgba(230, 237, 243, 0.45);
	line-height: 1.5;
`;

const SvcArrow = styled.div`
	font-size: 0.75rem;
	color: ${p => p.$color || "#58a6ff"};
	margin-top: 0.65rem;
	font-weight: 600;
`;

export default function CrossLinks({ currentService }) {
	const current = SERVICES.find(s => s.key === currentService);
	const otherServices = SERVICES.filter(s => s.key !== currentService);
	const accentHalf = `${current.color}44`;

	return (
		<Wrap>
			<Section>
				<H2 $color={accentHalf}>
					{current.label} — Muğla & Bodrum Bölgeleri
				</H2>
				<Sub>Bodrum dışında da hizmet veriyoruz.</Sub>
				<LocGrid>
					{LOCATIONS.map(loc => (
						<LocCard
							key={loc.slug}
							to={`/hizmetler/${current.slug}-${loc.slug}`}
						>
							<LocIcon>📍</LocIcon>
							<LocText>
								<LocName>{loc.name}</LocName>
								<LocRegion>{loc.region}</LocRegion>
							</LocText>
						</LocCard>
					))}
				</LocGrid>
			</Section>

			<Section>
				<H2 $color={accentHalf}>Diğer Hizmetlerimiz</H2>
				<Sub>Bodrum'da tüm dijital ihtiyaçlarınız için tek adres.</Sub>
				<SvcGrid>
					{otherServices.map(svc => (
						<SvcCard
							key={svc.key}
							to={`/hizmetler/${svc.slug}-bodrum`}
						>
							<SvcIcon>{svc.icon}</SvcIcon>
							<SvcLabel>{svc.label}</SvcLabel>
							<SvcDesc>{svc.desc}</SvcDesc>
							<SvcArrow $color={svc.color}>Hizmeti Gör →</SvcArrow>
						</SvcCard>
					))}
				</SvcGrid>
			</Section>
		</Wrap>
	);
}
