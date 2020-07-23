import React from "react"

// Binds a truthy handler to the next pointerdown event.
export function usePointerdown(handler) {
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

// Binds a truthy handler to the next keydown event.
export function useKeydown(handler) {
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
