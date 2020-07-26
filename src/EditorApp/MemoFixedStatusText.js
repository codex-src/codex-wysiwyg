import innerText from "Editor/utils/innerText"
import rangeIsCollapsed from "Editor/utils/rangeIsCollapsed"
import React from "react"
import Transition from "lib/x/Transition"

import { // Unsorted
	useFocused,
	useElements,
	useRange,
} from "./contexts"

// Makes a number pretty. 💅
function pretty(n, desc = "") {
	const nstr = n.toLocaleString("en")
	if (!desc) {
		return nstr
	}
	return nstr + " " + (n === 1 ? desc : `${desc}s`)
}

// Gets the LHS status text.
function getLHSStatusText(elements, range) {
	if (!range.start.key || !range.end.key) {
		return "Line 1, column 1"
	}

	const x1 = elements.findIndex(each => each.key === range.start.key)
	let x2 = x1
	if (!rangeIsCollapsed(range)) {
		x2 = elements.findIndex(each => each.key === range.end.key)
	}

	if (rangeIsCollapsed(range)) {
		return `Line ${pretty(x1 + 1)}, column ${pretty(range.start.offset + 1)}`
	}
	const chars = range.end.offset - range.start.offset
	return range.start.key === range.end.key ? `Selected ${pretty(chars, "character")}`
		: `Selected ${pretty(x2 - x1, "line")}`
}

// Gets the RHS status text.
function getRHSStatusText(elements) {
	const text = innerText(elements)
	const words = text.split(/\s+/).filter(Boolean).length
	const minutes = Math.round([...text].length / 4.7 / 300) // Characters per word / words per minute
	return pretty(words, "word") + (!minutes ? "" : `, est. ${pretty(minutes)} minute read`)
}

const MemoFixedStatusText = React.memo(() => {
	const focused = useFocused()
	const elements = useElements()
	const range = useRange()

	const [lhsStatusText, setLHSStatusText] = React.useState(() => getLHSStatusText(elements, range))
	const [rhsStatusText, setRHSStatusText] = React.useState(() => getRHSStatusText(elements))

	React.useEffect(() => {
		const status = getLHSStatusText(elements, range)
		setLHSStatusText(status)
	}, [elements, range])

	React.useEffect(() => {
		const status = getRHSStatusText(elements)
		setRHSStatusText(status)
	}, [elements])

	return (
		<Transition
			on={focused}
			className="transition duration-200 ease-in-out"
			from="opacity-0"
			to="opacity-100"
		>
			<div className="fixed inset-0 hidden xl:flex flex-row items-end opacity-0 pointer-events-none">
				<div className="px-3 py-2 flex flex-row justify-between w-full">
					{(style => (
						<React.Fragment>

							{/* LHS */}
							<div className="pointer-events-auto">
								<p className="font-medium text-gray-800" style={style}>
									{lhsStatusText}
								</p>
							</div>

							{/* RHS */}
							<div className="pointer-events-auto">
								<p className="font-medium text-gray-800" style={style}>
									{rhsStatusText}
								</p>
							</div>

						</React.Fragment>
					))({
						fontSize: "0.6875rem",
						fontFeatureSettings: "'tnum'",
					})}
				</div>
			</div>
		</Transition>
	)
})

export default MemoFixedStatusText
