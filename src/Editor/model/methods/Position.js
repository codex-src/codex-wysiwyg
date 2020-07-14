import domUtils from "lib/domUtils"

// Constructs from a user literal.
export function __static__fromUserLiteral({ node, offset: originalOffset }) {
	// Guard non-contenteditable descendants:
	if (!domUtils.ascendElement(node).closest("[contenteditable='true']")) {
		return null
	}
	// Guard node and originalOffset (1 of 2):
	while (!domUtils.isTextNodeOrBrElement(node)) {
		if (originalOffset && originalOffset === node.childNodes.length) {
			originalOffset = node.childNodes.length - 1
		}
		node = node.childNodes[originalOffset]
		originalOffset = 0
	}
	// Guard originalOffset (2 of 2):
	if (originalOffset > (node.nodeValue || "").length) {
		originalOffset = Math.max(0, (node.nodeValue || "").length)
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

// Resolves to a user literal.
export function toUserLiteral() {
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
	return { node, offset }
}
