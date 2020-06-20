import * as Spans from "../Spans"
import construct from "./constructor"
import { typeEnum } from "../components/typeMaps"

// Parses a synthetic element from a DOM element.
function parseFromDOMElement(domElement) {
	const element = construct()

	const type = typeEnum[domElement.getAttribute("data-type")]
	if (!type) {
		throw new Error("Elements.parseFromDOMElement: no such type")
	}
	element.type = type

	const key = domElement.id
	if (!key) {
		throw new Error("Elements.parseFromDOMElement: no such key")
	}
	element.key = key

	// const props = JSON.parse(domElement.getAttribute("data-props") || "{}")
	// if (!props) {
	// 	throw new Error("Elements.parseFromDOMElement: no such props")
	// }
	// Object.assign(element.props, props)

	const spans = []
	const recurse = (onDOMNode, types = [], props = {}) => {
		if (onDOMNode.nodeType === Node.TEXT_NODE) {
			spans.push({
				types,
				props: {
					...props,
					children: onDOMNode.nodeValue,
				},
			})
			return
		}
		for (const each of onDOMNode.childNodes) {
			const nextTypes = [...types]
			const nextProps = { ...props }
			if (each.nodeType === Node.ELEMENT_NODE) {
				const type = typeEnum[each.getAttribute("data-type")]
				if (!type) {
					throw new Error("Elements.parseFromDOMElement.recurse: no such type")
				}
				nextTypes.push(type)
				nextProps[type] = JSON.parse(each.getAttribute("data-props") || "{}")
			}
			recurse(each, nextTypes, nextProps)
		}
	}

	recurse(domElement)
	if (!spans.length) {
		throw new Error("Elements.parseFromDOMElement: no such spans")
	}
	element.props.children = spans

	Spans.sort(Spans.merge(element.props.children))
	return element
}

export default parseFromDOMElement
