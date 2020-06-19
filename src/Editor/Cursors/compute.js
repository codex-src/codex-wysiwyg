import create from "./constructor"

// Ascends to the closest DOM element.
function closestElement(domNode) {
	if (domNode.nodeType !== Node.ELEMENT_NODE) {
		return domNode.parentElement
	}
	return domNode
}

// Ascends to the closest DOM element with an ID.
function closestIDElement(domNode) {
	let domElement = closestElement(domNode)
	while (domElement && domElement.getAttribute("id") === null) {
		domElement = domElement.parentElement
	}
	return domElement
}

// // FIXME: contenteditable?
// if (each.nodeType === Node.ELEMENT_NODE && each.getAttribute("contenteditable") === "false") {
// 	// No-op
// 	continue
// }

// Computes a cursor from a range.
function computeCursor(domIDElement, [domNode, offset]) {
	// TODO
	while (domNode.nodeType === Node.ELEMENT_NODE && domNode.childNodes.length) {
		if (offset >= domNode.childNodes.length) {
			throw new Error("computeCursor: FIXME")
		}
		domNode = domNode.childNodes[offset]
		offset = 0
	}
	const cursor = create()
	// Recurses on a DOM node; mutates cursor.
	const recurse = onDOMNode => {
		if (onDOMNode === domNode) {
			Object.assign(cursor, {
				key: domIDElement.id,
				offset: cursor.offset + offset,
			})
			return true
		}
		for (const each of onDOMNode.childNodes) {
			if (recurse(each)) {
				return true
			}
			cursor.offset += each.nodeType === Node.TEXT_NODE &&
				each.textContent.length
		}
		return false
	}
	recurse(domIDElement)
	return cursor
}

// Computes cursors from the current range.
export function compute() {
	const selection = document.getSelection()
	if (!selection.rangeCount) {
		return null
	}
	const range = selection.getRangeAt(0)
	const cursors = []
	/* eslint-disable */
	cursors.push(computeCursor(closestIDElement(range.startContainer),
		[range.startContainer, range.startOffset]))
	if (range.collapsed) {
		cursors.push(cursors[0])
	} else {
		cursors.push(computeCursor(closestIDElement(range.endContainer),
			[range.endContainer, range.endOffset]))
	}
	/* eslint-enable */
	return cursors
}

export default compute
