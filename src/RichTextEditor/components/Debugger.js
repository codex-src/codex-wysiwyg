import React from "react"

const Debugger = ({ state, dispatch }) => (
	<div className="mt-6 whitespace-pre-wrap text-xs font-mono select-none" style={{ MozTabSize: 2, tabSize: 2 }}>
		{JSON.stringify({
			...state,
			// elements: undefined,
		}, null, "\t")}
	</div>
)

export default Debugger
