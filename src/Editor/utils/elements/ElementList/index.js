import Element from "../../../model/Editor/Element"
import MultilineElement from "../../../model/Editor/MultilineElement"

// Describes a list of elements.
class ElementList extends Array {

	// Find an element based on the return of a callback.
	find(callback) {
		for (const each of this) {
			if (each instanceof Element) {
				if (callback(each)) {
					return each
				}
			} else if (each instanceof MultilineElement) {
				const found = new ElementList(...each.props.elements).find(callback)
				if (found) {
					return found
				}
			}
		}
		return null
	}
}

export default ElementList
