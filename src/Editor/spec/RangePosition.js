import {
	immerable,
	produce,
} from "immer"

// Describes a range position.
class RangePosition {
	[immerable] = true

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

export default RangePosition
