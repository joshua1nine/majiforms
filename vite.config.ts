const path = require('path');
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import mix from 'vite-plugin-mix';
import vitePluginRequire from 'vite-plugin-require';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/maji-forms/index.ts'),
			name: 'MajiForms',
			fileName: (format) => `maji-forms.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
		},
	},
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
