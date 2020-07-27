import convOffsetToIndex from "./convOffsetToIndex"
import getVars from "./getVars"
import rangeIsCollapsed from "../utils/rangeIsCollapsed"

// Gets the current range types.
function getRangeTypes(e) {
	const { ch1, ch2 } = getVars(e)
	let x1 = convOffsetToIndex(ch1, e.range.start.offset)
	const x2 = convOffsetToIndex(ch2, e.range.end.offset)
	if (!rangeIsCollapsed(e.range) && e.range.start.offset) { // Edge case
		x1++
	}
	if ((x1 === -1 || x2 === -1) || x1 !== x2) {
		return { start: {}, end: {} }
	}
	const current = {
		start: ch1[x1].types,
		end: ch2[x2].types,
	}
	return current
}

export default getRangeTypes
