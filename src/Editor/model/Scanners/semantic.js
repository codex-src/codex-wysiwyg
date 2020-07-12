import domUtils from "lib/domUtils"

// Scanner for a semantic element; scans type and props.
function semantic(element) {
	let nodeName = domUtils.nodeName(element)
	if (nodeName === "i" || nodeName === "u") { // Edge case
		nodeName = "em"
	} else if (nodeName === "b") { // Edge case
		nodeName = "strong"
	}
	let T = ""
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
		throw new Error(`Scanners/semantic: no such type; nodeName=${nodeName}`)
	}
	const P = [...element.attributes].reduce((acc, each) => {
		if (each.nodeName !== "id") {
			acc[each.nodeName] = each.nodeValue
		}
		return acc
	}, {})
	return [T, P]
}

export default semantic
