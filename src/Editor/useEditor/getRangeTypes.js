import getIndexAtOffset from "./getIndexAtOffset"
import getShorthandVars from "./getShorthandVars"
import testForSelection from "./testForSelection"

// Gets the current range types:
function getRangeTypes(e) {
	if (e.range.start.key !== e.range.end.key) {
		return {}
	}

	const { ch1, ch2 } = getShorthandVars(e)
	if (!ch1.length || !ch2.length) {
		return {}
	}
	const x1 = getIndexAtOffset(ch1, e.range.start.offset + testForSelection(e))
	const x2 = getIndexAtOffset(ch2, e.range.end.offset)
	if (x1 !== x2) {
		return {}
	}
	return ch1[x1].types
}

export default getRangeTypes
