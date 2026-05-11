import React from "react";
import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, canonical }) => {
	const fullTitle = title
		? `${title} | Cihan Duran — Bodrum`
		: "Cihan Duran | Bodrum Web Tasarım, Yazılım, Drone & Fotoğraf Çekimi";

	const fullDesc = description ||
		"Bodrum ve Muğla'da web tasarım, yazılım geliştirme, emlak ve tekne fotoğraf & video çekimi, drone çekimi hizmetleri.";

	return (
		<Helmet>
			<title>{fullTitle}</title>
			<meta name="description" content={fullDesc} />
			{canonical && <link rel="canonical" href={`https://cihanduran.com${canonical}`} />}
			<meta property="og:title" content={fullTitle} />
			<meta property="og:description" content={fullDesc} />
			<meta name="twitter:title" content={fullTitle} />
			<meta name="twitter:description" content={fullDesc} />
		</Helmet>
	);
};

export default SEO;
