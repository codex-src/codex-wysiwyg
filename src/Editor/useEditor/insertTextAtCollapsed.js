import createIndex from "./createIndex"
import defer from "./defer"
import getShorthandVars from "./getShorthandVars"

// Inserts text at the current range.
function insertTextAtCollapsed(e, clonedTextNode, text) {
	const { ch1 } = getShorthandVars(e)
	const x = createIndex(ch1, e.range.start.offset)
	ch1.splice(x, 0, {
		...clonedTextNode,
		props: {
			...clonedTextNode.props,
			children: text,
		},
	})
	defer(ch1)
}

export default insertTextAtCollapsed
