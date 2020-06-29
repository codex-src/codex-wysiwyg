import * as Types from "../Types"
import domUtils from "lib/domUtils"
import hash from "lib/hash"
import recursers from "./recursers"

function getInfo(elemOrSpan) {
	const T = domUtils.nodeName(elemOrSpan)
	const P = [...elemOrSpan.attributes].reduce((acc, each) => {
		acc[each.nodeName] = each.nodeValue
		return acc
	}, {})
	return [T, P]
}

// Reader for semantic DOM elements.
const semantic = {
	spans(domElement) {
		return recursers.spans(domElement, getInfo)
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
		// return recursers.elements(domTree, getInfo)
	},
}

export default semantic
