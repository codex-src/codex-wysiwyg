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
	select(startCursor, endCursor) {
		Object.assign(state, {
			startCursor,
			endCursor,
			collapsed: startCursor === endCursor,
		})
	},
	/*
	 * Backspace
	 */
	backspaceRune() {
		console.log("backspaceRune")

		// TODO: Read the current - 1 through current spans and
		// pass data to posIterators

		// if (!state.collapsed) {
		// 	this.write("")
		// 	return
		// }
		// // TODO: Change posIterators API to return
		// // [dropL, dropR]?
		// const bytes = posIterators.backspace.rune(state.data, state.pos1.pos)
		// this.dropBytes(bytes, 0)
	},
	forwardBackspaceRune() {
		console.log("forwardBackspaceRune")

		// if (!state.collapsed) {
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

		// if (!state.collapsed) {
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

		// if (!state.collapsed) {
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

		// if (!state.collapsed) {
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
	input(uuid, spans, ...cursors) {
		const element = state.elements.find(each => each.uuid === uuid)
		if (!element) {
			throw new Error("dispatch.input: no such element")
		}
		element.spans = spans
		this.select(...cursors)
	},
})

function init(initialState) {
	const state = {
		focused: false,
		startCursor: newCursor(),
		endCursor: newCursor(),
		collapsed: true,
		elements: initialState,
	}
	return state
}

function useEditor(initialState) {
	return useMethods(methods, {}, () => init(initialState))
}

export default useEditor
