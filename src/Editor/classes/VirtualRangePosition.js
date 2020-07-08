import domUtils from "lib/domUtils"
import { immerable } from "immer"

// Describes a virtual range position.
class VirtualRangePosition {
	[immerable] = true

	key = ""
	offset = 0

	// Creates a new virtual range position from a range
	// position.
	static fromRangePosition({ node, offset }) {
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
		let offset2 = 0 // Do not shadow offset
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

		// Done:
		const created = new this()
		Object.assign(created, {
			key,
			offset: offset2,
		})
		return created
	}

	// Compares whether virtual range positions are equal.
	static areEqual(c1, c2) {
		const ok = (
			c1.key === c2.key &&
			c1.offset === c2.offset
		)
		return ok
	}

	// Converts a virtual range position to a range position
	// object (node, offset).
	toRangePosition() {
		let { key, offset } = this

		let node = null
		let offset2 = 0 // Do not shadow offset
		const recurse = on => {
			if (domUtils.isTextNodeOrBrElement(on) && offset - (on.nodeValue || "").length <= 0) {
				node = on
				offset2 = offset
				return true
			}
			for (const each of on.childNodes) {
				if (recurse(each)) {
					return true
				}
				offset -= domUtils.isTextNode(each) && each.nodeValue.length
			}
			return false
		}
		recurse(document.getElementById(key))

		// Done:
		const range = {
			node,
			offset: offset2,
			toArray() {
				return [this.node, this.offset]
			},
		}
		return range
	}
}

export default VirtualRangePosition
