// Compares whether two JSON-encoded values are equal;
// recommended for short objects.
function areEqualJSON(v1, v2) {
	return JSON.stringify(v1) === JSON.stringify(v2)
}

export default areEqualJSON
