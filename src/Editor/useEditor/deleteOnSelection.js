import createIndex from "./createIndex"
import defer from "./defer"
import getShorthandVars from "./getShorthandVars"

// Deletes on the current range.
function deleteOnSelection(e) {
	const { x1, x2, ch1, ch2 } = getShorthandVars(e)
	ch1.splice(
		0,
		ch1.length * 2,
		...ch1.slice(0, createIndex(ch1, e.range.start.offset)),
		...ch2.slice(createIndex(ch2, e.range.end.offset)),
	)
	defer(ch1)
	e.elements.splice(x1 + 1, x2 - x1)
}

export default deleteOnSelection
