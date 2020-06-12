import { newRange } from "./constructors"

// Computes a range container and offset from a cursor UUID
// and offset.
function computeRange({ uuid, offset }) {
	const range = newRange()
	const uuidElement = document.getElementById(uuid)
	if (!uuidElement) {
		throw new Error("computeRange: no such uuid element")
	}
	// Recurses on a DOM node, mutates range.
	const recurse = startDOMNode => {
		// TODO: if (pos - (on.nodeValue || "").length <= 0) {
		if (startDOMNode.nodeType === Node.TEXT_NODE && offset - startDOMNode.textContent.length <= 0) {
			Object.assign(range, {
				container: startDOMNode,
				offset,
			})
			return true
		}
		for (const domNode of startDOMNode.childNodes) {
			if (recurse(domNode)) {
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

export default computeRange
