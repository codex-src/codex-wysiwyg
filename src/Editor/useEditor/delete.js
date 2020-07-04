import * as Range from "../Range"
import JSONClone from "lib/JSONClone"
import methods from "./methods"
import queryCollection from "./queryCollection"

// Deletes a boundary (in a direction) on the current range.
const $delete = state => (dir, boundary) => {
	const collection = queryCollection(state)

	// TODO: Remove empty elements
	for (const c of collection) {
		for (const s of c.spans) {
			const x = c.ref.props.spans.indexOf(s) // TODO: Add throw?
			c.ref.props.spans.splice(x, 1)
		}
	}

	// TODO: Forward-delete is effectively the same but we
	// swap out the order of collection[0] and
	// collection[collection.length - 1]
	if (collection.length > 1) {
		const x1 = state.elements.indexOf(collection[0].ref) // TODO: Add throw?
		const x2 = state.elements.indexOf(collection[collection.length - 1].ref) // TODO: Add throw?
		state.elements.splice(x1, (x2 - x1) + 1, {
			...collection[0].ref,
			props: {
				...collection[0].ref.props,
				spans: [...collection[0].ref.props.spans, ...collection[collection.length - 1].ref.props.spans],
			},
		})
		console.log(JSONClone(state.elements))

		// for (const c of collection.slice(1)) { // TODO: Reverse order?
		// 	if (!c.ref.props.spans.length) {
		// 		const x = state.elements.indexOf(c.ref) // TODO: Add throw?
		// 		state.elements.splice(x, 1)
		// 	}
		// }
		// collection[0].ref.props.spans.push(...collection.slice(-1)[0].ref.props.spans)
	}

	const collapsed = Range.collapse(state.range)
	methods(state).select(collapsed)
	methods(state).render()
}

export default $delete
