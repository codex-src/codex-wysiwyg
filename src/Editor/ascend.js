// Ascends to the nearest DOM element.
export function ascendToElement(domNode) {
	if (domNode.nodeType !== Node.ELEMENT_NODE) {
		return domNode.parentElement // TODO: Check domNode.parentElement?
	}
	return domNode
}

// Ascends to the nearest UUID DOM element.
export function ascendToUUIDElement(domNode) {
	let element = ascendToElement(domNode)
	while (element && !element.id) {
		element = element.parentElement
	}
	return element
}
