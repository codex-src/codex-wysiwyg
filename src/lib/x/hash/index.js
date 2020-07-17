import uuidv4 from "uuid/v4"

const DEFAULT_LENGTH = 6

// Generates a new hash ID.
function hash(length = DEFAULT_LENGTH) {
	if (length < 1 || length > 32) {
		throw new Error(`hash: length must be 1-32; length=${length}`)
	}
	const id = uuidv4().split("-").join("").slice(0, length)
	if (length >= DEFAULT_LENGTH && id.search(/[a-z]/) === -1) {
		return hash(length)
	} else if (length >= DEFAULT_LENGTH && id.search(/\d/) === -1) {
		return hash(length)
	}
	return id
}

export default hash
