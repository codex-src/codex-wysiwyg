import findIndex from "../../utils/findIndex"
import { rangeIsCollapsed } from "../../types/Range"

// Queries children from a range.
function queryChildrenFromRange(elements, range) {
	const children = []
	for (const each of elements) {
		let x1 = 0
		if (each.key === range.start.key) {
			x1 = findIndex(each.props.children, range.start.offset)
		}
		let x2 = each.props.children.length
		if (each.key === range.end.key) {
			x2 = findIndex(each.props.children, range.end.offset)
		}
		children.push(...each.props.children.slice(x1, x2))
	}
	return children
}

// Tests whether to apply a format. Returns "plaintext",
// "should-not-apply", or "should-apply".
function testShouldApply(formatType, children) {
	if (formatType === "plaintext") {
		return "plaintext"
	}
	const didApply = children.every(each => each.types[formatType] !== undefined)
	return !didApply ? "should-apply" : "should-not-apply"
}

// Applies a format to the current range.
const applyFormatImpl = e => (formatType, formatProps = {} /* TODO */) => {
	if (rangeIsCollapsed(e.range)) {
		e.pendingRange = e.range // TODO
		return
	}

	const x1 = e.elements.findIndex(each => each.key === e.range.start.key)
	let x2 = x1
	if (!rangeIsCollapsed(e.range)) {
		x2 = e.elements.findIndex(each => each.key === e.range.end.key)
	}

	const ch = queryChildrenFromRange(e.elements.slice(x1, x2 + 1), e.range)
	const shouldApply = testShouldApply(formatType, ch)
	switch (shouldApply) {
	case "plaintext":
		for (const each of ch) {
			for (const type of Object.keys(each.types)) {
				delete each.types[type]
			}
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
}

export default applyFormatImpl
