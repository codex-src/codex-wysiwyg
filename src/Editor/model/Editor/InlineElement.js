import { immerable } from "immer"

// Describes an inline element; an inline element is a
// representation of zero-to-many nested inline elements,
// such as plaintext or <strong><em>.
//
// Note that there is only one correct representation of an
// inline element because types are sortable.
//
class InlineElement {
	[immerable] = true

	// Zero-to-many types.
	types = []

	// Zero-to-many props.
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
}

export default InlineElement
