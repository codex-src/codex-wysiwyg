// import escape from "lodash/escape"
// import toArray from "lib/x/toArray"
// import toTree from "Editor/components/toReactTree/toTree"
//
// const markdown = {
// 	em:     element => `_${toText(element.props.children, markdown)}_`,
// 	strong: element => `**${toText(element.props.children, markdown)}**`,
// 	code:   element => `\`${toPlaintext(element.props.children)}\``,
// 	strike: element => `~~${toText(element.props.children, markdown)}~~`,
// 	a:      element => `[${toText(element.props.children, markdown)}](${element.props.href || "TODO"})`,
// 	h1:     element => `# ${toText(toTree(element.props.children, markdown))}`,
// 	h2:     element => `## ${toText(toTree(element.props.children, markdown))}`,
// 	h3:     element => `### ${toText(toTree(element.props.children, markdown))}`,
// 	h4:     element => `#### ${toText(toTree(element.props.children, markdown))}`,
// 	h5:     element => `##### ${toText(toTree(element.props.children, markdown))}`,
// 	h6:     element => `###### ${toText(toTree(element.props.children, markdown))}`,
// 	p:      element => toText(toTree(element.props.children), markdown),
// }
//
// const markup = {
// 	em:     element => `<em>${toText(element.props.children, markup)}</em>`,
// 	strong: element => `<strong>${toText(element.props.children, markup)}</strong>`,
// 	code:   element => `<code>${toText(element.props.children, markup)}</code>`,
// 	strike: element => `<strike>${toText(element.props.children, markup)}</strike>`,
// 	a:      element => `<a href="${element.props.href}">${toText(element.props.children, markup)}</a>`,
// 	h1:     element => `<h1>\n\t${toText(toTree(element.props.children), markup) || "<br />"}\n</h1>`,
// 	h2:     element => `<h2>\n\t${toText(toTree(element.props.children), markup) || "<br />"}\n</h2>`,
// 	h3:     element => `<h3>\n\t${toText(toTree(element.props.children), markup) || "<br />"}\n</h3>`,
// 	h4:     element => `<h4>\n\t${toText(toTree(element.props.children), markup) || "<br />"}\n</h4>`,
// 	h5:     element => `<h5>\n\t${toText(toTree(element.props.children), markup) || "<br />"}\n</h5>`,
// 	h6:     element => `<h6>\n\t${toText(toTree(element.props.children), markup) || "<br />"}\n</h6>`,
// 	p:      element => `<p>\n\t${toText(toTree(element.props.children), markup) || "<br />"}\n</p>`,
// }
//
// // Converts tree-shaped children to plaintext.
// //
// // TODO: Can we do toTree without a resolver or a plaintext
// // resolver and remove this function?
// function toPlaintext(tree) {
// 	let text = ""
// 	for (const each of toArray(tree)) {
// 		if (typeof each === "string") {
// 			text += each
// 			continue
// 		}
// 		text += each.props.children &&
// 			toPlaintext(each.props.children)
// 	}
// 	return text
// }
//
// // Converts tree-shaped children to text.
// function toText(tree, resolver) {
// 	let text = ""
// 	for (const each of toArray(tree)) {
// 		if (typeof each === "string") {
// 			text += resolver !== markup ? each : escape(each)
// 			continue
// 		}
// 		text += resolver[each.type](each)
// 	}
// 	return text
// }
//
// // Converts elements to markdown.
// export function toMarkdown(elements) {
// 	let text = ""
// 	for (const each of elements) {
// 		text += markdown[each.type](each)
// 		if (each !== elements[elements.length - 1]) {
// 			text += "\n"
// 		}
// 	}
// 	return text
// }
//
// // Converts elements to markup.
// export function toMarkup(elements) {
// 	let text = ""
// 	for (const each of elements) {
// 		text += markup[each.type](each)
// 		if (each !== elements[elements.length - 1]) {
// 			text += "\n"
// 		}
// 	}
// 	return text
// }
