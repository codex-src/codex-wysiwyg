import construct from "./constructor"

// Returns the closest DOM element.
function closestDOMElement(domNode) {
	if (domNode.nodeType !== Node.ELEMENT_NODE) {
		return domNode.parentElement
	}
	return domNode
}

// Returns the closest DOM ID element.
function closestDOMIDElement(domNode) {
	let domElement = closestDOMElement(domNode)
	while (domElement && domElement.getAttribute("id") === null) {
		domElement = domElement.parentElement
	}
	return domElement
}

// // TODO: contenteditable?
// if (each.nodeType === Node.ELEMENT_NODE && each.getAttribute("contenteditable") === "false") {
// 	// No-op
// 	continue
// }

// Computes a cursor from a range.
function computeFromRange(domIDElement, [domNode, offset]) {
	// TODO
	while (domNode.nodeType === Node.ELEMENT_NODE && domNode.childNodes.length) {
		if (offset >= domNode.childNodes.length) {
			throw new Error("computeFromRange: FIXME")
		}
		domNode = domNode.childNodes[offset]
		offset = 0
	}
	const cursor = construct()
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
			// if (each.nodeType === Node.TEXT_NODE) {
			// 	cursor.offset += each.nodeValue.length
			// }
			cursor.offset += each.nodeType === Node.TEXT_NODE &&
				each.nodeValue.length
		}
		return false
	}
	recurse(domIDElement)
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
	cursors.push(computeFromRange(closestDOMIDElement(range.startContainer),
		[range.startContainer, range.startOffset]))
	if (range.collapsed) {
		cursors.push(cursors[0])
	} else {
		cursors.push(computeFromRange(closestDOMIDElement(range.endContainer),
			[range.endContainer, range.endOffset]))
	}
	/* eslint-enable */
	return cursors
}

export default computeFromCurrentRange
