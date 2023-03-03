/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				customblack: "#212121",
				customwhite: "#e4e4e4",
				"custom-gray": "#383838",
				customlight: "#f1f3f4",
				green: "#008000",
				yellow: "#ffff00",
				red: "#ff0000",
			},
		},
	},
	plugins: [require("@tailwindcss/line-clamp")],
}
