// Describes an inline element.
class InlineElement {
	// Zero or more types.
	types = []
	// Zero or more props.
	props = {}
	// Character data.
	value = ""

	constructor({ types, props, value } = {}) {
		Object.assign(this, {
			types: types || [],
			props: props || {},
			value: value || "",
		})
	}

	// Defer-all function.
	defer() {
		// ...
	}
}

export default InlineElement
