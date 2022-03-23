import { resolve } from 'path';
import { defineConfig } from 'vite';
import { peerDependencies } from './package.json';
import react from '@vitejs/plugin-react';

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
			external: [...Object.keys(peerDependencies)],
			output: {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					react: 'React',
				},
			},
		},
		target: 'esnext',
		sourcemap: true,
	},
	plugins: [react()],
});
