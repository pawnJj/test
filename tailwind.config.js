/** @type {import('tailwindcss').Config} */
import {heroui} from "@heroui/react";
const config = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		screens: {
			sm: '576px',
			md: '960px',
			lg: '1440px',
		},
		extend: {},
	},
	darkMode: "selector",
  	plugins: [heroui()],
}

export default config;