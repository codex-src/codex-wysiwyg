import domUtils from "lib/domUtils"

// Decorates a tree; removes extraneous tabs and EOLs.
//
// ^                      - BOF
//   \n                   - EOL
//   \t{depth}            - $depth tabs
// |                      - OR
//   \n                   - EOL
//   \t{depth - 1, depth} - $depth - 1 to $depth tabs
// $                      - EOF
//
function decorator(tree) {
	const recurse = (on, depth = -1) => {
		if (domUtils.isTextNode(on)) {
			const tabsRe = new RegExp(`^\\n\\t{${depth}}|\\n\\t{${Math.max(0, depth - 1)},${depth}}?$`, "g")
			on.nodeValue = on.nodeValue.replace(tabsRe, "")
			if (!on.nodeValue) {
				on.remove()
			}
			return
		}
		// NOTE: Uses reverse because of remove.
		for (const each of [...on.childNodes].reverse()) {
			recurse(each, depth + 1)
		}
	}
	recurse(tree)
	return tree
}

export default decorator
