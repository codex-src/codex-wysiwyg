import * as emojiTrie from "emoji-trie"
import testAlphanum from "lib/UTF8/testAlphanum"
import { atStart } from "lib/UTF8/runes"

import { // Unsorted
	testHWhitespace,
	testWhitespace,
} from "lib/UTF8/testWhitespace"

// Iterates the next left-to-right rune.
export function rune(str) {
	const info = emojiTrie.atStart(str)
	if (info) {
		return info.emoji
	}
	return atStart(str)
}

// Iterates the next left-to-right word.
export function word(str) {
	// Spaces:
	let offset = 0
	while (offset < str.length) {
		const rn = rune(str.slice(offset))
		if (!testHWhitespace(rn)) {
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
	} else if (testAlphanum(rn)) {
		while (offset < str.length) {
			const rn = rune(str.slice(offset))
			if (!testAlphanum(rn) || testWhitespace(rn)) {
				// No-op
				break
			}
			offset += rn.length
		}
	// Non-alphanumerics:
	} else {
		while (offset < str.length) {
			const rn = rune(str.slice(offset))
			if (testAlphanum(rn) || testWhitespace(rn)) {
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
