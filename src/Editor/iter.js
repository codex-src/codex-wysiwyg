import * as emojiTrie from "emoji-trie"
import * as utf8 from "lib/encoding/utf8"

// Returns the number of bytes (count) iterated backwards.
export const rtl = {
	rune(content, offset) {
		let count = 0
		if (offset) {
			const substr = content.slice(0, offset)
			const rune = emojiTrie.atEnd(substr)?.emoji || utf8.atEnd(substr)
			count += rune.length
		}
		return count
	},
	word(content, offset) {
		// Iterate spaces:
		let x = offset
		while (x) {
			const substr = content.slice(0, x)
			const rune = emojiTrie.atEnd(substr)?.emoji || utf8.atEnd(substr)
			if (!utf8.isHWhiteSpace(rune)) {
				// No-op
				break
			}
			x -= rune.length
		}
		// Iterate alphanumerics OR non-alphanumerics based on
		// the next rune:
		const substr = content.slice(0, x)
		const rune = emojiTrie.atEnd(substr)?.emoji || utf8.atEnd(substr)
		if (!rune) {
			// No-op; defer to end
		// Iterate alphanumerics:
		} else if (utf8.isAlphanum(rune)) {
			while (x) {
				const substr = content.slice(0, x)
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
				const substr = content.slice(0, x)
				const rune = emojiTrie.atEnd(substr)?.emoji || utf8.atEnd(substr)
				if (utf8.isAlphanum(rune) || utf8.isWhiteSpace(rune)) {
					// No-op
					break
				}
				x -= rune.length
			}
		}
		let count = offset - x
		if (!count && x - 1 >= 0 && content[x - 1] === "\n") {
			count++
		}
		return count
	},
	line(content, offset) {
		let x = offset
		while (x) {
			const substr = content.slice(0, x)
			const rune = emojiTrie.atEnd(substr)?.emoji || utf8.atEnd(substr)
			if (utf8.isVWhiteSpace(rune)) {
				// No-op
				break
			}
			x -= rune.length
		}
		let count = offset - x
		if (!count && x - 1 >= 0 && content[x - 1] === "\n") {
			count++
		}
		return count
	},
}

// Returns the number of bytes (count) iterated forwards.
export const ltr = {
	rune(content, offset) {
		let count = 0
		if (offset < content.length) {
			const substr = content.slice(offset)
			const rune = emojiTrie.atStart(substr)?.emoji || utf8.atStart(substr)
			count += rune.length
		}
		return count
	},
	word(content, offset) {
		// Iterate spaces:
		let x = offset
		while (x < content.length) {
			const substr = content.slice(x)
			const rune = emojiTrie.atStart(substr) || utf8.atStart(substr)
			if (!utf8.isHWhiteSpace(rune)) {
				// No-op
				break
			}
			x += rune.length
		}
		// Iterate alphanumerics OR non-alphanumerics based on
		// the next rune:
		const substr = content.slice(x)
		const rune = emojiTrie.atStart(substr)?.emoji || utf8.atStart(substr)
		if (!rune) {
			// No-op; defer to end
		// Iterate alphanumerics:
		} else if (utf8.isAlphanum(rune)) {
			while (x < content.length) {
				const substr = content.slice(x)
				const rune = emojiTrie.atStart(substr)?.emoji || utf8.atStart(substr)
				if (!utf8.isAlphanum(rune) || utf8.isWhiteSpace(rune)) {
					// No-op
					break
				}
				x += rune.length
			}
		// Iterate non-alphanumerics:
		} else {
			while (x < content.length) {
				const substr = content.slice(x)
				const rune = emojiTrie.atStart(substr)?.emoji || utf8.atStart(substr)
				if (utf8.isAlphanum(rune) || utf8.isWhiteSpace(rune)) {
					// No-op
					break
				}
				x += rune.length
			}
		}
		let count = x - offset
		if (!count && x < content.length && content[x] === "\n") {
			count++
		}
		return count
	},
}
