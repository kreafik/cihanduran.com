import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "@pages/NotFound";
import ScrollToTop from "@components/ScrollToTop";
import styled, { keyframes } from "styled-components";
import Window from "@components/Window";
import Danger from "@components/Danger";
import VSCode from "@components/VSCode";
import Linux from "@components/Linux";
import Resume from "@components/Resume";
import Git from "@components/Git";
import Projects from "@components/Projects";
import Contact from "@components/Contact";
import IBAN from "@components/IBAN";

const HizmetlerPage       = lazy(() => import("@pages/services/HizmetlerPage"));
const DroneService        = lazy(() => import("@pages/services/DroneService"));
const PhotoService        = lazy(() => import("@pages/services/PhotoService"));
const WebService          = lazy(() => import("@pages/services/WebService"));
const DesignService       = lazy(() => import("@pages/services/DesignService"));
const LocationServicePage = lazy(() => import("@pages/services/locations/LocationServicePage"));

const pulse = keyframes`
	0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.5); }
	70% { box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
	100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
`;

const WhatsAppBtn = styled.a`
	position: fixed;
	bottom: 1.75rem;
	right: 1.75rem;
	width: 3.25rem;
	height: 3.25rem;
	border-radius: 50%;
	background: #25d366;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 4px 16px rgba(37, 211, 102, 0.45), 0 2px 6px rgba(0,0,0,0.3);
	animation: ${pulse} 2.5s ease-in-out infinite;
	z-index: 9999;
	transition: transform 0.2s ease, background 0.2s ease;
	&:hover {
		transform: scale(1.1);
		background: #20ba5a;
	}
	svg {
		width: 1.75rem;
		height: 1.75rem;
		fill: #fff;
	}
`;

