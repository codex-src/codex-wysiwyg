import hash from "lib/hash"
import { immerable } from "immer"

// Describes a virtual multiline element.
class VirtualMultilineElement {
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

export default VirtualMultilineElement
