import getIndexAtOffset from "./getIndexAtOffset"
import getVars from "./getVars"
import rangeIsCollapsed from "../utils/rangeIsCollapsed"

// Gets the current range types.
function getRangeTypes(e) {
	// Eager returns:
	const { ch1, ch2 } = getVars(e)
	if (!ch1.length || !ch2.length) {
		return { start: {}, end: {} }
	}
	// NOTE: Steps forwards once when not collapsed.
	const x1 = getIndexAtOffset(ch1, e.range.start.offset + !rangeIsCollapsed(e.range))
	const x2 = getIndexAtOffset(ch2, e.range.end.offset)
	if (x1 !== x2) {
		return { start: {}, end: {} }
	}
	const start = ch1[x1].types
	const end = ch2[x2].types
	return { start, end }
}

export default getRangeTypes
