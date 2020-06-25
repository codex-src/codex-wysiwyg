import * as Cursors from "./Cursors"
import * as Elements from "./Elements"
import backspace from "./backspace"
import must from "lib/must"
import newHashID from "lib/newHashID"
import React from "react"
import useMethods from "use-methods"

const methods = state => ({
	focus() {
		state.focused = true
	},
	blur() {
		state.focused = false
	},
	select(cursors) {
		state.cursors = cursors
	},
	input(element, collapsed) {
		// Force rerender on <br> to a text node:
		const y = must(state.elements.findIndex(each => each.key === collapsed[0].key))
		if (!state.elements[y].props.children.length) {
			const forcedKey = newHashID(8)
			element.key = forcedKey
			collapsed[0].key = forcedKey // Updates cursor[1].key because references are shared
		}
		state.elements.splice(y, 1, element)
		this.select(collapsed)
		this.render()
	},
	backspaceRTLRune() {
		const collapsed = backspace(state.elements, state.cursors, "rtl", "rune")
		this.select(collapsed)
		this.render()
	},
	backspaceRTLWord() {
		const collapsed = backspace(state.elements, state.cursors, "rtl", "word")
		this.select(collapsed)
		this.render()
	},
	backspaceRTLLine() {
		const collapsed = backspace(state.elements, state.cursors, "rtl", "line")
		this.select(collapsed)
		this.render()
	},
	backspaceLTRRune() {
		const collapsed = backspace(state.elements, state.cursors, "ltr", "rune")
		this.select(collapsed)
		this.render()
	},
	backspaceLTRWord() {
		const collapsed = backspace(state.elements, state.cursors, "ltr", "word")
		this.select(collapsed)
		this.render()
	},

	setToolbarClientRect(clientRect) {
		state.toolbarClientRect = clientRect
	},

	render() {
		state.shouldRender++
	},
})

function init(elements) {
	const state = {
		focused: false,
		elements,
		cursors: {
			0: Cursors.construct(),
			1: Cursors.construct(),
			collapsed: true,
		},
		toolbarClientRect: null,
		shouldRender: 0,
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
