import domUtils from "lib/domUtils"
import { immerable } from "immer"

// Describes a position. A position corresponds to a user
// insertion point.
class Position {
	[immerable] = true

	key = ""
	offset = 0

	constructor({ key, offset } = {}) {
		Object.assign(this, {
			key: key || "",
			offset: offset || 0,
		})
	}

	// Constructs from a user literal.
	static fromUserLiteral({ node, offset: originalOffset }) {
		if (!domUtils.ascendElement(node).closest("[contenteditable='true']")) {
			return null
		}
		while (!domUtils.isTextNodeOrBrElement(node)) {
			if (originalOffset && originalOffset === node.childNodes.length) {
				originalOffset = node.childNodes.length - 1
			}
			node = node.childNodes[originalOffset]
			originalOffset = 0
		}
		let key = ""
		let offset = 0
		const recurse = on => {
			if (on === node) {
				key = domUtils.ascendElementID(on).id
				offset += originalOffset
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
		return new this({ key, offset })
	}

	// Compares shallowly and deeply.
	isEqualTo(pos) {
		const ok = (
			this === pos ||
			(this.key === pos.key && this.offset === pos.offset)
		)
		return ok
	}

	// // Converts the synthetic range position to a range
	// // position object literal.
	// toRangePositionLiteral() {
	// 	let { key, offset } = this
	//
	// 	// Compute node and offset (offset2):
	// 	let node = null
	// 	let offset2 = 0 // Do not shadow offset
	// 	const recurse = on => {
	// 		if (domUtils.isTextNodeOrBrElement(on) && offset - (on.nodeValue || "").length <= 0) {
	// 			node = on
	// 			offset2 = offset
	// 			return true
	// 		}
	// 		for (const each of on.childNodes) {
	// 			if (recurse(each)) {
	// 				return true
	// 			}
	// 			offset -= domUtils.isTextNode(each) && each.nodeValue.length
	// 		}
	// 		return false
	// 	}
	// 	recurse(document.getElementById(key))
	//
	// 	// Done:
	// 	const range = {
	// 		node,
	// 		offset: offset2,
	// 		toArray() {
	// 			return [this.node, this.offset]
	// 		},
	// 	}
	// 	return range
	// }

	// Resolves to a user literal.
	toUserLiteral() {
		// ...
	}
}

export default Position
