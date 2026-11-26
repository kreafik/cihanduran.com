import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ServiceLayout from "../ServiceLayout";
import { locations, serviceLabels } from "./locationData";

/* ── Styled Components ── */
const Hero = styled.section`
	position: relative;
	overflow: hidden;
	background: linear-gradient(160deg, #0d1117 0%, #12181f 60%, #0d1117 100%);
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
	color: ${p => p.$color};
	margin-bottom: 1rem;
`;

const H1 = styled.h1`
	font-size: clamp(2rem, 5vw, 3rem);
	font-weight: 800;
	letter-spacing: -0.03em;
	line-height: 1.15;
	color: #e6edf3;
	margin-bottom: 1.25rem;
`;

const HeroDesc = styled.p`
	font-size: 1.1rem;
	color: rgba(230, 237, 243, 0.6);
	max-width: 600px;
	margin: 0 auto 2.5rem;
	line-height: 1.7;
`;

const Badges = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.45rem;
	justify-content: center;
`;

const Badge = styled.span`
	background: ${p => p.$color}1a;
	border: 1px solid ${p => p.$color}33;
	color: ${p => p.$color};
	font-size: 0.78rem;
	font-weight: 600;
	padding: 0.28rem 0.8rem;
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
		background: ${p => p.$accent ? `${p.$accent}77` : "rgba(88, 166, 255, 0.45)"};
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

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
	gap: 1rem;
	margin-top: 1.5rem;
`;

const Card = styled.div`
	position: relative;
	overflow: hidden;
	background: #000;
	border: 1px solid rgba(255,255,255,0.08);
	border-radius: 0.75rem;
	padding: 1.4rem;
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

const CardIcon = styled.div`font-size: 1.65rem; margin-bottom: 0.65rem;`;

const CardTitle = styled.h3`
	font-size: 0.95rem;
	font-weight: 700;
	color: #e6edf3;
	margin-bottom: 0.4rem;
`;

const CardDesc = styled.p`
	font-size: 0.85rem;
	color: rgba(230, 237, 243, 0.5);
	line-height: 1.6;
`;

const FAQ = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.85rem;
	margin-top: 1.25rem;
`;

const FAQItem = styled.div`
	position: relative;
	overflow: hidden;
	background: #000;
	border: 1px solid rgba(255,255,255,0.08);
	border-radius: 0.75rem;
	padding: 1.1rem 1.35rem;
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
	font-size: 0.95rem;
	font-weight: 700;
	color: #e6edf3;
	margin-bottom: 0.4rem;
`;

const FAQAnswer = styled.p`
	font-size: 0.875rem;
	color: rgba(230, 237, 243, 0.55);
	line-height: 1.65;
`;

const RelatedGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
	gap: 0.75rem;
	margin-top: 1.25rem;
`;

const RelatedCard = styled(Link)`
	position: relative;
	overflow: hidden;
	background: #000;
	border: 1px solid rgba(255,255,255,0.08);
	border-radius: 0.75rem;
	padding: 1rem 1.25rem;
	display: flex;
	align-items: center;
	gap: 0.6rem;
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

const RelatedIcon = styled.span`font-size: 1.1rem;`;

const RelatedText = styled.div``;

const RelatedTitle = styled.div`
	font-size: 0.85rem;
	font-weight: 700;
	color: #e6edf3;
`;

const RelatedSub = styled.div`
	font-size: 0.75rem;
	color: rgba(230, 237, 243, 0.4);
	margin-top: 0.1rem;
`;

const CTA = styled.section`
	position: relative;
	overflow: hidden;
	background: #000;
	border-top: 1px solid rgba(255,255,255,0.08);
	padding: 4.5rem 2rem;
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
	font-size: clamp(1.4rem, 3vw, 2rem);
	font-weight: 700;
	color: #e6edf3;
	margin-bottom: 0.85rem;
	letter-spacing: -0.02em;
`;

const CTADesc = styled.p`
	color: rgba(230, 237, 243, 0.5);
	font-size: 0.95rem;
	margin-bottom: 1.75rem;
`;

const Btns = styled.div`
	display: flex;
	gap: 0.75rem;
	justify-content: center;
	flex-wrap: wrap;
