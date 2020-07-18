import split from "../../utils/split"

const initialState = {
	prev: null,     // The previous element link
	elements: null, // The current elements
	x: 0,           // The current element offset
	current: null,  // The current element
	next: null,     // The next element link
}

// Creates from an array of elements.
export function fromElements(elements) {
	const start = { ...initialState }
	let ref = start
	for (const each of elements) {
		Object.assign(ref, {
			elements,
			x: !ref.prev ? 0 : ref.prev.x + 1,
			current: each,
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

// Finds an element link based on a callback.
export const find = list => callback => {
	let link = list
	while (link) {
		if (callback(link.current)) {
			return link
		}
		link = link.next
	}
	return null
}

// Finds an element link based on a key.
export const findKey = list => key => {
	return find(list)(each => each.key === key)
}

// Deletes a range.
export const deleteRange = list => range => {
	const k1 = findKey(list)(range.start.key)
	let k2 = k1
	if (!range.collapsed()) {
		k2 = findKey(list)(range.end.key)
	}
	// Keys are the same:
	const x1 = split(k1.current.props.children, range.start.offset)
	const x2 = split(k2.current.props.children, range.end.offset)
	if (k1 === k2) {
		k1.current.props.children.splice(x1, x2 - x1)
		return
	}
	// // Keys are not the same:
	// let k = k1.next
	// while (k !== k2) {
	// 	k.elements.splice(k.x, 1)
	// 	k = k.next
	// }
	// const ch1 = k1.current.props.children.slice(split(k1.current.props.children, range.start.offset))
	// const ch2 = k2.current.props.children.slice(0, split(k2.current.props.children, range.end.offset))
	// k1.current.props.children = [...ch1, ...ch2]
	// k2.elements.splice(k2.x, 1)
}

// // Formats a range.
// export const formatRange = list => range => {
// 	const k1 = findKey(list)(range.start.key)
// 	let k2 = k1
// 	if (!range.collapsed()) {
// 		k2 = findKey(list)(range.end.key)
// 	}
// }
