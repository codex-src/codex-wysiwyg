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
		focused: false,        // Is the DOM element focused?
		cursors: [             // The start and end cursors
			Cursors.construct(), //
			Cursors.construct(), //
		],                     //
		collapsed: true,       // Are the cursors collapsed?
		nodes,                 // The document nodes
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
