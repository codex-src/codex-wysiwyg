import React from "react"

export const DebouncedElementsContext = React.createContext(null)
export const DebouncedRangeContext = React.createContext(null)

// Accesses state.elements (debounced).
export function useDebouncedElements() {
	return React.useContext(DebouncedElementsContext)
}

// Accesses state.range (debounced).
export function useDebouncedRange() {
	return React.useContext(DebouncedRangeContext)
}
