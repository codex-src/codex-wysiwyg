import * as Cursors from "./Cursors"
import * as Nodes from "./Nodes"
import React from "react"
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
	// write() {
	// 	// ...
	// },
	input(node, cursors) {
		const x = state.nodes.findIndex(each => each.key === cursors[0].key)
		if (x === -1) {
			throw new Error("dispatch.input: FIXME")
		}
		state.nodes.splice(x, 1, node)

		// // TODO
		// if (!uuidElement.spans.length) {
		// 	uuidElement.key = uuidv4()
		// 	cursor.key = uuidElement.key
		// }

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
		return Nodes.parseReact(children)
	}, [children])
	return useMethods(methods, {}, () => init(nodes))
}

export default useEditor
