import React from "react"

// Invokes a callback on the next click (click away) event.
function useClickAwayCallback(ref, callback) {
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
			if (e.target === ref.current || ref.current.contains(e.target)) {
				// No-op
				return
			}
			callback()
		}
		document.addEventListener("click", handler)
		return () => {
			document.removeEventListener("click", handler)
		}
	}, [ref, callback])
}

export default useClickAwayCallback
