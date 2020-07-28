import applyTypeSelection from "./applyTypeSelection"
import deleteSelection from "./deleteSelection"
import extendRangeLTR from "./extendRangeLTR"
import extendRangeRTL from "./extendRangeRTL"
import getRangeTypes from "./getRangeTypes"
import getVars from "./getVars"
import insertTextCollapsed from "./insertTextCollapsed"
import rangeIsCollapsed from "../utils/rangeIsCollapsed"

// Collapses the current range end-to-start.
function collapse(e) {
	e.range.end = e.range.start
}

// Rerenders the current state.
function render(e) {
	e.shouldRerender++
}

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
export function insertText(e, { insertText: text }) {
	if (!rangeIsCollapsed(e.range)) {
		deleteSelection(e)
		collapse(e)
	}
	insertTextCollapsed(e, text)
	e.range.start.offset += text.length
	collapse(e)
	render(e)
}

// Applies a format to the current range.
//
// TODO: Add props argument
// TODO: Rename to applyType or applyTypes?
export function applyFormat(e, { types }) { // formatType }) {

	// const $applyFormat = !rangeIsCollapsed(e.range) ? applyFormatCollapsed : applyTypeSelection
	// $applyFormat(e, formatType)
	// collapse(e)

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

	// applyFormatImpl(e, formatType)

	if (!rangeIsCollapsed(e.range)) {
		applyTypeSelection(e, types) // TODO
	}
	render(e)
}

// TODO
export function insertHardParagraph(e) {
	//	if (!rangeIsCollapsed(e.range)) {
	//		deleteSelection(e)
	//		collapse(e)
	//	}
	//	// insertHardParagraphImpl(e)
	//
	//	const x = e.elements.findIndex(each => each.key === e.range.start.key)
	//	const el = e.elements[x]
	//	const ch = el.props.children
	//
	//	// const t = convOffsetToIndex(ch, e.range.start.offset)
	//	const t = findIndex(ch, e.range.start.offset)
	//	const ch1 = ch.slice(0, t)
	//	const ch2 = ch.slice(t)
	//
	//	const id = hash()
	//	e.elements.splice(x, 1, {
	//		...el,
	//		props: {
	//			...el.props,
	//			children: ch1,
	//		},
	//	}, {
	//		type: "p",
	//		key: id,
	//		props: {
	//			children: ch2,
	//		},
	//	})
	//
	//	e.range.start = {
	//		key: id,
	//		offset: 0,
	//	}
	//	collapse(e)
	//
	//	// console.log(textContent(e.elements[x].props.children.slice(0, findIndex(ch, e.range.start.offset))))
	//	// console.log(textContent(e.elements[x].props.children.slice(findIndex(ch, e.range.start.offset))))
	//
	//	// const ch1 = e.elements[x].props.children.slice(0, findIndex(e.range.start.offset))
	//	// const ch2 = e.elements[x].props.children.slice(findIndex(e.range.start.offset))
	//	// console.log({ ch1: JSONClone(ch1), ch2: JSONClone(ch2) })
	//
	//	// collapse(e)
	//	render(e)
}

// Deletes a rune, word, or rune.
export function $delete(e, { deleteType }) {
	const [dir, boundary] = deleteType.split("-")
	if (rangeIsCollapsed(e.range)) {
		const extendRange = dir === "rtl" && dir !== "ltr" ? extendRangeRTL : extendRangeLTR
		extendRange(e, boundary)
	}
	deleteSelection(e)
	collapse(e)
	render(e)
}

// Uncontrolled input handler.
export function uncontrolledInput(e, { children, range }) {
	const { el1 } = getVars(e)
	el1.props.children = children
	e.range = range
	collapse(e)
	render(e)
}
