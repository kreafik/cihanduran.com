import React from "react";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import colors from "@styles/colors";
import Routes from "@pages/Routes";
import DataProvider from "@contexts/Data/DataProvider";

const App = () => {
	return (
		<HelmetProvider>
			<ThemeProvider theme={colors}>
				<DataProvider>
					<Routes />
				</DataProvider>
			</ThemeProvider>
		</HelmetProvider>
	);
};

export default App;
