// import SemanticScanner from "./model/Scanners/SemanticScanner"
import Editor from "./model/Editor/Editor"
import newEnum from "lib/x/newEnum"
import parseTree from "lib/DOM/parseTree"
import React from "react"
import ReactDOMServer from "react-dom/server"
import stripWhitespace from "lib/DOM/stripWhitespace"

import { // Unsorted
	registerAction,
	enableReadOnlyMode,
	disableReadOnlyMode,
	enableDisplayMarkdownMode,
	disableDisplayMarkdownMode,
} from "./useRichTextEditorActions"

// Creates a new initial state.
const newInitialState = elements => ({
	lastUserActionTimestamp: "",
	lastUserAction: "",
	readOnlyModeEnabled: false,
	displayMarkdownModeEnabled: false,
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
		get collapsed() {
			return JSONEqual(this.start, this.end)
		},
	},
})

const methods = state => ({
	registerAction,
	enableReadOnlyMode,
	disableReadOnlyMode,
	enableDisplayMarkdownMode,
	disableDisplayMarkdownMode,
})

// focus() {
// 	this.registerAction("focus")
// 	Editor(state).focus(arguments)
// },
// blur() {
// 	this.registerAction("blur")
// 	Editor(state).blur(arguments)
// },
// select(range) {
// 	this.registerAction("select")
// 	Editor(state).select(arguments)
// },
// deleteHandler(enumKey) {
// 	this.registerAction(enumKey)
// 	Editor(state).deleteHandler(arguments)
// },
// uncontrolledInput(children, range) {
// 	this.registerAction("input")
// 	Editor(state).uncontrolledInput(arguments)
// },

// Indents markup; adds one tab before each paragraph.
function indent(markup) {
	return markup.split("\n").map(each => "\t" + each).join("\n")
}

// Parses elements from markup or children.
function parseElements({ markup, children }) {
	if ((!markup && !children) || (markup && children)) {
		throw new Error("useRichTextEditor.parseElements: use markup or children")
	}
	if (children) {
		markup = ReactDOMServer.renderToStaticMarkup(children)
	}
	const tree = parseTree("<article>" + indent(markup) "</article>", stripWhitespace)
	const scanner = new SemanticScanner()
	return scanner.scanElements(tree)
	return null
}

function useRichTextEditor({ markup, children }) {
	const initialState = React.useMemo(() => {
		const elements = parseElements({ markup, children })
		return new Editor(elements)
	}, [markup, children])
	return useMethods(methods, initialState)
}

export default useRichTextEditor
