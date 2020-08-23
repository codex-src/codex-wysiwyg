import domUtils from "lib/DOM/domUtils"

export function computeEditorPositionFromDOMPosition({ node, offset: originalOffset }) {
	// Guard non-contenteditable descendants:
	if (!domUtils.ascendElement(node).closest("[contenteditable='true']")) {
		return null
	}
	// Guard node and originalOffset:
	while (!domUtils.isTextNodeOrBrElement(node)) {
		if (originalOffset && originalOffset === node.childNodes.length) {
			originalOffset = node.childNodes.length - 1
		}
		node = node.childNodes[originalOffset]
		originalOffset = 0
	}
	// Guard originalOffset:
	if (originalOffset > (node.nodeValue || "").length) {
		originalOffset = (node.nodeValue || "").length
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
	return { key, offset }
}

export function convertEditorPositionToDOMPosition(pos) {
	let { key, offset: originalOffset } = pos

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
