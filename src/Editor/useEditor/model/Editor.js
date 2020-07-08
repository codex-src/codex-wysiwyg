import SyntheticRange from "./SyntheticRange"

import {
	immerable,
	produce,
} from "immer"

// Describes an editor.
class Editor {
	[immerable] = true

	readOnlyModeEnabled = true // DOMContentLoaded disables read-only mode
	focused = false

	elements = [] // new SyntheticElements()
	range = new SyntheticRange()

	renderCount = 0

	// TODO: Change to syntheticElements?
	constructor(initialState /* elements */) {
		Object.assign(this, {
			elements: initialState,
		})
	}

	// Disables read-only mode; disables future edits.
	disableReadOnlyMode() {
		return produce(this, draft => {
			draft.readOnlyModeEnabled = false
		})
	}
	// Enables read-only mode; enables future edits.
	enableReadOnlyMode() {
		return produce(this, draft => {
			draft.readOnlyModeEnabled = true
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
	// Selects a synthetic range.
	select(range) {
		return produce(this, draft => {
			draft.range = range
		})
	}
}

export default Editor
