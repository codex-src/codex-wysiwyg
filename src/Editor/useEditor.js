import * as iter from "./iter"
import useMethods from "use-methods"
import uuidv4 from "uuid/v4"
import { newCursor } from "./cursors"

// Reads a synthetic UUID element.
function readSyntheticUUIDElement(uuidElement) {
	const reducer = (acc, each) => {
		if (typeof each === "string") {
			return acc + each
		}
		return acc + each.content
	}
	return uuidElement.spans.reduce(reducer, "")
}

// Reads a synthetic span.
function readSyntheticSpan(span) {
	if (typeof span === "string") {
		return span
	}
	return span.content
}

const methods = state => ({
	/*
	 * Cursors
	 */
	focus() {
		state.focused = true
	},
	blur() {
		state.focused = false
	},
	select(cursors) {
		Object.assign(state.cursors, {
			...cursors,
			collapsed: cursors[0] === cursors[1],
		})
	},
	// Collapses the start and end cursors.
	collapse() {
		Object.assign(state.cursors, {
			...[state.cursors[0], state.cursors[0]],
			collapsed: true,
		})
	},
	/*
	 * Backspace
	 */
	// Counts the number of bytes needed to iterate a boundary
	// such as "rune", "word", etc.
	countBytes(iterator, boundary, state) {
		if (!state.cursors.collapsed) {
			return 0
		}
		const { uuid, offset } = state.cursors[0]
		const x = state.elements.findIndex(each => each.uuid === uuid)
		let count = iterator[boundary](readSyntheticUUIDElement(state.elements[x]), offset)
		if (!count && ((iterator === iter.rtl && x) || (iterator === iter.ltr && x + 1 < state.elements.length))) {
			count++
		}
		return count
	},
	// Removes a number of bytes (countL and countR).
	removeByteCounts(countL, countR) {

		// Get the current UUID element:
		let { uuid, offset } = state.cursors[0]
		const uuidElement = state.elements.find(each => each.uuid === uuid)

		// Get the span (x) and character offset (offset):
		let x = 0
		for (; x < uuidElement.spans.length; x++) {
			const content = readSyntheticSpan(uuidElement.spans[x])
			if (offset - content.length <= 0) {
				// No-op
				break
			}
			offset -= content.length
		}

		// Removes a number of bytes from a span at an offset.
		const removeByteCountFromSpan = (uuidElement, x, offset, count) => {
			if (count > offset) {
				count = offset
			}
			uuidElement.spans[x].content = (
				uuidElement.spans[x].content.slice(0, offset - count) +
				uuidElement.spans[x].content.slice(offset)
			)
			if (!uuidElement.spans[x].content) {
				uuidElement.spans.splice(x, 1)
			}
			return count
		}

		const decremented = countL
		while (countL) {
			countL -= removeByteCountFromSpan(uuidElement, x, offset, countL)
			if (x - 1 >= 0) {
				if (typeof uuidElement.spans[x - 1] === "string") {
					offset = uuidElement.spans[x - 1].length
				} else {
					offset = uuidElement.spans[x - 1].content.length
				}
				x--
			}
		}

		state.cursors[0].offset -= decremented
		this.collapse()

	},
	backspaceRune() {
		if (!state.cursors.collapsed) {
			// TODO
			return
		}
		const count = this.countBytes(iter.rtl, "rune", state)
		this.removeByteCounts(count, 0)
	},
	backspaceWord() {
		if (!state.cursors.collapsed) {
			// TODO
			return
		}
		const count = this.countBytes(iter.rtl, "word", state)
		this.removeByteCounts(count, 0)
	},
	backspaceParagraph() {
		if (!state.cursors.collapsed) {
			// TODO
			return
		}
		const count = this.countBytes(iter.rtl, "line", state)
		this.removeByteCounts(count, 0)
	},
	forwardBackspaceRune() {
		if (!state.cursors.collapsed) {
			// TODO
			return
		}
		const count = this.countBytes(iter.ltr, "rune", state)
		this.removeByteCounts(0, count)
	},
	forwardBackspaceWord() {
		if (!state.cursors.collapsed) {
			// TODO
			return
		}
		const count = this.countBytes(iter.ltr, "word", state)
		this.removeByteCounts(0, count)
	},
	/*
	 * Input
	 */
	write(characterData) {
		// TODO
	},
	input(uuid, spans, cursor) {
		const uuidElement = state.elements.find(each => each.uuid === uuid)
		if (!uuidElement.spans.length) {
			uuidElement.uuid = uuidv4()
			cursor.uuid = uuidElement.uuid
		}
		uuidElement.spans = spans
		this.select([cursor, cursor])
	},
})

function init(initialState) {
	const state = {
		focused: false,
		cursors: {
			0: newCursor(),
			1: newCursor(),
			collapsed: true,
		},
		// TODO: Rename elements to uuidElements?
		elements: initialState,
	}
	return state
}

function useEditor(initialState) {
	return useMethods(methods, {}, () => init(initialState))
}

export default useEditor
