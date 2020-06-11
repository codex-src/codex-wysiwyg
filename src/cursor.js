// Computes a VDOM cursor data structure from an element and
// range container and offset.
export function computeCursor(element, { container, offset }) {
	const cursor = {
		element: 0,
		character: offset,
	}
	let domNode = element.childNodes[0]
	while (domNode) {
		if (domNode === container || domNode.contains(container)) {
			// No-op
			break
		}
		cursor.character += domNode.textContent.length
		domNode = domNode.nextSibling
	}
	return cursor
}

// Computes a DOM range data structure from an element.
export function computeRange(element, characterOffset) {
	let container = element.childNodes[0]
	let offset = characterOffset
	// Iterate to container and offset:
	while (container && offset) {
		if (offset - container.textContent.length <= 0) {
			// No-op
			break
		}
		offset -= container.textContent.length
		container = container.nextSibling
	}
	// Iterate to text node:
	while (container.nodeType === Node.ELEMENT_NODE && container.childNodes.length) {
		container = container.childNodes[container.childNodes.length - 1]
	}
	return { container, offset }
}
