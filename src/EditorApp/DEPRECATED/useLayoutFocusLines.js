import React from "react"

function useLayoutFocusLines(state) {
	React.useLayoutEffect(
		React.useCallback(() => {
			const keys = []
			originalFor:
			for (let x = 0; x < state.elements.length; x++) {
				if (state.elements[x].key === state.range.start.key) {
					for (; x < state.elements.length; x++) {
						keys.push(state.elements[x].key)
						if (state.elements[x].key === state.range.end.key) {
							// No-op
							break originalFor
						}
					}
				}
			}
			const els = []
			for (let x = 0; x < keys.length; x++) {
				const el = document.getElementById(keys[x])
				if (!el) {
					// No-op
					continue
				}
				const fn = !state.focused ? attr => el.removeAttribute(attr)
					: attr => el.setAttribute(attr, true)
				if (!x && keys.length === 1) {
					fn("data-feature-focus-line")
				} else if (!x) {
					fn("data-feature-focus-line-start")
				} else if (x && x + 1 < keys.length) {
					fn("data-feature-focus-line-center")
				} else {
					fn("data-feature-focus-line-end")
				}
				els.push(el)
			}
			return () => {
				for (const each of els) {
					each.removeAttribute("data-feature-focus-line")
					each.removeAttribute("data-feature-focus-line-start")
					each.removeAttribute("data-feature-focus-line-center")
					each.removeAttribute("data-feature-focus-line-end")
				}
			}
		}, [state]),
		[state.focused, state.range],
	)
}

export default useLayoutFocusLines
