import uuidv4 from "uuid/v4"

// Returns a new variable-length (1-32) hash ID.
function newHashID(len = 32) {
	if (len < 1 || len > 32) {
		throw new Error(`newHashID: len=${JSON.stringify(len)} must be 1-32`)
	}
	return uuidv4().split("-").join("").slice(0, len)
}

export default newHashID
