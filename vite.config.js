import { defineConfig, transformWithEsbuild } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [
		{
			name: "treat-js-files-as-jsx",
			async transform(code, id) {
				if (!id.match(/node_modules/) && id.endsWith(".js")) {
					return transformWithEsbuild(code, id, {
						loader: "jsx",
						jsx: "automatic",
					});
				}
			},
		},
		react(),
	],
	optimizeDeps: {
		force: true,
		esbuildOptions: {
			loader: {
				".js": "jsx",
			},
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		"@components": path.resolve(__dirname, "src/components"),
			"@contexts": path.resolve(__dirname, "src/contexts"),
			"@elements": path.resolve(__dirname, "src/elements"),
			"@styles": path.resolve(__dirname, "src/styles"),
			"@utils": path.resolve(__dirname, "src/utils"),
			"@static": path.resolve(__dirname, "src/static"),
			"@pages": path.resolve(__dirname, "src/pages"),
		},
	},
});
