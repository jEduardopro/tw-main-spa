/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{html,ts}",
	],
  theme: {
		extend: {
			colors: {
				'twitter-sky': {
					'100': '#1d9bf0',
					'200': '#1a8cd8'
				}
			}
		},
  },
	plugins: [],
}
