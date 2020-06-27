// Syncs two DOM trees; elements are cloned and replaced
// forwards and then backwards.
//
// TODO: Reduce mutations from 2 to 1 for the 90% case.
function syncDOM(src, dst) {
	// Iterate forwards (before replaceWith):
	let mutations = 0
	let start = 0
	const min = Math.min(dst.childNodes.length, src.childNodes.length)
	for (; start < min; start++) {
		if (!dst.childNodes[start].isEqualNode(src.childNodes[start])) {
			const clonedElement = src.childNodes[start].cloneNode(true)
			dst.childNodes[start].replaceWith(clonedElement)
			mutations++
			start++ // Eagerly increment
			break
		}
	}
	// Iterate backwards (after replaceWith):
	let end1 = dst.childNodes.length
	let end2 = src.childNodes.length
	for (; end1 > start && end2 > start; end1--, end2--) {
		if (!dst.childNodes[end1 - 1].isEqualNode(src.childNodes[end2 - 1])) {
			const clonedElement = src.childNodes[end2 - 1].cloneNode(true)
			dst.childNodes[end1 - 1].replaceWith(clonedElement)
			mutations++
		}
	}
	if (start < end1) {
		for (; start < end1; end1--) { // Iterate backwards
			dst.childNodes[end1 - 1].remove()
			mutations++
		}
	} else if (start < end2) {
		for (; start < end2; start++) {
			const clonedElement = src.childNodes[start].cloneNode(true)
			dst.insertBefore(clonedElement, dst.childNodes[start])
			mutations++
		}
	}
	return mutations
}

export default syncDOM
