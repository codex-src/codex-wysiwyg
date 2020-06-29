import * as Types from "../Types"
import domUtils from "lib/domUtils"
import hash from "lib/hash"
import JSONClone from "lib/JSONClone"

const recursers = {
	spans(domElement, getInfo) {
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
					const [T, P] = getInfo(each)
					nextTypes.push(T)
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
	elements(domTree, getInfo) {
		const elements = []
		for (const each of domTree.children) {
			const [T, P] = getInfo(each)
			switch (T) {
			case Types.enum.p:
				elements.push({
					type: T,
					key: each.id || hash(8),
					props: {
						...P,
						spans: this.spans(each, getInfo),
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

export default recursers
