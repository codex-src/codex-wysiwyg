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
		const collapsed = cursors[0] === cursors[1]
		Object.assign(state, {
			cursors,
			collapsed,
		})
	},
	/*
	 * Backspace
	 */
	backspaceRune() {
		console.log("backspaceRune")
		const uuidElement = state.elements.find(each => each.uuid === state.cursors[0].uuid)
		// if (!uuidElement) {
		// 	throw new Error("dispatch.backspaceRune: no such uuid element")
		// }
		const r = (acc, each) => acc + (typeof each === "string" ? each : each.content)
		const content = uuidElement.spans.reduce(r, "")

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
		cursors: [
			newCursor(),
			newCursor(),
		],
		collapsed: true,
		elements: initialState,
	}
	return state
}

function useEditor(initialState) {
	return useMethods(methods, {}, () => init(initialState))
}

export default useEditor
