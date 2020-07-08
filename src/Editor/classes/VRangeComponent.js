import domUtils from "lib/domUtils"
import { immerable } from "immer"

// Describes a virtual range component.
class VRangeComponent {
	[immerable] = true

	key = ""
	offset = 0

	// Creates a new virtual range component from a range
	// component.
	static fromRangeComponent({ node, offset }) {
		// Guard node and offset:
		while (!domUtils.isTextNodeOrBrElement(node)) {
			if (offset && offset === node.childNodes.length) { // offset must be 1 or more
				offset = node.childNodes.length - 1
			}
			node = node.childNodes[offset]
			offset = 0
		}

		// Compute key and offset:
		let key = ""
		let offset2 = 0 // Does not shadow offset
		const recurse = on => {
			if (on === node) {
				key = domUtils.ascendElementID(on).id
				offset2 += offset
				return true
			}
			for (const each of on.childNodes) {
				if (recurse(each)) {
					return true
				}
				offset += domUtils.isTextNode(each) && each.nodeValue.length
			}
			return false
		}
		recurse(domUtils.ascendElementID(node))

		// Create a new virtual range component:
		const created = new this()
		Object.assign(created, {
			key,
			offset: offset2,
		})
		return created
	}

	// Compares whether virtual range components are equal.
	static areEqual(c1, c2) {
		const ok = (
			c1[0] === c2[0] &&
			c1[1] === c2[1]
		)
		return ok
	}

	// Converts a virutal range component to a range
	// component.
	toRangeComponent() {
		let { key, offset } = this

		// TODO
		const computed = {
			node: null,
			offset: 0,
		}
		const recurse = on => {
			if (domUtils.isTextNodeOrBrElement(on) && offset - (on.nodeValue || "").length <= 0) {
				Object.assign(computed, {
					node: on,
					offset,
				})
				return true
			}
			for (const each of on.childNodes) {
				if (recurse(each)) {
					return true
				}
				offset -= domUtils.isTextNode(each) &&
					each.nodeValue.length
			}
			return false
		}
		recurse(document.getElementById(key))
		return computed
	}
}

export default VRangeComponent
