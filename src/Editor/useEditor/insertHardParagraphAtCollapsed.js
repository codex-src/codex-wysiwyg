import createIndexAtOffset from "./createIndexAtOffset"
import getShorthandVars from "./getShorthandVars"
import hash from "lib/x/hash"

// Inserts a hard paragraph at the current range.
function insertHardParagraphAtCollapsed(e) {
	const { x1, el1, ch1 } = getShorthandVars(e)

	const id = hash()

	// Transform x=-1 to x=0:
	const x = Math.max(0, createIndexAtOffset(ch1, e.range.start.offset))
	e.elements.splice(x1, 1, {
		...el1,
		props: {
			...el1.props,
			children: ch1.slice(0, x),
		},
	}, {
		...el1,
		key: id, // New ID
		props: {
			...el1.props,
			children: ch1.slice(x),
		},
	})

	const start = {
		key: id, // New ID
		offset: 0,
	}
	return start
}

export default insertHardParagraphAtCollapsed
