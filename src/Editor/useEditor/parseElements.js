// import * as ElementList from "../types/ElementList" // FIXME
import defer from "../utils/defer"
import parseTree from "lib/DOM/parseTree"
import ReactDOMServer from "react-dom/server"
import stripWhitespace from "lib/DOM/stripWhitespace"
import { parseSemanticElements } from "../parsers"

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
	// let k = ElementList.fromElements(elements) // TODO?
	// while (k) {
	// 	defer(k.current.props.children)
	// 	k = k.next
	// }
	return elements
}

export default parseElements
