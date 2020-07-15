import * as Range from "../methods/Range"
import componentMap from "./componentMap"
import React from "react"
import ReactDOM from "react-dom"

const Elements = ({ state, dispatch }) => (
	state.elements.map(({ type, key, props }) => (
		React.createElement(componentMap[type], {
			key,
			id: key,
			...props,
		})
	))
)

// Rerenders the current state on state.shouldRerender.
const Renderer = ({ forwardedRef: tree, state, dispatch }) => {
	React.useLayoutEffect(
		React.useCallback(() => {
			if (!tree.current) {
				// No-op
				return
			}
			// https://bugs.chromium.org/p/chromium/issues/detail?id=138439#c10
			const selection = document.getSelection()
			if (selection.rangeCount) {
				selection.removeAllRanges()
			}
			console.log("ReactDOM.render")
			ReactDOM.render(<Elements state={state} dispatch={dispatch} />, tree.current, () => {
				if (state.readOnlyModeEnabled /* FIXME? */ || !state.focused) {
					// No-op
					return
				}
				try {
					const range = Range.toUserLiteral(state.range)()
					selection.addRange(range)
				} catch (error) {
					console.error(error)
				}
			})
		}, [tree, state, dispatch]),
		[tree.current, state.shouldRerender],
	)
	return null
}

export default Renderer