`;

const BtnPrimary = styled.a`
	background: #25d366;
	color: #fff;
	font-weight: 700;
	font-size: 0.9rem;
	padding: 0.7rem 1.6rem;
	border-radius: 2rem;
	text-decoration: none;
	transition: background 0.2s;
	&:hover { background: #20ba5a; }
`;

const BtnSecondary = styled.a`
	background: transparent;
	color: #e6edf3;
	font-weight: 600;
	font-size: 0.9rem;
	padding: 0.7rem 1.6rem;
	border-radius: 2rem;
	border: 1px solid rgba(255,255,255,0.2);
	text-decoration: none;
	transition: border-color 0.2s;
	&:hover { border-color: rgba(255,255,255,0.45); }
`;

/* ── Component ── */
const LocationServicePage = ({ locationSlug, serviceType }) => {
	const loc = locations[locationSlug];
	const svc = loc.services[serviceType];
	const svcLabel = serviceLabels[serviceType];
	const color = svcLabel.color;

	const waMsg = encodeURIComponent(
		`Merhaba Cihan, ${loc.name} ${svcLabel.label} hakkında bilgi almak istiyorum.`
	);

	const otherServices = Object.keys(serviceLabels).filter(s => s !== serviceType);
	const otherLocations = Object.keys(locations).filter(l => l !== locationSlug);

	return (
		<ServiceLayout
			title={svc.title}
			description={svc.metaDesc}
			canonical={`/hizmetler/${svcLabel.slug}-${loc.slug}`}
		>
			{/* JSON-LD */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Service",
					"name": svc.title,
					"description": svc.metaDesc,
					"provider": {
						"@type": "LocalBusiness",
						"name": "Cihan Duran",
						"telephone": "+90-541-575-55-20",
						"email": "tasarim@cihanduran.com",
						"url": "https://cihanduran.com",
						"address": {
							"@type": "PostalAddress",
							"addressLocality": "Bodrum",
							"addressRegion": "Muğla",
							"addressCountry": "TR"
						}
					},
					"areaServed": {
						"@type": "City",
						"name": loc.name
					},
					"faqPage": {
						"@type": "FAQPage",
						"mainEntity": svc.faq.map(f => ({
							"@type": "Question",
							"name": f.q,
							"acceptedAnswer": { "@type": "Answer", "text": f.a }
						}))
					}
				})}}
			/>

			<Hero>
				<Eyebrow $color={color}>{loc.name} · {loc.region} · {svcLabel.label}</Eyebrow>
				<H1>{svc.title}</H1>
				<HeroDesc>{svc.heroDesc}</HeroDesc>
				<Badges>
					{svc.badges.map(b => <Badge key={b} $color={color}>{b}</Badge>)}
				</Badges>
			</Hero>

			<Content>
				<Section>
					<H2>Neden {loc.name}?</H2>
					<P>{loc.description}</P>
					<P>{svc.intro}</P>
				</Section>

				<Section>
					<H2>Hizmet Kapsamı</H2>
					<P>{svc.details}</P>
					<Grid>
						{svc.areas.map(a => (
							<Card key={a.title}>
								<CardIcon>{a.icon}</CardIcon>
								<CardTitle>{a.title}</CardTitle>
								<CardDesc>{a.desc}</CardDesc>
							</Card>
						))}
					</Grid>
				</Section>

				<Section>
					<H2>Sıkça Sorulan Sorular</H2>
					<FAQ>
						{svc.faq.map(f => (
							<FAQItem key={f.q}>
								<FAQQuestion>{f.q}</FAQQuestion>
								<FAQAnswer>{f.a}</FAQAnswer>
							</FAQItem>
						))}
					</FAQ>
				</Section>

				<Section>
					<H2>{loc.name}'da Diğer Hizmetlerimiz</H2>
					<RelatedGrid>
						{otherServices.map(s => {
							const sl = serviceLabels[s];
							return (
								<RelatedCard key={s} to={`/hizmetler/${sl.slug}-${loc.slug}`}>
									<RelatedIcon>{sl.icon}</RelatedIcon>
									<RelatedText>
										<RelatedTitle>{sl.label}</RelatedTitle>
										<RelatedSub>{loc.name}</RelatedSub>
									</RelatedText>
								</RelatedCard>
							);
						})}
					</RelatedGrid>
				</Section>

				<Section>
					<H2>{svcLabel.label} — Diğer Lokasyonlar</H2>
					<RelatedGrid>
						<RelatedCard to={`/hizmetler/${svcLabel.slug}-bodrum`}>
							<RelatedIcon>{svcLabel.icon}</RelatedIcon>
							<RelatedText>
								<RelatedTitle>{svcLabel.label}</RelatedTitle>
								<RelatedSub>Bodrum</RelatedSub>
							</RelatedText>
						</RelatedCard>
						{otherLocations.map(l => {
							const ll = locations[l];
							return (
								<RelatedCard key={l} to={`/hizmetler/${svcLabel.slug}-${ll.slug}`}>
									<RelatedIcon>{svcLabel.icon}</RelatedIcon>
									<RelatedText>
										<RelatedTitle>{svcLabel.label}</RelatedTitle>
										<RelatedSub>{ll.name}</RelatedSub>
									</RelatedText>
								</RelatedCard>
							);
						})}
					</RelatedGrid>
				</Section>
			</Content>

			<CTA>
				<CTATitle>{loc.name}'da {svcLabel.label} için Teklif Alın</CTATitle>
				<CTADesc>
					24 saat içinde dönüş sağlıyoruz.
				</CTADesc>
				<Btns>
					<BtnPrimary href={`https://wa.me/905415755520?text=${waMsg}`} target="_blank" rel="noreferrer">
						WhatsApp ile Yaz
					</BtnPrimary>
					<BtnSecondary href="tel:+905415755520">
						+90 541 575 55 20
					</BtnSecondary>
				</Btns>
			</CTA>
		</ServiceLayout>
	);
};

export default LocationServicePage;
