import * as emojiTrie from "emoji-trie"
import * as UTF8 from "lib/encoding/UTF8"

// Iterates a string right-to-left; returns the iterated
// substring.
export const rtl = {
	rune(str) {
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
			const rune = this.rune(str.slice(0, offset))
			if (!UTF8.isHWhiteSpace(rune)) {
				// No-op
				break
			}
			offset -= rune.length
		}
		// Iterate alphanumerics OR non-alphanumerics based on
		// the next rune:
		const rune = this.rune(str.slice(0, offset))
		if (!rune) {
			// No-op; defer
		// Iterate alphanumerics:
		} else if (UTF8.isAlphanum(rune)) {
			while (offset) {
				const rune = this.rune(str.slice(0, offset))
				if (!UTF8.isAlphanum(rune) || UTF8.isWhiteSpace(rune)) {
					// No-op
					break
				}
				offset -= rune.length
			}
		// Iterate non-alphanumerics:
		} else {
			while (offset) {
				const rune = this.rune(str.slice(0, offset))
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
			const rune = this.rune(str.slice(0, offset))
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

// Iterates a string left-to-right; returns the iterated
// substring.
export const ltr = {
	rune(str) {
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
			const rune = this.rune(str.slice(offset))
			if (!UTF8.isHWhiteSpace(rune)) {
				// No-op
				break
			}
			offset += rune.length
		}
		// Iterate alphanumerics OR non-alphanumerics based on
		// the next rune:
		const rune = this.rune(str.slice(offset))
		if (!rune) {
			// No-op; defer
		// Iterate alphanumerics:
		} else if (UTF8.isAlphanum(rune)) {
			while (offset < str.length) {
				const rune = this.rune(str.slice(offset))
				if (!UTF8.isAlphanum(rune) || UTF8.isWhiteSpace(rune)) {
					// No-op
					break
				}
				offset += rune.length
			}
		// Iterate non-alphanumerics:
		} else {
			while (offset < str.length) {
				const rune = this.rune(str.slice(offset))
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
