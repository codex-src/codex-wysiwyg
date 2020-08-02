import deferOnChildren from "./deferOnChildren"
import getMutableIndex from "./getMutableIndex"
import getVars from "./getVars"

// Inserts text at the current range.
function insertTextAtCollapsed(e, clonedTextNode, text) {
	const { ch1 } = getVars(e)
	const x = getMutableIndex(ch1, e.range.start.offset)
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
