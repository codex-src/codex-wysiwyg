import * as iter from "./iter"
import useMethods from "use-methods"
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
	removeBytes(countL, countR) {
		// Get the current UUID element:
		let { uuid, offset } = state.cursors[0]
		const uuidElement = state.elements.find(each => each.uuid === uuid)
		// Get the span offset (x) and decrement the start
		// cursor offset:
		let x = 0
		for (; x < uuidElement.spans.length; x++) {
			const content = readSyntheticSpan(uuidElement.spans[x])
			if (offset - content.length <= 0) {
				// No-op
				break
			}
			offset -= content.length
		}

		if (countL) {
			// console.log(countL, uuidElement.spans[x].content.slice(offset))
			uuidElement.spans[x].content = (
				uuidElement.spans[x].content.slice(0, offset - countL, offset) +
				uuidElement.spans[x].content.slice(offset)
			)
			state.cursors[0].offset--
			// if (typeof spans[x] === "string") {
			// 	spans[x] = "..."
			// 	if (!spans[x]) {
			// 		spans.splice(x, 1)
			// 	}
			// } else {
			// 	spans[x].content = "..."
			// 	if (!spans[x].content) {
			// 		spans.splice(x, 1)
			// 	}
			// }
		}
		this.collapse()


		// const ref = typeof uuidElement.spans[x] === "string" ? uuidElement.spans[x] : uuidElement.spans[x].content
		// console.log(ref)

		// console.log({ content: uuidElement.spans[x].slice(offset) })

		// let span = uuidElement.spans[0]
		// while (offset) { // TODO: Use offset >= 0?
		// 	span = uuidElement
		// }

		// while (countL) {
		// 	if (countL - )
		// }
	},
	backspaceRune() {
		const count = this.countBytes(iter.rtl, "rune", state)
		this.removeBytes(count, 0)
	},
	backspaceWord() {
		const count = this.countBytes(iter.rtl, "word", state)
		this.removeBytes(count, 0)
	},
	backspaceParagraph() {
		const count = this.countBytes(iter.rtl, "line", state)
		this.removeBytes(count, 0)
	},
	forwardBackspaceRune() {
		const count = this.countBytes(iter.ltr, "rune", state)
		this.removeBytes(0, count)
	},
	forwardBackspaceWord() {
		const count = this.countBytes(iter.ltr, "word", state)
		this.removeBytes(0, count)
	},
	/*
	 * Input
	 */
	write(characterData) {
		// TODO
	},
	input(uuid, spans, cursors) {
		const uuidElement = state.elements.find(each => each.uuid === uuid)
		// if (!uuidElement) {
		// 	throw new Error("dispatch.input: no such uuid element")
		// }
		uuidElement.spans = spans
		this.select(cursors)
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
