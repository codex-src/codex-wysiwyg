import addOrRemoveTypesSelection from "./addOrRemoveTypesSelection"
import deleteSelection from "./deleteSelection"
import extendRangeLTR from "./extendRangeLTR"
import extendRangeRTL from "./extendRangeRTL"
import getRangeTypes from "./getRangeTypes"
import getShorthandVars from "./getShorthandVars"
import insertTextCollapsed from "./insertTextCollapsed"
import testForSelection from "./testForSelection"

// Collapses the current range end-to-start.
function collapseToStart(e) {
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

// Focuses the editor. Note that focusing the editor is
// expected to enable future edits.
export function focus(e) {
	e.focused = true
}

// Blurs the editor. Note that blurring the editor is
// expected to disable future edits.
export function blur(e) {
	e.focused = false
}

// Selects a range.
export function select(e, { range }) {
	e.range = range
	e.rangeTypes = getRangeTypes(e) // TODO
}

// Inserts text at the current range.
export function insertText(e, { insertText: text }) {
	if (testForSelection(e)) {
		deleteSelection(e)
		collapseToStart(e)
	}
	insertTextCollapsed(e, text)
	e.range.start.offset += text.length
	collapseToStart(e)
	render(e)
}

// if (collapsed(e)) {
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

// Adds or removes types from the current range.
export function addOrRemoveTypes(e, { types }) {
	// const $applyFormat = !collapsed(e) ? applyFormatCollapsed : applyTypeSelection
	// $applyFormat(e, formatType)

	addOrRemoveTypesSelection(e, types) // TODO
	// collapseToStart(e)
	render(e)
}

// TODO
export function insertHardParagraph(e) {
	//	if (!collapsed(e)) {
	//		deleteSelection(e)
	//		collapseToStart(e)
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
	//	collapseToStart(e)
	//
	//	// console.log(textContent(e.elements[x].props.children.slice(0, findIndex(ch, e.range.start.offset))))
	//	// console.log(textContent(e.elements[x].props.children.slice(findIndex(ch, e.range.start.offset))))
	//
	//	// const ch1 = e.elements[x].props.children.slice(0, findIndex(e.range.start.offset))
	//	// const ch2 = e.elements[x].props.children.slice(findIndex(e.range.start.offset))
	//	// console.log({ ch1: JSONClone(ch1), ch2: JSONClone(ch2) })
	//
	//	// collapseToStart(e)
	//	render(e)
}

// Deletes the next word, rune, line or the current range.
export function $delete(e, { deleteType }) {
	const [dir, boundary] = deleteType.split("-")
	if (!testForSelection(e)) {
		const extendRange = dir === "rtl" && dir !== "ltr" ? extendRangeRTL : extendRangeLTR
		extendRange(e, boundary)
	}
	deleteSelection(e)
	collapseToStart(e)
	render(e)
}

// Uncontrolled input handler.
export function uncontrolledInput(e, { children, range }) {
	const { el1 } = getShorthandVars(e)
	el1.props.children = children
	e.range = range
	collapseToStart(e)
	render(e)
}
