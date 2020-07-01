import * as Range from "./Range"
import * as Readers from "./Readers"
import decorate from "./decorate"
import JSONClone from "lib/JSONClone"
import markupToDOMTree from "lib/markupToDOMTree"
import React from "react"
import ReactDOMServer from "react-dom/server"
import spanUtils from "./spanUtils"
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
	// TODO
	format(T, P = {}) {
		function getSpans(elements, range) {
			const x1 = state.elements.findIndex(each => each.key === state.range[0].key)
			const x2 = state.range.collapsed ? x1
				: state.elements.findIndex(each => each.key === state.range[1].key)

			const spans = []
			for (let x = x1; x <= x2; x++) {
				spans.push(...state.elements[x].props.spans)
			}
			return spans
		}

		const spans = getSpans(state.elements, state.range)
		const shouldFormat = !spans.every(each => each.types.indexOf(T) >= 0)

		if (shouldFormat) {
			for (const each of spans) {
				const x = each.types.indexOf(T)
				if (x === -1) {
					each.types.push(T)
				}
				if (Object.keys(P).length) {
					each[T] = P
				}
			}
		} else {
			for (const each of spans) {
				const x = each.types.indexOf(T)
				if (x >= 0) {
					each.types.splice(x, 1)
				}
			}
		}

		spanUtils.sort(spans)
		this.render()

		// console.log(JSONClone(spans), shouldFormat)


		// if (/* state.range.collapsed || */ state.range[0].key !== state.range[1].key) {
		// 	// TODO
		// 	return
		// }
		// const element = state.elements.find(each => each.key === state.range[0].key)
		// const shouldFormat = !element.props.spans.every(each => each.types.indexOf(T) >= 0)
		// if (shouldFormat) {
		// 	for (const each of element.props.spans) {
		// 		const x = each.types.indexOf(T)
		// 		if (x === -1) {
		// 			each.types.push(T)
		// 		}
		// 		if (Object.keys(P).length) {
		// 			each[T] = P
		// 		}
		// 	}
		// } else {
		// 	for (const each of element.props.spans) {
		// 		const x = each.types.indexOf(T)
		// 		if (x >= 0) {
		// 			each.types.splice(x, 1)
		// 		}
		// 	}
		// }
		// spanUtils.sort(element.props.spans)
		// this.render()
	},
	// TODO
	write(characterData) {
		if (!state.range.collapsed) {
			// TODO
			return
		}
		const element = state.elements.find(each => each.key === state.range[0].key)
		const offsets = span_offsets(element.props.spans, state.range[0].offset)
		const ref = element.props.spans[offsets[0]]
		ref.text = ref.text.slice(0, offsets[1]) + characterData + ref.text.slice(offsets[1])
		state.range[0].offset++
		const collapsed = Range.collapse(state.range)
		this.select(collapsed)
		this.render()
	},
	// TODO: Add support for nodes? elemUtils.find?
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
		if ((!markup && !children) || (markup && children)) {
			throw new Error("useEditor: must use markup=string or children=React.ReactElement[]")
		}
		let domTree = null
		if (markup !== undefined) {
			domTree = markupToDOMTree("<div>" + markup + "</div>")
		} else if (children !== undefined) {
			const markup = ReactDOMServer.renderToStaticMarkup(children) // Shadows markup
			domTree = markupToDOMTree("<div>" + markup + "</div>")
		}
		decorate(domTree)
		return Readers.semantic.elements(domTree)
	}, [markup, children])
	return useMethods(methods, {}, () => init(elements))
}

export default useEditor
