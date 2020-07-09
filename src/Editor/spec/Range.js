// Describes a range position.
class RangePosition {
	key = ""
	offset = ""

	// Constructs from a DOM literal.
	static fromDOMLiteral({ node, offset }) {
		// ...
	}

	// Compares shallowly (references) and deeply.
	isEqualTo(pos2) {
		const pos1 = this
		const ok = (
			pos1 === pos2 ||
			(pos1.key === pos2.key && pos1.offset === pos2.offset)
		)
		return ok
	}

	// Converts to a DOM literal.
	toDOMLiteral() {
		// ...
	}
}

// Describes a range.
class Range {
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

	// Converts to a DOM literal.
	toDOMLiteral() {
		// ...
	}
}
