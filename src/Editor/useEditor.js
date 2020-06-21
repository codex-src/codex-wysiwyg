import * as Elements from "./Elements"
import * as Iterators from "./Iterators"
import * as Selection from "./Selection"
import * as Spans from "./Spans"
import React from "react"
import shortUUID from "lib/shortUUID"
import useMethods from "use-methods"

// Computes offsets based on a synthetic cursor.
function computeOffsets(elements, { key, offset }) {
	const elemOffset = elements.findIndex(each => each.key === key)
	if (elemOffset === -1) {
		throw new Error("computeOffsets: FIXME")
	}
	// TODO: Add support for non-standard types here?
	const nodeOffset = 0
	// Shorthand:
	const spans = elements[elemOffset].props.children
	let spanOffset = 0
	let charOffset = offset
	for (; spanOffset < spans.length; spanOffset++) {
		if (charOffset - spans[elemOffset].props.children.length <= 0) {
			// No-op
			break
		}
		charOffset -= spans[elemOffset].props.children.length
	}
	return [elemOffset, nodeOffset, spanOffset, charOffset]
}

// Computes a set of offsets for a backspace operation.
function computeOffsetsForBackspace(elements, selection, iterator) {
	let offs1 = computeOffsets(elements, selection[0])
	const offs2 = computeOffsets(elements, selection[1])
	if (Selection.areEqual(...selection)) {
		// Backspace on text:
		if (!(offs1[0] && !offs1[1] && !offs1[2] && !offs1[3])) {
			const substr = Spans.textContent(elements[offs1[0]].props.children).slice(0, selection[0].offset)
			offs1 = computeOffsets(elements, {
				...selection[0],
				offset: selection[0].offset - iterator(substr).length,
			})
		// Backspace on "\n":
		} else {
			offs1 = computeOffsets(elements, {
				key: elements[offs1[0] - 1].key,
				offset: Spans.textContent(elements[offs1[0] - 1].props.children).length,
			})
		}
	}
	return [offs1, offs2]
}

const methods = state => ({
	/*
	 * Focus
	 */
	focus() {
		state.focused = true
	},
	blur() {
		state.focused = false
	},
	/*
	 * Selection
	 */
	select(selection) {
		Object.assign(state, {
			selection,
			collapsed: Selection.areEqual(...selection),
		})
	},
	collapse() {
		Object.assign(state, {
			selection: [state.selection[0], state.selection[0]],
			collapsed: true,
		})
	},
	/*
	 * Input
	 */
	input(element, selection) {
		const x = state.elements.findIndex(each => each.key === selection[0].key)
		if (x === -1) {
			throw new Error("dispatch.input: FIXME")
		}
		// Force a new key for <br> to text node:
		if (!state.elements[x].props.children.length) {
			const forcedKey = shortUUID()
			element.key = forcedKey
			selection[0].key = forcedKey // Updates selection[1] because references are shared
		}
		state.elements.splice(x, 1, element)
		this.select(selection)
	},
	backspaceRune() {
		console.log("backspaceRune")
		console.log(computeOffsetsForBackspace(state.elements, state.selection, Iterators.rtl.rune))
	},
	backspaceWord() {
		console.log("backspaceWord")
		console.log(computeOffsetsForBackspace(state.elements, state.selection, Iterators.rtl.word))
	},
	backspaceLine() {
		console.log("backspaceLine")
		console.log(computeOffsetsForBackspace(state.elements, state.selection, Iterators.rtl.line))
	},
	forwardBackspaceRune() {
		console.log("forwardBackspaceRune")
	},
	forwardBackspaceWord() {
		console.log("forwardBackspaceWord")
	},
})

function init(elements) {
	const state = {
		focused: false,
		selection: [
			Selection.construct(),
			Selection.construct(),
		],
		collapsed: true,
		elements,
	}
	return state
}

function useEditor(children) {
	const elements = React.useMemo(() => {
		return Elements.parseFromReactElements(children)
	}, [children])
	return useMethods(methods, {}, () => init(elements))
}

export default useEditor
