const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
	purge: [
		"./public/**/*.html",
		"./src/**/*.js",
	],
	theme: {
		extend: {
			// https://tailwindcss.com/docs/font-family
			fontFamily: {
				sans: [
					...defaultTheme.fontFamily.sans.slice(0, 3),
					"Inter",
					...defaultTheme.fontFamily.sans.slice(3),
				],
			},
		},
	},
	variants: {
		// https://github.com/tailwindlabs/tailwindcss-typography/issues/46
		typography: [],
	},
	plugins: [
		require("@tailwindcss/ui"),
	],
}
