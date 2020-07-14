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

	// Collates elements and children based on a range.
	collate(range) {
		const e1 = this.indexOf(range.start.key)
		const e2 = this.indexOf(range.end.key)

		const c1 = range.start.key === this[e1].key
		const c2 = range.start.key === this[e2].key

		const collated = {
			offsets: {
				elements: [e1, e2],
				children: [c1, c2],
			},
			start: this[e1],
			end: this[e2],
			children: this.props.children.slice(c1, c2),
		}

		// const collated = []
		// for (let x = e1; x < e2 + 1; x++) {
		// 	const each = this[x]
		// }
	}

	// // Find an element based on the return of a callback.
	// find(callback) {
	// 	for (const each of this) {
	// 		if (each instanceof Element) {
	// 			if (callback(each)) {
	// 				return each
	// 			}
	// 		} else if (each instanceof MultilineElement) {
	// 			const found = new ElementList(...each.props.elements).find(callback)
	// 			if (found) {
	// 				return found
	// 			}
	// 		}
	// 	}
	// 	return null
	// }
}

export default ElementList
