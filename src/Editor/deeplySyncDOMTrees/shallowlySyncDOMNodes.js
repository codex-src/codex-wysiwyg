import domUtils from "lib/domUtils"
import syncAttrs from "./syncAttrs"

// Shallowly syncs DOM nodes.
function shallowlySyncDOMNodes(src, dst) {
	if (dst.isEqualNode(src)) {
		// No-op
		return
	}
	if (domUtils.isTextNode(src) && domUtils.isTextNode(dst)) {
		dst.nodeValue = src.nodeValue
	} else if (domUtils.isElement(src) && domUtils.isElement(dst) && domUtils.nodeName(src) === domUtils.nodeName(dst)) {
		syncAttrs(src, dst)
		return
	}
	const clonedNode = src.cloneNode(true)
	dst.replaceWith(clonedNode)
}

export default shallowlySyncDOMNodes
