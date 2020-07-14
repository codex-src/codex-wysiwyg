import JSONEqual from "lib/JSON/JSONEqual"
import parseTree from "lib/DOM/parseTree"
import React from "react"
import ReactDOMServer from "react-dom/server"
import RichTextEditor from "./model/RichTextEditor"
import stripWhitespace from "lib/DOM/stripWhitespace"
import useMethods from "use-methods"
import { parseSemanticTree } from "./parsers"

const newInitialState = elements => ({
	lastActionTimestamp: "",
	lastAction: "",
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
	return parseSemanticTree(tree)
}

function useRichTextEditor({ markup, children }) {
	const initialState = React.useMemo(() => {
		const elements = parseElements({ markup, children })
		return newInitialState(elements)
	}, [markup, children])
	return useMethods(state => RichTextEditor(state), initialState)
}

export default useRichTextEditor
