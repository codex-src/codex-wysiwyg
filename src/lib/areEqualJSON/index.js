// Compares whether two JSON-encoded values are equal; not
// recommended for deep objects.
function areEqualJSON(v1, v2) {
	return JSON.stringify(v1) === JSON.stringify(v2)
}

export default areEqualJSON
