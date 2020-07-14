import hash from "lib/hash"
import { immerable } from "immer"

// Describes an element. Unlike multiline elements, elements
// cannot render further nested elements.
class Element {
	[immerable] = true

	type = "p"
	key = hash()
	props = {
		children: [],
	}

	constructor({ type, key, props } = {}) {
		Object.assign(this, {
			type: type || "p",
			key: key || hash(),
			props: props || {
				children: [],
			},
		})
	}

	// Computes text for props.children.
	get value() {
		// return this.props.children.reduce((acc, each) => acc += each.value, "")
		return this.props.children.map(each => each.value).join("")
	}
}

export default Element
