// import SemanticScanner from "./model/Scanners/SemanticScanner"
import Editor from "./model/Editor/Editor"
import newEum from "lib/x/enum"
import parseTree from "lib/DOM/parseTree"
import React from "react"
import ReactDOMServer from "react-dom/server"
import stripWhitespace from "lib/DOM/stripWhitespace"

// Creates a new initial state.
const newInitialState = elements => ({
	lastUserActionTimestamp: "",
	lastUserAction: "",

	readOnlyModeEnabled = false,
	displayMarkdownModeEnabled = false,
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

const actionEnums = newEnum(
	"enable-read-only-mode",
	"disable-read-only-mode",
	"enable-display-markdown-mode",
	"disable-display-markdown-mode",
	"focus",
	"blur",
	"uncontrolled-select",
	"delete",
	"uncontrolled-input",
)

const methods = state => ({
	registerAction(actionName) {

	},

	// Modes:
	enableReadOnlyMode() {
		state.readOnlyModeEnabled = true
	},
	disableReadOnlyMode() {
		state.readOnlyModeEnabled = false
	},
	enableDisplayMarkdownMode() {
		state.displayMarkdownModeEnabled = true
	},
	disableDisplayMarkdownMode() {
		state.displayMarkdownModeEnabled = false
	},
	// Handlers:
	focusHandler() {
		Editor(state).focusHandler(arguments)
	},
	blurHandler() {
		Editor(state).blurHandler(arguments)
	},
	uncontrolledSelectHandler(range) {
		Editor(state).uncontrolledSelectHandler(arguments)
	},
	deleteHandler(desc) {
		Editor(state).deleteHandler(arguments)
	},
	uncontrolledInputHandler(children, range) {
		Editor(state).uncontrolledInputHandler(arguments)
	},

	// switch (action.type) {
	// case "DISABLE_READ_ONLY_MODE":
	// 	return state.disableReadOnlyMode()
	// case "ENABLE_READ_ONLY_MODE":
	// 	return state.enableReadOnlyMode()
	// case "FOCUS":
	// 	return state.focus()
	// case "BLUR":
	// 	return state.blur()
	// case "SELECT":
	// 	return state.select(action.range)
	// case "CONTROLLED_DELETE_HANDLER":
	// 	return state.controlledDeleteHandler(action.desc)
	// case "UNCONTROLLED_INPUT_HANDLER":
	// 	return state.uncontrolledInputHandler(action.children, action.range)
	// default:
	// 	throw new Error(`useRichTextEditor.EditorReducer: type mismatch; action.type=${action.type}`)
	// }
})

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
