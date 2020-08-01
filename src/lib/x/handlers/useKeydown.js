import React from "react"

// Binds a truthy handler to the next keydown event.
function useKeydown(handler) {
	React.useEffect(() => {
		if (!handler) {
			// No-op
			return
		}
		document.addEventListener("keydown", handler)
		return () => {
			document.removeEventListener("keydown", handler)
		}
	}, [handler])
}

export default useKeydown
