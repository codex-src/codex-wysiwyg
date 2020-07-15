import React from "react"

const Debugger = ({
	state,
	dispatch,
	lastActionTimestamp,
	lastAction,
	readOnlyModeEnabled,
	displayMarkdownModeEnabled,
	focused,
	elements,
	range,
	shouldRerender,
}) => (
	<div className="mt-6 whitespace-pre-wrap font-mono text-xs" style={{ MozTabSize: 2, tabSize: 2 }}>
		{JSON.stringify(
			{
				...state,
				lastActionTimestamp: lastActionTimestamp && state.lastActionTimestamp,
				lastAction: lastAction && state.lastAction,
				readOnlyModeEnabled: readOnlyModeEnabled && state.readOnlyModeEnabled,
				displayMarkdownModeEnabled: displayMarkdownModeEnabled && state.displayMarkdownModeEnabled,
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

export default Debugger
