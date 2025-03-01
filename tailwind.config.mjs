/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: '#e2e8f0 ',
				secondary: '#dfe2e0',
				accent: '#0284c7',
			},
			fontFamily: {
				sans: ['var(--font-inter)'],
			},
			backgroundImage: {
				'parallax-1': "url('/statics/parallax-1.avif')",
			},
		},
	},
	plugins: [],
}
