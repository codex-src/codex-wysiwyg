// Returns a collapsed set of cursors.
function collapse(cursors) {
	const ref = {
		...[cursors[0], cursors[0]],
		collapsed: true,
	}
	return ref
}

export default collapse
