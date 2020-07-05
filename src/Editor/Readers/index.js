import * as Types from "../Types"
import areEqualJSON from "lib/areEqualJSON"
import domUtils from "lib/domUtils"
import hash from "lib/hash"
import JSONClone from "lib/JSONClone"
import omit from "lib/omit"

// Recursers; methods read an array of spans or elements.
const recursers = {
	// Reads an array of spans from a DOM element.
	spans(domElement, scanner) {
		const spans = []
		const recurse = (domNode, types = [], props = {}) => {
			if (domUtils.isTextNodeOrBrElement(domNode)) {
				if (domUtils.isTextNode(domNode)) {
					// Concatenate (types and props must be deeply
					// equal):
					//
					// TODO
					if (spans.length && areEqualJSON(omit(spans[spans.length - 1], "text"), { types, ...props })) {
						spans[spans.length - 1].text += domNode.nodeValue
					// Push:
					} else {
						spans.push({
							types,
							...props,
							text: domNode.nodeValue,
						})
					}
				}
				return
			}
			for (const each of domNode.childNodes) {
				if (domUtils.isBrElement(each)) {
					// No-op
					continue
				}
				// NOTE: Do not uses types = [...types] or
				// props = JSONClone(props); does not work as
				// expected.
				const nextTypes = [...types]
				const nextProps = JSONClone(props)
				if (domUtils.isElement(each)) {
					const [T, P] = scanner(each)
					nextTypes.push(T)
					if (Object.keys(P).length) {
						nextProps[T] = P
					}
				}
				recurse(each, nextTypes, nextProps)
			}
		}
		recurse(domElement)
		spans.map(each => Types.sort(each))
		return spans
	},
	// Reads an array of elements from a DOM tree.
	elements(domTree, scanner) {
		const elements = []
		for (const each of domTree.children) {
			const [T, P] = scanner(each)
			elements.push({
				type: T,
				key: each.id || hash(8),
				props: {
					...P,
					spans: this.spans(each, scanner),
				},
			})
		}
		return elements
	},
}

// Readers for a semantic DOM tree.
export const semantic = {
	// Scans the current type and props.
	scanner(domElement) {
		// Guard <i>, <u>, and <b>:
		const nodeName = domUtils.nodeName(domElement)
		if (!domElement.id && (nodeName === "i" || nodeName === "u")) {
			return [Types.enum.em, {}]
		} else if (!domElement.id && nodeName === "b") {
			return [Types.enum.strong, {}]
		}

		const T = nodeName
		if (Types.enum[T] === undefined) {
			throw new Error(`Readers.semantic.scanner: no such type; T=${T}`)
		}
		const P = {}
		for (const attr of domElement.attributes) {
			Object.assign(P, {
				[attr.nodeName]: attr.nodeValue,
			})
		}
		return [T, P]
	},
	spans(domElement) {
		return recursers.spans(domElement, this.scanner)
	},
	elements(domTree) {
		return recursers.elements(domTree, this.scanner)
	},
}

// Readers for a rendered DOM tree.
export const rendered = {
	// Scans the current type and props.
	scanner(domElement) {
		// Guard <i>, <u>, and <b>:
		const nodeName = domUtils.nodeName(domElement)
		if (!domElement.id && (nodeName === "i" || nodeName === "u")) {
			return [Types.enum.em, {}]
		} else if (!domElement.id && nodeName === "b") {
			return [Types.enum.strong, {}]
		}

		const T = domElement.getAttribute("data-type")
		if (Types.enum[T] === undefined) {
			throw new Error(`Readers.rendered.scanner: no such type; T=${T}`)
		}
		const P = JSON.parse(domElement.getAttribute("data-props") || "{}")
		return [T, P]
	},
	spans(domElement) {
		return recursers.spans(domElement, this.scanner)
	},
	elements(domTree) {
		return recursers.elements(domTree, this.scanner)
	},
}
