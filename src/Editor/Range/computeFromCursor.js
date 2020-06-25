import domUtils from "lib/domUtils"
import must from "lib/must"

// Computes a DOM range array from a cursor.
function computeFromCursor({ key, offset }) {
	const domElement = must(document.getElementById(key))
	const range = [null, -1]
	const recurse = onDOMNode => {
		if (domUtils.isTextNodeOrBrElement(onDOMNode) && offset - (onDOMNode.nodeValue || "").length <= 0) {
			range.splice(0, 2, onDOMNode, offset)
			return true
		}
		for (const each of onDOMNode.childNodes) {
			if (recurse(each)) {
				return true
			}
			offset -= domUtils.isTextNode(each) && each.nodeValue.length
		}
		return false
	}
	recurse(domElement)
	return range
}

export default computeFromCursor
