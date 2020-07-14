import helpers from "lib/DOM/helpers"

// Syncs attributes.
function syncAttrs(src, dst) {
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

// Shallowly syncs nodes.
function shallowlySyncNodes(src, dst) {
	if (dst.isEqualNode(src)) {
		// No-op
		return
	}
	if (helpers.isTextNode(src) && helpers.isTextNode(dst)) {
		dst.nodeValue = src.nodeValue
	} else if (helpers.isElement(src) && helpers.isElement(dst) && helpers.nodeName(src) === helpers.nodeName(dst)) {
		syncAttrs(src, dst)
		return
	}
	const clonedNode = src.cloneNode(true)
	dst.replaceWith(clonedNode)
}

export default shallowlySyncNodes
