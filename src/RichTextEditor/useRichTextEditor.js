import * as RichTextEditor from "./methods/RichTextEditor"
import parseTree from "lib/DOM/parseTree"
import React from "react"
import ReactDOMServer from "react-dom/server"
import stripWhitespace from "lib/DOM/stripWhitespace"
import useMethods from "use-methods"
import { parseSemanticElements } from "./parsers"

const newInitialState = elements => ({
	lastActionTimestamp: "init",
	lastAction: Date.now(),
	readOnlyModeEnabled: true, // DOMContentLoaded disables read-only mode
	focused: false,
	elements,
	range: {
		start: {
			key: "",
			offset: 0,
		},
		end: {
			key: "",
			offset: 0,
		},
		collapsed: true,
	},
	shouldRerender: 0,
})

const methods = state => Object.keys(RichTextEditor).reduce((acc, each) => {
	acc[each] = RichTextEditor[each](state)
	return acc
}, {})

// Parses elements from markup or children.
function parseElements({ markup, children }) {
	if ((!markup && !children) || (markup && children)) {
		throw new Error("useRichTextEditor.parseElements: use markup or children")
	}
	if (children) {
		markup = ReactDOMServer.renderToStaticMarkup(children)
	}
	const tree = parseTree(
		"<article>" +
			markup.split("\n").map(each => "\t" + each).join("\n") +
		"</article>",
		stripWhitespace,
	)
	return parseSemanticElements(tree)
}

// Instantiates from markup.
export function useRichTextEditorFromMarkup(markup) {
	const initialState = React.useMemo(() => {
		const elements = parseElements({ markup })
		return newInitialState(elements)
	}, [markup])
	return useMethods(methods, initialState)
}

// Instantiates from React children. Note that children is
// expected to be an array of React elements.
export function useRichTextEditorFromChildren(children) {
	const initialState = React.useMemo(() => {
		const elements = parseElements({ children })
		return newInitialState(elements)
	}, [children])
	return useMethods(methods, initialState)
}
