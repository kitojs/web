import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

export default defineConfig({
	integrations: [
		starlight({
			title: 'Kito',
			description: '🐺 The high-performance, type-safe and modern TypeScript web framework written in Rust.',
			favicon: '/favicon.png',
			social: {
				github: 'https://github.com/kitojs/kito'
			}
		})
	]
})
