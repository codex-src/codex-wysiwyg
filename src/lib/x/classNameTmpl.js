// Trims whitespace, no-ops undefined, false, and null, and
// throws on non-null objects.
function classNameTmpl(tmpl, ...args) {
	let className = ""
	const max = Math.max(tmpl.length, args.length)
	for (let x = 0; x < max; x++) {
		if (x < tmpl.length) {
			for (const substr of tmpl[x].split(/\s+/g).filter(Boolean)) {
				if (className) {
					className += " "
				}
				className += substr
			}
		}
		if (x < args.length) {
			if (args[x] !== null && typeof args[x] === "object") {
				throw new Error("...")
			}
			if (args[x] !== undefined && args[x] !== null && args[x] !== false) {
				if (className) {
					className += " "
				}
				className += args[x].toString()
			}
		}
	}
	return className
}

export default classNameTmpl
