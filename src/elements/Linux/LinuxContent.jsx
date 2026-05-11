import React from "react";
import styled from "styled-components";
import BodyContent from "@elements/Window/BodyContent";
import theme from "@styles/theme";

const Placeholder = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: ${theme.bodyFont4};
	font-family: "Hack", monospace;
	gap: 1rem;

	p {
		color: ${theme.bodyFont2};
		font-size: 0.9rem;
	}
`;

const LinuxContent = () => {
	return (
		<BodyContent>
			<Placeholder>
				<span>🐧 QEMU Emülatörü</span>
				<p>Bu özellik yapım aşamasındadır...</p>
			</Placeholder>
		</BodyContent>
	);
};

export default LinuxContent;
