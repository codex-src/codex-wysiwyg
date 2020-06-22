// Compares whether cursors are equal.
function areEqual(ref1, ref2) {
	const ok = (
		ref1.key === ref2.key &&
		ref1.offset === ref2.offset
	)
	return ok
}

export default areEqual
