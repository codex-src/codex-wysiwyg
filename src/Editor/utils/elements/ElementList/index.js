import Element from "../../../model/Editor/Element"
import MultilineElement from "../../../model/Editor/MultilineElement"

// Converts an array of elements to a linear array.
function array(...elements) {
	const lin = []
	for (const each of elements) {
		if (each instanceof Element) {
			lin.push(each)
		} else if (each instanceof MultilineElement) {
			lin.push(...array(...each.props.elements))
		}
	}
	return lin
}

// Describes a list of elements.
class ElementList extends Array {

	constructor(...elements) {
		super(...elements)
		Object.assign(this, array(...elements))
	}

	// Find an element based on the return of a callback.
	find(callback) {
		for (const each of this) {
			if (callback(each)) {
				return each
			}
		}
		return null
	}
}

export default ElementList
