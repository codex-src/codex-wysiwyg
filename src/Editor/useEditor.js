import * as Elements from "./Elements"
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
		// ...
	},
	backspaceWord() {
		// ...
	},
	backspaceLine() {
		// ...
	},
	forwardBackspaceRune() {
		// ...
	},
	forwardBackspaceWord() {
		// ...
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
