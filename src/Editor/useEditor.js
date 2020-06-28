import React from "react"
import useMethods from "use-methods"

const methods = state => ({
	select(cursors) {
		state.cursors = cursors
	},
	// input(element, collapsed) {
	// 	// Force rerender on <br> to a text node:
	// 	const y = must(state.elements.findIndex(each => each.key === collapsed[0].key))
	// 	if (!state.elements[y].props.children.length) {
	// 		const forcedKey = newHashID(8)
	// 		element.key = forcedKey
	// 		collapsed[0].key = forcedKey // Updates cursor[1].key because references are shared
	// 	}
	// 	state.elements.splice(y, 1, element)
	// 	this.select(collapsed)
	// 	this.render()
	// },
	render() {
		state.shouldRerender++
	},
})

function init(elements) {
	const state = {
		// elements,
		// cursors: {
		// 	0: Cursors.construct(),
		// 	1: Cursors.construct(),
		// 	collapsed: true,
		// },
		// shouldRerender: 0,
	}
	return state
}

function useEditor(rawHTML) {
	// const elements = React.useMemo(() => {
	// 	return Elements.parseFromReactElements(children)
	// }, [children])
	// return useMethods(methods, {}, () => init(elements))
	return useMethods(methods, {}) // () => init(rawHTML))
}

export default useEditor
