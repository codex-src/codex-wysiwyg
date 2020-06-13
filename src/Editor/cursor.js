import ascendToUUIDElement from "./ascend"

// Creates a new cursor.
export function newCursor() {
	const cursor = {
		uuid: "",
		offset: 0,
	}
	return cursor
}

// Computes a cursor from a UUID element and a range
// container and offset.
function computeCursor(uuidElement, { container, offset }) {

	if (container.nodeType === Node.ELEMENT_NODE /* && offset === container.childNodes.length */) {
		throw new Error("FIXME")
		// container = container.nextSibling
		// if (!container) {
		// 	throw new Error("computeCursor: no such container.nextSibling")
		// }
		// offset = 0
	}

	const cursor = newCursor()
	if (!uuidElement.id) {
		throw new Error("computeCursor: no such uuid")
	}
	// Recurses on a DOM node, mutates cursor.
	const recurse = startDOMNode => {
		// TODO: Guard non-text nodes?
		if (startDOMNode === container) {
			Object.assign(cursor, {
				uuid: uuidElement.id,
				offset: cursor.offset + offset,
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
			cursor.offset += domNode.nodeType === Node.TEXT_NODE &&
				domNode.textContent.length
		}
		return false
	}
	recurse(uuidElement)
	return cursor
}

// Computes cursors from the selection API range.
export function computeCursors() {
	const selection = document.getSelection()
	if (!selection || !selection.rangeCount) {
		return null
	}
	const range = selection.getRangeAt(0)
	const startCursor = computeCursor(ascendToUUIDElement(range.startContainer), { container: range.startContainer, offset: range.startOffset })
	let endCursor = startCursor
	if (!range.collapsed) {
		endCursor = computeCursor(ascendToUUIDElement(range.endContainer), { container: range.endContainer, offset: range.endOffset })
	}
	return [startCursor, endCursor]
}
