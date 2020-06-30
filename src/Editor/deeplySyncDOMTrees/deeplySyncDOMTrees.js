import shallowlySyncDOMNodes from "./shallowlySyncDOMNodes"

// Deeply synchronizes DOM trees; synchronizes start-to-end,
// then removes or ends end-to-start.
function deeplySyncDOMTrees(src, dst, __internalRecursionCount = 0) {
	if (__internalRecursionCount) {
		// NOTE: shallowlySyncDOMNodes **does not** sync
		// domNode.childNodes.
		shallowlySyncDOMNodes(src, dst)
		if (src.isEqualNode(dst)) {
			// No-op
			return
		}
	}
	const x2 = Math.min(src.childNodes.length, dst.childNodes.length)
	for (let x1 = 0; x1 < x2; x1++) {
		deeplySyncDOMTrees(src.childNodes[x1], dst.childNodes[x1], __internalRecursionCount + 1)
	}
	// Remove extraneous end-to-x2:
	if (x2 < dst.childNodes.length) {
		const domNodes = [...dst.childNodes].slice(x2).reverse()
		for (const each of domNodes) {
			each.remove()
		}
	// Append extraneous end-to-x2:
	} else if (x2 < src.childNodes.length) {
		const domNodes = [...src.childNodes].slice(x2).map(each => each.cloneNode(true))
		for (const each of domNodes) {
			dst.append(each)
		}
	}
}

export default deeplySyncDOMTrees
