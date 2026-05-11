import React, { Suspense, lazy } from "react";
import Default from "@components/Default";
import Loader from "@elements/Loader/Loader";
import SEO from "@components/SEO";
const ProjectsContent = lazy(() =>
	import("@elements/Projects/ProjectsContent")
);

const Projects = () => {
	return (
		<>
			<SEO
				title="Projeler — Web Tasarım & Yazılım"
				description="Cihan Duran'ın Bodrum merkezli web tasarım, yazılım geliştirme ve dijital tasarım projeleri."
				canonical="/projects"
			/>
			<Default height="90%" heading="Projects" resizable={false} programName="Projects">
				<Suspense fallback={<Loader />}>
					<ProjectsContent />
				</Suspense>
			</Default>
		</>
	);
};

export default Projects;
