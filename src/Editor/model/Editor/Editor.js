import * as scan from "../../utils/scan"
import DblLinkedElementList from "../../utils/elements/DblLinkedElementList"
import ElementList from "../../utils/elements/ElementList"

import {
	Position,
	Range,
} from "../model"

import {
	immerable,
	produce,
} from "immer"

// Describes an editor.
class Editor {
	[immerable] = true

	// NOTE: DOMContentLoaded disables read-only mode.
	readOnlyModeEnabled = true
	focused = false
	elements = []
	range = new Range()
	shouldRerender = 0

	constructor(elements) {
		Object.assign(this, {
			elements: elements || [],
		})
	}

	// // Computes the serialized HTML.
	// get serializedHTML() {
	// 	// ...
	// }

	// Enables read-only mode.
	enableReadOnlyMode() {
		return produce(this, draft => {
			draft.readOnlyModeEnabled = true
		})
	}

	// Disables read-only mode.
	disableReadOnlyMode() {
		return produce(this, draft => {
			draft.readOnlyModeEnabled = false
		})
	}

	// Focuses the <article> element.
	focus() {
		return produce(this, draft => {
			draft.focused = true
		})
	}

	// Blurs the <article> element.
	blur() {
		return produce(this, draft => {
			draft.focused = false
		})
	}

	// Selects a range.
	select(range) {
		return produce(this, draft => {
			draft.range = range
		})
	}

	// Extends the range in a direction by a boundary. dir
	// must be "rtl" or "ltr" and boundary must be "rune",
	// "word", or "line".
	extend(dir, boundary) {
		return produce(this, draft => {
			const k = new DblLinkedElementList(draft.elements).find(each => each.key === draft.range.start.key)

			// Extend right-to-left:
			let substr = ""
			if (dir === "rtl") {
				substr = k.current.value.slice(0, draft.range.start.offset)
				const runes = scan.rtl[boundary](substr)
				if (!runes && k.prev) {
					draft.range.start = new Position({
						key: k.prev.current.key,
						offset: k.prev.current.value.length,
					})
				} else {
					draft.range.start.offset -= runes.length
				}
			// Extend left-to-right:
			} else if (dir === "ltr") {
				substr = k.current.value.slice(draft.range.end.offset)
				const runes = scan.ltr[boundary](substr)
				if (!runes && k.next) {
					draft.range.end = new Position({
						key: k.next.current.key,
						offset: 0,
					})
				} else {
					draft.range.end.offset += runes.length
				}
			}
		})
	}

	// Controlled delete handler.
	controlledDeleteHandler(desc) {
		return produce(this, draft => {
			const [lhs, rhs] = desc.split("-")
			const dir = {
				"backspace": "rtl",
				"delete": "ltr",
			}[lhs]
			const boundary = rhs
			console.log({ dir, boundary })
			if (draft.range.collapsed) {
				Object.assign(draft, draft.extend(dir, boundary))
			}
			// // draft.range = draft.range.collapse()
			draft.shouldRerender++
		})
	}

	// selections are equivalent
	// can compute a synthetic range based on offsets
	// no-op at the beginning and at the end
	// always collapses and rerenders

	// Uncontrolled input handler. Note that the range is
	// expected to be collapsed.
	uncontrolledInputHandler(children, range) {
		return produce(this, draft => {
			const el = new ElementList(...draft.elements).find(each => each.key === range.start.key)
			el.props.children = children
			draft.range = range
			draft.shouldRerender++
		})
	}
}

export default Editor
