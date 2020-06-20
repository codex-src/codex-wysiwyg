import construct from "./constructor"

// if (domNode.nodeType === Node.ELEMENT_NODE && domNode.getAttribute("contenteditable") === "false") {
// 	// No-op
// 	continue
// }

// Computes a range from a selection cursor.
function computeFromSelectionCursor({ key, offset }) { // Destructures so offset can be mutated
	const domElement = document.getElementById(key)
	if (!domElement) {
		throw new Error("Range.computeFromSelectionCursor: no such element")
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
	recurse(domElement)
	return range
}

export default computeFromSelectionCursor
