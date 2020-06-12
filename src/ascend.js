// Ascends to the nearest UUID (e.g. id="...") element.
function ascendToUUIDElement(domNode) {
	let element = domNode
	if (domNode.nodeType !== Node.ELEMENT_NODE) {
		element = domNode.parentElement
	}
	while (element && !element.id) {
		element = element.parentElement
	}
	return element
}

export default ascendToUUIDElement
