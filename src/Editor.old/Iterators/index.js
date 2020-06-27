import * as emojiTrie from "emoji-trie"
import * as UTF8 from "lib/encoding/UTF8"

// Right-to-left iterator; returns a substring.
export const RTL = {
	rune(str) {
		// return emojiTrie.atEnd(str)?.emoji || UTF8.atEnd(str)
		const info = emojiTrie.atEnd(str)
		if (info) {
			return info.emoji
		}
		return UTF8.atEnd(str)
	},
	word(str) {
		// Iterate spaces:
		let offset = str.length
		while (offset) {
			const rune = RTL.rune(str.slice(0, offset))
			if (!UTF8.isHWhiteSpace(rune)) {
				// No-op
				break
			}
			offset -= rune.length
		}
		// Iterate alphanumerics OR non-alphanumerics based on
		// the next rune:
		const rune = RTL.rune(str.slice(0, offset))
		if (!rune) {
			// No-op; defer to end
		// Iterate alphanumerics:
		} else if (UTF8.isAlphanum(rune)) {
			while (offset) {
				const rune = RTL.rune(str.slice(0, offset))
				if (!UTF8.isAlphanum(rune) || UTF8.isWhiteSpace(rune)) {
					// No-op
					break
				}
				offset -= rune.length
			}
		// Iterate non-alphanumerics:
		} else {
			while (offset) {
				const rune = RTL.rune(str.slice(0, offset))
				if (UTF8.isAlphanum(rune) || UTF8.isWhiteSpace(rune)) {
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
			const rune = RTL.rune(str.slice(0, offset))
			if (UTF8.isVWhiteSpace(rune)) {
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

// Left-to-right iterator; returns a substring.
export const LTR = {
	rune(str) {
		// return emojiTrie.atStart(str)?.emoji || UTF8.atStart(str)
		const info = emojiTrie.atStart(str)
		if (info) {
			return info.emoji
		}
		return UTF8.atStart(str)
	},
	word(str) {
		// Iterate spaces:
		let offset = 0
		while (offset < str.length) {
			const rune = LTR.rune(str.slice(offset))
			if (!UTF8.isHWhiteSpace(rune)) {
				// No-op
				break
			}
			offset += rune.length
		}
		// Iterate alphanumerics OR non-alphanumerics based on
		// the next rune:
		const rune = LTR.rune(str.slice(offset))
		if (!rune) {
			// No-op; defer to end
		// Iterate alphanumerics:
		} else if (UTF8.isAlphanum(rune)) {
			while (offset < str.length) {
				const rune = LTR.rune(str.slice(offset))
				if (!UTF8.isAlphanum(rune) || UTF8.isWhiteSpace(rune)) {
					// No-op
					break
				}
				offset += rune.length
			}
		// Iterate non-alphanumerics:
		} else {
			while (offset < str.length) {
				const rune = LTR.rune(str.slice(offset))
				if (UTF8.isAlphanum(rune) || UTF8.isWhiteSpace(rune)) {
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
