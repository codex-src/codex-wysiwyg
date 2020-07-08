import areEqualComponents from "./areEqualComponents"
import domUtils from "lib/domUtils"
import VRange from "../classes/VRange"
import VRangeComponent from "../classes/VRangeComponent"

// Computes a range component.
function computeComponent(domElementID, [domRangeNode, domRangeOffset]) {
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

	console.log(VRange.fromRange(domTree, domRange).collapse())

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
	range.push(computeComponent(domUtils.ascendElementID(domRange.startContainer),
		[domRange.startContainer, domRange.startOffset]))

	// // TODO
	// console.log(VRangeComponent.fromRangeComponent({ node: domRange.startContainer, offset: domRange.startOffset }))

	if (domRange.collapsed) {
		range.push(range[0])
	} else {
		range.push(computeComponent(domUtils.ascendElementID(domRange.endContainer),
			[domRange.endContainer, domRange.endOffset]))

		// // TODO
		// console.log(VRangeComponent.fromRangeComponent({ node: domRange.endContainer, offset: domRange.endOffset }))
	}
	/* eslint-enable */
	return { ...range, collapsed: areEqualComponents(...range) }
}

export default compute
