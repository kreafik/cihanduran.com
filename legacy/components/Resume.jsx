import React, { Suspense, lazy } from "react";
import Default from "@components/Default";
import Loader from "@elements/Loader/Loader";
import SEO from "@components/SEO";
const ResumeContent = lazy(() => import("@elements/Resume/ResumeContent"));

const Resume = () => {
	return (
		<>
			<SEO
				title="CV — Deneyim & Yetenekler"
				description="Cihan Duran CV: Bodrum'da web tasarım, yazılım geliştirme, grafik tasarım, drone ve fotoğrafçılık alanlarındaki deneyim ve yetenekler."
				canonical="/resume"
			/>
			<Default height="90%" heading="Resume" resizable={false} programName="Resume">
				<Suspense fallback={<Loader />}>
					<ResumeContent />
				</Suspense>
			</Default>
		</>
	);
};

export default Resume;
