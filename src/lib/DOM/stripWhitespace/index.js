import helpers from "lib/DOM/helpers"

// Creates a new whitespace regex based on the current depth.
function newWhitespaceRe(currentDepth) {
	const d = currentDepth
	return new RegExp(`\\n\\t{${d - 1},${d}}`, "g")
}

// on.nodeValue = on.nodeValue.replace(/\n\t*/g, "")

// Strips whitespace from a tree.
//
// <p>
//   ... -> <p>...</p>
// </p>
//
function stripWhitespace(tree) {
	const recurse = (on, depth = 0) => {
		if (helpers.isTextNode(on)) {
			const regex = newWhitespaceRe(depth)
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

export default stripWhitespace
