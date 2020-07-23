import React from "react"

// Binds a truthy handler to the next pointer down event.
export function usePointerDown(handler) {
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

// Binds a truthy handler to the next key down event.
export function useKeyDown(handler) {
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
