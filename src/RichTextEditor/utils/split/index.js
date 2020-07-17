import JSONClone from "lib/JSON/JSONClone"

// Reads text content.
function textContent(children) {
	return children.reduce((acc, each) => acc += each, "")
}

// Splits (mutates) children at an offset.
function split(children, offset) {
	if (!offset) {
		return 0
	} else if (offset === textContent(children).length) {
		return children.length
	}
	let x = 0
	let each = null
	for ([x, each] of children.entries()) {
		if (offset - each.props.children.length <= 0) {
			if (offset === each.props.children.length) {
				return x + 1
			}
			break
		}
		offset -= each.props.children.length
	}
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
