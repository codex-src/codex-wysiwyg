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

function parseInlineElements(chunk) {
	if (!chunk) {
		return null
	}

	const els = []

	let ch = ""
	let matches = null

	let x1 = 0
	let x2 = 0
	for (; x2 < chunk.length; x2++) {
		ch = chunk[x2]

		switch (ch) {
		case "*":
			// ***strong em***
			matches = chunk.slice(x2).match(/^\*{3}([^*]+)\*{3}/)
			if (matches && matches.length === 2) {
				if (x2 > x1) {
					els.push(chunk.slice(x1, x2))
				}
				els.push({
					type: "strong",
					props: {
						syntax: ch.repeat(3),
						children: matches[1],
					},
				})
				x2 += (ch.repeat(1) + matches[1] + ch.repeat(1)).length - 1
				x1 = x2 + 1
				continue
			}
			// **strong**
			matches = chunk.slice(x2).match(/^\*{2}([^*]+)\*{2}/)
			if (matches && matches.length === 2) {
				if (x2 > x1) {
					els.push(chunk.slice(x1, x2))
				}
				els.push({
					type: "strong",
					props: {
						syntax: ch.repeat(2),
						children: matches[1],
					},
				})
				x2 += (ch.repeat(2) + matches[1] + ch.repeat(2)).length - 1
				x1 = x2 + 1
				continue
			}
			// **em**
			matches = chunk.slice(x2).match(/^\*{1}([^*]+)\*{1}/)
			if (matches && matches.length === 2) {
				if (x2 > x1) {
					els.push(chunk.slice(x1, x2))
				}
				els.push({
					type: "em",
					props: {
						syntax: ch.repeat(1),
						children: matches[1],
					},
				})
				x2 += (ch.repeat(1) + matches[1] + ch.repeat(1)).length - 1
				x1 = x2 + 1
				continue
			}

			break
		default:
			// No-op
			break
		}

		// // TOOD: This can probably be heavily optimized.
		// if (!els.length || (els.length && typeof els[els.length - 1] !== "string")) {
		// 	els.push(ch)
		// 	continue
		// }
		// els[els.length - 1] += ch
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
