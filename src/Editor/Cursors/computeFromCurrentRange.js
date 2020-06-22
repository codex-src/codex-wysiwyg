import areEqual from "./areEqual"
import construct from "./constructor"

// Ascends to the closest DOM element.
function ascendDOMElement(domNode) {
	let domElement = domNode
	if (domNode.nodeType !== Node.ELEMENT_NODE && domNode.parentElement) {
		domElement = domNode.parentElement
	}
	return domElement
}

// Ascends to the closest ID-d DOM element.
function ascendToDOMElementID(domNode) {
	let domElement = ascendDOMElement(domNode)
	while (!domElement.id && domNode.parentElement) {
		domElement = domElement.parentElement
	}
	return domElement
}

// Computes a cursor from a DOM range.
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

// Computes a set of cursors from the current DOM range.
function computeFromCurrentRange(rootElement) {
	// Get the current DOM range:
	const domSelection = document.getSelection()
	if (!domSelection.rangeCount) {
		return null
	}
	// Guard non-root element descendants:
	const domRange = domSelection.getRangeAt(0)
	if (!rootElement.contains(domRange.startContainer) || !rootElement.contains(domRange.endContainer)) {
		return null
	// Guard non-contenteditable descendants:
	} else if (ascendDOMElement(domRange.startContainer).closest("[contenteditable='false']") || ascendDOMElement(domRange.endContainer).closest("[contenteditable='false']")) {
		return null
	}
	// Compute cursors:
	const cursors = []
	/* eslint-disable */
	cursors.push(computeCursorFromRange(ascendToDOMElementID(domRange.startContainer),
		[domRange.startContainer, domRange.startOffset]))
	if (domRange.collapsed) {
		cursors.push(cursors[0])
	} else {
		cursors.push(computeCursorFromRange(ascendToDOMElementID(domRange.endContainer),
			[domRange.endContainer, domRange.endOffset]))
	}
	/* eslint-enable */
	return { ...cursors, collapsed: areEqual(...cursors) }
}

export default computeFromCurrentRange
