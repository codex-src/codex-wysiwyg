// Syncs attributes between DOM elements.
function syncAttrs(src, dst) {
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

export default syncAttrs
