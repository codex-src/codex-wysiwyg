import * as iter from "./iter"
import useMethods from "use-methods"
import { newCursor } from "./cursors"

// Reads a synthetic UUID element.
function readSyntheticUUIDElement(uuidElement) {
	const reducer = (acc, span) => {
		if (typeof span === "string") {
			return acc + span
		}
		return acc + span.content
	}
	return uuidElement.spans.reduce(reducer, "")
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
	/*
	 * Backspace
	 */
	internalBackspaceHandler(iterator, boundary, state) {
		let count = 0
		if (!state.cursors.collapsed) {
			return count
		}
		const { uuid, offset } = state.cursors[0]
		const x = state.elements.findIndex(each => each.uuid === uuid)
		count = iterator[boundary](readSyntheticUUIDElement(state.elements[x]), offset)
		if (!count && ((iterator === iter.rtl && x) || (iterator === iter.ltr && x + 1 < state.elements.length))) {
			count++
		}
		return count
	},
	backspaceRune() {
		const count = this.internalBackspaceHandler(iter.rtl, "rune", state)
		console.log(count)
	},
	backspaceWord() {
		const count = this.internalBackspaceHandler(iter.rtl, "word", state)
		console.log(count)
	},
	backspaceParagraph() {
		const count = this.internalBackspaceHandler(iter.rtl, "line", state)
		console.log(count)
	},
	forwardBackspaceRune() {
		const count = this.internalBackspaceHandler(iter.ltr, "rune", state)
		console.log(count)
	},
	forwardBackspaceWord() {
		const count = this.internalBackspaceHandler(iter.ltr, "word", state)
		console.log(count)
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
		elements: initialState,
	}
	return state
}

function useEditor(initialState) {
	return useMethods(methods, {}, () => init(initialState))
}

export default useEditor
