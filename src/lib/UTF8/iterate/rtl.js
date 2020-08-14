import * as emojiTrie from "emoji-trie"
import testAlphanum from "lib/UTF8/testAlphanum"
import { atEnd } from "lib/UTF8/runes"

import {
	testHWhitespace,
	testVWhitespace,
	testWhitespace,
} from "lib/UTF8/testWhitespace"

// Iterates the next right-to-left rune.
export function rune(str) {
	const info = emojiTrie.atEnd(str)
	if (info) {
		return info.emoji
	}
	return atEnd(str)
}

// Iterates the next right-to-left word.
export function word(str) {
	// Spaces:
	let offset = str.length
	while (offset) {
		const rn = rune(str.slice(0, offset))
		if (!testHWhitespace(rn)) {
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
	} else if (testAlphanum(rn)) {
		while (offset) {
			const rn = rune(str.slice(0, offset))
			if (!testAlphanum(rn) || testWhitespace(rn)) {
				// No-op
				break
			}
			offset -= rn.length
		}
	// Non-alphanumerics:
	} else {
		while (offset) {
			const rn = rune(str.slice(0, offset))
			if (testAlphanum(rn) || testWhitespace(rn)) {
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

// Iterates the next right-to-left line.
export function line(str) {
	let offset = str.length
	while (offset) {
		const rn = rune(str.slice(0, offset))
		if (testVWhitespace(rn)) {
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
