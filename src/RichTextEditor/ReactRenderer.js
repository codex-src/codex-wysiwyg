import componentMap from "./components/componentMap"
import React from "react"
import ReactDOM from "react-dom"

// Renders the current state.
const ReactRenderer = ({ tree, state, dispatch }) => {

	React.useLayoutEffect(
		React.useCallback(() => {
			if (!tree) {
				// No-op
				return
			}
			// https://bugs.chromium.org/p/chromium/issues/detail?id=138439#c10
			const selection = document.getSelection()
			if (selection.rangeCount) {
				selection.removeAllRanges()
			}
			console.log("ReactDOM.render")
			ReactDOM.render(<ReactRenderer state={state} dispatch={dispatch} />, tree, () => {
				if (state.readOnlyModeEnabled || !state.focused) {
					// No-op
					return
				}
				try {
					const range = state.range.toUserLiteral(state.range)
					selection.addRange(range)
				} catch (error) {
					console.error(error)
				}
			})
		}, [tree, state, dispatch]),
		[state.shouldRerender],
	)

	return (
		state.elements.map(({ type: T, key, props }) => (
			React.createElement(componentMap[T], {
				key,
				id: key,
				...props,
			})
		))
	)
}

export default ReactRenderer
