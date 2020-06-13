// Ascends to the nearest UUID element.
function ascendToUUIDElement(domNode) {
	let uuidElement = domNode
	if (domNode.nodeType !== Node.ELEMENT_NODE) {
		uuidElement = domNode.parentElement
	}
	while (uuidElement && !uuidElement.id) {
		uuidElement = uuidElement.parentElement
	}
	return uuidElement
}

export default ascendToUUIDElement
