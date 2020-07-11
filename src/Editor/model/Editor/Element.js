import hash from "lib/hash"
import { immerable } from "immer"

// Describes an element. Unlike multiline elements, elements
// cannot render further nested elements.
class Element {
	[immerable] = true

	type = "p"
	key = hash(6)
	props = {
		children: [],
	}

	constructor({ type, key, props } = {}) {
		Object.assign(this, {
			type: type || "p",
			key: key || hash(6),
			props: props || {
				children: [],
			},
		})
	}
}

export default Element
