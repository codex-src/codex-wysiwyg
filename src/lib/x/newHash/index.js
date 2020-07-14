import uuidv4 from "uuid/v4"

const DEFAULT_LENGTH = 6

// Generates a new hash.
function newHash(length = DEFAULT_LENGTH) {
	if (length < 1 || length > 32) {
		throw new Error(`newHash: length must be 1-32; length=${length}`)
	}
	const hash = uuidv4().split("-").join("").slice(0, length)
	if (length >= DEFAULT_LENGTH && hash.search(/[a-z]/) === -1) {
		return newHash(length)
	} else if (length >= DEFAULT_LENGTH && hash.search(/\d/) === -1) {
		return newHash(length)
	}
	return hash
}

export default newHash
