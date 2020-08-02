import deferOnChildren from "./deferOnChildren"
import getIndexNonIdempotent from "./getIndexNonIdempotent"
import getShorthandVars from "./getShorthandVars"
import hash from "lib/x/hash"

// Inserts a hard paragraph at the current range.
function insertHardParagraphAtCollapsed(e) {
	const { x1, el1, ch1 } = getShorthandVars(e)

	const id = hash()

	const x = getIndexNonIdempotent(ch1, e.range.start.offset)
	e.elements.splice(x1, 1, {
		...el1,
		props: {
			...el1.props,
			children: deferOnChildren(ch1.slice(0, x)),
		},
	}, {
		...el1,
		key: id,
		props: {
			...el1.props,
			children: deferOnChildren(ch1.slice(x)),
		},
	})

	const start = {
		key: id,
		offset: 0,
	}
	return start
}

export default insertHardParagraphAtCollapsed
