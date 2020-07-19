const initialState = {
	prev: null,          // The previous link
	current: null,       // The current element
	parentElement: null, // The current element parent
	index: 0,            // The current element parent index
	next: null,          // The next link
}

// } else if (each.props.elements) {
// 	const { current, next } = fromElements(each.props.elements)
// 	Object.assign(ref, {
// 		current,
// 		next,
// 	})
// 	const x = 0
// 	while (ref.next) {
// 		// Patch once:
// 		if (!x) {
// 			ref.next.prev = ref
// 		}
// 		ref = ref.next
// 	}

// Creates from an array of parentElement.
export function fromElements(elements) {
	const start = { ...initialState }
	let ref = start
	for (const each of elements) {
		Object.assign(ref, {
			current: each,
			parentElement: elements,
			index: !ref.prev ? 0 : ref.prev.index + 1,
			next: {
				...initialState,
				prev: ref,
			},
		})
		ref = ref.next
	}
	// Patch ref.prev.next:
	if (ref !== start) {
		ref.prev.next = null
	}
	return start
}

// Finds a link based on the return of a map function.
export const find = list => map => {
	let k = list
	while (k) {
		if (map(k.current)) {
			return k
		}
		k = k.next
	}
	return null
}
