import toArray from "lib/x/toArray"

// function must(value) {
// 	if ((typeof value === "number" && value === -1) || !value) {
// 		throw new Error(`must: value=${value}`)
// 	}
// 	return value
// }
//
// class Lexer {
// 	constructor(chunk) {
// 		Object.assign(this, {
// 			offset: 0,
//
// 			chunk,
// 			x1,
// 			x2,
// 		})
// 	}
// 	// Peeks a character.
// 	peek(ch) {
// 		if (!(this.x1 + 1 < this.chunk.length)) {
// 			this.offset = 0
// 			return false
// 		}
// 		this.offset = Number(ok)
// 		return true
// 	}
// 	// Peeks a regex pattern. Note that the regex pattern must
// 	// use a caret and a group e.g. /^(world)/.
// 	peekRegex(re) {
// 		if (!(this.x1 + 1 < this.chunk.length)) {
// 			this.offset = 0
// 			return false
// 		}
// 		const matches = this.chunk.slice(this.x1 + 1).match(re)
// 		if (!matches) {
// 			this.offset = 0
// 			return false
// 		}
// 		this.offset = must(matches[1]).length
// 		return true
// 	}
//
// 	// // TODO: Add peekCallback()?
// 	// peekCallback(callback) {
// 	// 	const ok = (
// 	// 		this.x1 + 1 < this.chunk.length &&
// 	// 		callback(this.chunk.slice(this.x1 + 1))
// 	// 	)
// 	// 	return ok
// 	// }
//
// 	// Advances one byte.
// 	advance() {
// 		// ...
// 	}
// 	reverse() {
// 		// ...
// 	}
// }

// TODO: Add support for naked URLs and URLs.

// const info = emojiTrie.atStart(substr)
// if (info && info.status === "fully-qualified") {
// 	elements.push({
// 		type: typeEnum.Emoji,
// 		description: info.description,
// 		children: info.emoji,
// 	})
// 	x1 += info.emoji.length - 1
// 	continue
// }

function parseInlineElements(chunk) {
	if (!chunk) {
		return null
	}

	const els = []

	let ch = ""
	let matches = null

	let x1 = 0
	let x2 = 0

	// TODO: Extract using a closure pattern?
	const emit = ({
		type,
		// syntax,
		re,
		children: originalChildren,
		...props
	}) => {
		matches = chunk.slice(x2).match(re)
		if (matches && matches.length === 4) {
			if (x2 > x1) {
				els.push(chunk.slice(x1, x2))
			}
			els.push({
				type,
				props: {
					...props,
					syntax: matches[1] !== matches[3]
						? [matches[1], matches[3]]
						: matches[1],
					children: matches[2],
				},
			})
			x2 += matches[1].length + matches[2].length +
				matches[3].length - 1
			x1 = x2 + 1
			return true
		}
		return false
	}

	for (; x2 < chunk.length; x2++) {
		ch = chunk[x2]

		switch (ch) {

		case "_":
			// ___strong em___
			if (emit({
				type: "strong em",
				re: /^(\_{3})([^\_]+)(\_{3})/,
			})) {
				// No-op
				continue
			}
			// __strong__
			if (emit({
				type: "strong",
				re: /^(\_{2})([^\*]+)(\_{2})/,
			})) {
				// No-op
				continue
			}
			// _em_
			if (emit({
				type: "em",
				re: /^(\_{1})([^\*]+)(\_{1})/,
			})) {
				// No-op
				continue
			}
			break

		case "*":
			// ***strong em***
			if (emit({
				type: "strong em",
				re: /^(\*{3})([^\*]+)(\*{3})/,
			})) {
				// No-op
				continue
			}
			// **strong**
			if (emit({
				type: "strong",
				re: /^(\*{2})([^\*]+)(\*{2})/,
			})) {
				// No-op
				continue
			}
			// *em*
			if (emit({
				type: "em",
				re: /^(\*{1})([^\*]+)(\*{1})/,
			})) {
				// No-op
				continue
			}
			break

		case "`":
			// `code`
			if (emit({
				type: "code",
				re: /^(\`{1})([^\`]+)(\`{1})/,
			})) {
				// No-op
				continue
			}
			break

		case "~":
			// ~~strike~~
			if (emit({
				type: "strike",
				re: /^(\~{2})([^\~]+)(\~{2})/,
			})) {
				// No-op
				continue
			}
			// ~code~
			if (emit({
				type: "code",
				re: /^(\~{1})([^\~]+)(\~{1})/,
			})) {
				// No-op
				continue
			}
			break

		// // (https?://)(www.)?(<URI>)?
		// //
		// // https://tools.ietf.org/html/rfc3986#:~:text=Page%2049
		// export const URLRegex = /^(https?:\/\/(?:www\.)?)([\w-.~:/?#[\]@!$&'()*+,;=%]+)?/

		// // (https?://)(www.)?(<URI>)?
		// //
		// // https://tools.ietf.org/html/rfc3986 [Page 49]
		// export const URLRegex = /^(https?:\/\/(?:www\.)?)([\w-.~:/?#[\]@!$&'()*+,;=%]+)?/
		// //
		// if (children.length && ascii.isPunctuation(children[children.length - 1]) && children[children.length - 1] !== "/") {
		// 	children = children.slice(0, children.length - 1)
		// }

		case "h":
			// http://
			// https://
			if (emit({
				type: "a",
				syntax: matches => [matches[1]],
				re: /^(https?:\/\/(?:www\.)?)([a-zA-Z0-9\u0021-\u002f\u003a-\u0040\u005b-\u0060\u007b-\u007e]*)/,
				children: matches => {
					if (/[\u0021-\u002f\u003a-\u0040\u005b-\u0060\u007b-\u007e]$/.test(matches[2])) {
						return matches[2].slice(0, matches[2].length - 1)
					}
					return matches[2]
				},
			})) {
				// No-op
				continue
			}
			break

		case "[":
			// [a](href)
			if (emit({
				type: "a",
				syntax: matches => ["[", `](${matches[2]})`],
				re: /^\[([^\]]*)\]\(([^\)]*)\)/,
			})) {
				// No-op
				continue
			}
			break


		default:
			// No-op
			break
		}
	}

	if (x2 > x1) {
		els.push(chunk.slice(x1, x2))
	}
	return els
}

export default parseInlineElements

// if (chunk.slice(x1 + 3) === "***") {
// 	// ...
// } else if (chunk.slice(x1 + 2) === "**") {
// 	// ...
// } else if (chunk.slice(x1 + 1) === "*") {
// 	// ...
// }

// const offset = chunk.slice(x1 + 1).indexOf("*")
// if (offset >= 0) {
// 	els.push({
// 		type: "em",
// 		props: {
// 			syntax: ch,
// 			children: chunk.slice(x1 + 1, x1 + 1 + offset),
// 		},
// 	})
// 	x1 = x1 + 1 + offset
// 	continue
// }
