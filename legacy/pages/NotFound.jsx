import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import bg from "@static/bg-new.jpeg";

const fadeIn = keyframes`
	from { opacity: 0; transform: translateY(12px); }
	to   { opacity: 1; transform: translateY(0); }
`;

const blink = keyframes`
	0%, 100% { opacity: 1; }
	50%       { opacity: 0; }
`;

const Wrapper = styled.div`
	display: grid;
	place-items: center;
	min-height: 100vh;
	background: url(${bg}) no-repeat center center;
	background-size: cover;
	padding: 1rem;
`;

const Box = styled.div`
	background: rgba(17, 17, 17, 0.92);
	border: 1px solid rgba(60, 60, 60, 0.85);
	border-radius: 0.6rem;
	padding: 2rem 2.5rem;
	min-width: min(22rem, 90vw);
	max-width: 36rem;
	font-family: "Hack", monospace;
	animation: ${fadeIn} 0.3s ease both;
	backdrop-filter: blur(1rem);
`;

const Prompt = styled.p`
	color: rgb(255, 95, 88);
	font-size: 0.85rem;
	margin-bottom: 0.35rem;
	span { color: rgb(40, 254, 14); }
`;

const ErrorLine = styled.p`
	color: rgba(245, 245, 245, 0.5);
	font-size: 0.82rem;
	margin-bottom: 1.5rem;
`;

const Code = styled.p`
	color: rgb(40, 254, 14);
	font-size: 2.5rem;
	font-weight: bold;
	line-height: 1;
	margin-bottom: 0.4rem;
`;

const Message = styled.p`
	color: rgba(245, 245, 245, 0.75);
	font-size: 0.85rem;
	margin-bottom: 1.75rem;
`;

const HomeLink = styled(Link)`
	display: inline-flex;
	align-items: center;
	gap: 0.4rem;
	color: rgb(94, 192, 206);
	font-size: 0.82rem;
	text-decoration: none;
	border: 1px solid rgba(94, 192, 206, 0.3);
	border-radius: 0.35rem;
	padding: 0.45rem 0.85rem;
	transition: background 0.15s, border-color 0.15s;
	&:hover {
		background: rgba(94, 192, 206, 0.08);
		border-color: rgba(94, 192, 206, 0.6);
	}
`;

const Cursor = styled.span`
	display: inline-block;
	width: 0.55rem;
	height: 1em;
	background: rgb(40, 254, 14);
	vertical-align: text-bottom;
	animation: ${blink} 1s step-end infinite;
	margin-left: 2px;
`;

const NotFound = () => {
	const { pathname } = useLocation();
	const [shown, setShown] = useState(false);

	useEffect(() => {
		const t = setTimeout(() => setShown(true), 400);
		return () => clearTimeout(t);
	}, []);

	return (
		<Wrapper>
			<Box>
				<Prompt>
					<span>root@cihanduran</span>:~${" "}
					<span style={{ color: "rgb(94,192,206)" }}>cd {pathname}</span>
				</Prompt>
				<ErrorLine>
					zsh: no such file or directory: {pathname}
				</ErrorLine>

				{shown && (
					<>
						<Code>404</Code>
						<Message>Bu sayfa bulunamadı.<Cursor /></Message>
						<HomeLink to="/">← Ana Sayfaya Dön</HomeLink>
					</>
				)}
			</Box>
		</Wrapper>
	);
};

export default NotFound;
