// import escape from "lodash/escape"
// import prismMap from "lib/prismMap"
// import typeEnum from "./typeEnum"
//
// // Component maps.
// //
// /* eslint-disable no-multi-spaces */
// const cmapText      = {}
// const cmapHTML      = {}
// const cmapHTML__BEM = {}
// const cmapReact_js  = {}
// /* eslint-enable no-multi-spaces */
//
// const escapeReactMap = {
// 	"<": "&lt;",
// 	">": "&gt;",
// 	"{": "&#123;",
// 	"}": "&#125;",
// }
//
// // React-escapes a string.
// //
// // https://github.com/lodash/lodash/blob/3.0.0-npm-packages/lodash.escape/index.js
// function reactEscape(str) {
// 	return (str || "").replace(/[<>{}]/g, char => escapeReactMap[char])
// }
//
// // Converts a nested VDOM representation to a string.
// export function toInnerString(children, cmap = cmapText) {
// 	let str = ""
// 	if (children === null || typeof children === "string") {
// 		if (cmap === cmapText) {
// 			return children || ""
// 		}
// 		// Return an escaped string or a break:
// 		return (cmap !== cmapReact_js ? escape(children) : reactEscape(children)) ||
// 			(cmap !== cmapReact_js ? "<br>" : "<br />")
// 	}
// 	for (const each of children) {
// 		if (each === null || typeof each === "string") {
// 			str += toInnerString(each, cmap)
// 			continue
// 		}
// 		str += cmap[each.type](each)
// 	}
// 	return str
// }
//
// // Converts a VDOM representation to a string.
// function toString(elements, cmap = cmapText) {
// 	let str = ""
// 	for (const each of elements) {
// 		str += cmap[each.type](each)
// 		if (each !== elements[elements.length - 1]) {
// 			str += "\n"
// 		}
// 	}
// 	return str
// }
//
// // Prism-parses code.
// function parsePrism(code, extension) {
// 	const parser = prismMap[extension]
// 	if (!parser) {
// 		// No-op
// 		return escape(code)
// 	}
// 	return window.Prism.highlight(code, parser, extension)
// }
//
// ;(() => {
// 	/* eslint-disable no-multi-spaces */
// 	cmapText[typeEnum.Escape]             = element => element.children
// 	cmapText[typeEnum.Emoji]              = element => toInnerString(element.children)
// 	cmapText[typeEnum.Emphasis]           = element => toInnerString(element.children)
// 	cmapText[typeEnum.Strong]             = element => toInnerString(element.children)
// 	cmapText[typeEnum.StrongEmphasis]     = element => toInnerString(element.children)
// 	cmapText[typeEnum.Code]               = element => element.children
// 	cmapText[typeEnum.Strikethrough]      = element => toInnerString(element.children)
// 	cmapText[typeEnum.Anchor]             = element => toInnerString(element.children)
// 	cmapText[typeEnum.Header]             = element => toInnerString(element.children)
// 	cmapText[typeEnum.Paragraph]          = element => toInnerString(element.children)
// 	cmapText[typeEnum.BlockquoteItem]     = element => toInnerString(element.children)
// 	cmapText[typeEnum.Blockquote]         = element => toString(element.children)
// 	cmapText[typeEnum.Preformatted]       = element => toInnerString(element.children.slice(1, -1).map(each => each.data).join("\n"))
// 	cmapText[typeEnum.AnyListItem]        = element => toInnerString(element.children)
// 	cmapText[typeEnum.TodoItem]           = element => toInnerString(element.children)
// 	cmapText[typeEnum.AnyList]            = element => toString(element.children)
// 	cmapText[typeEnum.Image]              = element => toInnerString(element.children)
// 	cmapText[typeEnum.Break]              = element => ""
//
// 	cmapHTML[typeEnum.Escape]             = element => element.children
// 	cmapHTML[typeEnum.Emoji]              = element => `<span aria-label="${element.description}" role="img">${toInnerString(element.children, cmapHTML)}</span>`
// 	cmapHTML[typeEnum.Emphasis]           = element => `<em>${toInnerString(element.children, cmapHTML)}</em>`
// 	cmapHTML[typeEnum.Strong]             = element => `<strong>${toInnerString(element.children, cmapHTML)}</strong>`
// 	cmapHTML[typeEnum.StrongEmphasis]     = element => `<strong><em>${toInnerString(element.children, cmapHTML)}</em></strong>`
// 	cmapHTML[typeEnum.Code]               = element => `<code>${toInnerString(element.children, cmapHTML)}</code>`
// 	cmapHTML[typeEnum.Strikethrough]      = element => `<strike>${toInnerString(element.children, cmapHTML)}</strike>`
// 	cmapHTML[typeEnum.Anchor]             = element => `<a href="${element.href}" target="_blank" rel="noopener noreferrer">${toInnerString(element.children, cmapHTML)}</a>`
// 	cmapHTML[typeEnum.Header]             = element => `<a href="#${element.hash}">\n\t<${element.tag} id="${element.hash}">\n\t\t${toInnerString(element.children, cmapHTML)}\n\t</${element.tag}>\n</a>`
// 	cmapHTML[typeEnum.Paragraph]          = element => `<p>\n\t${toInnerString(element.children, cmapHTML)}\n</p>`
// 	cmapHTML[typeEnum.BlockquoteItem]     = element => `<p>\n\t${toInnerString(element.children, cmapHTML)}\n</p>`
// 	cmapHTML[typeEnum.Blockquote]         = element => `<blockquote>${`\n${toString(element.children, cmapHTML).split("\n").map(each => `\t${each}`).join("\n")}\n`}</blockquote>`
// 	cmapHTML[typeEnum.Preformatted]       = element => `<pre${!element.extension ? "" : ` class="language-${element.extension.toLowerCase().replace("\"", "\\\"")}"`}><code><!--\n-->${parsePrism(element.children.slice(1, -1).map(each => each.data).join("\n"), element.extension)}<!--\n--></code></pre>`
// 	cmapHTML[typeEnum.AnyListItem]        = element => `<li>\n\t${toInnerString(element.children, cmapHTML)}\n</li>`
// 	cmapHTML[typeEnum.TodoItem]           = element => `<li>\n\t<input type="checkbox"${!element.checked ? "" : " checked"}>\n\t${toInnerString(element.children, cmapHTML)}\n</li>`
// 	cmapHTML[typeEnum.AnyList]            = element => `<${element.tag}>${`\n${toString(element.children, cmapHTML).split("\n").map(each => `\t${each}`).join("\n")}\n`}</${element.tag}>`
// 	cmapHTML[typeEnum.Image]              = element => (() => {
// 		const str = `<figure>\n\t<img src="${element.src}"${!element.alt ? "" : ` alt="${escape(element.alt)}"`}>${!element.alt ? "" : `\n\t<figcaption>\n\t\t${toInnerString(element.children, cmapHTML)}\n\t</figcaption>`}\n</figure>`
// 		if (!element.href) {
// 			return str
// 		}
// 		return `<a href="${element.href}" target="_blank" rel="noopener noreferrer">\n${str.split("\n").map(each => `\t${each}`).join("\n")}\n</a>`
// 	})()
// 	cmapHTML[typeEnum.Break]              = element => "<hr>"
//
// 	cmapReact_js[typeEnum.Escape]         = element => element.children
// 	cmapReact_js[typeEnum.Emoji]          = element => `<E>${toInnerString(element.children, cmapReact_js)}</E>`
// 	cmapReact_js[typeEnum.Emphasis]       = element => `<Em>${toInnerString(element.children, cmapReact_js)}</Em>`
// 	cmapReact_js[typeEnum.Strong]         = element => `<Strong>${toInnerString(element.children, cmapReact_js)}</Strong>`
// 	cmapReact_js[typeEnum.StrongEmphasis] = element => `<StrongEm>${toInnerString(element.children, cmapReact_js)}</StrongEm>`
// 	cmapReact_js[typeEnum.Code]           = element => `<Code>${toInnerString(element.children, cmapReact_js)}</Code>`
// 	cmapReact_js[typeEnum.Strikethrough]  = element => `<Strike>${toInnerString(element.children, cmapReact_js)}</Strike>`
// 	cmapReact_js[typeEnum.Anchor]         = element => `<a href="${element.href}" target="_blank" rel="noopener noreferrer">${toInnerString(element.children, cmapReact_js)}</a>`
// 	cmapReact_js[typeEnum.Header]         = element => `<a href="#${element.hash}">\n\t<${element.tag.toUpperCase()} id="${element.hash}">\n\t\t${toInnerString(element.children, cmapReact_js)}\n\t</${element.tag.toUpperCase()}>\n</a>`
// 	cmapReact_js[typeEnum.Paragraph]      = element => `<P>\n\t${toInnerString(element.children, cmapReact_js)}\n</P>`
// 	cmapReact_js[typeEnum.BlockquoteItem] = element => `<P>\n\t${toInnerString(element.children, cmapReact_js)}\n</P>`
// 	cmapReact_js[typeEnum.Blockquote]     = element => `<Blockquote>${`\n${toString(element.children, cmapReact_js).split("\n").map(each => `\t${each}`).join("\n")}\n`}</Blockquote>`
// 	cmapReact_js[typeEnum.Preformatted]   = element => `<Pre${!element.info ? "" : ` info="${element.info.replace("\"", "\\\"")}"`}>\n{\`${toInnerString(element.children.slice(1, -1).map(each => each.data).join("\n")).replace(/`/g, "\\`")}\`}\n</Pre>`
// 	cmapReact_js[typeEnum.AnyListItem]    = element => `<Item>\n\t${toInnerString(element.children, cmapReact_js)}\n</Item>`
// 	cmapReact_js[typeEnum.TodoItem]       = element => `<Item>\n\t<Todo${!element.checked ? "" : " done"} />\n\t${toInnerString(element.children, cmapReact_js)}\n</Item>`
// 	cmapReact_js[typeEnum.AnyList]        = element => `<List${element.tag === "ul" ? "" : " ordered"}>${`\n${toString(element.children, cmapReact_js).split("\n").map(each => `\t${each}`).join("\n")}\n`}</List>`
// 	cmapReact_js[typeEnum.Image]          = element => (() => {
// 		const str = `<Figure>\n\t<Img src="${element.src}"${!element.alt ? "" : ` alt="${escape(element.alt)}"`} />${!element.alt ? "" : `\n\t<Caption>\n\t\t${toInnerString(element.children, cmapReact_js)}\n\t</Caption>`}\n</Figure>`
// 		if (!element.href) {
// 			return str
// 		}
// 		return `<a href="${element.href}" target="_blank" rel="noopener noreferrer">\n${str.split("\n").map(each => `\t${each}`).join("\n")}\n</a>`
// 	})()
// 	cmapReact_js[typeEnum.Break]          = element => "<Break />"
// 	/* eslint-enable no-multi-spaces */
// })()
//
// export function toInnerText(children) {
// 	return toInnerString(children)
// }
// export function toText(elements) {
// 	return toString(elements)
// }
// export function toHTML(elements) {
// 	return toString(elements, cmapHTML)
// }
// export function toHTML__BEM(elements) {
// 	return toString(elements, cmapHTML__BEM)
// }
// export function toReact_js(elements) {
// 	return toString(elements, cmapReact_js)
// }
