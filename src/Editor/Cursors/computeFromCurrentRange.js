import areEqual from "./areEqual"
import construct from "./constructor"
import domUtils from "lib/domUtils"
import must from "lib/must"

// Computes a cursor from a DOM range.
function computeCursorFromRange(domElement, [domNode, offset]) {
	if (domUtils.isElement(domNode) && !domUtils.isBrElement(domNode) && domUtils.isTextNodeOrBrElement(domNode.childNodes[offset])) {
		domNode = domNode.childNodes[offset]
		offset = 0
	}
	must(domUtils.isTextNodeOrBrElement(domNode))
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
			cursor.offset += domUtils.isTextNode(each) && each.nodeValue.length
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
	} else if (domUtils.ascendElement(domRange.startContainer).closest("[contenteditable='false']") || domUtils.ascendElement(domRange.endContainer).closest("[contenteditable='false']")) {
		return null
	}
	// Compute cursors:
	const cursors = []
	/* eslint-disable */
	cursors.push(computeCursorFromRange(domUtils.ascendElementID(domRange.startContainer),
		[domRange.startContainer, domRange.startOffset]))
	if (domRange.collapsed) {
		cursors.push(cursors[0])
	} else {
		cursors.push(computeCursorFromRange(domUtils.ascendElementID(domRange.endContainer),
			[domRange.endContainer, domRange.endOffset]))
	}
	/* eslint-enable */
	return { ...cursors, collapsed: areEqual(...cursors) }
}

export default computeFromCurrentRange
