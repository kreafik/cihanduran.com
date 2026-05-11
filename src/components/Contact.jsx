import React, { Suspense, lazy, useRef } from "react";
import Loader from "@elements/Loader/Loader";
import styled from "styled-components";
import HeadingBar from "@elements/Window/HeadingBar";
import Draggable from "react-draggable";
import bg from "@static/bg-new.jpeg";
import theme from "@styles/theme";
import AlertContent from "@elements/Alert/AlertContent";
import DockContent from "@elements/Dock/DockContent";
import MenuContent from "@elements/Menu/MenuContent";
import SEO from "@components/SEO";
import { useLocation } from "react-router-dom";
const ContactContent = lazy(() => import("@elements/Contact/ContactContent"));

const Wrapper = styled.div`
	display: grid;
	place-items: center;
	min-height: 100vh;
	background: url(${bg}) no-repeat center center;
	background-size: cover;
	overflow: hidden;
`;

const Container = styled.div`
	width: fit-content;
	border-radius: 0.6rem;
	box-shadow: ${theme.windowShadow} 0px 1px 4px;
	resize: ${props => (props.$resizable ? `both` : `none`)};
	overflow: hidden;
	backdrop-filter: blur(1rem);
	background: ${theme.bodyBgWithOpacity};
	${props => props.$height && `height: ${props.$height}`}
`;

const Default = props => {
	const { pathname } = useLocation();
	const nodeRef = useRef(null);
	let resizable = false;
	if (props.resizable === undefined) {
		resizable = true;
	}
	const BOUND = 512;
	return (
		<>
			<MenuContent programName={props.programName} />
			<AlertContent
				type={pathname.includes("qemu") ? `qemu` : `hideHelp`}
			/>
			<Wrapper>
				<Draggable
					nodeRef={nodeRef}
					bounds={{
						top: -128,
						left: -BOUND,
						right: BOUND,
						bottom: BOUND,
					}}
					handle=".heading-bar"
				>
					<Container
						ref={nodeRef}
						$height={props.height}
						$resizable={resizable}
						onContextMenu={e => {
							!props.contextMenu && e.preventDefault();
						}}
					>
						<HeadingBar
							altClassName="heading-bar"
							heading={props.heading}
						/>
						{props.children}
					</Container>
				</Draggable>
			</Wrapper>
			<DockContent />
		</>
	);
};

const Contact = () => {
	return (
		<>
			<SEO
				title="İletişim — WhatsApp, Telefon & E-Posta"
				description="Bodrum'da web tasarım, yazılım, drone ve fotoğraf çekimi için Cihan Duran ile iletişime geçin. WhatsApp: +90 541 575 55 20 | tasarim@cihanduran.com"
				canonical="/contact"
			/>
			<Default heading="İletişim" resizable={false} programName="İletişim">
				<Suspense fallback={<Loader />}>
					<ContactContent />
				</Suspense>
			</Default>
		</>
	);
};

export default Contact;
