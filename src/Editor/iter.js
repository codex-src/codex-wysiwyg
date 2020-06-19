import * as emojiTrie from "emoji-trie"
import * as utf8 from "lib/encoding/utf8"

// Returns the number of bytes iterated backwards.
export const rtl = {
	rune(textContent) {
		const emojiInfo = emojiTrie.atEnd(textContent)
		if (emojiInfo) {
			return emojiInfo.emoji
		}
		return utf8.atEnd(textContent)
	},
	word(textContent) {
		// Iterate spaces:
		let offset = textContent.length
		while (offset) {
			const rune = rtl.rune(textContent.slice(0, offset))
			if (!utf8.isHWhiteSpace(rune)) {
				// No-op
				break
			}
			offset -= rune.length
		}
		// Iterate alphanumerics OR non-alphanumerics based on
		// the next rune:
		const rune = rtl.rune(textContent.slice(0, offset))
		if (!rune) {
			// No-op; defer to end
		// Iterate alphanumerics:
		} else if (utf8.isAlphanum(rune)) {
			while (offset) {
				const rune = rtl.rune(textContent.slice(0, offset))
				if (!utf8.isAlphanum(rune) || utf8.isWhiteSpace(rune)) {
					// No-op
					break
				}
				offset -= rune.length
			}
		// Iterate non-alphanumerics:
		} else {
			while (offset) {
				const rune = rtl.rune(textContent.slice(0, offset))
				if (utf8.isAlphanum(rune) || utf8.isWhiteSpace(rune)) {
					// No-op
					break
				}
				offset -= rune.length
			}
		}
		if (offset === textContent.length && offset && textContent[offset - 1] === "\n") {
			offset--
		}
		return textContent.slice(offset)
	},
	line(textContent) {
		let offset = textContent.length
		while (offset) {
			const rune = rtl.rune(textContent.slice(0, offset))
			if (utf8.isVWhiteSpace(rune)) {
				// No-op
				break
			}
			offset -= rune.length
		}
		if (offset === textContent.length && offset && textContent[offset - 1] === "\n") {
			offset--
		}
		return textContent.slice(offset)
	},
}

// Returns the number of bytes iterated forwards.
export const ltr = {
	rune(textContent) {
		const emojiInfo = emojiTrie.atStart(textContent)
		if (emojiInfo) {
			return emojiInfo.emoji
		}
		return utf8.atStart(textContent)
	},
	word(textContent) {
		// Iterate spaces:
		let offset = 0
		while (offset < textContent.length) {
			const rune = ltr.rune(textContent.slice(offset))
			if (!utf8.isHWhiteSpace(rune)) {
				// No-op
				break
			}
			offset += rune.length
		}
		// Iterate alphanumerics OR non-alphanumerics based on
		// the next rune:
		const rune = ltr.rune(textContent.slice(offset))
		if (!rune) {
			// No-op; defer to end
		// Iterate alphanumerics:
		} else if (utf8.isAlphanum(rune)) {
			while (offset < textContent.length) {
				const rune = ltr.rune(textContent.slice(offset))
				if (!utf8.isAlphanum(rune) || utf8.isWhiteSpace(rune)) {
					// No-op
					break
				}
				offset += rune.length
			}
		// Iterate non-alphanumerics:
		} else {
			while (offset < textContent.length) {
				const rune = ltr.rune(textContent.slice(offset))
				if (utf8.isAlphanum(rune) || utf8.isWhiteSpace(rune)) {
					// No-op
					break
				}
				offset += rune.length
			}
		}
		if (!offset && offset < textContent.length && textContent[offset] === "\n") {
			offset++
		}
		return textContent.slice(0, offset)
	},
}
