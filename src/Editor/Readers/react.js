import * as Types from "../Types"
import domUtils from "lib/domUtils"
import hash from "lib/hash"
import JSONClone from "lib/JSONClone"

// Reader for React-rendered DOM elements.
//
// TODO: Add react.nodes?
const react = {
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
					const T = each.getAttribute("data-type")
					nextTypes.push(T)
					// Next props:
					const P = JSON.parse(each.getAttribute("data-props") || "{}")
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
			switch (each.getAttribute("data-type")) {
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

export default react
