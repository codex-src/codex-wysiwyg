import React from "react"

// Accepts a callback for DOMContentLoaded.
function useDOMContentLoadedCallback(callback) {
	React.useEffect(() => {
		document.addEventListener("DOMContentLoaded", callback)
		return () => {
			document.removeEventListener("DOMContentLoaded", callback)
		}
	}, [callback])
}

export default useDOMContentLoadedCallback
