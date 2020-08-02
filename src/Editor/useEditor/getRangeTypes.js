import getIndex from "./getIndex"
import getShorthandVars from "./getShorthandVars"
import JSONClone from "lib/JSON/JSONClone"
import JSONEqual from "lib/JSON/JSONEqual"
import testForSelection from "./testForSelection"
import { queryChildrenIdempotent } from "./queryChildren"

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

	const ch = queryChildrenIdempotent(e.elements.slice(x1, x2 + 1), e.range)
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
