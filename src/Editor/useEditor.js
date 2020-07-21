// import useMethods from "use-methods"
import * as actions from "./useEditorMethods"
import * as ElementList from "./methods/ElementList"
import defer from "./utils/children/defer"
import parseTree from "lib/DOM/parseTree"
import React from "react"
import ReactDOMServer from "react-dom/server"
import stripWhitespace from "lib/DOM/stripWhitespace"
import { original } from "immer"
import { parseSemanticElements } from "./parsers"
import { useImmerReducer } from "use-immer"

// Parses elements from markup or children.
function parseElements({ markup, children }) {
	if ((!markup && !children) || (markup && children)) {
		throw new Error("useEditor.parseElements: use markup or children")
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
	// Defer on children:
	const elements = parseSemanticElements(tree)
	let k = ElementList.fromElements(elements) // TODO?
	while (k) {
		defer(k.current.props.children)
		k = k.next
	}
	return elements
}

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
		collapsed() {
			const ok = (
				this.start === this.end ||
				(this.start.key === this.end.key && this.start.offset === this.end.offset)
			)
			return ok
		},
	},
	shouldRerender: 0,
})

// const methods = state => Object.keys(useEditorMethods).reduce((acc, each) => {
// 	acc[each] = useEditorMethods[each](state)
// 	return acc
// }, {})

function reducer(draft, action) {
	switch (action.type) {
	case "ENABLE_READ_ONLY_MODE":
		actions.enableReadOnlyMode(draft)()
		return
	case "DISABLE_READ_ONLY_MODE":
		actions.disableReadOnlyMode(draft)()
		return
	case "FOCUS":
		actions.focus(draft)()
		return
	case "BLUR":
		actions.blur(draft)()
		return
	case "SELECT":
		actions.select(draft)(action.range)
		return
	case "INSERT_TEXT":
		actions.insertText(draft)()
		return
	case "APPLY_FORMAT":
		actions.applyFormat(draft)(action.formatType)
		return
	case "DELETE":
		actions.$delete(draft)(action.deleteType)
		return
	case "UNCONTROLLED_INPUT":
		actions.uncontrolledInput(draft)(action.children, action.range)
		return
	default:
		throw new Error(`useEditor.reducer: no such action.type; action.type=${action.type}`)
	}
}

// Instantiates from markup.
export function useEditorFromMarkup(markup) {
	const initialState = React.useMemo(() => {
		const elements = parseElements({ markup })
		return newInitialState(elements)
	}, [markup])
	// return useMethods(methods, initialState)
	return useImmerReducer(reducer, initialState)
}

// Instantiates from React children. Note that children is
// expected to be an array of React elements.
export function useEditorFromChildren(children) {
	const initialState = React.useMemo(() => {
		const elements = parseElements({ children })
		return newInitialState(elements)
	}, [children])
	// return useMethods(methods, initialState)
	return useImmerReducer(reducer, initialState)
}
