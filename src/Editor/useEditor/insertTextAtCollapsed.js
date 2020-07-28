import createIndexAtOffset from "./createIndexAtOffset"
import deferOnChildren from "./deferOnChildren"
import getShorthandVars from "./getShorthandVars"
import JSONClone from "lib/JSON/JSONClone"

// Inserts text at the current range.
//
// FIXME
function insertTextAtCollapsed(e, text) {
	const { ch1 } = getShorthandVars(e)
	let textNode = {
		types: {},
		props: {
			children: text,
		},
	}
	const x = createIndexAtOffset(ch1, e.range.start.offset)
	if (x - 1 >= 0) {
		const copyTextNode = JSONClone(ch1[x - 1])
		textNode = {
			...copyTextNode,
			props: {
				...copyTextNode.props,
				children: text,
			},
		}
	}
	ch1.splice(x, 0, textNode)
	deferOnChildren(ch1)
}

export default insertTextAtCollapsed
