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
	static fromUserLiteral([node, originalOffset]) {
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
				offset += domUtils.isTextNode(each) &&
					each.nodeValue.length
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

	// Resolves to a user literal.
	toUserLiteral() {
		let { key, offset: originalOffset } = this

		let node = null
		let offset = 0
		const recurse = on => {
			if (domUtils.isTextNodeOrBrElement(on) && originalOffset - (on.nodeValue || "").length <= 0) {
				node = on
				offset = originalOffset
				return true
			}
			for (const each of on.childNodes) {
				if (recurse(each)) {
					return true
				}
				originalOffset -= domUtils.isTextNode(each) &&
					each.nodeValue.length
			}
			return false
		}
		recurse(document.getElementById(key))
		return [node, offset]
	}
}

export default Position
