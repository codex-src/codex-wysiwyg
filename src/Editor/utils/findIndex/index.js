import JSONClone from "lib/JSON/JSONClone"

// Finds (or creates) an index for children at an offset.
function findIndex(children, offset) {
	// Guard offset=0 (at start):
	if (!offset) {
		return 0
	}
	let x = 0
	let each = null
	for ([x, each] of children.entries()) {
		if (offset - each.props.children.length <= 0) {
			break
		}
		offset -= each.props.children.length
	}
	// Guard offset=each.props.children.length (at end):
	if (offset === each.props.children.length) {
		return x + 1
	}
	const current = {
		...JSONClone(each),
		props: {
			...each.props,
			children: each.props.children.slice(0, offset),
		},
	}
	const next = {
		...JSONClone(each),
		props: {
			...each.props,
			children: each.props.children.slice(offset),
		},
	}
	children.splice(x, 1, current, next)
	return x + 1
}

export default findIndex
