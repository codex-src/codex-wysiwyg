import * as ElementList from "./methods/ElementList"
import * as iterate from "lib/UTF8/iterate"
import defer from "./utils/children/defer"
import index from "./utils/children/index"
import textContent from "./utils/children/textContent"

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

// Inserts text at the current range.
export const insertText = e => text => {
	recordAction(e)("insert-text")
	const list = ElementList.fromElements(e.elements)
	if (!e.range.collapsed()) {
		deleteImpl(e)(list)
	}
	// ...
	collapseStart(e)()
	render(e)()
}

// let x1 = 0
// if (k == k1) {
// 	x1 = index(el.props.children, range.start.offset)
// }
// let x2 = el.props.children.length
// if (k === k2) {
// 	x2 = index(el.props.children, range.end.offset)
// }

// for (let k = k1; k; k = k.next) {
// 	const x1 = k === k1 ? index(k.current.props.children, e.range.start.offset) : 0
// 	const x2 = k === k2 ? index(k.current.props.children, e.range.end.offset) : k.current.props.children.length
// 	children.push(...k.current.props.children.slice(x1, x2))
// 	if (k === k2) {
// 		// No-op
// 		break
// 	}
// }

// Unexported; queries the current children.
const queryChildren = e => list => {
	const k1 = ElementList.find(list)(each => each.key === e.range.start.key)
	let k2 = k1
	if (!e.range.collapsed()) {
		k2 = ElementList.find(list)(each => each.key === e.range.end.key)
	}
	const children = []
	let k = k1
	while (k) {
		const el = k.current

		const x1 = k === k1 ? index(el.props.children, e.range.start.offset) : 0
		const x2 = k === k2 ? index(el.props.children, e.range.end.offset) : el.props.children.length
		children.push(...el.props.children.slice(x1, x2))
		if (k === k2) {
			// No-op
			break
		}
		k = k.next
	}
	return children
}

// Applies a format to the current range.
export const applyFormat = e => formatType => {
	recordAction(e)("apply-format")
	const list = ElementList.fromElements(e.elements)

	if (e.range.collapsed()) {
		// TODO
		return
	}

	const children = queryChildren(e)(list)
	const shouldApply = (() => {
		if (formatType === "plaintext") {
			return "plaintext"
		}
		const didApply = children.every(each => each.types.some(each => each.type === formatType))
		return didApply ? "should-not-apply" : "should-apply"
	})()
	switch (shouldApply) {
	case "plaintext":
		for (const each of children) {
			each.types.splice(0)
		}
		break
	case "should-not-apply":
		for (const each of children) {
			const x = each.types.findIndex(each => each.type === formatType)
			if (x >= 0) {
				each.types.splice(x, 1)
			}
		}
		break
	case "should-apply":
		for (const each of children) {
			const x = each.types.findIndex(each => each.type === formatType)
			if (x === -1) {
				each.types.push({
					type: formatType,
					props: null, // TODO
				})
			}
		}
		break
	default:
		// No-op
		break
	}

	const k1 = ElementList.find(list)(each => each.key === e.range.start.key)
	let k2 = k1
	if (!e.range.collapsed()) {
		k2 = ElementList.find(list)(each => each.key === e.range.end.key)
	}

	// Defer on children:
	let k = k1
	while (k) {
		defer(k.current.props.children)
		k = k.next
		if (k && k.prev === k2) { // FIXME
			// No-op
			break
		}
	}
	render(e)()
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

// Unexported; deletes the current range.
const deleteImpl = e => list => {
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

// Deletes the next right-to-left or left-to-right rune,
// word, or line at the current range.
export const $delete = e => (dir, boundary) => {
	recordAction(e)(`delete-${dir}-${boundary}`)
	const list = ElementList.fromElements(e.elements)
	if (e.range.collapsed()) {
		const extend = dir === "rtl" && dir !== "ltr" ? extendRTL : extendLTR
		extend(e)(list, boundary)
	}
	deleteImpl(e)(list)
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
