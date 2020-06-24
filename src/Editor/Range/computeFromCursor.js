import construct from "./constructor"
import domUtils from "lib/domUtils"

// Computes a DOM range from a cursor.
function computeFromCursor({ key, offset }) {
	const domElement = document.getElementById(key)
	if (!domElement) {
		throw new Error("Range.computeFromCursor: no such element")
	}
	const range = construct()
	const recurse = onDOMNode => {
		if (domUtils.isTextNodeOrBrElement(onDOMNode) && offset - (onDOMNode.nodeValue || "").length <= 0) {
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

export default computeFromCursor
