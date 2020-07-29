import getIndexAtOffset from "./getIndexAtOffset"
import getShorthandVars from "./getShorthandVars"
import JSONClone from "lib/JSON/JSONClone"
import JSONEqual from "lib/JSON/JSONEqual"
import testForSelection from "./testForSelection"

// Gets the current range types.
function getRangeTypes(e) {
	if (e.range.start.key !== e.range.end.key) {
		return {}
	}

	const { ch1 } = getShorthandVars(e)
	if (!ch1.length) {
		return {}
	}

	const x1 = getIndexAtOffset(ch1, e.range.start.offset + testForSelection(e))
	const x2 = getIndexAtOffset(ch1, e.range.end.offset)

	const clonedTypes = JSONClone(ch1[x1].types)
	const clonedTypesKeys = Object.keys(clonedTypes)

	for (const textNode of ch1.slice(x1 + 1, x2 + 1)) { // Uses x1 + 1 to step over clonedTypes
		for (const key of clonedTypesKeys) {
			if (!textNode.types[key] || !JSONEqual(textNode.types[key], clonedTypes[key])) {
				delete clonedTypes[key]
			}
		}
	}

	return clonedTypes
}

export default getRangeTypes
