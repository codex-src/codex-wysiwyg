import construct from "./constructor"

// Ascends to the closest DOM element with a non-empty ID.
function ascend(domNode) {
	let domElement = domNode
	if (domNode.nodeType !== Node.ELEMENT_NODE && domNode.parentElement) {
		domElement = domNode.parentElement
	}
	while (!domElement.id && domNode.parentElement) {
		domElement = domElement.parentElement
	}
	return domElement
}

// Computes a synthetic cursor from a DOM range.
function computeCursorFromRange(domElement, [domNode, offset]) {
	// FIXME
	while (domNode.nodeType === Node.ELEMENT_NODE && domNode.childNodes.length) {
		if (offset >= domNode.childNodes.length) {
			throw new Error("Selection.computeCursorFromRange: FIXME")
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
			cursor.offset += each.nodeType === Node.TEXT_NODE &&
				each.nodeValue.length
		}
		return false
	}
	recurse(domElement)
	return cursor
}

// Computes a synthetic selection from the current DOM range.
function computeFromCurrentRange() {
	const domSelection = document.getSelection()
	if (!domSelection.rangeCount) {
		return null
	}
	const domRange = domSelection.getRangeAt(0)
	const selection = []
	/* eslint-disable */
	selection.push(computeCursorFromRange(ascend(domRange.startContainer),
		[domRange.startContainer, domRange.startOffset]))
	if (domRange.collapsed) {
		selection.push(selection[0])
	} else {
		selection.push(computeCursorFromRange(ascend(domRange.endContainer),
			[domRange.endContainer, domRange.endOffset]))
	}
	/* eslint-enable */
	return selection
}

export default computeFromCurrentRange


