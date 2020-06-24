// Returns a collapsed set of cursors.
function collapse(cursors) {
	const collapsed = {
		...[cursors[0], cursors[0]],
		collapsed: true,
	}
	return collapsed
}

export default collapse
