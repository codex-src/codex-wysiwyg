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

	// Resolves to serialized HTML.
	toSerializedHTML() {
		// TODO
	}
}

export default Editor
