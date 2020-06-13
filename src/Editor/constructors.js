// Prepares a new VDOM cursor data structure.
export function newCursor() {
	const cursor = {
		uuid: "",
		offset: 0,
	}
	return cursor
}

// Prepares a new DOM range data structure.
export function newRange() {
	const range = {
		container: 0,
		offset: 0,
	}
	return range
}
