// import must from "lib/must"
import domUtils from "lib/domUtils"

// Computes a DOM range from a cursor.
function computeFromCursor({ key, offset }) {
	// const domElement = must(document.getElementById(key))
	const domElement = document.getElementById(key)
	if (!domElement) {
		return null
	}
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

// Computes a set of DOM ranges from a set of cursors.
function computeFromCursors(cursors) {
	const ranges = []
	const range = computeFromCursor(cursors[0])
	if (!range) {
		return null
	}
	ranges.push(range)
	if (cursors.collapsed) {
		// if (!ranges[0]) {
		// 	return null
		// }
		ranges.push(ranges[0])
	} else {
		const range = computeFromCursor(cursors[1])
		if (!range) {
			return null
		}
		ranges.push(range)
	}
	return ranges
}

export default computeFromCursors
