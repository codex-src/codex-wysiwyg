import Element from "../../../model/Editor/Element"
import MultilineElement from "../../../model/Editor/MultilineElement"

// Finds an element using a callback. An element is expected
// to implement props.children.
//
// Supports Element and MultilineElement.
//
function findElement(elements, callback) {
	for (const element of elements) {
		if (element instanceof MultilineElement) {
			const found = findElement(element.elements, callback)
			if (found) {
				return found
			}
		}
		if (callback(element)) {
			return element
		}
	}
	return null
}

export default findElement
