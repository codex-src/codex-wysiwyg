import hash from "lib/hash"
import { immerable } from "immer"

// Describes an element.
class Element {
	[immerable] = true

	type = ""
	key = hash(6)
	props = {
		children: [],
	}

	constructor({ type, key, props } = {}) {
		Object.assign(this, {
			type: type || "",
			key: key || hash(6),
			props: props || {
				children: [],
			},
		})
	}
}

export default Element
