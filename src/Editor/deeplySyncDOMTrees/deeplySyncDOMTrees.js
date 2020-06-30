import shallowlySyncDOMNodes from "./shallowlySyncDOMNodes"

// Deeply syncs DOM trees.
//
// https://github.com/codex-src/codex-v2-architecture/commit/eb09a03b1845fc59256cdd8cb4037db549cd7dda#diff-eb8dc3a4949f8eff51a88a36f1765af7
function deeplySyncDOMTrees(src, dst, __internalRecursionCount = 0) {
	// NOTE: Uses src.isEqualNode(dst) to compare childNodes.
	if (__internalRecursionCount && shallowlySyncDOMNodes(src, dst) && src.isEqualNode(dst)) {
		// No-op
		return
	}
	let x = 0
	const min = Math.min(src.childNodes.length, dst.childNodes.length)
	for (; x < min; x++) {
		if (!dst.childNodes[x].isEqualNode(src.childNodes[x])) {
			deeplySyncDOMTrees(src.childNodes[x], dst.childNodes[x], __internalRecursionCount + 1)
			x++
			break
		}
	}
	let srcEnd = src.childNodes.length - 1
	let dstEnd = dst.childNodes.length - 1
	for (; srcEnd >= x && dstEnd >= x; srcEnd--, dstEnd--) {
		if (!dst.childNodes[dstEnd].isEqualNode(src.childNodes[srcEnd])) {
			deeplySyncDOMTrees(src.childNodes[srcEnd], dst.childNodes[dstEnd], __internalRecursionCount + 1)
		}
	}
	// Append extraneous nodes (forwards):
	if (x <= srcEnd) {
		for (; x <= srcEnd; x++) {
			const clonedNode = src.childNodes[x].cloneNode(true)
			if (x < dst.childNodes.length) {
				dst.insertBefore(clonedNode, dst.childNodes[x])
			} else {
				dst.appendChild(clonedNode)
			}
		}
	// Remove extraneous nodes (backwards):
	} else if (x <= dstEnd) {
		for (; x <= dstEnd; dstEnd--) {
			dst.childNodes[dstEnd].remove()
		}
	}
}

export default deeplySyncDOMTrees
