import * as emojiTrie from "emoji-trie"
import * as UTF8 from "lib/encoding/UTF8"

// Scans the next right-to-left rune.
export function rune(str) {
	const info = emojiTrie.atEnd(str)
	if (info) {
		return info.emoji
	}
	return UTF8.atEnd(str)
}

// Scans the next right-to-left word.
export function word(str) {
	// Spaces:
	let offset = str.length
	while (offset) {
		const rn = rune(str.slice(0, offset))
		if (!UTF8.isHWhiteSpace(rn)) {
			// No-op
			break
		}
		offset -= rn.length
	}
	// Alphanumerics OR non-alphanumerics:
	const rn = rune(str.slice(0, offset))
	if (!rn) {
		// No-op; defer
	// Alphanumerics:
	} else if (UTF8.isAlphanum(rn)) {
		while (offset) {
			const rn = rune(str.slice(0, offset))
			if (!UTF8.isAlphanum(rn) || UTF8.isWhiteSpace(rn)) {
				// No-op
				break
			}
			offset -= rn.length
		}
	// Non-alphanumerics:
	} else {
		while (offset) {
			const rn = rune(str.slice(0, offset))
			if (UTF8.isAlphanum(rn) || UTF8.isWhiteSpace(rn)) {
				// No-op
				break
			}
			offset -= rn.length
		}
	}
	if (offset === str.length && offset && str[offset - 1] === "\n") {
		offset--
	}
	return str.slice(offset)
}

// Scans the next right-to-left line.
export function line(str) {
	let offset = str.length
	while (offset) {
		const rn = rune(str.slice(0, offset))
		if (UTF8.isVWhiteSpace(rn)) {
			// No-op
			break
		}
		offset -= rn.length
	}
	if (offset === str.length && offset && str[offset - 1] === "\n") {
		offset--
	}
	return str.slice(offset)
}
