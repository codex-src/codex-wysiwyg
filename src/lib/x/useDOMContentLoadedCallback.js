import React from "react"

// Accepts a handler for DOMContentLoaded.
function useDOMContentLoadedCallback(handler) {
	React.useEffect(() => {
		if (document.readyState === "interactive") {
			handler()
			return
		}
		document.addEventListener("DOMContentLoaded", handler)
		return () => {
			document.removeEventListener("DOMContentLoaded", handler)
		}
	}, [handler])
}

export default useDOMContentLoadedCallback
