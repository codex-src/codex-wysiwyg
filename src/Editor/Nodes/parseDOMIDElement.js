import * as Spans from "../Spans"
import construct from "./constructor"
import { typeEnum } from "../components/typeMaps"

// // Parses nodes from React elements.
// function parseReact(reactElements) {
// 	const nodes = []
// 	for (const each of toArray(reactElements)) {
// 		const node = {
// 			type: each.type,
// 			key: uuidv4(),
// 			props: {
// 				children: Spans.parseReact(each.props.children),
// 			},
// 		}
// 		nodes.push(node)
// 	}
// 	return nodes
// }

// Parses a DOM ID element.
function parseDOMIDElement(domIDElement) {
	const node = construct()

	// Get the current type:
	const type = typeEnum[domIDElement.getAttribute("data-type")]
	if (!type) {
		throw new Error("Nodes.parseDOMIDElement: no such type")
	}
	node.type = type

	// Get the current key:
	const key = domIDElement.id
	if (!key) {
		throw new Error("Nodes.parseDOMIDElement: no such key")
	}
	node.key = key

	// // TODO: Get the current props:
	// const props = JSON.parse(domIDElement.getAttribute("data-props") || "{}")
	// if (!props) {
	// 	throw new Error("Nodes.parseDOMIDElement: no such props")
	// }
	// Object.assign(node.props, props)

	const spans = []
	const recurse = (onDOMNode, types = [], props = {}) => {
		if (onDOMNode.nodeType === Node.TEXT_NODE) {
			spans.push({
				types,
				props: {
					...props, // Type-props
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
					throw new Error("Nodes.parseDOMIDElement.recurse: no such type")
				}
				nextTypes.push(type)
				nextProps[type] = JSON.parse(each.getAttribute("data-props") || "{}")
			}
			recurse(each, nextTypes, nextProps)
		}
	}

	// Get the current spans:
	recurse(domIDElement)
	node.props.children = spans

	Spans.sort(Spans.merge(node.props.children))
	return node
}

export default parseDOMIDElement
