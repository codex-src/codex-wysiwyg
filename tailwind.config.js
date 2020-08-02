const defaultTheme = require("tailwindcss/defaultTheme")

const { fontFamily: { mono, sans } } = defaultTheme

function trimWhitespace(str) {
	return str.split(/\s+/).join(" ").trim()
}

module.exports = {
	purge: [
		"./public/**/*.html",
		"./src/**/*.js",
	],
	theme: {
		extend: {
			boxShadow: {
				"hero-sm": trimWhitespace(`
					0 0 0 1px rgba(0, 0, 0, 0.05),
					0 1px 2px 0 rgba(0, 0, 0, 0.05)
				`),
				"hero": trimWhitespace(`
					0 0 0 1px rgba(0, 0, 0, 0.05),
					0 1px 3px 0 rgba(0, 0, 0, 0.1),
					0 1px 2px 0 rgba(0, 0, 0, 0.06)
				`),
				"hero-md": trimWhitespace(`
					0 0 0 1px rgba(0, 0, 0, 0.05),
					0 4px 6px -1px rgba(0, 0, 0, 0.1),
					0 2px 4px -1px rgba(0, 0, 0, 0.06)
				`),
				"hero-lg": trimWhitespace(`
					0 0 0 1px rgba(0, 0, 0, 0.05),
					0 10px 15px -3px rgba(0, 0, 0, 0.1),
					0 4px 6px -2px rgba(0, 0, 0, 0.05)
				`),
				"hero-xl": trimWhitespace(`
					0 0 0 1px rgba(0, 0, 0, 0.05),
					0 20px 25px -5px rgba(0, 0, 0, 0.1),
					0 10px 10px -5px rgba(0, 0, 0, 0.04)
				`),
				"hero-2xl": trimWhitespace(`
					0 0 0 1px rgba(0, 0, 0, 0.05),
					0 25px 50px -12px rgba(0, 0, 0, 0.25)
				`),
			},
			fontFamily: {
				// After Menlo:
				//
				// eslint-disable-next-line quotes
				mono: [...mono.slice(0, 1), '"Fira Code"', ...mono.slice(1)],

				// After system-ui, -apple-system, BlinkMacSystemFont:
				sans: [...sans.slice(0, 3), "Inter", ...sans.slice(3)],
			},
		},
	},
	variants: {
		typography: [],
	},
	plugins: [
		require("@tailwindcss/ui"),
	],
}
