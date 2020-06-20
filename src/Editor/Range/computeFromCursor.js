import construct from "./constructor"

// if (domNode.nodeType === Node.ELEMENT_NODE && domNode.getAttribute("contenteditable") === "false") {
// 	// No-op
// 	continue
// }

// Computes a range from a cursor.
function computeFromCursor({ key, offset }) { // Destructures cursor to mutate offset
	const domIDElement = document.getElementById(key)
	if (!domIDElement) {
		throw new Error("Range.computeFromCursor: no such element")
	}
	const range = construct()
	const recurse = onDOMNode => {
		if (offset - (onDOMNode.nodeValue || "").length <= 0) {
			Object.assign(range, {
				container: onDOMNode,
				offset,
			})
			return true
		}
		for (const each of onDOMNode.childNodes) {
			if (recurse(each)) {
				return true
			}
			offset -= each.nodeType === Node.TEXT_NODE &&
				each.nodeValue.length
		}
		return false
	}
	recurse(domIDElement)
	return range
}

export default computeFromCursor
