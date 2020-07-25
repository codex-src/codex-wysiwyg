import deleteImpl from "./deleteImpl"
import findIndex from "../../utils/findIndex"
import JSONClone from "lib/JSON/JSONClone"

// Inserts text at the current range.
function insertTextImpl(e, text) {
	const ch = e.elements.find(each => each.key === e.range.start.key)
		.props.children

	// Get the current text node:
	const tx = findIndex(ch, e.range.start.offset)
	let originalTextNode = {
		types: {},
		props: {
			children: "",
		},
	}
	if (tx < ch.length) {
		originalTextNode = JSONClone(ch[tx])
	}

	deleteImpl(e)

	// Push the new text node:
	const x = findIndex(ch, e.range.start.offset)
	ch.splice(x, 0, {
		...originalTextNode,
		props: {
			...originalTextNode.props,
			children: text,
		},
	})
}

export default insertTextImpl
