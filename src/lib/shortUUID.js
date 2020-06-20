import uuidv4 from "uuid/v4"

// Returns an 8-character UUID hash.
function shortUUID() {
	return uuidv4().slice(0, 8)
}

export default shortUUID
