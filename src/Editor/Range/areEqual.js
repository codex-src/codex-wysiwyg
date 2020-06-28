// Compares whether range components are equal.
function areEqual(component1, component2) {
	const ok = (
		component1 === component2 || // Compares references
		(component1.key === component2.key && component1.offset === component2.offset)
	)
	return ok
}

export default areEqual
