// Compares whether a range is collapsed; compares
// references then deeply compares.
function rangeIsCollapsed(range) {
	const ok = (
		range.start === range.end ||
		(range.start.key === range.end.key && range.start.offset === range.end.offset)
	)
	return ok
}

export default rangeIsCollapsed
