import createIndexAtOffset from "./createIndexAtOffset"
import deferOnChildren from "./deferOnChildren"
import getShorthandVars from "./getShorthandVars"

// Deletes the current range.
function deleteSelection(e) {
	const { x1, x2, ch1, ch2 } = getShorthandVars(e)
	ch1.splice(
		0,
		ch1.length * 2,
		...ch1.slice(0, createIndexAtOffset(ch1, e.range.start.offset)),
		...ch2.slice(createIndexAtOffset(ch2, e.range.end.offset)),
	)
	e.elements.splice(x1 + 1, x2 - x1)
	deferOnChildren(ch1)
}

export default deleteSelection
