// import * as iter from "./iter"
// import uuidv4 from "uuid/v4"
import * as Cursors from "./Cursors"
import * as Nodes from "./Nodes"
import * as Spans from "./Spans"
import React from "react"
import useMethods from "use-methods"
import { typeEnum } from "./components/typeMaps"

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
		Object.assign(state.cursors, {
			...cursors,
			collapsed: cursors[0] === cursors[1],
		})
	},
	// Collapses the start and end cursors.
	collapse() {
		Object.assign(state.cursors, {
			...[state.cursors[0], state.cursors[0]],
			collapsed: true,
		})
	},
	/*
	 * Backspace
	 */
	backspaceRune() {
		// ...
	},
	backspaceWord() {
		// ...
	},
	backspaceParagraph() {
		// ...
	},
	forwardBackspaceRune() {
		// ...
	},
	forwardBackspaceWord() {
		// ...
	},
	/*
	 * Input
	 */
	write() {
		// ...
	},
	input() {
		// ...
	},
})

function init(nodes) {
	const state = {
		focused: false,
		cursors: {
			0: Cursors.create(),
			1: Cursors.create(),
			collapsed: true,
		},
		nodes,
	}
	return state
}

function useEditor(children) {
	const nodes = React.useMemo(() => {
		return Nodes.parseReact(children).map(each => {
			switch (each.type) {
			case typeEnum.h1:
			case typeEnum.h2:
			case typeEnum.h3:
			case typeEnum.h4:
			case typeEnum.h5:
			case typeEnum.h6:
				Spans.sort(Spans.merge(each.props.children))
				break
			case typeEnum.p:
				Spans.sort(Spans.merge(each.props.children))
				break
			case typeEnum.hr:
				// No-op
				break
			default:
				throw new Error("FIXME: unknown type")
			}
			return each
		})
	}, [children])
	return useMethods(methods, {}, () => init(nodes))
}

export default useEditor
