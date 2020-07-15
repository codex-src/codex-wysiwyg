import helpers from "lib/DOM/helpers"
import shallowlySyncNodes from "./shallowlySyncNodes"

// Deeply syncs trees.
function deeplySyncTrees(src, dst) {
	const recurse = (src, dst, recursed = false) => {
		if (recursed) {
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
			if (helpers.isElement(src.childNodes[x1]) && helpers.isElement(dst.childNodes[x1])) {
				sync = (src, dst) => recurse(src, dst, true) // recursed=true
			}
			sync(src.childNodes[x1], dst.childNodes[x1])
		}
		// Remove extraneous nodes:
		if (x2 < dst.childNodes.length) {
			const domNodes = [...dst.childNodes].slice(x2).reverse()
			for (const each of domNodes) {
				each.remove()
			}
		// Append extraneous nodes:
		} else if (x2 < src.childNodes.length) {
			const domNodes = [...src.childNodes].slice(x2).map(each => each.cloneNode(true))
			for (const each of domNodes) {
				dst.append(each)
			}
		}
	}
	recurse(src, dst)
}

export default deeplySyncTrees
