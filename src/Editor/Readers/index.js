import * as Types from "../Types"
import domUtils from "lib/domUtils"
import hash from "lib/hash"
import JSONClone from "lib/JSONClone"

// Recursers; methods read an array of spans or elements.
const recursers = {
	// Reads an array of spans from a DOM element.
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
				// NOTE: Do not uses types = [...types] or
				// props = JSONClone(props); does not work as
				// expected.
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
		if (!spans.length) {
			spans.push({
				types: [],
				text: "",
			})
		}
		return spans
	},
	// Reads an array of elements from a DOM tree.
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

// Reader for semantically-rendered DOM elements.
export const semantic = {
	// Gets the current type and or props for a semantically-
	// rendered DOM element.
	getInfo(domElement) {

		// const P = [...domElement.attributes].reduce((acc, each) => {
		// 	acc[each.nodeName] = each.nodeValue
		// 	return acc
		// }, {})

		const T = domUtils.nodeName(domElement)
		const P = {}
		for (const attr of domElement.attributes) {
			Object.assign(P, {
				[attr.nodeName]: attr.nodeValue,
			})
		}
		return [T, P]
	},
	spans(domElement) {
		return recursers.spans(domElement, this.getInfo)
	},
	elements(domTree) {
		return recursers.elements(domTree, this.getInfo)
	},
}

// Reader for React-rendered DOM elements.
export const react = {
	// Gets the current type and or props for a React-rendered
	// DOM element.
	getInfo(domElement) {
		const T = domElement.getAttribute("data-type")
		const P = JSON.parse(domElement.getAttribute("data-props") || "{}")
		return [T, P]
	},
	spans(domElement) {
		return recursers.spans(domElement, this.getInfo)
	},
	elements(domTree) {
		return recursers.elements(domTree, this.getInfo)
	},
}
