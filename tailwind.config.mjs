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
				'parallax-2': "url('/statics/parallax-2.webp')",
				'parallax-3': "url('/statics/parallax-3.webp')",
				'parallax-4': "url('/statics/parallax-4.webp')",
				'parallax-5': "url('/statics/parallax-5.webp')",
				'parallax-6': "url('/statics/parallax-6.webp')",
				'parallax-7': "url('/statics/parallax-7.webp')",
			},
		},
	},
	plugins: [],
}
