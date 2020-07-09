import { immerable } from "immer"

// Describes a WYSIWYG editor.
class WYSIWYGEditor {
	[immerable] = true

	// Read-only mode is enabled.
	readOnlyModeEnabled = false
	// Is the active element?
	isActiveElement = false
	// Synthetic elements.
	elements = new Elements()
	// Synthetic range.
	range = new Range()

	renderCount

	#pendingRender = true

	// ...
	get shouldRender() {
		// ...
	}

	// ...
	rendered() {
		return
		this.#pendingRender
	}


	#renderCount = 0
	#renderCounter = 0

	get shouldRender() {
		return this.rounderCounter + renderCounte
	}
}
