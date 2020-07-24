// import defer from "../../utils/defer"
import index from "../../utils/index"
import { rangeIsCollapsed } from "../../types/Range"

// Tests for:
//
// - "plaintext"
// - "should-not-apply"
// - "should-apply"
//
function testShouldApply(formatType, children) {
	if (formatType === "plaintext") {
		return "plaintext"
	}
	const every = children.every(each => each.types.some(each => each.type === formatType))
	const shouldApply = ({
		false: "should-apply",    // Not every -> "should-apply"
		true: "should-not-apply", // Every -> "should-not-apply"
	})[every]
	return shouldApply
}

// Gets the current children. Note that elements is expected
// to be a subsection of elements.
function getChildrenFromRange(elements, range) {
	const children = []
	for (const each of elements) {
		// Start range offset:
		let r1 = 0
		if (each === elements[0]) { // each.key === range.start.key
			r1 = index(each.props.children, range.start.offset)
		}
		// End range offset:
		let r2 = each.props.children.length
		if (each === elements[elements.length - 1]) {
			r2 = index(each.props.children, range.end.offset)
		}
		children.push(...each.props.children.slice(r1, r2))
	}
	return children
}

// Applies a format to the current range.
const applyFormatImpl = e => formatType => {
	if (rangeIsCollapsed(e.range)) {
		e.pendingRange = e.range
		return
	}

	const x1 = e.elements.findIndex(each => each.key === e.range.start.key)
	let x2 = x1
	if (!rangeIsCollapsed(e.range)) {
		x2 = e.elements.findIndex(each => each.key === e.range.end.key)
	}

	const children = getChildrenFromRange(e.elements.slice(x1, x2 + 1), e.range)
	const shouldApply = testShouldApply(formatType, children)

	switch (shouldApply) {
	case "plaintext":
		for (const each of children) {
			each.types.splice(0)
		}
		break
	case "should-not-apply":
		for (const each of children) {
			const x = each.types.findIndex(each => each.type === formatType)
			if (x >= 0) {
				each.types.splice(x, 1)
			}
		}
		break
	case "should-apply":
		for (const each of children) {
			const x = each.types.findIndex(each => each.type === formatType)
			if (x === -1) {
				each.types.push({
					type: formatType,
					props: null, // TODO
				})
			}
		}
		break
	default:
		// No-op
		break
	}

	// for (const each of e.elements.slice(x1, x2 + 1)) {
	// 	defer(each.props.children) // TODO
	// }

	// for (let x = x1; x < x2; x++) {
	// 	defer(e.elements[x].props.children)
	// }
}

export default applyFormatImpl
