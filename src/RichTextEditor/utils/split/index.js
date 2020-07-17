import JSONClone from "lib/JSON/JSONClone"

// Reads text content.
function textContent(children) {
	return children.reduce((acc, each) => acc += each, "")
}

// Splits (mutates) children at an offset.
function split(children, offset) {
	// Guard start:
	if (!offset) {
		return 0
	}
	// Guard end:
	const str = textContent(children)
	if (offset === str.length) {
		return children.length
	}

	let x = 0
	let each = null
	for ([x, each] of children.entries()) {
		if (offset - each.props.children.length <= 0) {
			// No-op
			break
		}
		offset -= each.props.children.length
	}

	// Return the next offset:
	if (offset === each.props.children.length) {
		return x + 1
	}

	// Cut the current span and return the next offset:
	const current = {
		...JSONClone(each),
		props: {
			children: each.props.children.slice(0, offset),
		},
	}
	const next = {
		...JSONClone(each),
		props: {
			children: each.props.children.slice(offset),
		},
	}
	children.splice(x, 1, current, next)
	return x + 1
}

export default split
