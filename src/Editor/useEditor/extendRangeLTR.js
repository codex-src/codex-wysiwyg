import * as iterate from "lib/UTF8/iterate"
import getShorthandVars from "./getShorthandVars"
import textContent from "./textContent"

// Extends the current range left-to-right.
function extendRangeLTRImpl(e, boundary) {
	const { x2 } = getShorthandVars(e)

	const curr = e.elements[x2]
	let next = null
	if (x2 + 1 < e.elements.length) {
		next = e.elements[x2 + 1]
	}
	const substr = textContent(curr.props.children).slice(e.range.end.offset)
	if (!substr && next) {
		Object.assign(e.range.end, {
			key: next.key,
			offset: 0,
		})
		return
	}
	const itd = iterate.ltr[boundary](substr)
	e.range.end.offset += itd.length
}

export default extendRangeLTRImpl
