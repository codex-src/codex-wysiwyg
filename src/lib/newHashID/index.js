import uuidv4 from "uuid/v4"

// Returns a new n-characters (1-32) hash ID.
function newHashID(nchars = 32) {
	if (nchars < 1 || nchars > 32) {
		throw new Error(`newHashID: nchars=${nchars} must be 1-32`)
	}
	return uuidv4().split("-").join("").slice(0, nchars)
}

export default newHashID