const AppRoutes = () => {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				<Route path="/" element={<Window />} />
				<Route path="/danger-zone" element={<Danger />} />
				<Route path="/vscode" element={<VSCode />} />
				<Route path="/qemu" element={<Linux />} />
				<Route path="/resume" element={<Resume />} />
				<Route path="/git" element={<Git />} />
				<Route path="/projects" element={<Projects />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/iban" element={<IBAN />} />
				<Route path="/hizmetler" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><HizmetlerPage /></Suspense>} />
				<Route path="/hizmetler/drone-cekimi-bodrum" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><DroneService /></Suspense>} />
				<Route path="/hizmetler/emlak-tekne-fotograf-bodrum" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><PhotoService /></Suspense>} />
				<Route path="/hizmetler/web-tasarim-yazilim-bodrum" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><WebService /></Suspense>} />
				<Route path="/hizmetler/grafik-tasarim-bodrum" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><DesignService /></Suspense>} />

				{/* Marmaris */}
				<Route path="/hizmetler/drone-cekimi-marmaris" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="marmaris" serviceType="drone" /></Suspense>} />
				<Route path="/hizmetler/emlak-tekne-fotograf-marmaris" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="marmaris" serviceType="photo" /></Suspense>} />
				<Route path="/hizmetler/web-tasarim-yazilim-marmaris" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="marmaris" serviceType="web" /></Suspense>} />
				<Route path="/hizmetler/grafik-tasarim-marmaris" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="marmaris" serviceType="design" /></Suspense>} />

				{/* Fethiye */}
				<Route path="/hizmetler/drone-cekimi-fethiye" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="fethiye" serviceType="drone" /></Suspense>} />
				<Route path="/hizmetler/emlak-tekne-fotograf-fethiye" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="fethiye" serviceType="photo" /></Suspense>} />
				<Route path="/hizmetler/web-tasarim-yazilim-fethiye" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="fethiye" serviceType="web" /></Suspense>} />
				<Route path="/hizmetler/grafik-tasarim-fethiye" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="fethiye" serviceType="design" /></Suspense>} />

				{/* Datça */}
				<Route path="/hizmetler/drone-cekimi-datca" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="datca" serviceType="drone" /></Suspense>} />
				<Route path="/hizmetler/emlak-tekne-fotograf-datca" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="datca" serviceType="photo" /></Suspense>} />
				<Route path="/hizmetler/web-tasarim-yazilim-datca" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="datca" serviceType="web" /></Suspense>} />
				<Route path="/hizmetler/grafik-tasarim-datca" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="datca" serviceType="design" /></Suspense>} />

				{/* Yalıkavak */}
				<Route path="/hizmetler/drone-cekimi-yalikavak" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="yalikavak" serviceType="drone" /></Suspense>} />
				<Route path="/hizmetler/emlak-tekne-fotograf-yalikavak" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="yalikavak" serviceType="photo" /></Suspense>} />
				<Route path="/hizmetler/web-tasarim-yazilim-yalikavak" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="yalikavak" serviceType="web" /></Suspense>} />
				<Route path="/hizmetler/grafik-tasarim-yalikavak" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="yalikavak" serviceType="design" /></Suspense>} />

				{/* Turgutreis */}
				<Route path="/hizmetler/drone-cekimi-turgutreis" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="turgutreis" serviceType="drone" /></Suspense>} />
				<Route path="/hizmetler/emlak-tekne-fotograf-turgutreis" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="turgutreis" serviceType="photo" /></Suspense>} />
				<Route path="/hizmetler/web-tasarim-yazilim-turgutreis" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="turgutreis" serviceType="web" /></Suspense>} />
				<Route path="/hizmetler/grafik-tasarim-turgutreis" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="turgutreis" serviceType="design" /></Suspense>} />

				{/* Gölköy-Türkbükü */}
				<Route path="/hizmetler/drone-cekimi-golturkbuku" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="golturkbuku" serviceType="drone" /></Suspense>} />
				<Route path="/hizmetler/emlak-tekne-fotograf-golturkbuku" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="golturkbuku" serviceType="photo" /></Suspense>} />
				<Route path="/hizmetler/web-tasarim-yazilim-golturkbuku" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="golturkbuku" serviceType="web" /></Suspense>} />
				<Route path="/hizmetler/grafik-tasarim-golturkbuku" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="golturkbuku" serviceType="design" /></Suspense>} />

				{/* Gündoğan */}
				<Route path="/hizmetler/drone-cekimi-gundogan" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="gundogan" serviceType="drone" /></Suspense>} />
				<Route path="/hizmetler/emlak-tekne-fotograf-gundogan" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="gundogan" serviceType="photo" /></Suspense>} />
				<Route path="/hizmetler/web-tasarim-yazilim-gundogan" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="gundogan" serviceType="web" /></Suspense>} />
				<Route path="/hizmetler/grafik-tasarim-gundogan" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="gundogan" serviceType="design" /></Suspense>} />

				{/* Bitez */}
				<Route path="/hizmetler/drone-cekimi-bitez" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="bitez" serviceType="drone" /></Suspense>} />
				<Route path="/hizmetler/emlak-tekne-fotograf-bitez" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="bitez" serviceType="photo" /></Suspense>} />
				<Route path="/hizmetler/web-tasarim-yazilim-bitez" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="bitez" serviceType="web" /></Suspense>} />
				<Route path="/hizmetler/grafik-tasarim-bitez" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="bitez" serviceType="design" /></Suspense>} />

				{/* Gümbet */}
				<Route path="/hizmetler/drone-cekimi-gumbet" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="gumbet" serviceType="drone" /></Suspense>} />
				<Route path="/hizmetler/emlak-tekne-fotograf-gumbet" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="gumbet" serviceType="photo" /></Suspense>} />
				<Route path="/hizmetler/web-tasarim-yazilim-gumbet" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="gumbet" serviceType="web" /></Suspense>} />
				<Route path="/hizmetler/grafik-tasarim-gumbet" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="gumbet" serviceType="design" /></Suspense>} />

				{/* Torba */}
				<Route path="/hizmetler/drone-cekimi-torba" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="torba" serviceType="drone" /></Suspense>} />
				<Route path="/hizmetler/emlak-tekne-fotograf-torba" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="torba" serviceType="photo" /></Suspense>} />
				<Route path="/hizmetler/web-tasarim-yazilim-torba" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="torba" serviceType="web" /></Suspense>} />
				<Route path="/hizmetler/grafik-tasarim-torba" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="torba" serviceType="design" /></Suspense>} />

				{/* Ortakent */}
				<Route path="/hizmetler/drone-cekimi-ortakent" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="ortakent" serviceType="drone" /></Suspense>} />
				<Route path="/hizmetler/emlak-tekne-fotograf-ortakent" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="ortakent" serviceType="photo" /></Suspense>} />
				<Route path="/hizmetler/web-tasarim-yazilim-ortakent" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="ortakent" serviceType="web" /></Suspense>} />
				<Route path="/hizmetler/grafik-tasarim-ortakent" element={<Suspense fallback={<div style={{background:"#0d1117",minHeight:"100vh"}}/>}><LocationServicePage locationSlug="ortakent" serviceType="design" /></Suspense>} />

				<Route path="*" element={<NotFound />} />
			</Routes>
			<WhatsAppBtn
				href="https://wa.me/905415755520"
				target="_blank"
				rel="noreferrer"
				aria-label="WhatsApp ile iletişime geç"
			>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.1-.7-.3-.7-.5-.7h-.5c-.2 0-.5.2-.6.3-.6.6-.9 1.3-.9 2.1.1.9.4 1.7 1 2.4 1.2 1.7 2.8 3 4.6 3.8.5.2.9.4 1.4.5.5.2 1 .2 1.6.1.7-.1 1.3-.6 1.7-1.2.2-.4.2-.8.1-1.2l-.3-.1m2.5-9.1C15.2 1 8.9 1 5 4.9c-3.2 3.2-3.8 8.1-1.6 12L2 22l5.3-1.4c1.5.8 3.1 1.2 4.7 1.2 5.5 0 9.9-4.4 9.9-9.9.1-2.6-1-5.1-2.8-7"/>
				</svg>
			</WhatsAppBtn>
		</BrowserRouter>
	);
};

export default AppRoutes;
