import React from "react";
import { Link } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import { Helmet } from "react-helmet-async";

const Global = createGlobalStyle`
	*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
	body { background: #0d1117; color: #e6edf3; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
	a { text-decoration: none; }
`;

const Nav = styled.nav`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 2rem;
	height: 3.5rem;
	background: rgba(0, 0, 0, 0.88);
	backdrop-filter: blur(16px);
	border-bottom: 1px solid rgba(255,255,255,0.08);
	box-shadow: 0 1px 0 rgba(255,255,255,0.04), 0 4px 24px rgba(0,0,0,0.4);
`;

const NavLogo = styled(Link)`
	font-size: 1rem;
	font-weight: 700;
	color: #e6edf3;
	letter-spacing: -0.02em;
	&:hover { color: #58a6ff; }
`;

const NavLinks = styled.div`
	display: flex;
	gap: 1.5rem;
	align-items: center;
`;

const NavLink = styled(Link)`
	font-size: 0.875rem;
	color: rgba(230, 237, 243, 0.6);
	transition: color 0.2s;
	&:hover { color: #e6edf3; }
`;

const NavCTA = styled.a`
	font-size: 0.875rem;
	font-weight: 600;
	color: #0d1117;
	background: #58a6ff;
	padding: 0.4rem 1rem;
	border-radius: 2rem;
	transition: background 0.2s;
	&:hover { background: #79c0ff; }
`;

const Main = styled.main`
	padding-top: 3.5rem;
	animation: pageIn 0.3s ease both;
`;

const Footer = styled.footer`
	position: relative;
	overflow: hidden;
	background: #000;
	border-top: 1px solid rgba(255,255,255,0.08);
	padding: 2.5rem 2rem;
	text-align: center;
	color: rgba(230, 237, 243, 0.35);
	font-size: 0.8rem;
	line-height: 1.8;
	a {
		color: rgba(88, 166, 255, 0.7);
		&:hover { color: #58a6ff; }
	}

	&::before {
		content: "";
		position: absolute;
		inset: 0;
		background-image: radial-gradient(circle, rgba(255,255,255,0.015) 1px, transparent 1px);
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
		background: linear-gradient(90deg, transparent, rgba(88,166,255,0.25), transparent);
		pointer-events: none;
	}
`;

const OG_IMAGE = "https://cihanduran.com/assets/favicon/logo1200.png";

const ServiceLayout = ({ children, title, description, canonical }) => {
	const fullTitle = `${title} | Cihan Duran — Bodrum`;
	const fullUrl   = canonical ? `https://cihanduran.com${canonical}` : "https://cihanduran.com";
	return (
		<>
			<Helmet>
				<title>{fullTitle}</title>
				<meta name="description" content={description} />
				{canonical && <link rel="canonical" href={fullUrl} />}
				<meta property="og:type"        content="website" />
				<meta property="og:url"         content={fullUrl} />
				<meta property="og:title"       content={fullTitle} />
				<meta property="og:description" content={description} />
				<meta property="og:image"       content={OG_IMAGE} />
				<meta property="og:image:width"  content="1200" />
				<meta property="og:image:height" content="630" />
				<meta property="og:locale"      content="tr_TR" />
				<meta property="og:site_name"   content="Cihan Duran" />
				<meta name="twitter:card"        content="summary_large_image" />
				<meta name="twitter:url"         content={fullUrl} />
				<meta name="twitter:title"       content={fullTitle} />
				<meta name="twitter:description" content={description} />
				<meta name="twitter:image"       content={OG_IMAGE} />
			</Helmet>
			<Global />
			<Nav>
				<NavLogo to="/">Cihan Duran</NavLogo>
				<NavLinks>
					<NavLink to="/hizmetler">Hizmetler</NavLink>
					<NavLink to="/contact">İletişim</NavLink>
					<NavCTA href="https://wa.me/905415755520" target="_blank" rel="noreferrer">
						WhatsApp
					</NavCTA>
				</NavLinks>
			</Nav>
			<Main>{children}</Main>
			<Footer>
				<p>
					<strong style={{ color: "rgba(230,237,243,0.7)" }}>Cihan Duran</strong>
					{" "}— Bodrum, Muğla
				</p>
				<p style={{ marginTop: "0.4rem" }}>
					<a href="tel:+905415755520">+90 541 575 55 20</a>
					{" · "}
					<a href="mailto:tasarim@cihanduran.com">tasarim@cihanduran.com</a>
					{" · "}
					<a href="https://wa.me/905415755520" target="_blank" rel="noreferrer">WhatsApp</a>
				</p>
				<p style={{ marginTop: "0.75rem" }}>
					© {new Date().getFullYear()} cihanduran.com · Tüm hakları saklıdır.
				</p>
			</Footer>
		</>
	);
};

export default ServiceLayout;
