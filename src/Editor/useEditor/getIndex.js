import textContent from "./textContent"

// Gets the text node offset for a text offset.
function getIndex(children, textOffset) {
	if (!children.length) {
		if (process.env.NODE_ENV !== "test") {
			throw new Error("getIndex: FIXME")
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
