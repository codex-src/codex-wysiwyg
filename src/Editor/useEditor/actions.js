import applyFormatImpl from "./implementation/applyFormatImpl"
import deleteImpl from "./implementation/deleteImpl"
import extendLTRImpl from "./implementation/extendLTRImpl"
import extendRTLImpl from "./implementation/extendRTLImpl"
import findIndex from "../utils/findIndex"
import getRangeTypes from "./getRangeTypes"
import hash from "lib/x/hash"
import insertTextImpl2 from "./insertTextImpl"
import rangeIsCollapsed from "../utils/rangeIsCollapsed"

import { // Unsorted
	collapse,
	render,
} from "./utils"

// Manually updates elements.
export function manuallyUpdateElements(e, { elements }) {
	e.elements = elements
	render(e)
}

// Focuses the editor. When the editor is focused, editing
// operations are expected to work.
export function focus(e) {
	e.focused = true
}

// Blurs the editor. When the editor is blurred, editing
// operations are **not** expected to work. See
// Editor.readWriteHandler for reference.
export function blur(e) {
	e.focused = false
}

// Selects a range.
export function select(e, { range }) {
	e.range = range
	e.rangeTypes = getRangeTypes(e)
}

// Inserts text at the current range.
export function insertText(e, { text }) {
	insertTextImpl2(e, text)
	e.range.start.offset += text.length
	collapse(e)
	render(e)
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
	render(e)
}

// TODO
export function insertHardParagraph(e) {
	if (!rangeIsCollapsed(e.range)) {
		deleteImpl(e)
		collapse(e)
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
	collapse(e)

	// console.log(textContent(e.elements[x].props.children.slice(0, findIndex(ch, e.range.start.offset))))
	// console.log(textContent(e.elements[x].props.children.slice(findIndex(ch, e.range.start.offset))))

	// const ch1 = e.elements[x].props.children.slice(0, findIndex(e.range.start.offset))
	// const ch2 = e.elements[x].props.children.slice(findIndex(e.range.start.offset))
	// console.log({ ch1: JSONClone(ch1), ch2: JSONClone(ch2) })

	// collapse(e)
	render(e)
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
	collapse(e)
	render(e)
}

// Uncontrolled input handler.
export function uncontrolledInput(e, { children, range }) {
	const el = e.elements.find(each => each.key === range.start.key)
	el.props.children = children
	e.range = range
	render(e)
}
