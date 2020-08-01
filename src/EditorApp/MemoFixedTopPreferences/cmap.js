import escape from "lodash/escape"
import toArray from "lib/x/toArray"
import toTree from "Editor/components/toReactTree/toTree"

// Mocks the browser API; reads text content from tree-
// shaped children.
function treeTextContent(children) {
	let str = ""
	for (const each of toArray(children)) {
		if (typeof each === "string") {
			str += each
			continue
		}
		str += treeTextContent(each.props.children)
	}
	return str
}

// TODO: Add support for alternate syntax?
const gfm = {
	em:     el => `_${resolveTreeChildren(el.props.children, gfm)}_`,
	strong: el => `**${resolveTreeChildren(el.props.children, gfm)}**`,
	code:   el => `\`${treeTextContent(el.props.children)}\``,
	strike: el => `~~${resolveTreeChildren(el.props.children, gfm)}~~`,

	// !el.props.href ? `[${resolveTreeChildren(el.props.children, gfm)}](${el.props.href})` : el.props.children,
	a:      el => `[${resolveTreeChildren(el.props.children, gfm)}](${el.props.href || "TODO"})`,

	"h1":   el => `# ${resolveChildren(el.props.children, gfm)}`,
	"h2":   el => `## ${resolveChildren(el.props.children, gfm)}`,
	"h3":   el => `### ${resolveChildren(el.props.children, gfm)}`,
	"h4":   el => `#### ${resolveChildren(el.props.children, gfm)}`,
	"h5":   el => `##### ${resolveChildren(el.props.children, gfm)}`,
	"h6":   el => `###### ${resolveChildren(el.props.children, gfm)}`,
	"p":    el => resolveChildren(el.props.children, gfm),
}

// TODO: Add support for options; show ID, show wrapped URL,
// etc.
const html = {
	em:     el => `<em>${resolveTreeChildren(el.props.children, html)}</em>`,
	strong: el => `<strong>${resolveTreeChildren(el.props.children, html)}</strong>`,
	code:   el => `<code>${resolveTreeChildren(el.props.children, html)}</code>`,
	strike: el => `<strike>${resolveTreeChildren(el.props.children, html)}</strike>`,

	// target="_blank" rel="noopener noreferrer"
	a:      el => `<a href="${el.props.href}">${resolveTreeChildren(el.props.children, html)}</a>`,

	"h1":   el => `<h1>\n\t${resolveChildren(el.props.children, html) || "<br />"}\n</h1>`,
	"h2":   el => `<h2>\n\t${resolveChildren(el.props.children, html) || "<br />"}\n</h2>`,
	"h3":   el => `<h3>\n\t${resolveChildren(el.props.children, html) || "<br />"}\n</h3>`,
	"h4":   el => `<h4>\n\t${resolveChildren(el.props.children, html) || "<br />"}\n</h4>`,
	"h5":   el => `<h5>\n\t${resolveChildren(el.props.children, html) || "<br />"}\n</h5>`,
	"h6":   el => `<h6>\n\t${resolveChildren(el.props.children, html) || "<br />"}\n</h6>`,
	"p":    el => `<p>\n\t${resolveChildren(el.props.children, html) || "<br />"}\n</p>`,
}

// 	if (children === null || typeof children === "string") {
// 		if (resolver === cmapText) {
// 			return children || ""
// 		}
// 		// Return an escaped string or a break:
// 		return (resolver !== cmapReact_js ? escape(children) : reactEscape(children)) ||
// 			(resolver !== cmapReact_js ? "<br>" : "<br />")
// 	}

// Resolves tree-shaped children to a resolver-type.
function resolveTreeChildren(children, resolver) {
	let str = ""
	for (const each of toArray(children)) {
		if (typeof each === "string") {
			str += resolver !== html ? each : escape(each)
			continue
		}
		str += resolver[each.type](each)
	}
	return str
}

// Resolves children to a resolver-type.
function resolveChildren(children, resolver) {
	return resolveTreeChildren(toTree(children), resolver)
}

// Resolves elements to a resolver-type.
function resolveElements(elements, resolver) {
	let str = ""
	for (const each of elements) {
		str += resolver[each.type](each)
		if (each !== elements[elements.length - 1]) {
			str += "\n"
		}
	}
	return str
}

// Converts an array of elements to GFM.
export function toGFM(elements) {
	return resolveElements(elements, gfm)
}

// Converts an array of elements to HTML.
export function toHTML(elements) {
	return resolveElements(elements, html)
}