import domUtils from "lib/domUtils"
import recursers from "./recursers"

function getInfo(domElement) {
	const T = domUtils.nodeName(domElement)
	const P = [...domElement.attributes].reduce((acc, each) => {
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
	elements(domElement /* domTree */) {
		return recursers.elements(domElement, getInfo)
	},
}

export default semantic
