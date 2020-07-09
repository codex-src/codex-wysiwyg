import {
	immerable,
	produce,
} from "immer"

// Describes a position.
class Position {
	[immerable] = true

	key = ""
	offset = ""

	// Constructs from a DOM literal.
	static fromDOMLiteral({ node, offset }) {
		// ...
	}

	// Compares shallowly and deeply.
	isEqualTo(pos) {
		const ok = (
			this === pos ||
			(this.key === pos.key && this.offset === pos.offset)
		)
		return ok
	}

	// Converts to a DOM literal.
	toDOMLiteral() {
		// ...
	}
}

export default Position
