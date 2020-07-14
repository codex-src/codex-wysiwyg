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
const ReactRenderer = ({ forwardedRef, state, dispatch }) => {
	React.useLayoutEffect(
		React.useCallback(() => {
			if (!forwardedRef.current) {
				// No-op
				return
			}
			// https://bugs.chromium.org/p/chromium/issues/detail?id=138439#c10
			const selection = document.getSelection()
			if (selection.rangeCount) {
				selection.removeAllRanges()
			}
			ReactDOM.render(<Elements state={state} dispatch={dispatch} />, forwardedRef.current, () => {
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
		}, [forwardedRef, state, dispatch]),
		[forwardedRef.current, state.shouldRerender],
	)
	return null
}

export default ReactRenderer
