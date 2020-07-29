import textContent from "./textContent"

// Creates a text node at a text offset and returns the node
// offset for the created text node.

// Converts a text offset to a node offset.
function getIndex(children, textOffset) {
	if (!children.length) {
		if (process.env.NODE_ENV !== "test") {
			throw new Error("FIXME")
		}
		return -1
	} else if (!textOffset) {
		return 0
	} else if (textOffset === textContent(children).length) {
		return children.length - 1
	}
	let nodeOffset = 0
	for (; nodeOffset < children.length; nodeOffset++) {
		if (textOffset - children[nodeOffset].props.children.length <= 0) {
			// No-op
			break
		}
		textOffset -= children[nodeOffset].props.children.length
	}
	return nodeOffset
}

export default getIndex
