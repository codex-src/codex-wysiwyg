// Stringifies and parses a value; not recommended for
// production-use.
function JSONClone(value) {
	return JSON.parse(JSON.stringify(value))
}

export default JSONClone
