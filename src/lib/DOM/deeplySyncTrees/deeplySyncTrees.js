import domUtils from "lib/DOM/domUtils"
import shallowlySyncNodes from "./shallowlySyncNodes"

// Deeply sync trees. Note that the root elements are not
// synced because of __internalDidRecurse.
function deeplySyncTrees(src, dst, __internalDidRecurse) {
	if (__internalDidRecurse) {
		// NOTE: shallowlySyncNodes **does not** sync
		// node.childNodes.
		shallowlySyncNodes(src, dst)
		if (src.isEqualNode(dst)) {
			// No-op
			return
		}
	}
	const x2 = Math.min(src.childNodes.length, dst.childNodes.length)
	for (let x1 = 0; x1 < x2; x1++) {
		let sync = shallowlySyncNodes
		if (domUtils.isElement(src.childNodes[x1]) && domUtils.isElement(dst.childNodes[x1])) {
			sync = (src, dst) => deeplySyncTrees(src, dst, true) // __internalDidRecurse=true
		}
		sync(src.childNodes[x1], dst.childNodes[x1])
	}
	// Remove nodes:
	if (x2 < dst.childNodes.length) {
		const domNodes = [...dst.childNodes].slice(x2).reverse()
		for (const each of domNodes) {
			each.remove()
		}
	// Append nodes:
	} else if (x2 < src.childNodes.length) {
		const domNodes = [...src.childNodes].slice(x2).map(each => each.cloneNode(true))
		for (const each of domNodes) {
			dst.append(each)
		}
	}
}

export default deeplySyncTrees
