import {
	immerable,
	produce,
} from "immer"

// Describes a position. A position corresponds to a user
// insertion point.
class Position {
	[immerable] = true

	key = ""
	offset = ""

	// Constructs from a user literal.
	static fromUserLiteral({ node, offset }) {
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

	// Resolves to a user literal.
	toUserLiteral() {
		// ...
	}
}

export default Position
