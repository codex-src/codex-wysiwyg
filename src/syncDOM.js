// Syncs two DOM trees; elements are cloned and replaced
// forwards and then backwards.
//
// TODO: Reduce mutations from 2 to 1 for the 90% case.
function syncDOM(src, dst) {
	// Iterate forwards (before replaceWith):
	let mutations = 0
	let start = 0
	const min = Math.min(dst.children.length, src.children.length)
	for (; start < min; start++) {
		if (!dst.children[start].isEqualNode(src.children[start])) {
			const clonedElement = src.children[start].cloneNode(true)
			dst.children[start].replaceWith(clonedElement)
			mutations++
			start++ // Eagerly increment
			break
		}
	}
	// Iterate backwards (after replaceWith):
	let end1 = dst.children.length
	let end2 = src.children.length
	for (; end1 > start && end2 > start; end1--, end2--) {
		if (!dst.children[end1 - 1].isEqualNode(src.children[end2 - 1])) {
			const clonedElement = src.children[end2 - 1].cloneNode(true)
			dst.children[end1 - 1].replaceWith(clonedElement)
			mutations++
		}
	}
	if (start < end1) {
		for (; start < end1; end1--) { // Iterate backwards
			dst.children[end1 - 1].remove()
			mutations++
		}
	} else if (start < end2) {
		for (; start < end2; start++) {
			const clonedElement = src.children[start].cloneNode(true)
			dst.insertBefore(clonedElement, dst.children[start])
			mutations++
		}
	}
	return mutations
}

export default syncDOM
