import createIndexAtOffset from "./createIndexAtOffset"
import deferOnChildren from "./deferOnChildren"
import getVars from "./getVars"
import must from "lib/x/must" // DEPRECATE

// Aggregates children. Note that elements can be pre-sliced
// for better efficicency.
function aggregate(elements, range) {
	const ch = []
	for (const each of elements) {
		if (!each.props.children.length) {
			// No-op
			continue
		}
		let x1 = 0
		if (each.key === range.start.key) {
			x1 = createIndexAtOffset(each.props.children, range.start.offset)
		}
		let x2 = each.props.children.length
		if (each.key === range.end.key) {
			x2 = createIndexAtOffset(each.props.children, range.end.offset)
		}
		must(x1) // DEBUG
		must(x2) // DEBUG
		ch.push(...each.props.children.slice(x1, x2))
	}
	return ch
}

// Tests for "plaintext", "should-apply", or
// "should-not-apply".
//
// TODO: Add support for props
function testShouldApply(children, formatType) {
	// if (formatType === "plaintext") {
	// 	return "plaintext"
	// }
	// const every = children.every(each => each.types[formatType] !== undefined)
	// return !every ? "should-apply" : "should-not-apply"
}

// Applies types to the current range.
function applyTypesSelection(e, types) {
	//	const { x1, x2 } = getVars(e)
	//
	//	const els = e.elements.slice(x1, x2 + 1)
	//	const ch = aggregate(els, e.range)
	//	const shouldApply = testShouldApply(ch, formatType)
	//
	//	switch (shouldApply) {
	//	case "plaintext":
	//		for (const each of ch) {
	//			for (const type of Object.keys(each.types)) {
	//				delete each.types[type]
	//			}
	//		}
	//		break
	//	case "should-apply":
	//		for (const each of ch) {
	//			each.types[formatType] = {} // TODO
	//		}
	//		break
	//	case "should-not-apply":
	//		for (const each of ch) {
	//			delete each.types[formatType]
	//		}
	//		break
	//	default:
	//		// No-op
	//		break
	//	}
	//
	//	els.map(each => deferOnChildren(each.props.children))
}

export default applyTypesSelection
