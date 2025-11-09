import { defineConfig } from 'astro/config'

import starlight from '@astrojs/starlight'
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	vite: {
		plugins: [tailwindcss()]
	},
	integrations: [
		starlight({
			title: 'Kito',
			description: '🐺 The high-performance, type-safe and modern TypeScript web framework written in Rust.',
			favicon: '/favicon.png',
			social: {
				github: 'https://github.com/kitojs/kito'
			}
		}),
	],
})
