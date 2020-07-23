// Returns whether a range is collapsed.
function collapsed(range) {
	const ok = (
		range.start === range.end || // Compares references
		(range.start.key === range.end.key && range.start.offset === range.end.offset)
	)
	return ok
}

export default collapsed
