import React from "react"
import testKeyDown from "lib/Client/testKeyDown"

// Invokes a callback on the next keydown (escape) event.
function useKeyDownEscapeCallback(ref, callback) {
	React.useEffect(() => {
 		if (!ref.current) {
			// No-op
			return
		}
		const handler = e => {
 			if (!ref.current) {
				// No-op
				return
			}
			if (!testKeyDown(e).forKeyCode("Escape").check()) {
				// No-op
				return
			}
			callback()
		}
		document.addEventListener("keydown", handler)
		return () => {
			document.removeEventListener("keydown", handler)
		}
	}, [ref, callback])
}

export default useKeyDownEscapeCallback
