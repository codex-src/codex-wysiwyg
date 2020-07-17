import React from "react"

const Debugger = ({
	state,
	dispatch,
	lastActionTimestamp,
	lastAction,
	readOnlyModeEnabled,
	focused,
	elements,
	range,
	shouldRerender,
}) => (
	process.env.NODE_ENV !== "production" && (
		<div className="mt-6 whitespace-pre-wrap text-xs font-mono" style={{ MozTabSize: 2, tabSize: 2 }}>
			{JSON.stringify(
				{
					...state,
					lastActionTimestamp: lastActionTimestamp && state.lastActionTimestamp,
					lastAction: lastAction && state.lastAction,
					readOnlyModeEnabled: readOnlyModeEnabled && state.readOnlyModeEnabled,
					focused: focused && state.focused,
					elements: elements && state.elements,
					range: range && state.range,
					shouldRerender: shouldRerender && state.shouldRerender,
				},
				null,
				"\t",
			)}
		</div>
	)
)

export default Debugger
