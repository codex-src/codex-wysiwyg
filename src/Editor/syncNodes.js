// https://github.com/codex-src/codex-v2-architecture/commit/eb09a03b1845fc59256cdd8cb4037db549cd7dda#diff-eb8dc3a4949f8eff51a88a36f1765af7

// Replaces attributes (on element dst). Non-overlapping
// attributes are removed. Returns whether an attribute was
// replaced or removed.
export function replaceAttributes(src, dst) {
	const attrKeys = new Set()
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

// Shallowly syncs two nodes. Propagates isEqualNode.
export function shallowlySyncNodes(src, dst) {
	if (dst.isEqualNode(src)) {
		return true
	}
	// Text handling:
	if (src.nodeType === Node.TEXT_NODE && src.nodeType === dst.nodeType) {
		dst.nodeValue = src.nodeValue
		return true
	// Element handling (elements must be the same type):
	} else if (src.nodeType === Node.ELEMENT_NODE && src.nodeType === dst.nodeType && src.nodeName === dst.nodeName) {
		// Did not replace; cannot be assumed to be the same:
		if (!replaceAttributes(src, dst)) {
			return false
		}
		// Did replace:
		return dst.isEqualNode(src)
	}
	// Text-to-element and element-to-text handling:
	const clonedNode = src.cloneNode(true)
	dst.replaceWith(clonedNode)
	return true
}

// Deeply syncs two nodes. Note that the ancestor nodes are
// not synced.
//
// TODO: Add decorator pattern
export function deeplySyncNodes(src, dst, __recursion = 0) {
	if (__recursion && shallowlySyncNodes(src, dst)) {
		// No-op
		return
	}
	// Iterate forwards:
	let x = 0
	const min = Math.min(src.childNodes.length, dst.childNodes.length)
	for (; x < min; x++) {
		if (!dst.childNodes[x].isEqualNode(src.childNodes[x])) { // FIXME?
			deeplySyncNodes(src.childNodes[x], dst.childNodes[x], __recursion + 1)
			x++ // Eagerly increment (because of break)
			break
		}
	}
	// Iterate backwards:
	let srcLen = src.childNodes.length
	let dstLen = dst.childNodes.length
	for (; srcLen > x && dstLen > x; srcLen--, dstLen--) {
		if (!dst.childNodes[dstLen - 1].isEqualNode(src.childNodes[srcLen - 1])) { // FIXME?
			deeplySyncNodes(src.childNodes[srcLen - 1], dst.childNodes[dstLen - 1], __recursion + 1)
		}
	}
	// Append extraneous nodes (forwards):
	if (x < srcLen) {
		for (; x < srcLen; x++) {
			const clonedNode = src.childNodes[x].cloneNode(true)
			if (x >= dst.childNodes.length) {
				dst.appendChild(clonedNode)
				continue
			}
			dst.insertBefore(clonedNode, dst.childNodes[x])
		}
	// Remove extraneous nodes (backwards):
	} else if (x < dstLen) {
		for (; x < dstLen; dstLen--) {
			dst.childNodes[dstLen - 1].remove()
		}
	}
}
