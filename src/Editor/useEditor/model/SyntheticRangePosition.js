import domUtils from "lib/domUtils"
import { immerable } from "immer"

// Describes a synthetic range position.
class SyntheticRangePosition {
	[immerable] = true

	key = ""
	offset = 0

	// Computes a synthetic range position from a range
	// position object literal.
	static fromRangePositionLiteral(range) {
		let { node, offset } = range

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

	// Compares whether synthetic range positions are equal.
	static areEqual(c1, c2) {
		const ok = (
			c1.key === c2.key &&
			c1.offset === c2.offset
		)
		return ok
	}

	// Converts the synthetic range position to a range
	// position object literal.
	toRangePositionLiteral() {
		let { key, offset } = this

		// Compute node and offset (offset2):
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

export default SyntheticRangePosition
