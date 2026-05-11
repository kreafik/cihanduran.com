import React, { Suspense, lazy } from "react";
import Default from "@components/Default";
import Loader from "@elements/Loader/Loader";
import SEO from "@components/SEO";
const GitContent = lazy(() => import("@elements/Git/GitContent"));

const Resume = () => {
	return (
		<>
			<SEO
				title="GitHub Projeleri"
				description="Cihan Duran'ın Bodrum'da geliştirdiği yazılım projeleri. Web uygulamaları, tasarım araçları ve açık kaynak projeler."
				canonical="/git"
			/>
			<Default heading="git log" contextMenu={true} resizable={false} programName="Git Log">
				<Suspense fallback={<Loader />}>
					<GitContent />
				</Suspense>
			</Default>
		</>
	);
};

export default Resume;
