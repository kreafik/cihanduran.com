import React from "react";
import styled from "styled-components";
import theme from "@styles/theme";

const Wrapper = styled.div`
	display: flex;
	flex: 1;
	max-width: 100%;
	height: 100%;
	border-radius: 0 0 0.6rem 0.6rem;
	border: 1px solid ${theme.bodyBorder};
	align-items: center;
	justify-content: center;
`;

const Container = styled.div`
	position: relative;
	width: clamp(20rem, 30rem, 85vw);
`;

const MainSection = styled.ol`
	list-style: none;
	padding: 0.5rem;
	font-size: 1rem;

	background: rgba(32, 33, 39, 0.25);
	box-shadow: inset 0 0 0.1em rgb(255 255 255 / 50%);
	border: solid 1px rgba(40, 40, 40, 0.175);
	border-radius: 0.5rem;
	margin: 1.25rem 1rem;
	a {
		color: #c9cbdb;
		text-decoration: none;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
	li {
		padding: 0.25rem 0.75rem;
		cursor: pointer;
		display: flex;
		border-radius: 0.25rem;
	}
	li:not(:last-child) {
		margin-bottom: 0.5rem;
	}
	li:hover,
	li:active {
		background: #2a69c2;
		& a {
			color: #fff;
		}
		svg {
			color: rgb(255, 255, 255, 1);
		}
	}
	svg {
		display: inline;
		color: rgb(255, 255, 255, 0.15);
	}
	span {
		vertical-align: baseline;
		font-weight: 600;
	}
`;

const ContactContent = () => {
	return (
		<Wrapper>
			<Container>
				<MainSection>
					<li>
						<a
							href="https://wa.me/905415755520"
							target="_blank"
							rel="noreferrer"
						>
							<span>WhatsApp</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M16.6 14c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.7-.3-1.4-.7-2-1.2-.5-.5-1-1.1-1.4-1.7-.1-.2 0-.4.1-.5.1-.1.2-.3.4-.4.1-.1.2-.3.2-.4.1-.1.1-.3 0-.4-.1-.1-.6-1.3-.8-1.8-.1-.7-.3-.7-.5-.7h-.5c-.2 0-.5.2-.6.3-.6.6-.9 1.3-.9 2.1.1.9.4 1.7 1 2.4 1.2 1.7 2.8 3 4.6 3.8.5.2.9.4 1.4.5.5.2 1 .2 1.6.1.7-.1 1.3-.6 1.7-1.2.2-.4.2-.8.1-1.2l-.3-.1m2.5-9.1C15.2 1 8.9 1 5 4.9c-3.2 3.2-3.8 8.1-1.6 12L2 22l5.3-1.4c1.5.8 3.1 1.2 4.7 1.2 5.5 0 9.9-4.4 9.9-9.9.1-2.6-1-5.1-2.8-7"/>
							</svg>
						</a>
					</li>
					<li>
						<a href="tel:+905415755520">
							<span>Telefon</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
							</svg>
						</a>
					</li>
					<li>
						<a
							href="mailto:tasarim@cihanduran.com?subject=Merhaba%20Cihan!&body=Sitenizden%20ulaşıyorum..."
							target="_blank"
							rel="noreferrer"
						>
							<span>E-Posta</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="currentColor"
							>
								<path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"></path>
							</svg>
						</a>
					</li>
				</MainSection>
			</Container>
		</Wrapper>
	);
};

export default ContactContent;
