// Compares whether cursors are equal.
function areEqual(cursor1, cursor2) {
	const ok = (
		cursor1 === cursor2 || // Compares references
		(cursor1.key === cursor2.key && cursor1.offset === cursor2.offset)
	)
	return ok
}

export default areEqual
