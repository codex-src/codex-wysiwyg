import createIndexAtOffset from "./createIndexAtOffset"
import deferOnChildren from "./deferOnChildren"
import getVars from "./getVars"
import rangeIsCollapsed from "../utils/rangeIsCollapsed"

// Deletes the current range.
function deleteImpl(e) {
	const { x1, x2, ch1, ch2 } = getVars(e)
	ch1.splice(
		0,
		ch1.length * 2,
		...ch1.slice(0, createIndexAtOffset(ch1, e.range.start.offset)),
		...ch2.slice(createIndexAtOffset(ch2, e.range.end.offset)),
	)
	e.elements.splice(x1 + 1, x2 - x1)
	deferOnChildren(ch1)
}

export default deleteImpl
