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
	input(spans, collapsed) {
		// // Force rerender on <br> to a text node:
		// const y = must(state.elements.findIndex(each => each.key === collapsed[0].key))
		// if (!state.elements[y].props.children.length) {
		// 	const forcedKey = newHashID(8)
		// 	element.key = forcedKey
		// 	collapsed[0].key = forcedKey // Updates cursor[1].key because references are shared
		// }

		console.log(spans)

		// const element = state.elements.find(each => each.key === collapsed[0].key) // TODO
		// element.props.spans = spans
		// this.select(collapsed)
		// this.render()
	},
	render() {
		state.shouldRerender++
	},
})

function init(elements) {
	const state = {
		// Document elements
		elements,
		// Is focused?
		focused: false,
		// Selection range
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
		// Should rerender (useLayoutEffect)
		shouldRerender: 0,
	}
	return state
}

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
