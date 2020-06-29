import recursers from "./recursers"

function getInfo(elemOrSpan) {
	const T = elemOrSpan.getAttribute("data-type")
	const P = JSON.parse(elemOrSpan.getAttribute("data-props") || "{}")
	return [T, P]
}

// Reader for React-rendered DOM elements.
const react = {
	spans(domElement) {
		return recursers.spans(domElement, getInfo)
	},
	elements(domElement /* domTree */) {
		return recursers.elements(domElement, getInfo)
	},
}

export default react
