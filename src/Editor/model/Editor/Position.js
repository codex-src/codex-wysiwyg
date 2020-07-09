import {
	immerable,
	produce,
} from "immer"

// Describes a position; a start and end position compose a
// range.
class Position {
	[immerable] = true

	key = ""
	offset = ""

	// Constructs from a position literal.
	static fromLiteral({ node, offset }) {
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

	// Converts to a position literal.
	toLiteral() {
		// ...
	}
}

export default Position
