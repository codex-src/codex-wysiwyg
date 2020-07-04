import * as Range from "../Range"
import JSONClone from "lib/JSONClone"
import methods from "./methods"
import queryCollection from "./queryCollection"

// // Deletes right-to-left on the current range.
// const deleteRTL = state => () => {
// 	const collection = queryCollection(state)
// 	for (const c of collection) {
// 		const [s1, s2] = c.offsets.spans
// 		c.refs.element.props.spans.splice(s1, s2 - s1)
// 	}
// 	if (collection.length > 1) {
// 		const x1 = collection[0].offsets.element
// 		const x2 = collection[collection.length - 1].offsets.element
// 		state.elements.splice(x1, (x2 - x1) + 1, {
// 			...state.elements[x1],
// 			props: {
// 				...state.elements[x1].props,
// 				spans: [
// 					...state.elements[x1].props.spans,
// 					...state.elements[x2].props.spans,
// 				],
// 			},
// 		})
// 	}
// 	const collapsed = Range.collapse(state.range)
// 	methods(state).select(collapsed)
// 	methods(state).render()
// }

// Deletes on the current range. If the cursor is collapsed,
// a synthetic range is computed based on dir and boundary.
//
// TODO: Remove empty spans
const $delete = state => (dir, boundary) => {
	const collection = queryCollection(state)

	for (const c of collection) {
		const [s1, s2] = c.offsets.spans
		c.refs.element.props.spans.splice(s1, s2 - s1)
	}
	if (collection.length > 1) {
		const x1 = collection[0].offsets.element
		const x2 = collection[collection.length - 1].offsets.element
		state.elements.splice(x1, (x2 - x1) + 1, {
			...state.elements[x1],
			props: {
				...state.elements[x1].props,
				spans: [
					...state.elements[x1].props.spans,
					...state.elements[x2].props.spans,
				],
			},
		})
	}

	const collapsed = Range.collapse(state.range)
	methods(state).select(collapsed)
	methods(state).render()
}

export default $delete
