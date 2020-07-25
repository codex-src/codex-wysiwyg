import React from "react"

export const FocusedContext = React.createContext()
export const ElementsContext = React.createContext()
export const RangeContext = React.createContext()

// Accesses state.focused.
export function useFocused() {
	return React.useContext(FocusedContext)
}

// Accesses state.elements.
export function useElements() {
	return React.useContext(ElementsContext)
}

// Accesses state.range.
export function useRange() {
	return React.useContext(RangeContext)
}
