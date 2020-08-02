import JSONClone from "lib/JSON/JSONClone"
import textContent from "./textContent"

// Gets an index for children at an offset. Note that this
// function is non-idempotent.
function getIndexNonIdempotent(children, offset) {
	if (!children.length) {
		children.push({
			types: {},
			props: {
				children: "",
			},
		})
		return 0
	}

	if (!offset) {
		return 0
	} else if (offset === textContent(children).length) {
		return children.length
	}
	let nodeOffset = 0
	for (; nodeOffset < children.length; nodeOffset++) {
		if (offset - children[nodeOffset].props.children.length <= 0) {
			// No-op
			break
		}
		offset -= children[nodeOffset].props.children.length
	}
	// At the end of a node:
	if (offset - children[nodeOffset].props.children.length === 0) {
		return nodeOffset + 1
	}
	const curr = {
		...JSONClone(children[nodeOffset]),
		props: {
			...children[nodeOffset].props,
			children: children[nodeOffset].props.children.slice(0, offset),
		},
	}
	const next = {
		...JSONClone(children[nodeOffset]),
		props: {
			...children[nodeOffset].props,
			children: children[nodeOffset].props.children.slice(offset),
		},
	}
	children.splice(nodeOffset, 1, curr, next)
	return nodeOffset + 1
}

export default getIndexNonIdempotent
