import React from "react"

export const ReadOnlyModeSetState = React.createContext()

export function useReadOnlyModeSetState() {
	return React.useContext(ReadOnlyModeSetState)
}

export const ElementsContext = React.createContext([])

export function useElements() {
	return React.useContext(ElementsContext)
}

export const RangeContext = React.createContext()

export function useRange() {
	return React.useContext(RangeContext)
}
