/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{html,ts}",
	],
	darkMode: 'class',
  theme: {
		extend: {
			colors: {
				'twitter-sky': {
					'100': '#1d9bf0',
					'200': '#1a8cd8'
				},
				'twitter-white': {
					'100': '#e7e9ea',
					'200': '#eff3f4'
				},
				'twitter-black': {
					'btn-hover': '#15202b',
					'100': '#0F1419'
				},
				'twitter-gray': {
					'btn-hover': '#EAEAEA',
					'100': '#536471',
					'200': '#38444d'
				}
			}
		},
  },
	plugins: [],
}
