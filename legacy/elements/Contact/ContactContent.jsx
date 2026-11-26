import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import theme from "@styles/theme";

const fadeIn = keyframes`
	from { opacity: 0; transform: translateY(8px); }
	to   { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
	display: flex;
	flex: 1;
	max-width: 100%;
	height: 100%;
	border-radius: 0 0 0.6rem 0.6rem;
	border: 1px solid ${theme.bodyBorder};
	align-items: center;
	justify-content: center;
	overflow-y: auto;
	padding: 1.5rem 1rem;
`;

const Card = styled.div`
	width: clamp(18rem, 28rem, 90vw);
	animation: ${fadeIn} 0.25s ease both;
`;

const Title = styled.div`
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
	font-size: 0.78rem;
	font-weight: 600;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	color: rgba(255,255,255,0.35);
	margin-bottom: 0.75rem;
	padding-left: 0.25rem;
`;

const Form = styled.form`
	background: rgba(32, 33, 39, 0.35);
	box-shadow: inset 0 0 0.1em rgba(255,255,255,0.12);
	border: 1px solid rgba(40,40,40,0.5);
	border-radius: 0.6rem;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	gap: 0.6rem;
	margin-bottom: 0.75rem;
`;

const inputBase = `
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
	font-size: 0.875rem;
	background: rgba(0,0,0,0.25);
	border: 1px solid rgba(255,255,255,0.1);
	border-radius: 0.35rem;
	color: #e2e4f0;
	padding: 0.5rem 0.75rem;
	outline: none;
	width: 100%;
	box-sizing: border-box;
	transition: border-color 0.15s ease;
	&::placeholder { color: rgba(255,255,255,0.22); }
	&:focus { border-color: rgba(37,211,102,0.5); }
`;

const Input = styled.input`${inputBase}`;

const Select = styled.select`
	${inputBase}
	cursor: pointer;
	option { background: #1c1d24; }
`;

const Textarea = styled.textarea`
	${inputBase}
	resize: vertical;
	min-height: 5rem;
	line-height: 1.55;
`;

const SendBtn = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.5rem;
	background: #25d366;
	color: #fff;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
	font-size: 0.875rem;
	font-weight: 600;
	border: none;
	border-radius: 0.4rem;
	padding: 0.6rem 1rem;
	cursor: pointer;
	transition: background 0.15s ease, transform 0.1s ease;
	margin-top: 0.2rem;
	&:hover { background: #20ba5a; }
	&:active { transform: scale(0.98); }
	&:disabled { background: rgba(37,211,102,0.35); cursor: not-allowed; }
`;

const Divider = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	margin-bottom: 0.5rem;
	span {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
		font-size: 0.72rem;
		color: rgba(255,255,255,0.2);
		white-space: nowrap;
	}
	&::before, &::after {
		content: "";
		flex: 1;
		height: 1px;
		background: rgba(255,255,255,0.08);
	}
`;

const QuickLinks = styled.div`
	display: flex;
	gap: 0.5rem;
`;

const QuickBtn = styled.a`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.4rem;
	padding: 0.45rem 0.5rem;
	background: rgba(32,33,39,0.35);
	border: 1px solid rgba(40,40,40,0.5);
	border-radius: 0.4rem;
	color: rgba(255,255,255,0.55);
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
	font-size: 0.78rem;
	font-weight: 500;
	text-decoration: none;
	transition: background 0.15s, color 0.15s, border-color 0.15s;
	&:hover {
		background: rgba(255,255,255,0.07);
		color: rgba(255,255,255,0.85);
		border-color: rgba(255,255,255,0.18);
	}
	svg { flex-shrink: 0; }
`;

const TOPICS = [
	"Konu seçin",
	"Web Tasarım & Yazılım",
	"Drone Çekimi",
	"Emlak & Tekne Fotoğrafçılığı",
	"Grafik Tasarım",
	"Diğer",
];

const ContactContent = () => {
	const [name, setName]       = useState("");
	const [topic, setTopic]     = useState(TOPICS[0]);
	const [message, setMessage] = useState("");

	const handleSend = e => {
		e.preventDefault();
		const topicLine = topic !== TOPICS[0] ? `Konu: ${topic}\n` : "";
		const text = `Merhaba Cihan! 👋\n\nAd: ${name}\n${topicLine}\n${message}\n\n— cihanduran.com üzerinden ulaştım`;
		window.open(`https://wa.me/905415755520?text=${encodeURIComponent(text)}`, "_blank");
	};

	const isValid = name.trim().length > 0 && message.trim().length > 0;

	return (
		<Wrapper>
			<Card>
				<Title>İletişime Geç</Title>
				<Form onSubmit={handleSend}>
					<Input
						type="text"
						placeholder="Adınız"
						value={name}
						onChange={e => setName(e.target.value)}
						maxLength={60}
					/>
					<Select value={topic} onChange={e => setTopic(e.target.value)}>
						{TOPICS.map(t => <option key={t}>{t}</option>)}
					</Select>
					<Textarea
						placeholder="Mesajınız..."
						value={message}
						onChange={e => setMessage(e.target.value)}
						maxLength={500}
					/>
					<SendBtn type="submit" disabled={!isValid}>
						<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
							<path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.1-.7-.3-.7-.5-.7h-.5c-.2 0-.5.2-.6.3-.6.6-.9 1.3-.9 2.1.1.9.4 1.7 1 2.4 1.2 1.7 2.8 3 4.6 3.8.5.2.9.4 1.4.5.5.2 1 .2 1.6.1.7-.1 1.3-.6 1.7-1.2.2-.4.2-.8.1-1.2l-.3-.1m2.5-9.1C15.2 1 8.9 1 5 4.9c-3.2 3.2-3.8 8.1-1.6 12L2 22l5.3-1.4c1.5.8 3.1 1.2 4.7 1.2 5.5 0 9.9-4.4 9.9-9.9.1-2.6-1-5.1-2.8-7"/>
						</svg>
						WhatsApp'ta Gönder
					</SendBtn>
				</Form>

				<Divider><span>veya hızlı ulaş</span></Divider>

				<QuickLinks>
					<QuickBtn href="https://wa.me/905415755520" target="_blank" rel="noreferrer">
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
							<path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.1-.7-.3-.7-.5-.7h-.5c-.2 0-.5.2-.6.3-.6.6-.9 1.3-.9 2.1.1.9.4 1.7 1 2.4 1.2 1.7 2.8 3 4.6 3.8.5.2.9.4 1.4.5.5.2 1 .2 1.6.1.7-.1 1.3-.6 1.7-1.2.2-.4.2-.8.1-1.2l-.3-.1m2.5-9.1C15.2 1 8.9 1 5 4.9c-3.2 3.2-3.8 8.1-1.6 12L2 22l5.3-1.4c1.5.8 3.1 1.2 4.7 1.2 5.5 0 9.9-4.4 9.9-9.9.1-2.6-1-5.1-2.8-7"/>
						</svg>
						WhatsApp
					</QuickBtn>
					<QuickBtn href="tel:+905415755520">
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
							<path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
						</svg>
						Telefon
					</QuickBtn>
					<QuickBtn href="mailto:tasarim@cihanduran.com" target="_blank" rel="noreferrer">
						<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
							<path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"/>
						</svg>
						E-posta
					</QuickBtn>
				</QuickLinks>
			</Card>
		</Wrapper>
	);
};

export default ContactContent;
