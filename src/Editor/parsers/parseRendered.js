import helpers from "lib/DOM/helpers"

// Parses a rendered element; parses a type and props.
function parseRendered(element) {
	let dataType = element.getAttribute("data-type")
	if (helpers.nodeName(element) === "i" || helpers.nodeName(element) === "u") { // Edge case
		dataType = "em"
	} else if (helpers.nodeName(element) === "b") { // Edge case
		dataType = "strong"
	}
	let type = ""
	switch (dataType) {
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
		type = dataType
		break
	default:
		throw new Error(`parsers.parseRendered: no such type; dataType=${dataType}`)
	}
	const props = JSON.parse(element.getAttribute("data-props"))
	return { type, props }
}

export default parseRendered
