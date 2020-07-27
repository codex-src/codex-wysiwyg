import createIndexAtOffset from "./createIndexAtOffset"
import deferOnChildren from "./deferOnChildren"
import getVars from "./getVars"
import JSONClone from "lib/JSON/JSONClone"

// Inerts text at the current range.
function insertTextCollapsed(e, text) {
	const { ch1 } = getVars(e)
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

export default insertTextCollapsed
