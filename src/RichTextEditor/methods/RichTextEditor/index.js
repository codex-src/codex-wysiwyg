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

// Reads the text content.
const textContent = children => {
	return children.reduce((acc, each) => acc += each.props.children, "")
}

// Controlled delete handler; deletes the next right-to-left
// or left-to-right rune, word, or line.
export const controlledDelete = e => keyDownType => {
	recordAction(e)(keyDownType)

	// Get the direction and boundary:
	const [dir, boundary] = {
		"delete-rtl-rune": ["rtl", "rune"],
		"delete-rtl-word": ["rtl", "word"],
		"delete-rtl-line": ["rtl", "line"],
		"delete-ltr-rune": ["ltr", "rune"],
		"delete-ltr-word": ["ltr", "word"],
	}[keyDownType]

	// Get the current element link:
	const ll = LinkedElementList.fromElements(e.elements)
	const k = LinkedElementList.find(ll)(each => each.key === e.range.start.key)
	if (e.range.collapsed()) {
		// Extend the range right-to-left:
		if (dir === "rtl") {
			const substr = textContent(k.current.props.children).slice(0, e.range.start.offset)
			if (!e.range.start.offset) {
				if (k.prev) {
					e.range.start = {
						key: k.prev.current.key,
						offset: textContent(k.prev.current.props.children).length,
					}
				}
			} else {
				const itd = iterate.rtl[boundary](substr)
				e.range.start.offset -= itd.length
			}
		// Extend the range left-to-right:
		} else if (dir === "ltr") {
			const substr = textContent(k.current.props.children).slice(e.range.end.offset)
			if (e.range.end.offset === substr.length) {
				if (k.next) {
					e.range.end = {
						key: k.next.current.key,
						offset: 0,
					}
				}
			} else {
				const itd = iterate.ltr[boundary](substr)
				e.range.end.offset += itd.length
			}
		}
	}

	// ...

	rerender(e)()
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
