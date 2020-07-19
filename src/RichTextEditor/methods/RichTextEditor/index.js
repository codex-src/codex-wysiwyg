// import * as LinkedElementList from "../LinkedElementList"
import * as ElementList from "../ElementList"
import * as iterate from "lib/UTF8/iterate"
import * as Range from "../Range"
import textContent from "../../utils/textContent"
import x from "../../utils/index"

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
export const controlledDelete = e => (dir, boundary) => {
	recordAction(e)(`delete-${dir}-${boundary}`)
	const lst = ElementList.fromElements(e.elements)
	let k = ElementList.findKey(lst)(e.range.start.key)
	// Extend the range:
	if (e.range.collapsed()) {
		if (dir === "rtl") {
			const substr = textContent(k.current.props.children).slice(0, e.range.start.offset)
			if (!substr && k.prev) {
				Object.assign(e.range.start, {
					key: k.prev.current.key,
					offset: textContent(k.prev.current.props.children).length,
				})
			} else {
				const itd = iterate.rtl[boundary](substr)
				e.range.start.offset -= itd.length
			}
		} else if (dir === "ltr") {
			const substr = textContent(k.current.props.children).slice(e.range.end.offset)
			if (!substr && k.next) {
				Object.assign(e.range.end, {
					key: k.next.current.key,
					offset: 0,
				})
			} else {
				const itd = iterate.ltr[boundary](substr)
				e.range.end.offset += itd.length
			}
		}
	}
	// Delete the range:
	const k1 = ElementList.findKey(lst)(e.range.start.key)
	let k2 = k1
	if (!e.range.collapsed()) {
		k2 = ElementList.findKey(lst)(e.range.end.key)
	}
	const [el1, el2] = [k1.current, k2.current]
	el1.props.children = [
		...el1.props.children.slice(0, x(el1.props.children, e.range.start.offset)),
		...el2.props.children.slice(x(el2.props.children, e.range.end.offset)),
	]
	// let k = k2
	k = k2
	while (k !== k1) {
		k.parentElement.splice(k.index, 1)
		k = k.prev
	}
	// Rerender:
	e.range.end = e.range.start
	e.shouldRerender++
}

// Uncontrolled input handler.
export const uncontrolledInput = e => (children, range) => {
	recordAction(e)("input")
	const lst = ElementList.fromElements(e.elements)
	const k = ElementList.findKey(lst)(range.start.key)
	k.current.props.children = children
	e.range = range
	e.shouldRerender++
}
