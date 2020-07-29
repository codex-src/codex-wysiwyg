import getIndexAtOffset from "./getIndexAtOffset" // TODO
import getShorthandVars from "./getShorthandVars"
import JSONClone from "lib/JSON/JSONClone"
import JSONEqual from "lib/JSON/JSONEqual"
import testForSelection from "./testForSelection"

function getNextIndexAtOffset(children, offset) {
	if (!offset) {
		return 0
	}
	return getIndexAtOffset(children, offset) + 1
}

// Gets text nodes from an array of elements.
function getTextNodes(elements, range) {
	const ch = []
	for (const each of elements) {
		if (!each.props.children.length) {
			// No-op
			continue
		}
		let x1 = 0
		if (each.key === range.start.key) {
			x1 = getNextIndexAtOffset(each.props.children, range.start.offset)
		}
		let x2 = each.props.children.length
		if (each.key === range.end.key) {
			x2 = getNextIndexAtOffset(each.props.children, range.end.offset)
		}
		// if (x1 === x2) {
		// 	x2++
		// }
		ch.push(...each.props.children.slice(x1, x2 + (x1 === x2)))
	}
	return ch
}

// Gets the current range types.
function getRangeTypes(e) {
	const { x1, x2, ch1 } = getShorthandVars(e)
	if (!testForSelection(e)) {
		if (!ch1.length) {
			return {}
		}
		const x = getIndexAtOffset(ch1, e.range.start.offset)
		return ch1[x].types
	}
	const ch = getTextNodes(e.elements.slice(x1, x2 + 1), e.range)
	if (!ch.length) {
		return {}
	}
	const clonedTypes = JSONClone(ch[0].types)
	const clonedTypesKeys = Object.keys(clonedTypes)
	for (const textNode of ch.slice(1)) { // Step over clonedTypes
		for (const key of clonedTypesKeys) {
			if (!textNode.types[key] || !JSONEqual(textNode.types[key], clonedTypes[key])) {
				delete clonedTypes[key]
			}
		}
	}
	return clonedTypes
}

export default getRangeTypes
