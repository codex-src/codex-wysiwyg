// Returns a collapsed range.
function collapse(range) {
	const collapsed = {
		...[range[0], range[0]],
		collapsed: true,
	}
	return collapsed
}

export default collapse
