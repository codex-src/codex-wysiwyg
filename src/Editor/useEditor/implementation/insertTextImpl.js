import deleteImpl from "./deleteImpl"
import findIndex from "../../utils/findIndex"
import JSONClone from "lib/JSON/JSONClone"
import rangeIsCollapsed from "../../utils/rangeIsCollapsed"

// Inserts text at the current range.
function insertTextImpl(e, text) {
	const ch = e.elements.find(each => each.key === e.range.start.key)
		.props.children

	let originalTextNode = null

	let x = findIndex(ch, e.range.start.offset)
	if (!x) {
		originalTextNode = {
			types: {},
			props: {
				children: "",
			},
		}
	} else { // if (x < ch.length) {
		originalTextNode = JSONClone(ch[Math.min(x, ch.length - 1)])
	}

	// console.log({ x, ch: ch.length })
	console.log({ x, ch: ch.length, originalTextNode })

	if (!rangeIsCollapsed(e.range)) {
		deleteImpl(e)
	}

	// NOTE: Do not reuse x; does not work as expected.
	x = findIndex(ch, e.range.start.offset)
	ch.splice(x, 0, {
		...originalTextNode, // TODO: Breaks at the EOL for a given line
		props: {
			...originalTextNode.props,
			children: text,
		},
	})
}

export default insertTextImpl
