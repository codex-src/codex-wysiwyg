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

	// formatEm() {
	// 	if (state.cursors[0].key !== state.cursors[1].key) {
	// 		// No-op
	// 		return
	// 	}
	// 	// ...
	// },
	// formatStrong() {
	// 	if (state.cursors[0].key !== state.cursors[1].key) {
	// 		// No-op
	// 		return
	// 	}
	//
	// 	const element = must(state.elements.find(each => each.key === state.cursors[0].key))
	// 	const spans = element.props.children
	//
	// 	// Computes the span and text offsets from an array of
	// 	// spans at an offset.
	// 	const computeSpanOffsets = (spans, offset) => {
	// 		let s1 = 0
	// 		let t1 = offset
	// 		for (; s1 < spans.length; s1++) {
	// 			if (t1 - spans[s1].props.children.length <= 0) {
	// 				return [s1, t1]
	// 			}
	// 			t1 -= spans[s1].props.children.length
	// 		}
	// 		return null
	// 	}
	//
	// 	// Computes an array of spans from an array of spans and
	// 	// offsets. Offsets must be from shared keys.
	// 	const computeSpansBetweenOffsets = (spans, offset1, offset2) => {
	// 		let [s1, t1] = must(computeSpanOffsets(spans, offset1))
	// 		let [s2, t2] = must(computeSpanOffsets(spans, offset2))
	//
	// 		console.log([s1, t1], [s2, t2])
	//
	// 		if (t1 && t1 < spans[s1].props.children.length) {
	// 			const cloned1A = JSONClone(spans[s1])
	// 			const cloned1B = JSONClone(spans[s1])
	// 			cloned1A.props.children = cloned1A.props.children.slice(0, t1)
	// 			cloned1B.props.children = cloned1B.props.children.slice(t1)
	// 			spans.splice(s1, 1, cloned1A, cloned1B)
	// 			s1++
	// 			s2++
	// 		}
	// 		if (t2 && t2 < spans[s2].props.children.length) {
	// 			const cloned2A = JSONClone(spans[s2])
	// 			const cloned2B = JSONClone(spans[s2])
	// 			cloned2A.props.children = cloned2A.props.children.slice(0, t2)
	// 			cloned2B.props.children = cloned2B.props.children.slice(t2)
	// 			spans.splice(s2, 1, cloned2A, cloned2B)
	// 		}
	// 		return spans.slice(s1, s2 + 1)
	// 	}
	//
	// 	// console.log(state.cursors[0].offset, state.cursors[1].offset)
	// 	const affected = computeSpansBetweenOffsets(spans, state.cursors[0].offset, state.cursors[1].offset)
	// 	console.log(JSONClone(affected))
	//
	// 	// const shouldApply = !spans.slice(s1, s2).every(each => each.props.children && each.types.some(each => each === typeEnum.strong))
	// 	// spans.slice(s1, s2).map(each => {
	// 	// 	const x = each.types.findIndex(each => each === typeEnum.strong) // Do not use must
	// 	// 	if (!shouldApply && x >= 0) {
	// 	// 		each.types.splice(x, 1)
	// 	// 	} else if (shouldApply && x === -1) {
	// 	// 		each.types.push(typeEnum.strong)
	// 	// 	}
	// 	// })
	//
	// 	// Spans.defer(spans)
	// 	console.log(JSONClone(spans))
	// 	this.render()
	// },

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
