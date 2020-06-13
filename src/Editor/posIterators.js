import * as emojiTrie from "emoji-trie"
import * as utf8 from "lib/encoding/utf8"

// Returns the number of bytes to backspace.
export const backspace = {
	rune(data, pos) {
		let bytes = 0
		if (pos) {
			const substr = data.slice(0, pos)
			const rune = emojiTrie.atEnd(substr)?.emoji || utf8.atEnd(substr)
			bytes += rune.length
		}
		return bytes
	},
	word(data, pos) {
		// Iterate spaces:
		let x = pos
		while (x) {
			const substr = data.slice(0, x)
			const rune = emojiTrie.atEnd(substr)?.emoji || utf8.atEnd(substr)
			if (!utf8.isHWhiteSpace(rune)) {
				// No-op
				break
			}
			x -= rune.length
		}
		// Iterate alphanumerics OR non-alphanumerics based on
		// the next rune:
		const substr = data.slice(0, x)
		const rune = emojiTrie.atEnd(substr)?.emoji || utf8.atEnd(substr)
		if (!rune) {
			// No-op; defer to end
		// Iterate alphanumerics:
		} else if (utf8.isAlphanum(rune)) {
			while (x) {
				const substr = data.slice(0, x)
				const rune = emojiTrie.atEnd(substr)?.emoji || utf8.atEnd(substr)
				if (!utf8.isAlphanum(rune) || utf8.isWhiteSpace(rune)) {
					// No-op
					break
				}
				x -= rune.length
			}
		// Iterate non-alphanumerics:
		} else {
			while (x) {
				const substr = data.slice(0, x)
				const rune = emojiTrie.atEnd(substr)?.emoji || utf8.atEnd(substr)
				if (utf8.isAlphanum(rune) || utf8.isWhiteSpace(rune)) {
					// No-op
					break
				}
				x -= rune.length
			}
		}
		let bytes = pos - x
		if (!bytes && x - 1 >= 0 && data[x - 1] === "\n") {
			bytes++
		}
		return bytes
	},
	paragraph(data, pos) {
		let x = pos
		while (x) {
			const substr = data.slice(0, x)
			const rune = emojiTrie.atEnd(substr)?.emoji || utf8.atEnd(substr)
			if (utf8.isVWhiteSpace(rune)) {
				// No-op
				break
			}
			x -= rune.length
		}
		let bytes = pos - x
		if (!bytes && x - 1 >= 0 && data[x - 1] === "\n") {
			bytes++
		}
		return bytes
	},
}

// Returns the number of bytes to forward-backspace.
export const forwardBackspace = {
	rune(data, pos) {
		let bytes = 0
		if (pos < data.length) {
			const substr = data.slice(pos)
			const rune = emojiTrie.atStart(substr)?.emoji || utf8.atStart(substr)
			bytes += rune.length
		}
		return bytes
	},
	word(data, pos) {
		// Iterate spaces:
		let x = pos
		while (x < data.length) {
			const substr = data.slice(x)
			const rune = emojiTrie.atStart(substr) || utf8.atStart(substr)
			if (!utf8.isHWhiteSpace(rune)) {
				// No-op
				break
			}
			x += rune.length
		}
		// Iterate alphanumerics OR non-alphanumerics based on
		// the next rune:
		const substr = data.slice(x)
		const rune = emojiTrie.atStart(substr)?.emoji || utf8.atStart(substr)
		if (!rune) {
			// No-op; defer to end
		// Iterate alphanumerics:
		} else if (utf8.isAlphanum(rune)) {
			while (x < data.length) {
				const substr = data.slice(x)
				const rune = emojiTrie.atStart(substr)?.emoji || utf8.atStart(substr)
				if (!utf8.isAlphanum(rune) || utf8.isWhiteSpace(rune)) {
					// No-op
					break
				}
				x += rune.length
			}
		// Iterate non-alphanumerics:
		} else {
			while (x < data.length) {
				const substr = data.slice(x)
				const rune = emojiTrie.atStart(substr)?.emoji || utf8.atStart(substr)
				if (utf8.isAlphanum(rune) || utf8.isWhiteSpace(rune)) {
					// No-op
					break
				}
				x += rune.length
			}
		}
		let bytes = x - pos
		if (!bytes && x < data.length && data[x] === "\n") {
			bytes++
		}
		return bytes
	},
}
