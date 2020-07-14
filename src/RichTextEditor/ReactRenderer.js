import React from "react"
import ReactDOM from "react-dom"

// Renders the current state.
const ReactRenderer = ({ tree, state, dispatch }) => {
	return null

	// // Rerenders on state.shouldRerender.
	// React.useLayoutEffect(
	// 	React.useCallback(() => {
	// 		if (!ref.current) {
	// 			// No-op
	// 			return
	// 		}
	// 		// https://bugs.chromium.org/p/chromium/issues/detail?id=138439#c10
	// 		const selection = document.getSelection()
	// 		if (selection.rangeCount) {
	// 			selection.removeAllRanges()
	// 		}
	// 		console.log("ReactDOM.render")
	// 		ReactDOM.render(<ReactRenderer state={state} dispatch={dispatch} />, ref.current, () => {
	// 			if (state.readOnlyModeEnabled || !state.focused) {
	// 				// No-op
	// 				return
	// 			}
	// 			try {
	// 				const range = state.range.toUserLiteral(state.range)
	// 				selection.addRange(range)
	// 			} catch (error) {
	// 				console.error(error)
	// 			}
	// 		})
	// 	}, [state, dispatch]),
	// 	[state.shouldRerender],
	// )

	// return (
	// 	state.elements.map(({ type: T, key, props }) => (
	// 		React.createElement(renderMap[T], {
	// 			key,
	// 			id: key,
	// 			...props,
	// 		})
	// 	))
	// )
}

export default ReactRenderer
