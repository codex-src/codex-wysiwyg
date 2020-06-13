import * as iter from "./iter"
import useMethods from "use-methods"
import { newCursor } from "./cursors"

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
	backspaceRune() {
		console.log("backspaceRune")

		// if (!state.cursors.collapsed) {
		// 	// ...
		// 	return
		// }

		// TODO: Extract?
		const reducer = (acc, span) => {
			if (typeof span === "string") {
				return acc + span
			}
			return acc + span.content
		}

		const uuidElement = state.elements.find(each => each.uuid === state.cursors[0].uuid)
		const content = uuidElement.spans.reduce(reducer, "")
		const bytes = iter.backwards.rune(content, state.cursors[0].offset)
		// this.dropBytes(bytes, 0)
	},
	forwardBackspaceRune() {
		console.log("forwardBackspaceRune")

		// if (!state.cursors.collapsed) {
		// 	this.write("")
		// 	return
		// }
		// // TODO: Change posIterators API to return
		// // [dropL, dropR]?
		// const bytes = posIterators.forwardBackspace.rune(state.data, state.pos1.pos)
		// this.dropBytes(0, bytes)
	},
	backspaceWord() {
		console.log("backspaceWord")

		// if (!state.cursors.collapsed) {
		// 	this.write("")
		// 	return
		// }
		// // TODO: Change posIterators API to return
		// // [dropL, dropR]?
		// const bytes = posIterators.backspace.word(state.data, state.pos1.pos)
		// this.dropBytes(bytes, 0)
	},
	forwardBackspaceWord() {
		console.log("forwardBackspaceWord")

		// if (!state.cursors.collapsed) {
		// 	this.write("")
		// 	return
		// }
		// // TODO: Change posIterators API to return
		// // [dropL, dropR]?
		// const bytes = posIterators.forwardBackspace.word(state.data, state.pos1.pos)
		// this.dropBytes(0, bytes)
	},
	backspaceParagraph() {
		console.log("backspaceParagraph")

		// if (!state.cursors.collapsed) {
		// 	this.write("")
		// 	return
		// }
		// // TODO: Change posIterators API to return
		// // [dropL, dropR]?
		// const bytes = posIterators.backspace.paragraph(state.data, state.pos1.pos)
		// this.dropBytes(bytes, 0)
	},
	/*
	 * Input
	 */
	// write() {
	// 	// ...
	// }
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
