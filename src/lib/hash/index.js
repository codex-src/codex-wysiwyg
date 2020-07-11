import uuidv4 from "uuid/v4"

// Returns a new variable-length hash ID.
function hash(length = 32) {
	if (length < 1 || length > 32) {
		throw new Error(`hash: length=${JSON.stringify(length)} must be 1-32`)
	}
	const id = uuidv4().split("-").join("").slice(0, length)
	if (length >= 6 && id.search(/[a-z]/) === -1) {
		return hash(length)
	} else if (length >= 6 && id.search(/\d/) === -1) {
		return hash(length)
	}
	return id
}

export default hash
