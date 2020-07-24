const helpers = {
	// Ascends to the closest element.
	ascendElement(node) {
		if (node.nodeType === Node.TEXT_NODE && node.parentElement) {
			return node.parentElement
		}
		return node
	},
	// Ascends to the closest ID-d element.
	ascendElementID(node) {
		let domElement = helpers.ascendElement(node)
		while (domElement.getAttribute("id") === null && domElement.parentElement) {
			domElement = domElement.parentElement
		}
		return domElement
	},
	nodeName(node) {
		return node.nodeName.toLowerCase()
	},
	isTextNode(node) {
		return node.nodeType === Node.TEXT_NODE
	},
	isElement(node) {
		return node.nodeType === Node.ELEMENT_NODE
	},
	isBrElement(node) {
		const ok = (
			node.nodeType === Node.ELEMENT_NODE &&
			node.nodeName === "BR"
		)
		return ok
	},
	isTextNodeOrBrElement(node) {
		const ok = (
			node.nodeType === Node.TEXT_NODE ||
			(node.nodeType === Node.ELEMENT_NODE && node.nodeName === "BR")
		)
		return ok
	},
}

export default helpers
