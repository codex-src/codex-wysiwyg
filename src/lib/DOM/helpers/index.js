const helpers = {
	// Ascends to the closest DOM element.
	ascendElement(domNode) {
		if (domNode.nodeType === Node.TEXT_NODE && domNode.parentElement) {
			return domNode.parentElement
		}
		return domNode
	},
	// Ascends to the closest ID-d DOM element.
	ascendElementID(domNode) {
		let domElement = helpers.ascendElement(domNode)
		while (domElement.getAttribute("id") === null && domElement.parentElement) {
			domElement = domElement.parentElement
		}
		return domElement
	},
	nodeName(domNode) {
		return domNode.nodeName.toLowerCase()
	},
	isTextNode(domNode) {
		return domNode.nodeType === Node.TEXT_NODE
	},
	isElement(domNode) {
		return domNode.nodeType === Node.ELEMENT_NODE
	},
	isBrElement(domNode) {
		const ok = (
			domNode.nodeType === Node.ELEMENT_NODE &&
			domNode.nodeName === "BR"
		)
		return ok
	},
	isTextNodeOrBrElement(domNode) {
		const ok = (
			domNode.nodeType === Node.TEXT_NODE ||
			(domNode.nodeType === Node.ELEMENT_NODE && domNode.nodeName === "BR")
		)
		return ok
	},
}

export default helpers