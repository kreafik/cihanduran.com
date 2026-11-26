import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import BodyContent from "@elements/Window/BodyContent";
import theme from "@styles/theme";

const banks = [
	{
		name: "İş Bankası",
		iban: "TR150006400000136120083303",
		holder: "Cihan Duran",
		gradient: "linear-gradient(135deg, #001f52 0%, #003478 45%, #0c5aad 100%)",
		shadow: "rgba(0, 52, 120, 0.5)",
	},
	{
		name: "Ziraat Bankası",
		iban: "TR980001002448589918885007",
		holder: "Cihan Duran",
		gradient: "linear-gradient(135deg, #0a2e0d 0%, #1B5E20 45%, #2e7d32 100%)",
		shadow: "rgba(27, 94, 32, 0.5)",
	},
];

const formatIBAN = iban => iban.match(/.{1,4}/g).join(" ");

const Wrapper = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 1.25rem;
	padding: 2rem 1.5rem;
	border: 1px solid ${theme.bodyBorder};
	border-radius: 0 0 0.6rem 0.6rem;
	position: relative;
	overflow: hidden;
`;

const CardOuter = styled(motion.div)`
	width: 100%;
	max-width: 24rem;
	cursor: pointer;
	position: relative;
	border-radius: 1rem;
	box-shadow: 0 8px 32px ${props => props.$shadow},
				0 2px 8px rgba(0,0,0,0.4);
	transition: box-shadow 0.3s ease;
	&:hover {
		box-shadow: 0 16px 48px ${props => props.$shadow},
					0 4px 16px rgba(0,0,0,0.5);
	}
`;

const CardInner = styled.div`
	background: ${props => props.$gradient};
	border-radius: 1rem;
	padding: 1.5rem 1.75rem;
	height: 13.5rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	overflow: hidden;
	position: relative;
	border: 1px solid rgba(255,255,255,0.08);
`;

const Shine = styled(motion.div)`
	position: absolute;
	top: -20%;
	left: -80%;
	width: 55%;
	height: 140%;
	background: linear-gradient(
		105deg,
		transparent 20%,
		rgba(255, 255, 255, 0.13) 50%,
		transparent 80%
	);
	transform: skewX(-10deg);
	pointer-events: none;
	border-radius: 4rem;
`;

const DecorCircle = styled.div`
	position: absolute;
	border-radius: 50%;
	opacity: 0.06;
	background: white;
	${props => props.$big ? `
		width: 18rem;
		height: 18rem;
		right: -5rem;
		top: -6rem;
	` : `
		width: 12rem;
		height: 12rem;
		right: -2rem;
		bottom: -5rem;
	`}
