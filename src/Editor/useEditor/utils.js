// Collapses the current range.
export function collapse(e) {
	e.range.end = e.range.start
}

// Rerenders the current state.
export function render(e) {
	e.shouldRerender++
}
