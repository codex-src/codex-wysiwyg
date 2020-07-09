import Range from "./Range"
import { immerable } from "immer"

class Editor {
	[immerable] = true

	// NOTE: DOMContentLoaded disables read-only mode.
	isReadOnlyModeEnabled = true
	isActiveElement = false
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
		// ..
	}

	// Disables read-only mode.
	disableReadOnlyMode() {
		// ..
	}

	// Focuses the editor.
	focus() {
		// ..
	}

	// Blurs the editor.
	blur() {
		// ...
	}

	// Selects a range.
	select(range) {
		// ..
	}

	toSerializedHTML() {
		// ..
	}
}

export default Editor
