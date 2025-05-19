/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: '#e2e8f0 ',
				secondary: '#b4c6d8',
				accent: '#3b82f6',
				main: '#1d4ed8',
				back: '#09122a',
				danger: '#b91c1c'
			},
			fontFamily: {
				sans: ['var(--font-inter)'],
			},
			backgroundImage: {
				'parallax-1': "url('/statics/parallax-1.webp')",
			},
		},
	},
	plugins: [],
}
