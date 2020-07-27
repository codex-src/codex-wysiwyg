import getIndexAtOffset from "./getIndexAtOffset"
import getVars from "./getVars"
import must from "lib/x/must"
import rangeIsCollapsed from "../utils/rangeIsCollapsed"

// Gets the current range types.
function getRangeTypes(e) {
	const { ch1, ch2 } = getVars(e)
	if (!ch1.length || !ch2.length) {
		return { start: {}, end: {} }
	}
	const x1 = getIndexAtOffset(ch1, e.range.start.offset + !rangeIsCollapsed(e.range)) // TODO: Known to cause a bug
	const x2 = getIndexAtOffset(ch2, e.range.end.offset)
	must(x1) // DEBUG
	must(x2) // DEBUG
	if (x1 !== x2) {
		return { start: {}, end: {} }
	}
	const start = ch1[x1].types // TODO: Specifically here
	const end = ch2[x2].types
	return { start, end }
}

export default getRangeTypes
