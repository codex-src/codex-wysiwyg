import createIndexAtOffset from "./createIndexAtOffset"
import deferOnChildren from "./deferOnChildren"
import getShorthandVars from "./getShorthandVars"

// Inserts text at the current range. Uses a cloned text
// node to preserve types.
function insertTextAtCollapsed(e, text, clonedTextNode) {
	const { ch1 } = getShorthandVars(e)
	const x = Math.max(0, createIndexAtOffset(ch1, e.range.start.offset))
	ch1.splice(x, 0, {
		...clonedTextNode,
		props: {
			...clonedTextNode.props,
			children: text,
		},
	})
	deferOnChildren(ch1)
}

export default insertTextAtCollapsed
