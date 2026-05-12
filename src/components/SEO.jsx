import React from "react";
import { Helmet } from "react-helmet-async";

const BASE_URL = "https://cihanduran.com";
const DEFAULT_IMAGE = `${BASE_URL}/assets/favicon/logo1200.png`;
const DEFAULT_TITLE = "Cihan Duran | Bodrum Web Tasarım, Yazılım, Drone & Fotoğraf Çekimi";
const DEFAULT_DESC = "Bodrum ve Muğla'da web tasarım, yazılım geliştirme, emlak ve tekne fotoğraf & video çekimi, drone çekimi hizmetleri.";

const SEO = ({ title, description, canonical, image }) => {
	const fullTitle = title
		? `${title} | Cihan Duran — Bodrum`
		: DEFAULT_TITLE;

	const fullDesc = description || DEFAULT_DESC;
	const fullUrl  = canonical ? `${BASE_URL}${canonical}` : BASE_URL;
	const fullImg  = image || DEFAULT_IMAGE;

	return (
		<Helmet>
			<title>{fullTitle}</title>
			<meta name="description" content={fullDesc} />
			{canonical && <link rel="canonical" href={fullUrl} />}

			<meta property="og:type"        content="website" />
			<meta property="og:url"         content={fullUrl} />
			<meta property="og:title"       content={fullTitle} />
			<meta property="og:description" content={fullDesc} />
			<meta property="og:image"       content={fullImg} />
			<meta property="og:image:width"  content="1200" />
			<meta property="og:image:height" content="630" />
			<meta property="og:locale"      content="tr_TR" />
			<meta property="og:site_name"   content="Cihan Duran" />

			<meta name="twitter:card"        content="summary_large_image" />
			<meta name="twitter:url"         content={fullUrl} />
			<meta name="twitter:title"       content={fullTitle} />
			<meta name="twitter:description" content={fullDesc} />
			<meta name="twitter:image"       content={fullImg} />
		</Helmet>
	);
};

export default SEO;
