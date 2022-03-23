import { resolve } from 'path';
import { defineConfig } from 'vite';
import { peerDependencies, dependencies } from './package.json';
import react from '@vitejs/plugin-react';
// import { VitePluginNode } from 'vite-plugin-node';
// import vitePluginRequire from 'vite-plugin-require';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/maji-forms/index.ts'),
			name: 'MajiForms',
			formats: ['es', 'cjs'],
			fileName: (format) => `maji-forms.${format}.js`,
		},
		rollupOptions: {
			external: [
				...Object.keys(peerDependencies),
				...Object.keys(dependencies),
			],
			output: {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					vue: 'React',
				},
			},
		},
		target: 'esnext',
		sourcemap: true,
	},
	plugins: [
		react(),
		// ...VitePluginNode({
		// 	adapter: 'express',
		// 	handler: './src/api.ts',
		// }),
		// vitePluginRequire({
		// 	// @fileRegex RegExp
		// 	// optional：default file processing rules are as follows
		// 	// fileRegex:/(.jsx?|.tsx?|.vue)$/
		// }),
	],
});
