import domUtils from "lib/domUtils"

// Synchronizes DOM attributes.
function syncDOMAttrs(src, dst) {
	const keys = new Set([...src.attributes, ...dst.attributes].map(each => each.nodeName))
	for (const each of keys) {
		const srcv = src.getAttribute(each)
		const dstv = dst.getAttribute(each)
		if (srcv === dstv) {
			// No-op
			continue
		}
		if (srcv === null) {
			dst.removeAttribute(each)
			continue
		}
		dst.setAttribute(each, srcv)
	}
}

// Shallowly synchronizes DOM nodes.
function shallowlySyncDOMNodes(src, dst) {
	if (dst.isEqualNode(src)) {
		// No-op
		return
	}
	if (domUtils.isTextNode(src) && domUtils.isTextNode(dst)) {
		dst.nodeValue = src.nodeValue
	} else if (domUtils.isElement(src) && domUtils.isElement(dst) && domUtils.nodeName(src) === domUtils.nodeName(dst)) {
		syncDOMAttrs(src, dst)
		return
	}
	const clonedNode = src.cloneNode(true)
	dst.replaceWith(clonedNode)
}

export default shallowlySyncDOMNodes
