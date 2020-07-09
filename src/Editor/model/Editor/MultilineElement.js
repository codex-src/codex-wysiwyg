import hash from "lib/hash"
import { immerable } from "immer"

// Describes an element. Unlike elements, multiline elements
// can render further sub-elements.
class MultilineElement {
	[immerable] = true

	type = ""
	key = hash(6)
	props = {
		elements: [],
	}

	constructor({ type, key, props } = {}) {
		Object.assign(this, {
			type: type || "",
			key: key || hash(6),
			props: props || {
				elements: [],
			},
		})
	}
}

export default MultilineElement
