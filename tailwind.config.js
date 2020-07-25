const defaultTheme = require("tailwindcss/defaultTheme")
const defaultVariants = require("./tailwind-variants")

module.exports = {
	purge: [
		"./public/**/*.html",
		"./src/**/*.js",
	],
	theme: {
		extend: {
			fontFamily: {
				mono: ["Menlo", "'IBM Plex Mono'", ...defaultTheme.fontFamily.mono],
				sans: ["-apple-system", "BlinkMacSystemFont", "Inter", ...defaultTheme.fontFamily.sans],
			},
		},
		screens: {
			xs: `${24 + 512 + 24}px`,
			// => @media (min-width: 560px) { ... }

			sm: `${24 + 640 + 24}px`,
			// => @media (min-width: 688px) { ... }

			md: `${24 + 768 + 24}px`,
			// => @media (min-width: 816px) { ... }

			lg: `${24 + 1024 + 24}px`,
			// => @media (min-width: 1072px) { ... }

			xl: `${24 + 1280 + 24}px`,
			// => @media (min-width: 1328px) { ... }

			dark: { raw: "(prefers-color-scheme: dark)" },
			// => @media (prefers-color-scheme: dark) { ... }
		},
	},
	plugins: [
		require("@tailwindcss/ui"),
	],
}
