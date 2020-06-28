import componentsAreEqual from "./componentsAreEqual"
import domUtils from "lib/domUtils"

// Computes a range component from an ID-d DOM element and
// DOM range component.
function computeFromDOMRangeComponent(domElementID, [domRangeNode, domRangeOffset]) {
	if (domRangeOffset && domRangeOffset === domRangeNode.childNodes.length) {
		domRangeOffset = domRangeNode.childNodes.length - 1
	}
	while (!domUtils.isTextNodeOrBrElement(domRangeNode)) {
		domRangeNode = domRangeNode.childNodes[domRangeOffset]
		domRangeOffset = 0
	}
	const component = {
		key: "",
		offset: 0,
	}
	const recurse = domNode => {
		if (domNode === domRangeNode) {
			Object.assign(component, {
				key: domElementID.id,
				offset: component.offset + domRangeOffset,
			})
			return true
		}
		for (const each of domNode.childNodes) {
			if (recurse(each)) {
				return true
			}
			component.offset += domUtils.isTextNode(each) &&
				each.nodeValue.length
		}
		return false
	}
	recurse(domElementID)
	return component
}

// Computes a range from the current DOM range.
function compute(domTree) {
	// Get the current DOM range:
	const domSelection = document.getSelection()
	if (!domSelection.rangeCount) {
		return null
	}
	// Guard non-root element descendants:
	const domRange = domSelection.getRangeAt(0)
	if (!domTree.contains(domRange.startContainer) || !domTree.contains(domRange.endContainer)) {
		return null
	// Guard non-contenteditable descendants:
	} else if (domUtils.ascendElement(domRange.startContainer).closest("[contenteditable='false']") || domUtils.ascendElement(domRange.endContainer).closest("[contenteditable='false']")) {
		return null
	}
	// Compute range components:
	//
	/* eslint-disable */
	const range = []
	range.push(computeFromDOMRangeComponent(domUtils.ascendElementID(domRange.startContainer),
		[domRange.startContainer, domRange.startOffset]))
	if (domRange.collapsed) {
		range.push(range[0])
	} else {
		range.push(computeFromDOMRangeComponent(domUtils.ascendElementID(domRange.endContainer),
			[domRange.endContainer, domRange.endOffset]))
	}
	/* eslint-enable */
	return { ...range, collapsed: componentsAreEqual(...range) }
}

export default compute
