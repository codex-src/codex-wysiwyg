import React from "react"

// Binds a truthy handler to the next pointerdown event.
function usePointerdown(handler) {
	React.useEffect(() => {
		if (!handler) {
			// No-op
			return
		}
		document.addEventListener("pointerdown", handler)
		return () => {
			document.removeEventListener("pointerdown", handler)
		}
	}, [handler])
}

export default usePointerdown
