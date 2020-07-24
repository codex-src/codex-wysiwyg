import * as iterate from "lib/UTF8/iterate"
import textContent from "../../utils/textContent"

// Extends the range right-to-left.
export const extendRTLImpl = e => boundary => {
	const x = e.elements.findIndex(each => each.key === e.range.start.key)

	let prev = null
	if (x - 1 >= 0) {
		prev = e.elements[x - 1]
	}
	const current = e.elements[x]

	const substr = textContent(current.props.children).slice(0, e.range.start.offset)
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

// Extends the range left-to-right.
export const extendLTRImpl = e => boundary => {
	const x = e.elements.findIndex(each => each.key === e.range.start.key)

	const current = e.elements[x]
	let next = null
	if (x + 1 < e.elements.length) {
		next = e.elements[x + 1]
	}

	const substr = textContent(current.props.children).slice(e.range.end.offset)
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
