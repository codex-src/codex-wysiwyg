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
	const every = children.every(each => each.types[formatType] !== undefined)
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
		// Start offset:
		let t1 = 0
		if (each.key === range.start.key) {
			t1 = index(each.props.children, range.start.offset)
		}
		// End offset:
		let t2 = each.props.children.length
		if (each.key === range.end.key) {
			t2 = index(each.props.children, range.end.offset)
		}
		children.push(...each.props.children.slice(t1, t2))
	}
	return children
}

// Applies a format to the current range.
const applyFormatImpl = e => formatType => {
	if (rangeIsCollapsed(e.range)) {
		e.pendingRange = e.range // TODO
		return
	}

	const x1 = e.elements.findIndex(each => each.key === e.range.start.key)
	let x2 = x1
	if (!rangeIsCollapsed(e.range)) {
		x2 = e.elements.findIndex(each => each.key === e.range.end.key)
	}

	const ch = getChildrenFromRange(e.elements.slice(x1, x2 + 1), e.range)
	const shouldApply = testShouldApply(formatType, ch)

	switch (shouldApply) {
	case "plaintext":
		for (const each of ch) {
			each.types = {} // Reset
		}
		break
	case "should-not-apply":
		for (const each of ch) {
			delete each.types[formatType]
		}
		break
	case "should-apply":
		for (const each of ch) {
			each.types[formatType] = {} // TODO
		}
		break
	default:
		// No-op
		break
	}

	// for (const each of e.elements.slice(x1, x2 + 1)) {
	// 	defer(each.props.ch) // TODO
	// }

	// for (let x = x1; x < x2; x++) {
	// 	defer(e.elements[x].props.ch)
	// }
}

export default applyFormatImpl
