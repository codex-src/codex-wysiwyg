import cleanDOMTree from "./cleanDOMTree"
import markupToDOMTree from "lib/markupToDOMTree"
import React from "react"
import ReactDOMServer from "react-dom/server"
import useMethods from "use-methods"
import { readElementsFromDOMTree } from "./read"

const methods = state => ({
	// select(cursors) {
	// 	state.cursors = cursors
	// },
	// input(element, collapsed) {
	// 	// Force rerender on <br> to a text node:
	// 	const y = must(state.elements.findIndex(each => each.key === collapsed[0].key))
	// 	if (!state.elements[y].props.children.length) {
	// 		const forcedKey = newHashID(8)
	// 		element.key = forcedKey
	// 		collapsed[0].key = forcedKey // Updates cursor[1].key because references are shared
	// 	}
	// 	state.elements.splice(y, 1, element)
	// 	this.select(collapsed)
	// 	this.render()
	// },
	render() {
		state.shouldRerender++
	},
})

function init(elements) {
	const state = {
		elements,
		range: {
			// 0: Cursors.construct(),
			// 1: Cursors.construct(),
			// collapsed: true,
		},
		shouldRerender: 0,
	}
	return state
}

function useEditor({ markup, children }) {

	const elements = React.useMemo(() => {
		if (!(markup !== undefined ^ children !== undefined)) {
			throw new Error("useEditor: markup or children must not be undefined")
		}
		let domTree = null
		if (markup !== undefined) {
			domTree = markupToDOMTree(markup)
			cleanDOMTree(domTree)
		} else if (children !== undefined) {
			const markup = ReactDOMServer.renderToStaticMarkup(children) // Shadows markup
			domTree = markupToDOMTree(markup)
			cleanDOMTree(domTree)
		}
		return readElementsFromDOMTree(domTree)
	}, [markup, children])

	return useMethods(methods, {}, () => init(elements))
}

export default useEditor
