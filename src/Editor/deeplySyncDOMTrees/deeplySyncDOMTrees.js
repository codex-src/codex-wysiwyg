import domUtils from "lib/domUtils"

// Syncs attributes between DOM elements.
export function syncAttrs(src, dst) {
	const keySet = new Set()
	for (const each of [...src.attributes, ...dst.attributes]) {
		keySet.add(each.nodeName)
	}
	for (const each of keySet) {
		const srcValue = src.getAttribute(each)
		const dstValue = dst.getAttribute(each)
		if (srcValue === dstValue) {
			// No-op
			continue
		}
		if (srcValue === null) {
			dst.removeAttribute(each)
			continue
		}
		dst.setAttribute(each, srcValue)
	}
}

// Shallowly syncs DOM nodes.
export function shallowlySyncDOMNodes(src, dst) {
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

// Deeply syncs DOM trees.
//
// https://github.com/codex-src/codex-v2-architecture/commit/eb09a03b1845fc59256cdd8cb4037db549cd7dda#diff-eb8dc3a4949f8eff51a88a36f1765af7
export function deeplySyncDOMTrees(src, dst, __internalRecursionCount = 0) {
	if (__internalRecursionCount && src.isEqualNode(dst)) { // shallowlySyncDOMNodes(src, dst)) {
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
			if (!(x < dst.childNodes.length)) {
				dst.appendChild(clonedNode)
				continue
			}
			dst.insertBefore(clonedNode, dst.childNodes[x])
		}
	// Remove extraneous nodes (backwards):
	} else if (x <= dstEnd) {
		for (; x <= dstEnd; dstEnd--) {
			dst.childNodes[dstEnd].remove()
		}
	}
}
