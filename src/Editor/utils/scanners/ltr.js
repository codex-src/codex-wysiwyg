import * as emojiTrie from "emoji-trie"
import * as UTF8 from "lib/encoding/UTF8"

// Scans a rune, left-to-right.
export function rune(str) {
	const info = emojiTrie.atStart(str)
	if (info) {
		return info.emoji
	}
	return UTF8.atStart(str)
}

// Scans a word, left-to-right.
export function word(str) {
	// Spaces:
	let offset = 0
	while (offset < str.length) {
		const rn = rune(str.slice(offset))
		if (!UTF8.isHWhiteSpace(rn)) {
			// No-op
			break
		}
		offset += rn.length
	}
	// Alphanumerics OR non-alphanumerics:
	const rn = rune(str.slice(offset))
	if (!rn) {
		// No-op; defer
	// Alphanumerics:
	} else if (UTF8.isAlphanum(rn)) {
		while (offset < str.length) {
			const rn = rune(str.slice(offset))
			if (!UTF8.isAlphanum(rn) || UTF8.isWhiteSpace(rn)) {
				// No-op
				break
			}
			offset += rn.length
		}
	// Non-alphanumerics:
	} else {
		while (offset < str.length) {
			const rn = rune(str.slice(offset))
			if (UTF8.isAlphanum(rn) || UTF8.isWhiteSpace(rn)) {
				// No-op
				break
			}
			offset += rn.length
		}
	}
	if (!offset && offset < str.length && str[offset] === "\n") {
		offset++
	}
	return str.slice(0, offset)
}
