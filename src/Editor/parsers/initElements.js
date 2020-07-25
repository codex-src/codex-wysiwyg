import parseTree from "lib/DOM/parseTree"
import ReactDOMServer from "react-dom/server"
import stripWhitespace from "lib/DOM/stripWhitespace"
import { parseSemanticElements } from "./parsers"

// Indents markup.
function tab(markup) {
	return markup.split("\n").map(each => "\t" + each).join("\n")
}

// Initializes elements from markup or children.
function initElementsImpl({ markup, children }) {
	if ((!markup && !children) || (markup && children)) {
		throw new Error("initElementsImpl: use argument markup OR children")
	}
	if (children) {
		markup = ReactDOMServer.renderToStaticMarkup(children)
	}
	const tree = parseTree("<article>" + tab(markup) + "</article>", stripWhitespace)
	return parseSemanticElements(tree)
}

// Initializes elements from markup.
export function initElementsFromMarkup(markup) {
	return initElementsImpl({ markup })
}

// Initializes elements from children.
export function initElementsFromChildren(children) {
	return initElementsImpl({ children })
}
