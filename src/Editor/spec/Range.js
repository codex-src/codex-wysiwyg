import {
	immerable,
	produce,
} from "immer"

// Describes a range.
class Range {
	[immerable] = true

	start = new RangePosition()
	end = new RangePosition()

	// Constructs from a DOM literal.
	static fromDOMLiteral({ start, end }) {
		// ...
	}

	// Constructs from the current DOM range, scoped to a tree
	// and [contenteditable="true"] descendants.
	static getCurrent(tree) {
		// const start = { ... }
		// const end = { ... }
		// return fromDOMLiteral({ start, end })
	}

	// Returns whether range positions are collapsed.
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

	// Converts to a DOM literal.
	toDOMLiteral() {
		// ...
	}
}

export default Range
