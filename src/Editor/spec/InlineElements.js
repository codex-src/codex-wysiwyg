// Describes an array of inline elements.
class InlineElements extends Array {
	// Converts to intermediary React elements.
	toIntermediaryReact() {
		// ...
	}

	// Converts to React elements. Uses an intermediary step
	// because React elements are read-only.
	toReact() {
		// const elems = toIntermediaryReact()
		// ...
	}

	// Defer-all function.
	defer() {
		// ...
	}
}

export default InlineElements
