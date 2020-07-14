const attrs = {
	// https://davidwalsh.name/disable-autocorrect
	code: {
		autoCapitalize: "off",
		autoComplete: "off",
		autoCorrect: "off",
		spellCheck: false,
	},
	// https://mathiasbynens.github.io/rel-noopener
	a: {
		target: "_blank",
		rel: "noopener noreferrer",
	},
}

export default attrs
