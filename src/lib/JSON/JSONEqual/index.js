import isEqual from "lodash/isEqual"

// // Compares whether two JSON-encoded values are equal; not
// // recommended for deep objects.
// function JSONEqual(v1, v2) {
// 	const ok = (
// 		v1 === v2 ||
// 		JSON.stringify(v1) === JSON.stringify(v2)
// 	)
// 	return ok
// }

// Deeply compares values.
function JSONEqual(v1, v2) {
	return isEqual(v1, v2)
}

export default JSONEqual
