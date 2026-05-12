import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ServiceLayout from "./ServiceLayout";
import CrossLinks from "./CrossLinks";

const Hero = styled.section`
	position: relative;
	overflow: hidden;
	background: linear-gradient(160deg, #0d1117 0%, #0d1f12 60%, #0d1117 100%);
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
		background: linear-gradient(90deg, transparent, rgba(63,185,80,0.35), transparent);
		pointer-events: none;
	}
`;

const Eyebrow = styled.p`
	font-size: 0.78rem;
	font-weight: 600;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	color: #3fb950;
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
	background: rgba(63, 185, 80, 0.12);
	border: 1px solid rgba(63, 185, 80, 0.25);
	color: #3fb950;
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
		background: rgba(63, 185, 80, 0.45);
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

const TechStack = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-top: 1rem;
`;

const Tech = styled.span`
	background: #21262d;
	border: 1px solid rgba(255,255,255,0.1);
	color: rgba(230, 237, 243, 0.7);
	font-size: 0.8rem;
	font-weight: 600;
	padding: 0.3rem 0.75rem;
	border-radius: 0.4rem;
	font-family: "Hack", monospace;
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
		color: #3fb950;
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
		background: linear-gradient(90deg, transparent, rgba(63,185,80,0.35), transparent);
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

const WebService = () => {
	return (
		<ServiceLayout
			title="Bodrum Web Tasarım ve Yazılım Geliştirme"
			description="Bodrum ve Muğla'da profesyonel web tasarım ve yazılım geliştirme hizmetleri. SEO uyumlu, hızlı, mobil dostu web siteleri. React, Next.js, e-ticaret çözümleri. Cihan Duran."
			canonical="/hizmetler/web-tasarim-yazilim-bodrum"
		>
			<Hero>
				<Eyebrow>Bodrum · Muğla · Web Tasarım & Yazılım</Eyebrow>
				<H1>Bodrum Web Tasarım & Yazılım Geliştirme</H1>
				<HeroDesc>
					Bodrum'daki işletmeniz için hızlı, SEO uyumlu ve etkileyici web siteleri.
					Kurumsal siteден e-ticarete, landing page'den web uygulamasına
					komple dijital çözümler.
				</HeroDesc>
				<HeroBadges>
					{["Web Sitesi", "E-Ticaret", "SEO", "React", "Mobil Uyumlu", "Bodrum", "Muğla"].map(b => (
						<Badge key={b}>{b}</Badge>
					))}
				</HeroBadges>
			</Hero>

			<Content>
				<Section>
					<H2>Bodrum İşletmelerine Özel Web Çözümleri</H2>
					<P>
						Bodrum'da turizm, emlak, tekne kiralama, restoran veya butik
						işletme yürütüyorsanız, dijital varlığınız müşteri kazanımında
						kritik rol oynar. Sezonluk yoğun rekabet ortamında sizi rakiplerinizden
						ayrıştıran, Google'da üst sıralarda yer alan bir web sitesi işletmenizin
						en önemli yatırımlarından biridir.
					</P>
					<P>
						Muğla ve Bodrum'un lokal arama alışkanlıklarını bilen, SEO'yu
						tasarım sürecinin başından itibaren entegre eden bir yaklaşımla
						sitenizi hem ziyaretçiler hem de arama motorları için optimize ediyoruz.
					</P>
				</Section>

				<Section>
					<H2>Web Tasarım Hizmetleri</H2>
					<ServiceGrid>
						<ServiceCard>
							<ServiceCardIcon>🏢</ServiceCardIcon>
							<ServiceCardTitle>Kurumsal Web Sitesi</ServiceCardTitle>
							<ServiceCardDesc>
								Markanızı yansıtan, hızlı yüklenen, mobil uyumlu
								kurumsal tanıtım siteleri. Bodrum işletmeleri için lokal SEO dahil.
							</ServiceCardDesc>
						</ServiceCard>
						<ServiceCard>
							<ServiceCardIcon>🛒</ServiceCardIcon>
							<ServiceCardTitle>E-Ticaret</ServiceCardTitle>
							<ServiceCardDesc>
								Bodrum'dan Türkiye'ye ve dünyaya satış yapabileceğiniz
								güvenli, hızlı e-ticaret platformları.
							</ServiceCardDesc>
						</ServiceCard>
						<ServiceCard>
							<ServiceCardIcon>🎯</ServiceCardIcon>
							<ServiceCardTitle>Landing Page</ServiceCardTitle>
							<ServiceCardDesc>
								Tek hizmet veya ürün için yüksek dönüşüm oranına sahip,
								reklam kampanyalarıyla entegre landing page'ler.
							</ServiceCardDesc>
						</ServiceCard>
						<ServiceCard>
							<ServiceCardIcon>📱</ServiceCardIcon>
							<ServiceCardTitle>Web Uygulaması</ServiceCardTitle>
							<ServiceCardDesc>
								Rezervasyon sistemleri, üyelik panelleri, yönetim
								arayüzleri ve özel iş süreçleri için web uygulamaları.
							</ServiceCardDesc>
						</ServiceCard>
					</ServiceGrid>
				</Section>

				<Section>
					<H2>Kullandığım Teknolojiler</H2>
					<P>
						Modern, sürdürülebilir ve performanslı altyapılarla çalışıyorum.
						Her proje için ihtiyaca en uygun teknolojiyi seçiyorum:
					</P>
					<TechStack>
						{["React", "Next.js", "TypeScript", "Node.js", "Vite", "Tailwind CSS", "styled-components", "PostgreSQL", "Vercel", "WordPress", "WooCommerce", "Figma"].map(t => (
							<Tech key={t}>{t}</Tech>
						))}
					</TechStack>
				</Section>

				<Section>
					<H2>Neden Lokal Bir Geliştirici?</H2>
					<BenefitList>
						<BenefitItem>Bodrum ve Muğla'nın arama alışkanlıklarını ve rekabet yapısını biliyorum</BenefitItem>
						<BenefitItem>Yüz yüze toplantı ve yerinde keşif mümkün — iletişim sorunsuz</BenefitItem>
						<BenefitItem>Saat farkı yok, acil güncellemeler aynı gün yapılır</BenefitItem>
						<BenefitItem>Google'da Bodrum yerel aramalarına göre optimize edilmiş yapı</BenefitItem>
						<BenefitItem>Siteniz teslim sonrası eğitim ve 1 ay ücretsiz destek</BenefitItem>
						<BenefitItem>Fotoğraf, drone çekimi ve web'i tek elden yönetme imkanı</BenefitItem>
					</BenefitList>
				</Section>

				<Section>
					<H2>Süreç Nasıl İşliyor?</H2>
					<P>
						<strong style={{ color: "#e6edf3" }}>1. Keşif Görüşmesi:</strong> İşletmenizi,
						hedef kitlenizi ve beklentilerinizi anlamak için ücretsiz ilk görüşme.
					</P>
					<P>
						<strong style={{ color: "#e6edf3" }}>2. Teklif & Sözleşme:</strong> Net kapsam,
						fiyat ve teslim takvimi içeren yazılı teklif.
					</P>
					<P>
						<strong style={{ color: "#e6edf3" }}>3. Tasarım:</strong> Figma'da sayfa
						tasarımları onayınıza sunulur, görsel kimliğinize uygun hale getirilir.
					</P>
					<P>
						<strong style={{ color: "#e6edf3" }}>4. Geliştirme & Test:</strong> Kod
						yazımı, mobil uyumluluk ve hız testleri.
					</P>
					<P>
						<strong style={{ color: "#e6edf3" }}>5. Yayına Alma & Eğitim:</strong> Alan
						adı, hosting kurulumu ve içerik yönetimi için kısa eğitim.
					</P>
				</Section>
				<CrossLinks currentService="web" />
			</Content>

			<CTA>
				<CTATitle>Web Sitenizi Birlikte Yapalım</CTATitle>
				<CTADesc>
					Bodrum'da web siteniz için ücretsiz keşif görüşmesi talep edin.
				</CTADesc>
				<BtnPrimary href="https://wa.me/905415755520?text=Merhaba%20Cihan%2C%20web%20tasar%C4%B1m%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noreferrer">
					WhatsApp ile Yaz
				</BtnPrimary>
				<BtnSecondary href="tel:+905415755520">
					+90 541 575 55 20
				</BtnSecondary>
			</CTA>
		</ServiceLayout>
	);
};

export default WebService;
