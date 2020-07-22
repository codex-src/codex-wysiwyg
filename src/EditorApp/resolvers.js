import escape from "lodash/escape"
import toArray from "lib/x/toArray"
import toTree from "Editor/components/toReactTree/toTree"

// TODO: Add support to obscure IDs
//
// id="${el.key}"
// id="${el.key}"

const gfm = {
	em:     el => `_${resolveChildrenTree(el.props.children, gfm)}_`,
	strong: el => `**${resolveChildrenTree(el.props.children, gfm)}**`,
	code:   el => `\`${resolveChildrenTree(el.props.children, gfm)}\``,
	strike: el => `~~${resolveChildrenTree(el.props.children, gfm)}~~`,
	a:      el => `[${resolveChildrenTree(el.props.children, gfm)}](${el.props.href || "TODO"})`,

	"h2":   el => `## ${resolveChildren(el.props.children, gfm)}`,
	"p":    el => resolveChildren(el.props.children, gfm),
}

const html = {
	em:     el => `<em>${resolveChildrenTree(el.props.children, html)}</em>`,
	strong: el => `<strong>${resolveChildrenTree(el.props.children, html)}</strong>`,
	code:   el => `<code>${resolveChildrenTree(el.props.children, html)}</code>`,
	strike: el => `<strike>${resolveChildrenTree(el.props.children, html)}</strike>`,
	a:      el => `<a href="${el.props.href}" target="_blank" rel="noopener noreferrer">${resolveChildrenTree(el.props.children, html)}</a>`,

	"h2":   el => `<h2>\n\t${resolveChildren(el.props.children, html) || "<br />"}\n</h2>`,
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
function resolveChildrenTree(children, resolver) {
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
	return resolveChildrenTree(toTree(children), resolver)
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
export function resolveGFM(elements) {
	return resolveElements(elements, gfm)
}

// Converts an array of elements to HTML.
export function resolveHTML(elements) {
	return resolveElements(elements, html)
}
