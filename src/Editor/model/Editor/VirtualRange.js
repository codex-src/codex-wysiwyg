import VirtualPosition from "./VirtualPosition"

import {
	immerable,
	produce,
} from "immer"

// Describes a virtual range.
class Range {
	[immerable] = true

	start = new VirtualPosition()
	end = new VirtualPosition()

	// Constructs from the current range, scoped to a tree and
	// [contenteditable="true"] descendants.
	static getCurrent(tree) {
		// ...
	}

	// Returns whether virtual positions are collapsed.
	get collapsed() {
		return this.start.isEqualTo(this.end)
	}

	// Collapses virtual positions.
	collapse() {
		return produce(this, draft => {
			draft.end = draft.start
		})
	}

	// Converts to a range literal.
	toRangeLiteral() {
		// ...
	}
}

export default Range
