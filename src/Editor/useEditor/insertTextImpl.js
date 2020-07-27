import createIndexAtOffset from "./createIndexAtOffset"
import deferOnChildren from "./deferOnChildren"
import getVars from "./getVars"
import JSONClone from "lib/JSON/JSONClone"

// Inserts text at the current range.
function insertTextImpl(e, text) {
	const { ch1: ch } = getVars(e)

	let textNode = {
		types: {},
		props: {
			children: text,
		},
	}

	const x = createIndexAtOffset(ch, e.range.start.offset)
	if (x - 1 >= 0) {
		const copyTextNode = JSONClone(ch[x - 1])
		textNode = {
			...copyTextNode,
			props: {
				...copyTextNode.props,
				children: text,
			},
		}
	}

	ch.splice(x, 0, textNode)
	deferOnChildren(ch)
}

export default insertTextImpl
