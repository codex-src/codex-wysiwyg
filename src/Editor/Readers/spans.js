import domUtils from "lib/domUtils"
import JSONClone from "lib/JSONClone"

// Reads an array of spans from a DOM element.
function exported_spans(domElement) {
	const spans = []
	const recurse = (domNode, types = [], props = {}) => {
		if (domUtils.isTextNodeOrBrElement(domNode)) {
			if (domUtils.isTextNode(domNode)) {
				spans.push({
					types,
					...props,
					text: domNode.nodeValue,
				})
			}
			return
		}
		for (const each of domNode.childNodes) {
			const nextTypes = [...types]
			const nextProps = JSONClone(props)
			if (domUtils.isElement(each)) {
				// Next type:
				const T = domUtils.nodeName(each)
				nextTypes.push(T)
				// Next props:
				const P = {}
				for (const attr of each.attributes) {
					Object.assign(P, {
						[attr.nodeName]: attr.nodeValue,
					})
				}
				if (Object.keys(P).length) {
					nextProps[T] = P
				}
			}
			recurse(each, nextTypes, nextProps)
		}
	}
	recurse(domElement)
	return spans
}

export default exported_spans