`;

const CardTop = styled.div`
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
`;

const Chip = styled.div`
	width: 2.6rem;
	height: 1.9rem;
	background: linear-gradient(135deg, #f0d080 0%, #c8943a 40%, #e8c060 70%, #c8943a 100%);
	border-radius: 0.28rem;
	position: relative;
	box-shadow: inset 0 1px 2px rgba(255,255,255,0.4),
				0 1px 3px rgba(0,0,0,0.3);
	&:before {
		content: "";
		position: absolute;
		top: 33%;
		left: 0;
		right: 0;
		height: 34%;
		border-top: 1px solid rgba(100, 60, 0, 0.3);
		border-bottom: 1px solid rgba(100, 60, 0, 0.3);
	}
	&:after {
		content: "";
		position: absolute;
		left: 33%;
		top: 0;
		bottom: 0;
		width: 34%;
		border-left: 1px solid rgba(100, 60, 0, 0.3);
		border-right: 1px solid rgba(100, 60, 0, 0.3);
	}
`;

const BankName = styled.div`
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
	font-size: 0.8rem;
	font-weight: 700;
	letter-spacing: 0.06em;
	text-transform: uppercase;
	color: rgba(255, 255, 255, 0.9);
	text-align: right;
	text-shadow: 0 1px 4px rgba(0,0,0,0.4);
`;

const IBANSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.15rem;
`;

const IBANLabel = styled.div`
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
	font-size: 0.6rem;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: rgba(255, 255, 255, 0.45);
`;

const IBANNumber = styled.div`
	font-family: "Hack", monospace;
	font-size: 0.82rem;
	letter-spacing: 0.08em;
	color: ${props => props.$copied ? "#86efac" : "rgba(255,255,255,0.95)"};
	transition: color 0.25s ease;
	text-shadow: 0 1px 4px rgba(0,0,0,0.3);
	white-space: nowrap;
`;

const CardBottom = styled.div`
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
`;

const HolderSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.1rem;
`;

const HolderLabel = styled.div`
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
	font-size: 0.6rem;
	letter-spacing: 0.12em;
	text-transform: uppercase;
	color: rgba(255, 255, 255, 0.45);
`;

const HolderName = styled.div`
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
	font-size: 0.85rem;
	font-weight: 600;
	letter-spacing: 0.04em;
	text-transform: uppercase;
	color: rgba(255, 255, 255, 0.9);
`;

const CopyBtn = styled(motion.div)`
	display: flex;
	align-items: center;
	gap: 0.35rem;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
	font-size: 0.7rem;
	font-weight: 700;
	letter-spacing: 0.08em;
	text-transform: uppercase;
	padding: 0.35rem 0.8rem;
	border-radius: 2rem;
	background: ${props => props.$copied
		? "rgba(134, 239, 172, 0.2)"
		: "rgba(255, 255, 255, 0.12)"};
	color: ${props => props.$copied ? "#86efac" : "rgba(255,255,255,0.8)"};
	border: 1px solid ${props => props.$copied
		? "rgba(134, 239, 172, 0.4)"
		: "rgba(255,255,255,0.2)"};
	backdrop-filter: blur(4px);
	transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
	white-space: nowrap;
	user-select: none;
`;

const Toast = styled(motion.div)`
	position: absolute;
	top: 1rem;
	left: 50%;
	background: rgba(15, 20, 30, 0.95);
	backdrop-filter: blur(1rem);
	border: 1px solid rgba(134, 239, 172, 0.35);
	color: #86efac;
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
	font-size: 0.8rem;
	font-weight: 600;
	padding: 0.5rem 1.25rem;
	border-radius: 2rem;
	white-space: nowrap;
	z-index: 10;
	box-shadow: 0 4px 24px rgba(0,0,0,0.4);
`;

const BankCard = ({ bank, onCopy }) => {
	const [copied, setCopied] = useState(false);
	const shineControls = useAnimation();

	const handleClick = async () => {
		try {
			await navigator.clipboard.writeText(bank.iban);
		} catch {
			const el = document.createElement("textarea");
			el.value = bank.iban;
			document.body.appendChild(el);
			el.select();
			document.execCommand("copy");
			document.body.removeChild(el);
		}
		setCopied(true);
		onCopy(bank.name);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleHoverStart = () => {
		shineControls.start({
			left: "130%",
			transition: { duration: 0.55, ease: "easeInOut" },
		});
	};

	const handleHoverEnd = () => {
		shineControls.set({ left: "-80%" });
	};

	return (
		<CardOuter
			$shadow={bank.shadow}
			onClick={handleClick}
			onHoverStart={handleHoverStart}
			onHoverEnd={handleHoverEnd}
			whileHover={{ y: -4, scale: 1.01 }}
			whileTap={{ scale: 0.97 }}
			transition={{ type: "spring", stiffness: 350, damping: 22 }}
		>
			<CardInner $gradient={bank.gradient}>
				<DecorCircle $big />
				<DecorCircle />
				<Shine animate={shineControls} initial={{ left: "-80%" }} />

				<CardTop>
					<Chip />
					<BankName>{bank.name}</BankName>
				</CardTop>

				<IBANSection>
					<IBANLabel>IBAN</IBANLabel>
					<IBANNumber $copied={copied}>
						{formatIBAN(bank.iban)}
					</IBANNumber>
				</IBANSection>

				<CardBottom>
					<HolderSection>
						<HolderLabel>Hesap Sahibi</HolderLabel>
						<HolderName>{bank.holder}</HolderName>
					</HolderSection>
					<CopyBtn
						$copied={copied}
						whileTap={{ scale: 0.94 }}
					>
						{copied ? "✓ Kopyalandı" : "Kopyala"}
					</CopyBtn>
				</CardBottom>
			</CardInner>
		</CardOuter>
	);
};

const IBANContent = () => {
	const [toast, setToast] = useState(null);

	const handleCopy = name => {
		setToast(name);
		setTimeout(() => setToast(null), 2200);
	};

	return (
		<BodyContent>
			<Wrapper>
				<AnimatePresence>
					{toast && (
						<Toast
							key="toast"
							initial={{ opacity: 0, y: -10, x: "-50%", scale: 0.9 }}
							animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
							exit={{ opacity: 0, y: -6, x: "-50%", scale: 0.95 }}
							transition={{ type: "spring", stiffness: 450, damping: 28 }}
						>
							✓ {toast} IBAN kopyalandı
						</Toast>
					)}
				</AnimatePresence>

				{banks.map((bank, i) => (
					<motion.div
						key={bank.name}
						style={{ width: "100%", display: "flex", justifyContent: "center" }}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ type: "spring", stiffness: 280, damping: 22, delay: i * 0.1 }}
					>
						<BankCard bank={bank} onCopy={handleCopy} />
					</motion.div>
				))}
			</Wrapper>
		</BodyContent>
	);
};

export default IBANContent;
