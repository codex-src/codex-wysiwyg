import createIndex from "./createIndex"
import defer from "./defer"
import getShorthandVars from "./getShorthandVars"
import hash from "lib/x/hash"

// Inserts a hard paragraph at the current range.
function insertHardParagraphAtCollapsed(e) {
	const { x1, el1, ch1 } = getShorthandVars(e)

	const newID = hash()

	const x = createIndex(ch1, e.range.start.offset)
	e.elements.splice(x1, 1, {
		...el1,
		props: {
			...el1.props,
			children: defer(ch1.slice(0, x)),
		},
	}, {
		...el1,
		key: newID,
		props: {
			...el1.props,
			children: defer(ch1.slice(x)),
		},
	})

	const start = {
		key: newID,
		offset: 0,
	}
	return start
}

export default insertHardParagraphAtCollapsed
