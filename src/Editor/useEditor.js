import * as Cursors from "./Cursors"
import * as Elements from "./Elements"
import React from "react"
import useMethods from "use-methods"
import uuidv4 from "uuid/v4"

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
	 * Cursors
	 */
	select(cursors) {
		Object.assign(state, {
			cursors,
			collapsed: cursors[0] === cursors[1],
		})
	},
	collapse() {
		Object.assign(state, {
			cursors: [state.curors[0], state.cursors[0]],
			collapsed: true,
		})
	},
	/*
	 * Input
	 */
	input(element, cursors) {
		const x = state.elements.findIndex(each => each.key === cursors[0].key)
		if (x === -1) {
			throw new Error("dispatch.input: FIXME")
		}
		// Force a new key for <br> to text node:
		if (!state.elements[x].props.children.length) {
			const forcedKey = uuidv4()
			element.key = forcedKey
			cursors[0].key = forcedKey // Updates cursors[1] because references are shared
		}
		state.elements.splice(x, 1, element)
		this.select(cursors)
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
		cursors: [
			Cursors.construct(),
			Cursors.construct(),
		],
		collapsed: true,
		elements,
	}
	return state
}

function useEditor(children) {
	const elements = React.useMemo(() => {
		return Elements.parseReact(children)
	}, [children])
	return useMethods(methods, {}, () => init(elements))
}

export default useEditor
