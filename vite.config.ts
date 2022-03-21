import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mix from 'vite-plugin-mix';
import vitePluginRequire from 'vite-plugin-require';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		mix({
			handler: './src/api.ts',
		}),
		vitePluginRequire({
			// @fileRegex RegExp
			// optional：default file processing rules are as follows
			// fileRegex:/(.jsx?|.tsx?|.vue)$/
		}),
	],
});
