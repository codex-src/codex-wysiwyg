import React from "react"

// export const ReadOnlyModeSetState = React.createContext()
//
// export function useReadOnlyModeSetState() {
// 	return React.useContext(ReadOnlyModeSetState)
// }

export const ElementsContext = React.createContext([])

export function useElements() {
	return React.useContext(ElementsContext)
}

export const RangeTypesContext = React.createContext([])

export function useRangeTypes() {
	return React.useContext(RangeTypesContext)
}

export const DispatchContext = React.createContext([])

export function useDispatch() {
	return React.useContext(DispatchContext)
}
