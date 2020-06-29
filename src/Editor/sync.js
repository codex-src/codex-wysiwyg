import domUtils from "lib/domUtils"

// Replaces DOM attributes. Returns whether a DOM attribute
// was replaced and or removed.
export function replaceDOMAttributes(src, dst) {
	const attrKeys = new Set(/* ... */) // TODO
	for (const attr of [...src.attributes, ...dst.attributes]) {
		attrKeys.add(attr.nodeName)
	}
	let replaced = false
	for (const key of attrKeys) {
		const value = src.getAttribute(key)
		if (value === null || value === dst.getAttribute(key)) {
			if (value === null) {
				dst.removeAttribute(key)
				replaced = true
			}
			// No-op
			continue
		}
		dst.setAttribute(key, value)
		replaced = true
	}
	return replaced
}

// Shallowly syncs DOM nodes. Returns the equivalent of
// src.isEqualNode(dst) (before syncing).
export function shallowlySyncDOMNodes(src, dst) {
	if (dst.isEqualNode(src)) {
		return true
	}
	if (domUtils.isTextNode(src) && domUtils.isTextNode(dst)) {
		dst.nodeValue = src.nodeValue
		return true
	} else if (domUtils.isElement(src) && domUtils.isElement(dst) && domUtils.nodeName(src) === domUtils.nodeName(dst)) {
		if (!replaceDOMAttributes(src, dst)) { // Cannot be assumed to be the same
			return false
		}
		return dst.isEqualNode(src)
	}
	const clonedNode = src.cloneNode(true)
	dst.replaceWith(clonedNode)
	return true
}

// Deeply syncs DOM trees.
//
// https://github.com/codex-src/codex-v2-architecture/commit/eb09a03b1845fc59256cdd8cb4037db549cd7dda#diff-eb8dc3a4949f8eff51a88a36f1765af7
export function deeplySyncDOMTrees(src, dst, __internalRecursionCount = 0) {
	if (__internalRecursionCount && shallowlySyncDOMNodes(src, dst)) {
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
