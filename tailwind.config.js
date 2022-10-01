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
				'twitter-accent': {
					'sky': '#1D9BF0',
					'sky200': '#1a8cd8',
					'yellow': '#FFD400',
					'yellow200': '#E6BF00',
					'pink': '#F91880',
					'pink200': '#E01672',
					'purple': '#7856FF',
					'purple200': '#6C4DE6',
					'orange': '#FD7A00',
					'orange200': '#E66E00',
					'avocado': '#19BA7C',
					'avocado200': '#16A770'
				},
				'twitter-white': {
					'50': '#F7F9F9',
					'100': '#e7e9ea',
					'200': '#eff3f4',
					'300': '#F7F7F7'
				},
				'twitter-black': {
					'btn-hover': '#15202b',
					'100': '#0F1419',
					'200': '#000D1A',
					'300': '#080808'
				},
				'twitter-gray': {
					'btn-hover': '#EAEAEA',
					'100': '#536471',
					'200': '#38444d',
				},
				'twitter-overlay': {
					'100': '#5b708366'
				}
			}
		},
  },
	plugins: [],
}
