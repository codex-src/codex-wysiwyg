import * as Elements from "./Elements"
import * as Iterators from "./Iterators"
import * as Selection from "./Selection"
import React from "react"
import shortUUID from "lib/shortUUID"
import useMethods from "use-methods"

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
			collapsed: selection[0] === selection[1],
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

		// Reads an array of spans.
		const readSpans = spans => {
			const reducer = (acc, each) => acc + each.props.children
			return spans.reduce(reducer, "")
		}

		// Computes the element (elemOffset), span (spanOffset),
		// and character offsets (charOffset).
		const computeOffsets = (elements, { key, offset }) => {
			const elemOffset = elements.findIndex(each => each.key === key)
			if (elemOffset === -1) {
				throw new Error("dispatch.backspaceRune: FIXME")
			}

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

			// TODO
			const nodeOffset = 0
			return [elemOffset, nodeOffset, spanOffset, charOffset]
		}

		const offs1 = computeOffsets(state.elements, state.selection[0])

		const textContent = readSpans(state.elements[offs1[0]].props.children)
		const runes = Iterators.rtl.rune(textContent.slice(0, state.selection[0].offset))

		let offs2 = offs1
		if (!(offs1[0] && !offs1[1] && !offs1[2] && !offs1[3])) {
			offs2 = computeOffsets(state.elements, {
				...state.selection[0],
				offset: state.selection[0].offset - runes.length,
			})
		} else {
			offs2 = computeOffsets(state.elements, {
				key: state.elements[offs1[0] - 1].key,
				offset: readSpans(state.elements[offs1[0] - 1].props.children).length,
			})
		}

		console.log(offs1, offs2)

		// console.log(state.elements[startOffsets[0]].props.children.reduce((acc, each) => acc + each.props.children, "")
	},
	backspaceWord() {
		console.log("backspaceWord")
	},
	backspaceLine() {
		console.log("backspaceLine")
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
