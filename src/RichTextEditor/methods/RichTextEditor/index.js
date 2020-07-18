// TODO: Rename to methods?

import * as iterate from "lib/UTF8/iterate"
import * as LinkedElementList from "../LinkedElementList"
import * as Range from "../Range"

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

	const [dir, boundary] = keyDownType.split("-").slice(1)
	const ll = LinkedElementList.fromElements(e.elements)
	const k = LinkedElementList.find(ll)(each => each.key === e.range.start.key)

	// const prev = k.prev && k.prev.current
	// const current = k.current
	// const next = k.next && k.next.current

	if (e.range.collapsed()) {
		// Extend the range right-to-left:
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
		// Extend the range left-to-right:
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

	// const collection = queryCollection(state)
	// for (const c of collection) {
	// 	const [s1, s2] = c.offsets.spans
	// 	c.refs.element.props.spans.splice(s1, s2 - s1)
	// }
	// if (collection.length > 1) {
	// 	const x1 = collection[0].offsets.element
	// 	const x2 = collection[collection.length - 1].offsets.element
	// 	state.elements.splice(x1, (x2 - x1) + 1, {
	// 		...state.elements[x1],
	// 		props: {
	// 			...state.elements[x1].props,
	// 			spans: [
	// 				...state.elements[x1].props.spans,
	// 				...state.elements[x2].props.spans,
	// 			],
	// 		},
	// 	})
	// }

	// const collapsed = Range.collapseStart(e.range)()
	// select(e)(collapsed)
	render(e)()
}

// Uncontrolled input handler.
//
// TODO: Add support for nested elements
export const uncontrolledInput = e => (children, range) => {
	recordAction(e)("input")
	// const ll = LinkedElementList.fromElements(e.elements)
	// const k = LinkedElementList.find(ll)(each => each.key === e.range.start.key)
	// k.current.props.children = children
	const el = e.elements.find(each => each.key === range.start.key)
	el.props.children = children
	e.range = range
	render(e)()
}

// Rerenders the editor.
export const render = e => () => {
	e.shouldRerender++
}
