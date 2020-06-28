import domUtils from "lib/domUtils"
import hash from "lib/hash"
import processDOMTree from "./processDOMTree"
import spansFromDOMElement from "./spansFromDOMElement"
import types from "../components/types"

// Reads an array of elements from a DOM tree.
//
// TODO: Add nodesFromDOMElement?
function elementsFromDOMTree(domTree) {
	processDOMTree(domTree)
	const elements = []
	for (const each of domTree.children) {
		switch (domUtils.nodeName(each)) {
		case "p":
			elements.push({
				type: types.p,
				key: each.id || hash(8),
				props: {
					spans: spansFromDOMElement(each),
				},
			})
			break
		default:
			throw new Error("FIXME")
		}
	}
	return elements
}

export default elementsFromDOMTree
