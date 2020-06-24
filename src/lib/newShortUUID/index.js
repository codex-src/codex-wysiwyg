import uuidv4 from "uuid/v4"

// Returns a short (8-character) UUID hash.
function newShortUUID() {
	return uuidv4().slice(0, 8)
}

export default newShortUUID
