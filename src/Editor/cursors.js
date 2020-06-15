import ascendToUUIDElement from "./ascendToUUIDElement"

// Creates a new VDOM cursor.
export function newVDOMCursor() {
	const cursor = {
		uuid: "",
		offset: 0,
	}
	return cursor
}

// Computes a VDOM cursor from a UUID element and a range
// container and offset.
function computeVDOMCursor(uuidElement, { container, offset }) {
	while (container.nodeType === Node.ELEMENT_NODE && container.childNodes.length) {
		if (offset === container.childNodes.length) {
			offset = Math.min(0, container.childNodes.length - 1)
		}
		container = container.childNodes[offset]
		offset = 0
	}
	const cursor = newVDOMCursor()
	if (!uuidElement.id) {
		throw new Error("computeVDOMCursor: no such uuid")
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

// Computes VDOM cursors from the current range.
export function computeVDOMCursors() {
	// Get the current range:
	const selection = document.getSelection()
	if (!selection || !selection.rangeCount) {
		return null
	}
	const range = selection.getRangeAt(0)
	// Compute cursors:
	const cursors = []
	cursors.push(computeVDOMCursor(ascendToUUIDElement(range.startContainer), {
		container: range.startContainer,
		offset: range.startOffset,
	}))
	if (range.collapsed) {
		cursors.push(cursors[0])
	} else {
		cursors.push(computeVDOMCursor(ascendToUUIDElement(range.endContainer), {
			container: range.endContainer,
			offset: range.endOffset,
		}))
	}
	return cursors
}
