import applyFormatImpl from "./implementation/applyFormatImpl"
import deleteImpl from "./implementation/deleteImpl"
import extendLTRImpl from "./implementation/extendLTRImpl"
import extendRTLImpl from "./implementation/extendRTLImpl"
import findIndex from "../utils/findIndex"
import hash from "lib/x/hash"
import insertTextImpl from "./implementation/insertTextImpl"
import JSONClone from "lib/JSON/JSONClone"
import rangeIsCollapsed from "../utils/rangeIsCollapsed"
import textContent from "../utils/textContent"

// Manually updates elements.
export function manuallyUpdateElements(e, { elements }) {
	e.elements = elements
	e.shouldRerender++
}

// Focuses the editor.
export function focus(e) {
	e.focused = true
}

// Blurs the editor.
export function blur(e) {
	e.focused = false
}

// Converts an offset to an index.
function convOffsetToIndex(children, offset) {
	if (!children.length) {
		return -1
	} else if (!offset) {
		return 0
	} else if (offset === textContent(children).length) {
		return children.length - 1
	}
	let x = 0
	for (; x < children.length; x++) {
		if (offset - children[x].props.children.length <= 0) {
			// No-op
			break
		}
		offset -= children[x].props.children.length
	}
	return x
}

// ...
function getVars(e) {
	const x1 = e.elements.findIndex(each => each.key === e.range.start.key)
	let x2 = x1
	if (!rangeIsCollapsed(e.range)) {
		x2 = e.elements.findIndex(each => each.key === e.range.end.key)
	}
	const el1 = e.elements[x1]
	const el2 = e.elements[x2]
	const ch1 = el1.props.children
	const ch2 = el2.props.children
	return { x1, x2, el1, el2, ch1, ch2 }
}

// Gets the current range types (cloned).
function getRangeTypes(e) {
	const { ch1, ch2 } = getVars(e)
	let x1 = convOffsetToIndex(ch1, e.range.start.offset)
	let x2 = convOffsetToIndex(ch2, e.range.end.offset)
	if (!rangeIsCollapsed(e.range) && e.range.start.offset) { // Edge case
		x1++
	}
	if ((x1 === -1 || x2 === -1) || x1 !== x2) {
		return { start: {}, end: {} }
	}
	const current = {
		start: JSONClone(ch1[x1].types),
		end: JSONClone(ch2[x2].types),
	}
	return current
}

// ; drops the current range-in-progress.

// Selects a range
export function select(e, { range }) {
	e.range = range
	e.rangeTypes = getRangeTypes(e)
}

// Inserts text at the current range.
export function insertText(e, { text }) {
	// if (rangeIsCollapsed(e.range) && e.applyType) {
	// 	insertTextImpl(e, text)
	// 	e.range.end.offset += text.length
	// 	e.range.start = e.applyType.range.start
	// 	// TODO: Add support for "plaintext" here? Can we just
	// 	// use "" to indicate plaintext?
	// 	applyFormatImpl(e, Object.keys(e.applyType.types)[0]) // TODO
	// 	e.range.start = e.range.end
	// if (!rangeIsCollapsed(e.range)) {
	insertTextImpl(e, text)
	e.range.start.offset += text.length
	e.range.end = e.range.start
	// }
	e.shouldRerender++
}

// Applies a format to the current range.
//
// TODO: Add props argument
export function applyFormat(e, { formatType }) {
	// if (rangeIsCollapsed(e.range)) {
	// 	if (!e.applyType) {
	// 		e.applyType = {
	// 			types: {},
	// 			range: {},
	// 		}
	// 	}
	// 	// TODO: Get the current types; inverse formatType and
	// 	// or propagate "plaintext" or ""
	// 	e.applyType.types[formatType] = {} // TODO
	// 	e.applyType.range = JSONClone(e.range)
	// 	return
	// }
	applyFormatImpl(e, formatType)
	e.shouldRerender++
}

// TODO
export function insertHardParagraph(e) {
	if (!rangeIsCollapsed(e.range)) {
		deleteImpl(e)
		e.range.end = e.range.start
	}
	// insertHardParagraphImpl(e)

	const x = e.elements.findIndex(each => each.key === e.range.start.key)
	const el = e.elements[x]
	const ch = el.props.children

	// const t = convOffsetToIndex(ch, e.range.start.offset)
	const t = findIndex(ch, e.range.start.offset)
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
	e.range.end = e.range.start

	// console.log(textContent(e.elements[x].props.children.slice(0, findIndex(ch, e.range.start.offset))))
	// console.log(textContent(e.elements[x].props.children.slice(findIndex(ch, e.range.start.offset))))

	// const ch1 = e.elements[x].props.children.slice(0, findIndex(e.range.start.offset))
	// const ch2 = e.elements[x].props.children.slice(findIndex(e.range.start.offset))
	// console.log({ ch1: JSONClone(ch1), ch2: JSONClone(ch2) })

	// e.range.end = e.range.start
	e.shouldRerender++
}

// Deletes the next right-to-left or left-to-right rune,
// word, or line at the current range.
export function $delete(e, { deleteType }) {
	const [dir, boundary] = deleteType.split("-")
	if (rangeIsCollapsed(e.range)) {
		const extendImpl = dir === "rtl" && dir !== "ltr" ? extendRTLImpl : extendLTRImpl
		extendImpl(e, boundary)
	}
	deleteImpl(e)
	e.range.end = e.range.start
	e.shouldRerender++
}

// Uncontrolled input handler.
export function uncontrolledInput(e, { children, range }) {
	const el = e.elements.find(each => each.key === range.start.key)
	el.props.children = children
	e.range = range
	e.shouldRerender++
}
