import domUtils from "lib/DOM/domUtils"

// Parses a semantic element; parses a type and props.
function parseSemantic(element) {
	let nodeName = domUtils.nodeName(element)
	if (nodeName === "i" || nodeName === "u") { // Edge case
		nodeName = "em"
	} else if (nodeName === "b") { // Edge case
		nodeName = "strong"
	}
	let type = ""
	switch (nodeName) {
	case "em":
	case "strong":
	case "code":
	case "strike":
	case "a":
	case "h1":
	case "h2":
	case "h3":
	case "h4":
	case "h5":
	case "h6":
	case "p":
		type = nodeName
		break
	default:
		throw new Error(`parsers.parseSemantic: no such type; nodeName=${nodeName}`)
	}
	const props = [...element.attributes].reduce((acc, each) => {
		if (each.nodeName !== "id") {
			acc[each.nodeName] = each.nodeValue
		}
		return acc
	}, {})
	return { type, props }
}

export default parseSemantic
