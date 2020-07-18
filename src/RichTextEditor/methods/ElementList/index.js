// const list = ElementList.fromElements(elements)
//
// ElementList.find(list)(callback)
// ElementList.findKey(list)(key)
// ElementList.formatRange(list)(range)
// ElementList.deleteRange(list)(range)

// Creates from an array of elements.
export function fromElements(elements) {
	const list = {
		prev: null,
		elements: null,
		index: 0,
		current: null,
		next: null,
	}
	let link = list
	for (const each of elements) {
		Object.assign(link, {
			elements,
			index: !link.prev ? 0 : link.prev.index + 1,
			current: each,
			next: {
				prev: link,
				elements,
				index: 0,
				current: null,
				next: null,
			},
		})
		link = link.next
	}
	// Patch link.prev.next:
	if (link !== list) {
		link.prev.next = null
	}
	return list
}

// Finds an element link based on a callback.
export const find = list => callback => {
	let link = list
	while (link) {
		if (callback(link.current.key)) {
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
// 	if (k1 !== k2) {
// 		let k = k1.next
// 		while (k !== k2) {
// 			k.elements.splice(k.index, 1)
// 			k = k.next
// 		}
// 	}
// 	const x1 = Math.max(0, split(k1.current.props.children, range.start.offset) - 1) // Zero-based
// 	const x2 = split(k2.current.props.children, range.end.offset)
// 	const c1 = k1.current.props.children.slice(x1)
// 	const c2 = k2.current.props.children.slice(0, x2)
// 	k1.current.props.children = [...c1, ...c2]
// 	k2.elements.splice(k2.index, 1)
// }

// Deletes a range.
export const deleteRange = list => range => {
	const k1 = findKey(list)(range.start.key)
	let k2 = k1
	if (!range.collapsed()) {
		k2 = findKey(list)(range.end.key)
	}
	if (k1 !== k2) {
		let k = k1.next
		while (k !== k2) {
			k.elements.splice(k.index, 1)
			k = k.next
		}
	}
	const ch1 = k1.current.props.children.slice(Math.max(0, split(k1.current.props.children, range.start.offset) - 1)) // Zero-based
	const ch2 = k2.current.props.children.slice(0, split(k2.current.props.children, range.end.offset))
	k1.current.props.children = [...ch1, ...ch2]
	k2.elements.splice(k2.index, 1)
}

// // Formats a range.
// export const formatRange = list => range => {
// 	const k1 = findKey(list)(range.start.key)
// 	let k2 = k1
// 	if (!range.collapsed()) {
// 		k2 = findKey(list)(range.end.key)
// 	}
// }
