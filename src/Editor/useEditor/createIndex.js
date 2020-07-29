import JSONClone from "lib/JSON/JSONClone"
import textContent from "./textContent"

// Creates a text node at a text offset and returns the
// created text node offset.
function createIndex(children, textOffset) {
	if (!children.length) {
		children.push({
			types: {},
			props: {
				children: "",
			},
		})
		return 0
	} else if (!textOffset) {
		return 0
	} else if (textOffset === textContent(children).length) {
		return children.length
	}
	let nodeOffset = 0
	for (; nodeOffset < children.length; nodeOffset++) {
		if (textOffset - children[nodeOffset].props.children.length <= 0) {
			// No-op
			break
		}
		textOffset -= children[nodeOffset].props.children.length
	}
	// At the end of a node:
	if (textOffset - children[nodeOffset].props.children.length === 0) {
		return nodeOffset + 1
	}
	const curr = {
		...JSONClone(children[nodeOffset]),
		props: {
			...children[nodeOffset].props,
			children: children[nodeOffset].props.children.slice(0, textOffset),
		},
	}
	const next = {
		...JSONClone(children[nodeOffset]),
		props: {
			...children[nodeOffset].props,
			children: children[nodeOffset].props.children.slice(textOffset),
		},
	}
	children.splice(nodeOffset, 1, curr, next)
	return nodeOffset + 1
}

export default createIndex
