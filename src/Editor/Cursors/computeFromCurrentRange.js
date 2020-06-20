import construct from "./constructor"

// Ascends to the closest element node.
function ascend(domNode) {
	// Get the closest element:
	let domElement = domNode
	if (domNode.nodeType !== Node.ELEMENT_NODE && domNode.parentElement) {
		domElement = domNode.parentElement
	}
	// Ascend to the closest element node:
	while (!domElement.id && domNode.parentElement) {
		domElement = domElement.parentElement
	}
	return domElement
}

// Computes a cursor from a range.
function computeFromRange(domElement, [domNode, offset]) {
	// TODO
	while (domNode.nodeType === Node.ELEMENT_NODE && domNode.childNodes.length) {
		if (offset >= domNode.childNodes.length) {
			throw new Error("Cursors.computeFromRange: FIXME")
		}
		domNode = domNode.childNodes[offset]
		offset = 0
	}
	const cursor = construct()
	const recurse = onDOMNode => {
		if (onDOMNode === domNode) {
			Object.assign(cursor, {
				key: domElement.id,
				offset: cursor.offset + offset,
			})
			return true
		}
		for (const each of onDOMNode.childNodes) {
			if (recurse(each)) {
				return true
			}
			// if (each.nodeType === Node.TEXT_NODE) {
			// 	cursor.offset += each.nodeValue.length
			// }
			cursor.offset += each.nodeType === Node.TEXT_NODE &&
				each.nodeValue.length
		}
		return false
	}
	recurse(domElement)
	return cursor
}

// Computes cursors from the current range.
function computeFromCurrentRange() {
	const selection = document.getSelection()
	if (!selection.rangeCount) {
		return null
	}
	const range = selection.getRangeAt(0)
	const cursors = []
	/* eslint-disable */
	cursors.push(computeFromRange(ascend(range.startContainer),
		[range.startContainer, range.startOffset]))
	if (range.collapsed) {
		cursors.push(cursors[0])
	} else {
		cursors.push(computeFromRange(ascend(range.endContainer),
			[range.endContainer, range.endOffset]))
	}
	/* eslint-enable */
	return cursors
}

export default computeFromCurrentRange
