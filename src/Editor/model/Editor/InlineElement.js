import { immerable } from "immer"

// Describes an inline element, such as plaintext or rich
// text. An inline element is considered discerete when
// types and props are not equal.
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
