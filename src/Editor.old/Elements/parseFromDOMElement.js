import * as Spans from "../Spans"
import construct from "./constructor"
import domUtils from "lib/domUtils"
import must from "lib/must"
import { typeEnum } from "../components/typeMaps"

// Parses an element from a DOM element.
function parseFromDOMElement(domElement) {
	const element = construct()

	// (1) Type:
	const type = must(typeEnum[domElement.getAttribute("data-type")])
	element.type = type

	// (2) Key:
	const key = must(domElement.id)
	element.key = key

	// (3) Props:
	const props = JSON.parse(domElement.getAttribute("data-props") || "{}")
	Object.assign(element.props, props)

	// (4) Spans:
	const spans = []
	const recurse = (onDOMNode, types = [], props = {}) => {
		if (domUtils.isTextNode(onDOMNode)) {
			// TODO: Use construct() and Object.assign?
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
			if (domUtils.isBrElement(each)) {
				// No-op
				continue
			}
			// FIXME
			const nextTypes = [...types]
			const nextProps = { ...props }
			if (domUtils.isElement(each)) {
				const type = must(typeEnum[each.getAttribute("data-type")])
				nextTypes.push(type)
				const props = JSON.parse(each.getAttribute("data-props") || "{}")
				nextProps[type] = props
			}
			recurse(each, nextTypes, nextProps)
		}
	}

	// (4) Spans (cont.d):
	recurse(domElement)
	element.props.children = spans
	Spans.defer(element.props.children)

	return element
}

export default parseFromDOMElement
