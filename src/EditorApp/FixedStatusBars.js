import innerText from "Editor/utils/innerText"
import React from "react"

import { // Unsorted
	useDebouncedElements,
	useDebouncedRange,
} from "./contexts"

// Comma-formats a number.
function comma(n) {
	return n.toLocaleString("en")
}

// // Computes the LHS status string.
// function computeStatusLHS(state) {
// 	const statusLHS = ((chars, lines) => {
// 		if (!state.focused) {
// 			return "No selection"
// 		}
// 		if (state.collapsed) {
// 			return `Line ${comma(state.pos1.y + 1)}, column ${comma(state.pos1.x + 1)}`
// 		} else {
// 			return `Selected ${lines < 2 ? "" : `${comma(lines)} lines, `}${comma(chars)} character${chars === 1 ? "" : "s"}`
// 		}
// 	})(state.pos2.pos - state.pos1.pos, state.pos2.y - state.pos1.y + 1)
// 	return statusLHS
// }

// Renders selection (LHS) and duration (RHS) metadata.
const FixedStatusBars = () => {
	const debouncedElements = useDebouncedElements()
	const debouncedRange = useDebouncedRange()

	const [statusLHS, setStatusLHS] = React.useState("Line 93, column 17") // TODO
	const [statusRHS, setStatusRHS] = React.useState("426 words, est. 2 minute read") // TODO

	//const mns = ([...text].length / 4.7 / 300).toFixed(2) // Characters per word / words per minute
	//setStatusRHS(`${comma(wds)} word${wds === 1 ? "" : "s"}, est. ${comma(mns)} minute read`) // ${!mns ? "" : `, est. ${comma(mns)} minute read`}`)

	// React.useEffect(() => {
	// 	// const statusLHS = computeStatusLHS(state)
	// 	// setStatusLHS(statusLHS)
	// }, [debouncedRange])

	React.useEffect(() => {
		const text = innerText(debouncedElements)
		const wds = text.split(/\s+/).filter(Boolean).length
		const mns = Math.round([...text].length / 4.7 / 300) // Characters per word / words per minute
		setStatusRHS(`${comma(wds)} word${wds === 1 ? "" : "s"}${!mns ? "" : `, est. ${comma(mns)} minute read`}`)
	}, [debouncedElements])

	return (
		<div className="fixed inset-0 hidden xl:flex flex-row items-end pointer-events-none">
			<div className="px-3 py-2 flex flex-row justify-between w-full">

				{/* LHS */}
				<div className="pointer-events-auto">
					<p className="font-medium" style={{ fontSize: "0.6875rem", fontFeatureSettings: "'tnum'" }}>
						{statusLHS}
					</p>
				</div>

				{/* RHS */}
				<div className="pointer-events-auto">
					<p className="font-medium" style={{ fontSize: "0.6875rem", fontFeatureSettings: "'tnum'" }}>
						{statusRHS}
					</p>
				</div>

			</div>
		</div>
	)
}

export default FixedStatusBars
