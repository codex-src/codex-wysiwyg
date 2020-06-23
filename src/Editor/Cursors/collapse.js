// Returns a collapsed set of cursors; does not mutate
// references.
function collapse(cursors) {
	const collapsed = {
		...[cursors[0], cursors[0]],
		collapsed: true,
	}
	return collapsed
}

export default collapse
