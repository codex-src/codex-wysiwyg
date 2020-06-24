// DOM node utilities.
const domUtils = {
	// Ascends to the closest element.
	ascendElement(domNode) {
		let domElement = domNode
		if (domNode.nodeType !== Node.ELEMENT_NODE && domNode.parentElement) {
			domElement = domNode.parentElement
		}
		return domElement
	},
	// Ascends to the closest ID-d element.
	ascendElementID(domNode) {
		let domElement = domUtils.ascendElement(domNode)
		while (!domElement.id && domNode.parentElement) {
			domElement = domElement.parentElement
		}
		return domElement
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

export default domUtils
