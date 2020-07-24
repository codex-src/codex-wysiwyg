import * as iterate from "lib/UTF8/iterate"
import textContent from "../../utils/textContent"

// Extends the current range right-to-left.
export const extendRTLImpl = e => boundary => {
	const x = e.elements.findIndex(each => each.key === e.range.start.key)

	const prev = x - 1 >= 0 ? e.elements[x - 1] : null
	const curr = e.elements[x]

	const substr = textContent(curr.props.children).slice(0, e.range.start.offset)
	if (!substr && !prev) {
		// No-op
		return
	} else if (!substr && prev) {
		Object.assign(e.range.start, {
			key: prev.key,
			offset: textContent(prev.props.children).length,
		})
		return
	}
	const itd = iterate.rtl[boundary](substr)
	e.range.start.offset -= itd.length
}

// Extends the current range left-to-right.
export const extendLTRImpl = e => boundary => {
	const x = e.elements.findIndex(each => each.key === e.range.start.key)

	const curr = e.elements[x]
	const next = x + 1 < e.elements.length ? e.elements[x + 1] : null

	const substr = textContent(curr.props.children).slice(e.range.end.offset)
	if (!substr && !next) {
		// No-op
		return
	} else if (!substr && next) {
		Object.assign(e.range.end, {
			key: next.key,
			offset: 0,
		})
		return
	}
	const itd = iterate.ltr[boundary](substr)
	e.range.end.offset += itd.length
}
