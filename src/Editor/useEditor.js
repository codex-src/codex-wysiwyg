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

		// const elementOffset = state.elements.findIndex(each => each.key === state.selection[0].key)
		// if (elementOffset === -1) {
		// 	throw new Error("dispatch.backspaceRune: FIXME")
		// }

		// Compute offsets:
		const offsets = computeOffsets(state.elements, state.selection[0])
		console.log(offsets)

		// Compute runes:
		const textContent = state.elements[offsets[0]].props.children.map(each => each.props.children).join("")
		const runes = Iterators.rtl.rune(textContent.slice(0, state.selection[0].offset))

		// Compute new offsets:
		const newOffsets = computeOffsets(state.elements, { ...state.selection[0], offset: state.selection[0].offset - runes.length })
		console.log(newOffsets)

		// console.log(state.elements[offsets[0]].props.children.reduce((acc, each) => acc + each.props.children, "")
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
