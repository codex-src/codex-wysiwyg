import JSONClone from "lib/JSON/JSONClone"
import textContent from "../utils/textContent"

// Non-idempotent function; creates an index for an offset.
// See getIndexAtOffset for idempotent version.
function createIndexAtOffset(children, offset) {
	// Eager returns:
	if (!children.length) {
		return -1
	} else if (!offset) {
		return 0
	} else if (offset === textContent(children).length) {
		return children.length
	}
	let x = 0
	for (; x < children.length; x++) {
		if (offset - children[x].props.children.length <= 0) {
			// No-op
			break
		}
		offset -= children[x].props.children.length
	}
	// At the edge of a text node:
	if (offset - children[x].props.children.length === 0) {
		return x + 1
	}
	const curr = {
		...JSONClone(children[x]),
		props: {
			...children[x].props,
			children: children[x].props.children.slice(0, offset),
		},
	}
	const next = {
		...JSONClone(children[x]),
		props: {
			...children[x].props,
			children: children[x].props.children.slice(offset),
		},
	}
	children.splice(x, 1, curr, next)
	return x + 1
}

export default createIndexAtOffset
