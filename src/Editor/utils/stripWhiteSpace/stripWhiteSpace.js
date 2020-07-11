import domUtils from "lib/domUtils"

// Creates a new whitespace regex based on the current depth.
function newWhiteSpaceRe(currentDepth) {
	const d = currentDepth
	return new RegExp(`\\n\\t{${d}}|\\n\\t{${d - 1},${d}}`, "g")
}

// Strips whitespace from a tree.
//
// <p>
//   ... -> <p>...</p>
// </p>
//
function stripWhiteSpace(tree) {
	const recurse = (on, depth = 0) => {
		if (domUtils.isTextNode(on)) {
			const regex = newWhiteSpaceRe(depth)
			on.nodeValue = on.nodeValue.replace(regex, "")
			if (!on.nodeValue) {
				on.remove()
			}
			return
		}
		// NOTE: Uses reverse(...) because of remove(...).
		for (const each of [...on.childNodes].reverse()) {
			recurse(each, depth + 1)
		}
	}
	recurse(tree)
	return tree
}

export default stripWhiteSpace
