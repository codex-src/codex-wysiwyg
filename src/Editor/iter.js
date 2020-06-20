import * as emojiTrie from "emoji-trie"
import * as utf8 from "lib/encoding/utf8"

// Returns the number of bytes iterated backwards.
export const rtl = {
	rune(str) {
		const info = emojiTrie.atEnd(str)
		if (info) {
			return info.emoji
		}
		return utf8.atEnd(str)
	},
	word(str) {
		// Iterate spaces:
		let offset = str.length
		while (offset) {
			const rune = rtl.rune(str.slice(0, offset))
			if (!utf8.isHWhiteSpace(rune)) {
				// No-op
				break
			}
			offset -= rune.length
		}
		// Iterate alphanumerics OR non-alphanumerics based on
		// the next rune:
		const rune = rtl.rune(str.slice(0, offset))
		if (!rune) {
			// No-op; defer to end
		// Iterate alphanumerics:
		} else if (utf8.isAlphanum(rune)) {
			while (offset) {
				const rune = rtl.rune(str.slice(0, offset))
				if (!utf8.isAlphanum(rune) || utf8.isWhiteSpace(rune)) {
					// No-op
					break
				}
				offset -= rune.length
			}
		// Iterate non-alphanumerics:
		} else {
			while (offset) {
				const rune = rtl.rune(str.slice(0, offset))
				if (utf8.isAlphanum(rune) || utf8.isWhiteSpace(rune)) {
					// No-op
					break
				}
				offset -= rune.length
			}
		}
		if (offset === str.length && offset && str[offset - 1] === "\n") {
			offset--
		}
		return str.slice(offset)
	},
	line(str) {
		let offset = str.length
		while (offset) {
			const rune = rtl.rune(str.slice(0, offset))
			if (utf8.isVWhiteSpace(rune)) {
				// No-op
				break
			}
			offset -= rune.length
		}
		if (offset === str.length && offset && str[offset - 1] === "\n") {
			offset--
		}
		return str.slice(offset)
	},
}

// Returns the number of bytes iterated forwards.
export const ltr = {
	rune(str) {
		const info = emojiTrie.atStart(str)
		if (info) {
			return info.emoji
		}
		return utf8.atStart(str)
	},
	word(str) {
		// Iterate spaces:
		let offset = 0
		while (offset < str.length) {
			const rune = ltr.rune(str.slice(offset))
			if (!utf8.isHWhiteSpace(rune)) {
				// No-op
				break
			}
			offset += rune.length
		}
		// Iterate alphanumerics OR non-alphanumerics based on
		// the next rune:
		const rune = ltr.rune(str.slice(offset))
		if (!rune) {
			// No-op; defer to end
		// Iterate alphanumerics:
		} else if (utf8.isAlphanum(rune)) {
			while (offset < str.length) {
				const rune = ltr.rune(str.slice(offset))
				if (!utf8.isAlphanum(rune) || utf8.isWhiteSpace(rune)) {
					// No-op
					break
				}
				offset += rune.length
			}
		// Iterate non-alphanumerics:
		} else {
			while (offset < str.length) {
				const rune = ltr.rune(str.slice(offset))
				if (utf8.isAlphanum(rune) || utf8.isWhiteSpace(rune)) {
					// No-op
					break
				}
				offset += rune.length
			}
		}
		if (!offset && offset < str.length && str[offset] === "\n") {
			offset++
		}
		return str.slice(0, offset)
	},
}
