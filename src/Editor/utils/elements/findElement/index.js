import Element from "../../../model/Editor/Element"
import MultilineElement from "../../../model/Editor/MultilineElement"

// Finds an element using a callback. An element is expected
// to implement props.children.
function findElement(elements, callback) {
	for (const element of elements) {
		if (element instanceof Element) {
			if (callback(element)) {
				return element
			}
		} else if (element instanceof MultilineElement) {
			const found = findElement(element.props.elements, callback)
			if (found) {
				return found
			}
		}
	}
	return null
}

export default findElement
