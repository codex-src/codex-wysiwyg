import * as iterate from "lib/UTF8/iterate"
import getShorthandVars from "./getShorthandVars"
import textContent from "./textContent"

// Extends the current range right-to-left.
function extendRangeRTLImpl(e, boundary) {
	const { x1 } = getShorthandVars(e)

	const curr = e.elements[x1]
	let prev = null
	if (x1 - 1 >= 0) {
		prev = e.elements[x1 - 1]
	}
	const substr = textContent(curr.props.children).slice(0, e.range.start.offset)
	if (!substr && prev) {
		Object.assign(e.range.start, {
			key: prev.key,
			offset: textContent(prev.props.children).length,
		})
		return
	}
	const itd = iterate.rtl[boundary](substr)
	e.range.start.offset -= itd.length
}

export default extendRangeRTLImpl
