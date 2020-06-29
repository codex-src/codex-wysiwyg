import * as Readers from "./Readers"
import decorate from "./decorate"
import markupToDOMTree from "lib/markupToDOMTree"
import React from "react"
import ReactDOMServer from "react-dom/server"
import useMethods from "use-methods"

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
	write(characterData) {
		if (!state.range.collapsed) {
			// TODO
			return
		}
		const element = state.elements.find(each => each.key === state.range[0].key)

		// Returns the span offsets for an offset.
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

		const offsets = span_offsets(element.props.spans, state.range[0].offset)
		if (!offsets) {
			const ref = {
				types: [], // TODO: Does this work with formatting shortcuts?
				text: characterData,
			}
			element.props.spans.push(ref)
		} else {
			const ref = element.props.spans[offsets[0]]
			ref.text = ref.text.slice(0, offsets[1]) + characterData + ref.text.slice(offsets[1])
		}

		// state.range[0].offset++
		// const collapsed = Range.collapse(state.range)

		const collapsed = state.range
		Object.assign(collapsed, {
			0: {
				...state.range[0],
				offset: state.range[0].offset + 1,
			},
			1: {
				...state.range[1],
				offset: state.range[0].offset + 1,
			},
			collapsed: true,
		})
		this.select(collapsed)
		this.render()
	},
	input(spans, collapsed) {
		// TODO: Add support for nodes? NodeIterator?
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
		if (!(markup !== undefined ^ children !== undefined)) {
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
