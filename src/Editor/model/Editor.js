import VirtualRange from "./VirtualRange"
import { immerable } from "immer"

// Describes an editor.
class Editor {
	[immerable] = true

	// Is read-only mode enabled?
	//
	// NOTE: DOMContentLoaded disables read-only mode.
	isReadOnlyModeEnabled = true
	// Is the active element?
	isActiveElement = false
	// Virtual elements.
	elements = []
	// Virtual range.
	range = new VirtualRange()
	// Render counter; use as an effect dependency.
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
