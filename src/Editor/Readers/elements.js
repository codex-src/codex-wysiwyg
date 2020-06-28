import * as Types from "../Types"
import domUtils from "lib/domUtils"
import hash from "lib/hash"
import spans from "./spans"

// Reads an array of elements from a DOM tree.
//
// TODO: Add nodesFromDOMElement?
function exported_elements(domTree) {
	const elements = []
	for (const each of domTree.children) {
		switch (domUtils.nodeName(each)) {
		case "p":
			elements.push({
				type: Types.enumerated.p,
				key: each.id || hash(8),
				props: {
					spans: spans(each),
				},
			})
			break
		default:
			throw new Error("FIXME")
		}
	}
	return elements
}

export default exported_elements
