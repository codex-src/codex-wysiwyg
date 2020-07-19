import * as ElementList from "./methods/ElementList"
import * as iterate from "lib/UTF8/iterate"
import index from "./utils/index"
import textContent from "./utils/textContent"

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

// Unexported; extends the range right-to-left.
const extendRTL = e => (list, boundary) => {
	const k = ElementList.find(list)(each => each.key === e.range.start.key)
	const substr = textContent(k.current.props.children).slice(0, e.range.start.offset)
	if (!substr && k.prev) {
		Object.assign(e.range.start, {
			key: k.prev.current.key,
			offset: textContent(k.prev.current.props.children).length,
		})
		return
	}
	const itd = iterate.rtl[boundary](substr)
	e.range.start.offset -= itd.length
}

// Unexported; extends the range left-to-right.
const extendLTR = e => (list, boundary) => {
	const k = ElementList.find(list)(each => each.key === e.range.start.key)
	const substr = textContent(k.current.props.children).slice(e.range.end.offset)
	if (!substr && k.next) {
		Object.assign(e.range.end, {
			key: k.next.current.key,
			offset: 0,
		})
		return
	}
	const itd = iterate.ltr[boundary](substr)
	e.range.end.offset += itd.length
}

// Unexported; deletes the range.
const $delete = e => list => {
	const k1 = ElementList.find(list)(each => each.key === e.range.start.key)
	let k2 = k1
	if (!e.range.collapsed()) {
		k2 = ElementList.find(list)(each => each.key === e.range.end.key)
	}
	const ch1 = k1.current.props.children
	const ch2 = k2.current.props.children
	k1.current.props.children = [
		...ch1.slice(0, index(ch1, e.range.start.offset)),
		...ch2.slice(index(ch2, e.range.end.offset)),
	]
	let k = k2
	while (k !== k1) {
		k.parentElement.splice(k.index, 1)
		k = k.prev
	}
}

// Controlled delete handler; deletes the next right-to-left
// or left-to-right rune, word, or line.
export const controlledDelete = e => (dir, boundary) => {
	recordAction(e)(`delete-${dir}-${boundary}`)
	const list = ElementList.fromElements(e.elements)
	if (e.range.collapsed()) {
		const extend = dir === "rtl" && dir !== "ltr" ? extendRTL : extendLTR
		extend(e)(list, boundary)
	}
	$delete(e)(list)
	collapseStart(e)()
	render(e)()
}

// Uncontrolled input handler.
export const uncontrolledInput = e => (children, range) => {
	recordAction(e)("input")
	const list = ElementList.fromElements(e.elements)
	const k = ElementList.find(list)(each => each.key === range.start.key)
	k.current.props.children = children
	e.range = range
	render(e)()
}

// Unexported; collapses end-to-start.
const collapseStart = e => () => {
	e.range.end = e.range.start
}

// // Unexported; collapses start-to-end.
// const collapseEnd = e => () => {
// 	e.range.start = e.range.end
// }

// Unexported; rerenders.
const render = e => () => {
	e.shouldRerender++
}
