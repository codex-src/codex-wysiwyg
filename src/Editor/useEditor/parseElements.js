import parseTree from "lib/DOM/parseTree"
import ReactDOMServer from "react-dom/server"
import stripWhitespace from "lib/DOM/stripWhitespace"
import { parseSemanticElements } from "../parsers"

// Parses elements from markup or children.
function parseElementsImpl({ markup, children }) {
	if ((!markup && !children) || (markup && children)) {
		throw new Error("useEditor.parseElementsImpl: use markup or children")
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

// Parses elements from markup.
export function parseElementsFromMarkup(markup) {
	return parseElementsImpl({ markup })
}

// Parses elements from children.
export function parseElementsFromChildren(children) {
	return parseElementsImpl({ children })
}
