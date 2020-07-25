import * as iterate from "lib/UTF8/iterate"
import textContent from "../../utils/textContent"

// Extends the current range left-to-right.
function extendLTRImpl(e, boundary) {
	const x = e.elements.findIndex(each => each.key === e.range.start.key)

	const curr = e.elements[x]
	let next = null
	if (x + 1 < e.elements.length) {
		next = e.elements[x + 1]
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

export default extendLTRImpl
