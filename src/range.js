import { newRange } from "./constructors"

// Computes a range container and offset from a cursor UUID
// and offset.
function computeRange({ uuid, offset }) {
	const range = newRange()
	const element = document.getElementById(uuid)
	if (!element) {
		throw new Error("computeRange: no such element")
	}
	// Iterate to the container and offset:
	let container = element.childNodes[0]
	while (container && offset) {
		if (offset - container.textContent.length <= 0) {
			// No-op
			break
		}
		offset -= container.textContent.length
		container = container.nextSibling
	}
	// Iterate to the text node:
	while (container.nodeType === Node.ELEMENT_NODE && container.childNodes.length) {
		container = container.childNodes[container.childNodes.length - 1]
	}
	Object.assign(range, {
		container,
		offset,
	})
	return range
}

export default computeRange
