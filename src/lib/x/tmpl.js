// Trims whitespace, no-ops undefined, false, and null, and
// throws on non-null objects.
function tmpl(tmplArr, ...args) {
	let className = ""
	const max = Math.max(tmplArr.length, args.length)
	for (let x = 0; x < max; x++) {
		if (x < tmplArr.length) {
			for (const substr of tmplArr[x].split(/\s+/g).filter(Boolean)) {
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

export default tmpl
