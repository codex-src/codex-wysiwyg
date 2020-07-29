import getIndex from "./getIndex"
import getShorthandVars from "./getShorthandVars"
import JSONClone from "lib/JSON/JSONClone"
import JSONEqual from "lib/JSON/JSONEqual"
import testForSelection from "./testForSelection"

// Aggregates text nodes on the current range; uses
// getIndex(...).
function aggregate(elements, range) {
	const ch = []
	for (const each of elements) {
		const { key, props: { children } } = each

		if (!children.length) {
			// No-op
			continue
		}
		let x1 = 0
		if (key === range.start.key) {
			x1 = getIndex(children, range.start.offset + 1)
		}
		let x2 = children.length
		if (key === range.end.key) {
			x2 = getIndex(children, range.end.offset)
			if (range.start.key === range.end.key) {
				x2++
			}
		}
		ch.push(...children.slice(x1, x2))
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
		const x = getIndex(ch1, e.range.start.offset)
		return ch1[x].types
	}

	const ch = aggregate(e.elements.slice(x1, x2 + 1), e.range)
	if (!ch.length) {
		return {}
	}

	const clonedTypes = JSONClone(ch[0].types)
	const clonedTypesKeys = Object.keys(clonedTypes)
	for (const textNode of ch.slice(1)) { // Steps over ch[0]
		for (const key of clonedTypesKeys) {
			if (!textNode.types[key] || !JSONEqual(textNode.types[key], clonedTypes[key])) {
				delete clonedTypes[key]
			}
		}
	}
	return clonedTypes
}

export default getRangeTypes
