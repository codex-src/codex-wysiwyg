import Position from "./Position"

import {
	immerable,
	produce,
} from "immer"

// Describes a range. A range corresponds to a user
// insertion point or selection.
class Range {
	[immerable] = true

	start = new Position()
	end = new Position()

	// Constructs from the current range, scoped to a tree and
	// [contenteditable="true"] descendants.
	static getCurrent(tree) {
		// ...
	}

	// Computes whether the positions are collapsed.
	get collapsed() {
		return this.start.isEqualTo(this.end)
	}

	// Collapses end-to-start.
	collapseToStart() {
		return produce(this, draft => {
			draft.end = draft.start
		})
	}

	// Collapses start-to-end.
	collapseToEnd() {
		return produce(this, draft => {
			draft.start = draft.end
		})
	}

	// Resolves to a user literal.
	toUserLiteral() {
		// ...
	}
}

export default Range
