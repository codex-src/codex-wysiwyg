// Ascends to the nearest ID (e.g. UUID) element.
function ascendToIDElement(domNode) {
	let element = domNode
	if (domNode.nodeType !== Node.ELEMENT_NODE) {
		element = domNode.parentElement
	}
	while (element && !element.id) {
		element = element.parentElement
	}
	return element
}

export default ascendToIDElement
