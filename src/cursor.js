import ascendToUUIDElement from "./ascend"
import { newCursor } from "./constructors"

// Computes a cursor from an element and a range container
// and offset.
function computeCursor(element, { container, offset }) {
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

// Computes cursors from the selection API range.
function computeCursors() {
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

export default computeCursors
