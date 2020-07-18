import x from "../../utils/index"

const initialState = {
	prev: null,          // The previous element link
	current: null,       // The current element
	parentElement: null, // The current element parent
	index: 0,            // The current element parent index
	next: null,          // The next element link
}

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

// // Deletes a range.
// export const deleteRange = list => range => {
// 	const k1 = findKey(list)(range.start.key)
// 	let k2 = k1
// 	if (!range.collapsed()) {
// 		k2 = findKey(list)(range.end.key)
// 	}
// 	const [el1, el2] = [k1.current, k2.current]
// 	const start = el1.props.children.slice(0, x(el1.props.children, range.start.offset))
// 	const end = el2.props.children.slice(x(el2.props.children, range.end.offset))
// 	el1.props.children = [start, end]
// 	let k = k2
// 	while (k !== k1) {
// 		k.parentElement.splice(k.index, 1)
// 		k = k.prev
// 	}
// }

// Deletes a range.
export const deleteRange = list => range => {
	const k1 = findKey(list)(range.start.key)
	let k2 = k1
	if (!range.collapsed()) {
		k2 = findKey(list)(range.end.key)
	}
	const [el1, el2] = [k1.current, k2.current]
	el1.props.children = [
		...el1.props.children.slice(0, x(el1.props.children, range.start.offset)),
		...el2.props.children.slice(x(el2.props.children, range.end.offset)),
	]
	let k = k2
	while (k !== k1) {
		k.parentElement.splice(k.index, 1)
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
