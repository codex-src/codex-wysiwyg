import * as iterate from "lib/UTF8/iterate"
import getVars from "./getVars"
import textContent from "../utils/textContent"

// Extends the current range right-to-left.
function extendRangeRTLImpl(e, boundary) {
	const { x1: x } = getVars(e) // Must be x1

	const curr = e.elements[x]
	let prev = null
	if (x - 1 >= 0) {
		prev = e.elements[x - 1]
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
