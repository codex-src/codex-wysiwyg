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
				sans: [
					"-apple-system",
					"BlinkMacSystemFont",
					"Inter",
					...defaultTheme.fontFamily.sans,
				],
			},
			// https://youtube.com/watch?v=jl_tdhBxc_Y
			spacing: {
				"2/1":   "200%",
				"16/9":  "177.7778%",
				"16/10": "160%",
				"3/2":   "150%",
				"4/3":   "133.3333%",
				"5/4":   "125%",
				"1/1":   "100%",
				"4/5":   "80%",
				"3/4":   "75%",
				"2/3":   "66.6667%",
				"10/16": "62.5%",
				"9/16":  "56.25%",
				"1/2":   "50%",
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
	variants: {
		...defaultVariants,
		backgroundColor: [...defaultVariants.backgroundColor, "active", "group-hover", "group-focus"],
		boxShadow: [...defaultVariants.boxShadow, "active", "group-hover", "group-focus"],
		opacity: [...defaultVariants.opacity, "active", "group-hover", "group-focus"],
		textColor: [...defaultVariants.textColor, "active", "group-hover", "group-focus"],
	},
	plugins: [
		require("@tailwindcss/ui"),
	],
}
