import * as Iterators from "../Iterators"
import * as Range from "../Range"
import JSONClone from "lib/JSONClone"
import methods from "./methods"
import queryCollection from "./queryCollection"

// Reducer for an array of spans; concatenates text.
const reducer = (acc, each) => acc += each.text

// Computes a right-to-left range component based on the
// current collapsed range and a boundary.
const nextRTL = state => boundary => {
	const x = state.elements.findIndex(each => each.key === state.range[0].key)
	const text = state.elements[x].props.spans.reduce(reducer, "")
	if (!state.range[0].offset && x) {
		const component = {
			key: state.elements[x - 1].key,
			offset: state.elements[x - 1].props.spans.reduce(reducer, "").length,
		}
		return component
	}
	const substr = Iterators.rtl[boundary](text.slice(0, state.range[0].offset))
	const component = {
		key: state.elements[x].key,
		offset: state.range[0].offset - substr.length,
	}
	return component
}

// Computes a left-to-right range component based on the
// current collapsed range and a boundary.
const nextLTR = state => boundary => {
	const x = state.elements.findIndex(each => each.key === state.range[0].key)
	const text = state.elements[x].props.spans.reduce(reducer, "")
	if (x + 1 < state.elements.length && state.range[0].offset === text.length) {
		const component = {
			key: state.elements[x + 1].key,
			offset: 0,
		}
		return component
	}
	const substr = Iterators.ltr[boundary](text.slice(state.range[0].offset))
	const component = {
		key: state.elements[x].key,
		offset: state.range[0].offset + substr.length,
	}
	return component
}

// Computes the next range based on the current collapsed
// range and a boundary.
const next = state => (dir, boundary) => {
	const next = {}
	if (dir === "rtl" && dir !== "ltr") {
		const component = nextRTL(state)(boundary)
		Object.assign(next, {
			...[component, state.range[0]],
			collapsed: Range.areEqualComponents(component, state.range[0]),
		})
	} else {
		const component = nextLTR(state)(boundary)
		Object.assign(next, {
			...[state.range[0], component],
			collapsed: Range.areEqualComponents(state.range[0], component),
		})
	}
	return next
}

// Deletes on the current range. If the cursor is collapsed,
// a synthetic range is computed based on dir and boundary.
//
// TODO: Remove empty spans
const $delete = state => (dir, boundary) => {
	if (state.range.collapsed && (dir === "rtl" || dir === "ltr")) {
		Object.assign(state.range, next(state)(dir, boundary))
	}

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
