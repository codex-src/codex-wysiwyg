import * as scan from "../../utils/scan"
import findElement from "../../utils/elements/findElement"
import Range from "./Range"

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
			let pos = null
			// Right-to-left:
			if (dir === "rtl") {
				pos = draft.range.start
				const el = findElement(draft.elements, each => each.key === pos.key)
				// if (!pos.offset) {
				// 	...
				// } else {
				const substr = el.value.slice(0, pos.offset)
				pos.offset -= scan.rtl[boundary](substr).length
				// }
			// Left-to-right:
			} else if (dir === "ltr") {
				pos = draft.range.end
				const el = findElement(draft.elements, each => each.key === pos.key)
				const substr = el.value.slice(pos.offset)
				pos.offset += scan.ltr[boundary](substr).length
			}

			// if (dir === "rtl") {
			// 	draft.start
			// } else if (dir === "ltr") {
			// 	// draft.end = ...
			// }
		})
	}

	// Controlled delete handler.
	controlledDeleteHandler(desc) {
		let dir = "rtl"
		if (desc.startsWith("delete")) {
			dir = "ltr"
		}
		let boundary = "rune"
		if (desc.endsWith("word")) {
			boundary = "word"
		} else if (desc.endsWith("line")) {
			boundary = "line"
		}
		return produce(this, draft => {
			if (draft.range.collapsed) {
				// draft = draft.extend(dir, boundary)
				draft.extend(dir, boundary)
			}
			// draft.range = draft.range.collapse()
			// state.shouldRerender++
		})
	}

	// selections are equivalent
	// can compute a synthetic range based on offsets
	// no-op at the beginning and at the end
	// always collapses and rerenders

	// Uncontrolled input handler.
	uncontrolledInputHandler(children, range) {
		return produce(this, draft => {
			const el = findElement(draft.elements, each => each.key === range.start.key)
			el.props.children = children
			draft.range = range
			draft.shouldRerender++
		})
	}
}

export default Editor
