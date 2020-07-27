import rangeIsCollapsed from "../utils/rangeIsCollapsed"
import textContent from "../utils/textContent"

// Convenience function; gets the current element indexes,
// elements, and children.
function getVars(e) {
	const x1 = e.elements.findIndex(each => each.key === e.range.start.key)
	let x2 = x1
	if (!rangeIsCollapsed(e.range)) {
		x2 = e.elements.findIndex(each => each.key === e.range.end.key)
	}
	const el1 = e.elements[x1]
	const el2 = e.elements[x2]
	const ch1 = el1.props.children
	const ch2 = el2.props.children
	return { x1, x2, el1, el2, ch1, ch2 }
}

// Converts an offset to an index.
function convOffsetToIndex(children, offset) {
	if (!children.length) {
		return -1
	} else if (!offset) {
		return 0
	} else if (offset === textContent(children).length) {
		return children.length - 1
	}
	let x = 0
	for (; x < children.length; x++) {
		if (offset - children[x].props.children.length <= 0) {
			// No-op
			break
		}
		offset -= children[x].props.children.length
	}
	return x
}

// Gets the current range types.
function getRangeTypes(e) {
	const { ch1, ch2 } = getVars(e)
	let x1 = convOffsetToIndex(ch1, e.range.start.offset)
	const x2 = convOffsetToIndex(ch2, e.range.end.offset)
	if (!rangeIsCollapsed(e.range) && e.range.start.offset) { // Edge case
		x1++
	}
	if ((x1 === -1 || x2 === -1) || x1 !== x2) {
		return { start: {}, end: {} }
	}
	const current = {
		start: ch1[x1].types,
		end: ch2[x2].types,
	}
	return current
}

export default getRangeTypes
