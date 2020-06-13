// Creates a new range.
export function newRange() {
	const range = {
		container: 0,
		offset: 0,
	}
	return range
}

// Computes a range from a cursor.
function computeRange({ uuid, offset }) { // NOTE: Copy offset -- do not mutate reference
	const range = newRange()
	const uuidElement = document.getElementById(uuid)
	if (!uuidElement) {
		throw new Error("computeRange: no such uuid element")
	}
	// Recurses on a DOM node, mutates range.
	const recurse = startDOMNode => {
		// TODO: if (pos - (on.nodeValue || "").length <= 0) {
		if (startDOMNode.nodeType === Node.TEXT_NODE && offset - startDOMNode.textContent.length <= 0) {
			Object.assign(range, {
				container: startDOMNode,
				offset,
			})
			return true
		}
		for (const domNode of startDOMNode.childNodes) {
			if (domNode.nodeType === Node.ELEMENT_NODE && domNode.getAttribute("contenteditable") === "false") {
				// No-op
				continue
			} else if (recurse(domNode)) {
				return true
			}
			offset -= domNode.nodeType === Node.TEXT_NODE &&
				domNode.textContent.length
		}
		return false
	}
	recurse(uuidElement)
	return range
}

// Computes ranges from cursors.
export function computeRanges(cursors) {
	const ranges = []
	ranges.push(computeRange(cursors[0]))
	if (cursors[0] === cursors[1]) {
		ranges.push(ranges[0])
	} else {
		ranges.push(computeRange(cursors[1]))
	}
	return ranges
}
