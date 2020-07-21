import React from "react"

import "debug.css"

// <DebugCSS>
// <DebugCSS enabled>
// <DebugCSS enabled={...}>
//
const DebugCSS = ({ enabled, children }) => {
	React.useLayoutEffect(() => {
		if (enabled !== undefined && !enabled) {
			// No-op
			return
		}
		document.body.classList.add("debug-css")
		return () => {
			document.body.classList.remove("debug-css")
		}
	}, [enabled])
	return children || null
}

export default DebugCSS
