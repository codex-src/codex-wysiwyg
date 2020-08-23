import uuidv4 from "uuid/v4"

const DEFAULT_LENGTH = 6

// Generates a new hash ID.
function hash(length = DEFAULT_LENGTH) {
	if (length < 1 || length > 32) {
		throw new Error(`hash: length must be 1-32; length=${length}`)
	}
	// Must have one /[a-z]/:
	const prettyID = uuidv4().split("-").join("").slice(0, length)
	if (length >= DEFAULT_LENGTH && prettyID.search(/[a-z]/) === -1) {
		return hash(length)
	// Must have one or more /[0-9]/:
	} else if (length >= DEFAULT_LENGTH && prettyID.search(/[0-9]/) === -1) {
		return hash(length)
	}
	return prettyID
}

export default hash
