// Filters "", "undefined", "false", and "null" substrings.
function filterer(substr) {
	const ok = (
		substr !== "" &&
		substr !== "undefined" &&
		substr !== "false" &&
		substr !== "null"
	)
	return ok
}

// Filters substrings from a processed template literal.
// Throws on "[object Object]" substrings.
function filterTemplated(str) {
	if (str.indexOf("[object Object]") >= 0) {
		throw new Error(`filterTemplated: template literal stringified one or more objects; str=${str}`)
	}
	return str.split(/\s+/).filter(filterer).join(" ")
}

export default filterTemplated
