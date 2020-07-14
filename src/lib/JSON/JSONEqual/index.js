// Compares whether two JSON-encoded values are equal; not
// recommended for deep objects.
function JSONEqual(v1, v2) {
	const ok = (
		v1 === v2 ||
		JSON.stringify(v1) === JSON.stringify(v2)
	)
	return ok
}

export default JSONEqual
