import textContent from "./textContent"

// Gets an index for children at an offset.
function getIndex(children, offset) {
	if (!children.length) {
		if (process.env.NODE_ENV !== "test") {
			throw new Error("getIndex: FIXME")
		}
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

export default getIndex
