import domUtils from "lib/domUtils"

// Computes a DOM range component from a range component.
function computeDOMRangeComponent(component) {
	component = { ...component } // Copy

	const domRangeComponent = [null, 0]
	const recurse = domNode => {
		if (domUtils.isTextNodeOrBrElement(domNode) && component.offset - (domNode.nodeValue || "").length <= 0) {
			domRangeComponent.splice(0, 2, domNode, component.offset)
			return true
		}
		for (const each of domNode.childNodes) {
			if (recurse(each)) {
				return true
			}
			component.offset -= domUtils.isTextNode(each) &&
				each.nodeValue.length
		}
		return false
	}
	recurse(document.getElementById(component.key))
	return domRangeComponent
}

// Converts a range to an array of DOM range components.
function toDOMRange(range) {
	const domRange = document.createRange()
	domRange.setStart(...computeDOMRangeComponent(range[0]))
	if (range.collapsed) {
		domRange.collapse()
	} else {
		domRange.setEnd(...computeDOMRangeComponent(range[1]))
	}
	return domRange
}

export default toDOMRange
