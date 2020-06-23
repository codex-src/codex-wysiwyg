// Returns a collapsed-to-start set of cursors; does not
// mutate references.
export function collapseToStart(cursors) {
	const collapsed = {
		...[cursors[0], cursors[0]],
		collapsed: true,
	}
	return collapsed
}

// Returns a collapsed-to-end set of cursors; does not
// mutate references.
export function collapseToEnd(cursors) {
	const collapsed = {
		...[cursors[1], cursors[1]],
		collapsed: true,
	}
	return collapsed
}
