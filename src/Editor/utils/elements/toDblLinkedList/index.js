import Element from "../../../model/Editor/Element"
import MultilineElement from "../../../model/Editor/MultilineElement"

// Converts an array of elements to doubly linked list.
function toDblLinkedList(elements) {
	const start = {
		prev: null,
		current: null,
		next: null,
	}
	let ref = start
	for (const each of elements) {
		if (each instanceof Element) {
			Object.assign(ref, {
				current: each,
				next: {
					prev: ref,
					current: null,
					next: null,
				},
			})
			ref = ref.next
		} else if (each instanceof MultilineElement) {
			const { current, next } = toDblLinkedList(each.props.elements)
			Object.assign(ref, {
				current,
				next,
			})
			while (ref.next) {
				ref.next.prev = ref
				ref = ref.next
			}
		}
	}
	return start
}

export default toDblLinkedList
