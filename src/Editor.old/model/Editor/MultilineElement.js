import hash from "lib/hash"
import must from "lib/must"
import { immerable } from "immer"

// Describes an element. Unlike elements, multiline elements
// can render further nested elements.
class MultilineElement {
	[immerable] = true

	type = ""
	key = hash()
	props = {
		elements: [],
	}

	constructor({ type, key, props } = {}) {
		Object.assign(this, {
			type: must(type),
			key: key || hash(),
			props: props || {
				elements: [],
			},
		})
	}
}

export default MultilineElement
