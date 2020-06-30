import * as Range from "./Range"
import * as Readers from "./Readers"
import * as Types from "./Types"
import decorate from "./decorate"
import JSONClone from "lib/JSONClone"
import markupToDOMTree from "lib/markupToDOMTree"
import React from "react"
import ReactDOMServer from "react-dom/server"
import useMethods from "use-methods"

// Returns the span and character offsets for a span and a
// range component offset.
function span_offsets(spans, offset) { // TODO
	let x = 0
	for (; x < spans.length; x++) {
		if (offset - spans[x].text.length <= 0) {
			return [x, offset]
		}
		offset -= spans[x].text.length
	}
	return null
}

const methods = state => ({
	focus() {
		state.focused = true
	},
	blur() {
		state.focused = false
	},
	select(range) {
		state.range = range
	},
	// dispatch.format(Types.enum.strong)
	format(T, P = {}) {
		if (state.range.collapsed || state.range[0].key !== state.range[1].key) {
			// TODO
			return
		}

		const element = state.elements.find(each => each.key === state.range[0].key)

		const shouldFormat = !element.props.spans.every(each => each.types.indexOf(T) >= 0)
		if (shouldFormat) {
			for (const each of element.props.spans) {
				const x = each.types.indexOf(T)
				if (x === -1) {
					each.types.push(T)
				}
				if (Object.keys(P).length) {
					each[T] = P
				}
			}
		} else {
			for (const each of element.props.spans) {
				const x = each.types.indexOf(T)
				if (x >= 0) {
					each.types.splice(x, 1)
				}
			}
		}

		// Compares span types based on render precedence.
		function compareTypes(T1, T2) {
			const x1 = Types.sortOrder[T1] // must(sortedTypeMap[T1])
			const x2 = Types.sortOrder[T2] // must(sortedTypeMap[T2])
			return x1 - x2
		}

		element.props.spans.map(each => each.types.sort(compareTypes))

		this.render()

		// // Splits a span at an offset.
		// const split = (spans, offset) => {
		// 	const offsets = span_offsets(spans, offset)
		// 	if (!offsets[1] || offsets[1] >= spans[offsets[0]].text.length) {
		// 		return offsets[0]
		// 	}
		// 	const ref = spans[offsets[0]]
		// 	const start = {
		// 		...JSONClone(ref),
		// 		text: ref.text.slice(0, offsets[1]),
		// 	}
		// 	const end = {
		// 		...JSONClone(ref),
		// 		text: ref.text.slice(offsets[1]),
		// 	}
		// 	spans.splice(offsets[0], 1, start, end)
		// 	return offsets[0] + 1
		// }
		//
		// const element = state.elements.find(each => each.key === state.range[0].key)
		// const x1 = split(element.props.spans, state.range[0].offset)
		// let x2 = split(element.props.spans, state.range[1].offset)
		// if (x2 === x1) {
		// 	x2++
		// }
		//
		// const shouldFormat = !element.props.spans
		// 	.slice(x1, x2)
		// 	.every(each => each.types.indexOf(T) >= 0)
		//
		// if (shouldFormat) {
		// 	for (const each of element.props.spans.slice(x1, x2)) {
		// 		const x = each.types.indexOf(T)
		// 		if (x === -1) {
		// 			each.types.push(T)
		// 			if (Object.keys(P).length) {
		// 				each[T] = P
		// 			}
		// 		}
		// 	}
		// } else {
		// 	for (const each of element.props.spans.slice(x1, x2)) {
		// 		const x = each.types.indexOf(T)
		// 		if (x >= 0) {
		// 			each.types.splice(x, 1)
		// 			each[T] = undefined
		// 		}
		// 	}
		// }
		// // Spans.defer
		//
		// // Compares span types based on render precedence.
		// function compareTypes(T1, T2) {
		// 	const x1 = Types.sortOrder[T1] // must(sortedTypeMap[T1])
		// 	const x2 = Types.sortOrder[T2] // must(sortedTypeMap[T2])
		// 	return x1 - x2
		// }
		//
		// element.props.spans.map(each => each.types.sort(compareTypes))
		//
		// console.log({ shouldFormat, x1, x2 })
		// console.log(JSONClone(element.props.spans))
		// this.render()
	},
	write(characterData) {
		if (!state.range.collapsed) {
			// TODO
			return
		}

		const element = state.elements.find(each => each.key === state.range[0].key)
		const offsets = span_offsets(element.props.spans, state.range[0].offset) // TODO: Add must?
		const ref = element.props.spans[offsets[0]]
		ref.text = ref.text.slice(0, offsets[1]) + characterData + ref.text.slice(offsets[1])
		state.range[0].offset++

		const collapsed = Range.collapse(state.range)
		this.select(collapsed)
		this.render()
	},
	// TODO: Add support for nodes? NodeIterator?
	input(spans, collapsed) {
		const element = state.elements.find(each => each.key === collapsed[0].key)
		element.props.spans = spans
		this.select(collapsed)
		this.render()
	},
	render() {
		state.shouldRerender++
	},
})

const init = elements => ({
	elements,
	focused: false,
	range: {
		0: {
			key: "",
			offset: 0,
		},
		1: {
			key: "",
			offset: 0,
		},
		collapsed: true,
	},
	shouldRerender: 0,
})

function useEditor({ markup, children }) {
	const elements = React.useMemo(() => {
		if (!(markup !== undefined ^ children !== undefined)) { // FIXME: Remove !(...)
			throw new Error("useEditor: use markup or children")
		}
		let domTree = null
		if (markup !== undefined) {
			domTree = markupToDOMTree(markup)
		} else if (children !== undefined) {
			const markup = ReactDOMServer.renderToStaticMarkup(children) // Shadows markup
			domTree = markupToDOMTree(markup)
		}
		decorate(domTree)
		return Readers.semantic.elements(domTree)
	}, [markup, children])
	return useMethods(methods, {}, () => init(elements))
}

export default useEditor
