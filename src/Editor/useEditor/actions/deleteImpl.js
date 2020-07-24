import * as iterate from "lib/UTF8/iterate"
import findIndex from "../../utils/findIndex"
import textContent from "../../utils/textContent"
import { rangeIsCollapsed } from "../../types/Range"

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

// Deletes the current range.
const deleteImpl = e => (dir = "none", boundary = "none") => {
	if (rangeIsCollapsed(e.range)) {
		const extend = dir === "rtl" && dir !== "ltr" ? extendRTLImpl : extendLTRImpl
		extend(e)(boundary)
	}

	const x1 = e.elements.findIndex(each => each.key === e.range.start.key)
	let x2 = x1
	if (!rangeIsCollapsed(e.range)) {
		x2 = e.elements.findIndex(each => each.key === e.range.end.key)
	}

	const ch1 = e.elements[x1].props.children
	const ch2 = e.elements[x2].props.children
	ch1.splice(
		0,
		ch1.length * 2,
		...ch1.slice(0, findIndex(ch1, e.range.start.offset)),
		...ch2.slice(findIndex(ch2, e.range.end.offset)),
	)
	e.elements.splice(x1 + 1, x2 - x1)
}

export default deleteImpl
