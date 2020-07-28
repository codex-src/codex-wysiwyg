import createIndexAtOffset from "./createIndexAtOffset"
import getShorthandVars from "./getShorthandVars"
import hash from "lib/x/hash"

// Inserts a paragraph at the current range.
function insertHardParagraphAtCollapsed(e) {
	const x = e.elements.findIndex(each => each.key === e.range.start.key)
	const el = e.elements[x]
	const ch = el.props.children

	// const t = convOffsetToIndex(ch, e.range.start.offset)
	const t = createIndexAtOffset(ch, e.range.start.offset)
	const ch1 = ch.slice(0, t)
	const ch2 = ch.slice(t)

	const id = hash()
	e.elements.splice(x, 1, {
		...el,
		props: {
			...el.props,
			children: ch1,
		},
	}, {
		type: "p",
		key: id,
		props: {
			children: ch2,
		},
	})

	e.range.start = {
		key: id,
		offset: 0,
	}
}

export default insertHardParagraphAtCollapsed
