import {
	newCursor,
	newRange,
} from "./constructors"

// Computes a VDOM cursor from an element and a DOM range.
export function computeCursor(element, { container, offset }) {
	const cursor = newCursor()
	if (!element.id) {
		throw new Error("computeCursor: no such id")
	}
	// Iterate to the container and increment cursor.offset:
	let domNode = element.childNodes[0]
	while (domNode) {
		if (domNode === container || domNode.contains(container)) {
			// No-op
			break
		}
		cursor.offset += domNode.textContent.length
		domNode = domNode.nextSibling
	}
	Object.assign(cursor, {
		uuid: element.id,
		offset: cursor.offset + offset,
	})
	return cursor
}

// Computes a DOM range from a VDOM cursor.
export function computeRange({ uuid, offset }) {
	const range = newRange()
	const element = document.getElementById(uuid)
	if (!element) {
		throw new Error("computeRange: no such element")
	}
	// Iterate to the container and offset:
	let container = element.childNodes[0]
	while (container && offset) {
		if (offset - container.textContent.length <= 0) {
			// No-op
			break
		}
		offset -= container.textContent.length
		container = container.nextSibling
	}
	// Iterate to the text node:
	while (container.nodeType === Node.ELEMENT_NODE && container.childNodes.length) {
		container = container.childNodes[container.childNodes.length - 1]
	}
	Object.assign(range, {
		container,
		offset,
	})
	return range
}
