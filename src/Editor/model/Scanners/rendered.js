import domUtils from "lib/domUtils"

// Scanner for a rendered element; scans type and props.
function rendered(element) {
	let dataType = element.getAttribute("data-type")
	if (domUtils.nodeName(element) === "i" || domUtils.nodeName(element) === "u") { // Edge case
		dataType = "em"
	} else if (domUtils.nodeName(element) === "b") { // Edge-case
		dataType = "strong"
	}
	let T = ""
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
		throw new Error(`Scanners/rendered: no such type; dataType=${dataType}`)
	}
	const P = JSON.parse(element.getAttribute("data-props") || "{}")
	return [T, P]
}

export default rendered
