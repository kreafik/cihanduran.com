import React from "react";
import styled from "styled-components";
import BodyContent from "@elements/Window/BodyContent";

const Iframe = styled.iframe`
	width: 100%;
	height: calc(100% - 2.225rem);
	border: none;
`;

const ResumeContent = () => {
	return (
		<BodyContent>
			<Iframe
				src="https://kreafik.com"
				frameBorder="0"
				title="Cihan's Resume"
			></Iframe>
		</BodyContent>
	);
};

export default ResumeContent;
