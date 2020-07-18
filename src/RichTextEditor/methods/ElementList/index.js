import split from "../../utils/split"

const initialState = {
	prev: null,     // The previous element link
	elements: null, // The current elements
	index: 0,       // The current element index
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
			index: !ref.prev ? 0 : ref.prev.index + 1,
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

// k1.current.props.children = [
// 	...k1.current.props.children.slice(0, x1),
// 	...k2.current.props.children.slice(x2),
// ]

// Deletes a range.
export const deleteRange = list => range => {
	const k1 = findKey(list)(range.start.key)
	let k2 = k1
	if (!range.collapsed()) {
		k2 = findKey(list)(range.end.key)
	}
	const x1 = split(k1.current.props.children, range.start.offset)
	const x2 = split(k2.current.props.children, range.end.offset)
	k1.current.props.children.splice(
		0,
		k1.current.props.children.length,
		...k1.current.props.children.slice(0, x1),
		...k2.current.props.children.slice(x2),
	)
	let k = k2
	while (k !== k1) {
		k.elements.splice(k.index, 1)
		k = k.prev
	}
}

// // Formats a range.
// export const formatRange = list => range => {
// 	const k1 = findKey(list)(range.start.key)
// 	let k2 = k1
// 	if (!range.collapsed()) {
// 		k2 = findKey(list)(range.end.key)
// 	}
// }
