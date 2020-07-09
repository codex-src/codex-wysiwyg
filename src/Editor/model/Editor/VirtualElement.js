import hash from "lib/hash"
import { immerable } from "immer"

// Describes a virtual element.
class VirtualElement {
	[immerable] = true

	type = ""
	key = hash(6)
	props = {
		children: [],
	}

	constructor({ type, key, props } = {}) {
		Object.assign(this, {
			type: type || "",
			key: key || hash(),
			props: props || {
				children: [],
			},
		})
	}
}

export default VirtualElement
