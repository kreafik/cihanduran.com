import React, { Suspense, lazy } from "react";
import Default from "@components/Default";
import Loader from "@elements/Loader/Loader";
import SEO from "@components/SEO";
const TerminalContent = lazy(() =>
	import("@elements/Terminal/TerminalContent")
);

const Window = () => {
	return (
		<>
			<SEO
				title={null}
				description="Bodrum ve Muğla'da web tasarım, yazılım geliştirme, emlak ve tekne fotoğraf & video çekimi, drone çekimi hizmetleri. Cihan Duran ile profesyonel çözümler."
				canonical="/"
			/>
			<Default
				contextMenu={true}
				heading="cihanduran@portfolio: ~/Documents/portfolio — zsh — 100×35"
				programName="Terminal"
			>
				<Suspense fallback={<Loader />}>
					<TerminalContent />
				</Suspense>
			</Default>
		</>
	);
};

export default Window;
