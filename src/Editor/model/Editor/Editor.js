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

	// Focuses the editor.
	focus() {
		return produce(this, draft => {
			draft.focused = true
		})
	}
	// Blurs the editor.
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

	// Controlled delete handler.
	controlledDeleteHandler(desc) {
		return produce(this, draft => {
			console.log({ desc })
			// draft.shouldRerender++
		})
	}

	// // Deletes right-to-left by one word.
	// deleteRTLWord() {
	// 	return produce(this, draft => {
	// 		controlledDelete(draft, "rtl", "word")
	// 	})
	// }
	// // Deletes right-to-left by one line.
	// deleteRTLLine() {
	// 	return produce(this, draft => {
	// 		controlledDelete(draft, "rtl", "line")
	// 	})
	// }
	// // Deletes left-to-right by one rune.
	// deleteLTRRune() {
	// 	return produce(this, draft => {
	// 		controlledDelete(draft, "rtl", "rune")
	// 	})
	// }
	// // Deletes left-to-right by one rune.
	// deleteLTRWord() {
	// 	return produce(this, draft => {
	// 		controlledDelete(draft, "rtl", "rune")
	// 	})
	// }

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
