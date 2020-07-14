import helpers from "lib/DOM/helpers"

// Parses a semantic element; parses a type and props.
function parseSemantic(element) {
	let nodeName = helpers.nodeName(element)
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
	case "p":
		type = nodeName
		break
	default:
		throw new Error(`parse.parseSemantic: no such type; nodeName=${nodeName}`)
	}
	const props = !element.attributes.length ? null : [...element.attributes].reduce((acc, each) => {
		if (each.nodeName !== "id") {
			acc[each.nodeName] = each.nodeValue
		}
		return acc
	}, {})
	return { type, props }
}

export default parseSemantic
