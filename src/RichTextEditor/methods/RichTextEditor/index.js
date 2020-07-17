// TODO: Rename to methods?

import * as iterate from "lib/UTF8/iterate"
import * as LinkedElementList from "../LinkedElementList"

// Records an action; records the timestamp and action type.
export const recordAction = e => actionType => {
	const now = Date.now()
	if (now - e.lastActionTimestamp < 200) {
		// No-op
		return
	}
	e.lastActionTimestamp = now
	e.lastAction = actionType
}

// Enables read-only mode.
export const enableReadOnlyMode = e => () => {
	recordAction(e)("enable-read-only-mode")
	e.readOnlyModeEnabled = true
}

// Disables read-only mode.
export const disableReadOnlyMode = e => () => {
	recordAction(e)("disable-read-only-mode")
	e.readOnlyModeEnabled = false
}

// Focuses the editor.
export const focus = e => () => {
	recordAction(e)("focus")
	e.focused = true
}

// Blurs the editor.
export const blur = e => () => {
	recordAction(e)("blur")
	e.focused = false
}

// Selects a range.
export const select = e => range => {
	recordAction(e)("select")
	e.range = range
}

// Controlled delete handler; deletes the next right-to-left
// or left-to-right rune, word, or line.
export const controlledDelete = e => keyDownType => {

	// Object.assign(e.range.start, {
	// 	key: "",
	// 	offset: 0,
	// })
	console.log(e.range.collapsed())

	//	recordAction(e)(keyDownType)
	//
	//	const [dir, boundary] = {
	//		"delete-rtl-rune": ["rtl", "rune"],
	//		"delete-rtl-word": ["rtl", "word"],
	//		"delete-rtl-line": ["rtl", "line"],
	//		"delete-ltr-rune": ["ltr", "rune"],
	//		"delete-ltr-word": ["ltr", "word"],
	//	}[keyDownType]
	//
	//	const ll = LinkedElementList.fromElements(e.elements)
	//	if (e.range.collapsed) {
	//
	//		// Extend right-to-left:
	//		let substr = ""
	//		if (dir === "rtl") {
	//			substr = ll.current.value.slice(0, e.range.start.offset)
	//			const runes = iterate.rtl[boundary](substr)
	//			if (!runes && ll.prev) {
	//				// e.range.start.key = ll.prev.current.key
	//				// e.range.start.offset = ll.prev.current.props.children.reduce((acc, each) => acc += each.props.children, "").length
	//				// e.range.start.collapsed = false
	//				Object.assign(e.range, {
	//					...e.range,
	//					start: {
	//						key: ll.prev.current.key,
	//						offset: ll.prev.current.props.children.reduce((acc, each) => acc += each.props.children, "").length,
	//					},
	//					collapsed: true,
	//				})
	//			} else {
	//				Object.assign(e.range, {
	//
	//				})
	//				e.range.start.offset -= runes.length
	//			}
	//
	//		// Extend left-to-right:
	//		} else if (dir === "ltr") {
	//			substr = ll.current.value.slice(e.range.end.offset)
	//			const runes = iterate.ltr[boundary](substr)
	//			if (!runes && ll.next) {
	//				// e.range.start.key = ll.next.current.key
	//				// e.range.start.offset = 0
	//				// e.range.start.collapsed = false
	//				Object.assign(e.range, {
	//					...e.range,
	//					start: {
	//						key: ll.next.current.key,
	//						offset: 0,
	//					},
	//					collapsed: true,
	//				})
	//			} else {
	//				e.range.end.offset += runes.length
	//			}
	//		}
	//
	//	}
	//
	//	rerender(e)()
}

// Uncontrolled input handler.
//
// TODO: Add support for nested elements
export const uncontrolledInput = e => (children, range) => {
	recordAction(e)("input")
	const el = e.elements.find(each => each.key === range.start.key)
	el.props.children = children
	e.range = range
	rerender(e)()
}

// Rerenders the editor.
export const rerender = e => () => {
	e.shouldRerender++
}
