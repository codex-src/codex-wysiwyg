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

const cmapGFM = {
	em:     el => `_${resolveTreeChildren(el.props.children, cmapGFM)}_`,
	strong: el => `**${resolveTreeChildren(el.props.children, cmapGFM)}**`,
	code:   el => `\`${treeTextContent(el.props.children)}\``,
	strike: el => `~~${resolveTreeChildren(el.props.children, cmapGFM)}~~`,

	// !el.props.href ? `[${resolveTreeChildren(el.props.children, cmapGFM)}](${el.props.href})` : el.props.children,
	a:      el => `[${resolveTreeChildren(el.props.children, cmapGFM)}](${el.props.href || "TODO"})`,

	"h1":   el => `# ${resolveChildren(el.props.children, cmapGFM)}`,
	"h2":   el => `## ${resolveChildren(el.props.children, cmapGFM)}`,
	"h3":   el => `### ${resolveChildren(el.props.children, cmapGFM)}`,
	"h4":   el => `#### ${resolveChildren(el.props.children, cmapGFM)}`,
	"h5":   el => `##### ${resolveChildren(el.props.children, cmapGFM)}`,
	"h6":   el => `###### ${resolveChildren(el.props.children, cmapGFM)}`,
	"p":    el => resolveChildren(el.props.children, cmapGFM),
}

const cmapHTML = {
	em:     el => `<em>${resolveTreeChildren(el.props.children, cmapHTML)}</em>`,
	strong: el => `<strong>${resolveTreeChildren(el.props.children, cmapHTML)}</strong>`,
	code:   el => `<code>${resolveTreeChildren(el.props.children, cmapHTML)}</code>`,
	strike: el => `<strike>${resolveTreeChildren(el.props.children, cmapHTML)}</strike>`,

	// target="_blank" rel="noopener noreferrer"
	a:      el => `<a href="${el.props.href}">${resolveTreeChildren(el.props.children, cmapHTML)}</a>`,

	"h1":   el => `<h1>\n\t${resolveChildren(el.props.children, cmapHTML) || "<br />"}\n</h1>`,
	"h2":   el => `<h2>\n\t${resolveChildren(el.props.children, cmapHTML) || "<br />"}\n</h2>`,
	"h3":   el => `<h3>\n\t${resolveChildren(el.props.children, cmapHTML) || "<br />"}\n</h3>`,
	"h4":   el => `<h4>\n\t${resolveChildren(el.props.children, cmapHTML) || "<br />"}\n</h4>`,
	"h5":   el => `<h5>\n\t${resolveChildren(el.props.children, cmapHTML) || "<br />"}\n</h5>`,
	"h6":   el => `<h6>\n\t${resolveChildren(el.props.children, cmapHTML) || "<br />"}\n</h6>`,
	"p":    el => `<p>\n\t${resolveChildren(el.props.children, cmapHTML) || "<br />"}\n</p>`,
}

// Resolves tree-shaped children to a resolver-type.
//
// TODO
function resolveTreeChildren(children, resolver) {
	let str = ""
	for (const each of toArray(children)) {
		if (typeof each === "string") {
			str += resolver !== cmapHTML ? each : escape(each)
			continue
		}
		str += resolver[each.type](each)
	}
	return str
}

// Resolves children to a resolver-type.
//
// TODO
function resolveChildren(children, resolver) {
	return resolveTreeChildren(toTree(children), resolver)
}

// Resolves to a string based on a resolver.
function toString(elements, resolver) {
	let str = ""
	for (const each of elements) {
		str += resolver[each.type](each)
		if (each !== elements[elements.length - 1]) {
			str += "\n"
		}
	}
	return str
}

// Resolves to GFM.
export function toGFM(elements) {
	return toString(elements, cmapGFM)
}

// Resolves to HTML.
export function toHTML(elements) {
	return toString(elements, cmapHTML)
}
