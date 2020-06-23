import construct from "./constructor"

// if (domNode.nodeType === Node.ELEMENT_NODE && domNode.getAttribute("contenteditable") === "false") {
// 	// No-op
// 	continue
// }

// Returns whether a DOM node is a text node or a <br>
// element.
function isTextNodeOrBRElement(domNode) {
	const ok =(
		domNode.nodeType === Node.TEXT_NODE ||
		(domNode.nodeType === Node.ELEMENT_NODE && domNode.nodeName === "BR")
	)
	return ok
}

// Computes a DOM range from a cursor.
function computeFromCursor({ key, offset }) {
	const domElement = document.getElementById(key)
	if (!domElement) {
		throw new Error("Range.computeFromCursor: no such element")
	}
	const range = construct()
	const recurse = onDOMNode => {
		if (isTextNodeOrBRElement(onDOMNode) && offset - (onDOMNode.nodeValue || "").length <= 0) {
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
