// Creates a new DOM range.
export function newDOMRange() {
	const range = {
		container: null,
		offset: 0,
	}
	return range
}

// Returns whether a DOM node is a text node or a break
// element.
function isTextNodeOrBreakElement(domNode) {
	const ok = (
		domNode.nodeType === Node.TEXT_NODE ||
		(domNode.nodeType === Node.ELEMENT_NODE && domNode.nodeName === "BR")
	)
	return ok
}

// Computes a DOM range from a VDOM cursor.
export function computeDOMRange({ uuid, offset }) { // NOTE: Copy offset -- do not mutate reference
	const range = newDOMRange()
	const uuidElement = document.getElementById(uuid)
	if (!uuidElement) {
		throw new Error("computeDOMRange: no such uuid element")
	}
	// Recurses on a DOM node, mutates range.
	const recurse = startDOMNode => {
		if (isTextNodeOrBreakElement(startDOMNode) && offset - startDOMNode.textContent.length <= 0) {
			Object.assign(range, {
				container: startDOMNode,
				offset,
			})
			return true
		}
		for (const domNode of startDOMNode.childNodes) {
			if (domNode.nodeType === Node.ELEMENT_NODE && domNode.getAttribute("contenteditable") === "false") {
				// No-op
				continue
			} else if (recurse(domNode)) {
				return true
			}
			offset -= domNode.nodeType === Node.TEXT_NODE &&
				domNode.textContent.length
		}
		return false
	}
	recurse(uuidElement)
	return range
}
