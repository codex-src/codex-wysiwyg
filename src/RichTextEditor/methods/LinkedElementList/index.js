// This modules works with doubly linked element lists.
// Every element link points to the previous, current, and
// next element link.

// Creates from an array of elements.
export const fromElements = elements => {
	const start = {
		prev: null,
		current: null,
		next: null,
	}
	let ref = start
	for (const each of elements) {
		if (each.props.children) {
			Object.assign(ref, {
				current: each, // prev is intentionally omitted
				next: {
					prev: ref,
					current: null,
					next: null,
				},
			})
			ref = ref.next
		} else if (each.props.elements) {
			const { current, next } = fromElements(each.props.elements)
			Object.assign(ref, {
				current,
				next,
			})
			const x = 0
			while (ref.next) {
				// Patch once:
				if (!x) {
					ref.next.prev = ref
				}
				ref = ref.next
			}
		}
	}
	return start
}

// Find an element link based on the return of a callback.
export const find = e => callback => {
	let ref = e
	while (ref === e || ref.next) {
		if (callback(ref.current)) {
			return ref
		}
		ref = ref.next
	}
	return null
}
