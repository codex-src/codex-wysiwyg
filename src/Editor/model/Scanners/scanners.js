import domUtils from "lib/domUtils"

// Scanner for a rendered element; scans type and props.
export function rendered(element) {
	let T = ""
	let P = {}
	let dataType = element.getAttribute("data-type")
	if (domUtils.nodeName(element) === "i" || domUtils.nodeName(element) === "u") { // Edge case
		dataType = "em"
	} else if (domUtils.nodeName(element) === "b") { // Edge-case
		dataType = "strong"
	}
	switch (dataType) {
	case "em":
	case "strong":
	case "code":
	case "strike":
	case "a":
	case "p":
		T = dataType
		break
	default:
		throw new Error(`RenderedScanner.scanner: no such type; dataType=${dataType}`)
	}
	P = JSON.parse(element.getAttribute("data-props") || "{}")
	return [T, P]
}

// Scanner for a semantic element; scans type and props.
export function semantic(element) {
	let T = ""
	let P = {}
	let nodeName = domUtils.nodeName(element)
	if (nodeName === "i" || nodeName === "u") { // Edge case
		nodeName = "em"
	} else if (nodeName === "b") { // Edge case
		nodeName = "strong"
	}
	switch (nodeName) {
	case "em":
	case "strong":
	case "code":
	case "strike":
	case "a":
	case "p":
		T = nodeName
		break
	default:
		throw new Error(`SemanticScanner.scanner: no such type; nodeName=${nodeName}`)
	}
	P = [...element.attributes].reduce((acc, each) => {
		acc[each.nodeName] = each.nodeValue
		return acc
	}, {})
	return [T, P]
}
