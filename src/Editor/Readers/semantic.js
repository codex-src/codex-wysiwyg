import * as Types from "../Types"
import domUtils from "lib/domUtils"
import hash from "lib/hash"
import JSONClone from "lib/JSONClone"

// Reader for semantic DOM elements.
//
// TODO: Add semantic.nodes?
const semantic = {
	spans(domElement) {
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
	},
	elements(domTree) {
		const elements = []
		for (const each of domTree.children) {
			switch (domUtils.nodeName(each)) {
			case "p":
				elements.push({
					type: Types.enum.p,
					key: each.id || hash(8),
					props: {
						// TODO: Add props
						spans: this.spans(each),
					},
				})
				break
			default:
				throw new Error("FIXME")
			}
		}
		return elements
	},
}

export default semantic
