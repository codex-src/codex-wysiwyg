import helpers from "lib/DOM/helpers"

// Gets a position from a user literal.
export function getPositionFromUserLiteral({ node, offset: originalOffset }) {
	// Guard non-contenteditable descendants:
	if (!helpers.ascendElement(node).closest("[contenteditable='true']")) {
		return null
	}
	// Guard node and originalOffset (1 of 2):
	while (!helpers.isTextNodeOrBrElement(node)) {
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
			key = helpers.ascendElementID(on).id
			offset += originalOffset
			return true
		}
		for (const each of on.childNodes) {
			if (recurse(each)) {
				return true
			}
			offset += helpers.isTextNode(each) &&
				each.nodeValue.length
		}
		return false
	}
	recurse(helpers.ascendElementID(node))
	return { key, offset }
}

// Converts a position to a user literal.
export function convPositionToUserLiteral(pos) {
	let { key, offset: originalOffset } = pos

	let node = null
	let offset = 0
	const recurse = on => {
		if (helpers.isTextNodeOrBrElement(on) && originalOffset - (on.nodeValue || "").length <= 0) {
			node = on
			offset = originalOffset
			return true
		}
		for (const each of on.childNodes) {
			if (recurse(each)) {
				return true
			}
			originalOffset -= helpers.isTextNode(each) &&
				each.nodeValue.length
		}
		return false
	}
	recurse(document.getElementById(key))
	return { node, offset }
}
