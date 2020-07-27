import textContent from "../utils/textContent"

// Gets an index at an offset.
function getIndexAtOffset(children, offset) {
	// Eager returns:
	if (!children.length) {
		return -1
	} else if (!offset) {
		return 0
	} else if (offset === textContent(children).length) {
		return children.length - 1
	}
	let x = 0
	for (; x < children.length; x++) {
		if (offset - children[x].props.children.length <= 0) {
			// No-op
			break
		}
		offset -= children[x].props.children.length
	}
	return x
}

export default getIndexAtOffset
