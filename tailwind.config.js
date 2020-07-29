module.exports = {
	purge: [
		"./public/**/*.html",
		"./src/**/*.js",
	],
	theme: {
		extend: {},
	},
	variants: {
		// https://github.com/tailwindlabs/tailwindcss-typography/issues/46
		typography: [],
	},
	plugins: [
		require("@tailwindcss/ui"),
	],
}
