import domUtils from "lib/domUtils"
import { immerable } from "immer"

// Describes a virtual range component.
class VRangeComponent {
	[immerable] = true

	key = ""
	offset = 0

	// Constructs a new virtual range component.
	constructor({ key, offset }) {
		Object.assign(this, {
			key,
			offset,
		})
	}

	// Creates a new virtual range component from a range
	// component.
	static fromRangeComponent({ node, offset }) {
		// Compute ascended:
		const ascended = domUtils.ascendElementID(node)

		// Guard node and offset:
		while (!domUtils.isTextNodeOrBrElement(node)) {
			if (offset && offset === node.childNodes.length) { // offset must be 1 or more
				offset = node.childNodes.length - 1
			}
			node = node.childNodes[offset]
			offset = 0
		}

		const computed = {
			key: "",
			offset: 0,
		}
		const recurse = on => {
			if (on === node) {
				Object.assign(computed, {
					key: ascended.id,
					offset: computed.offset + offset,
				})
				return true
			}
			for (const each of on.childNodes) {
				if (recurse(each)) {
					return true
				}
				computed.offset += domUtils.isTextNode(each) &&
					each.nodeValue.length
			}
			return false
		}
		recurse(ascended)

		return new this(computed)
	}

	// Compares whether virtual range components are equal.
	static areEqual(c1, c2) {
		const ok = (
			c1[0] === c2[0] &&
			c1[1] === c2[1]
		)
		return ok
	}

	// // Converts to a Range component.
	// toRangeComponent() {
	// 	// ...
	// }
}

export default VRangeComponent
