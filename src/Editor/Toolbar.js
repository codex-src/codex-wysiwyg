import domUtils from "lib/domUtils"
import must from "lib/must"
import React from "react"

// // Returns the line height of the current element ID.
// function getCurrentLineHeight() {
// 	const selection = document.getSelection()
// 	if (!selection.rangeCount) {
// 		return -1
// 	}
// 	const range = selection.getRangeAt(0)
// 	if (range.collapsed) {
// 		return -1
// 	}
// 	const elementID = domUtils.ascendElementID(range.startContainer)
// 	return +getComputedStyle(elementID).lineHeight.slice(0, -2)
// }

// Returns the line height of the current element ID.
function getCurrentRowDimensions() {
	const selection = document.getSelection()
	if (!selection.rangeCount) {
		return null
	}
	const range = selection.getRangeAt(0)
	if (range.collapsed) {
		return null
	}
	const elementID = domUtils.ascendElementID(range.startContainer)
	const width = +getComputedStyle(elementID).width.slice(0, -2)
	const lineHeight = +getComputedStyle(elementID).lineHeight.slice(0, -2)
	return [width, lineHeight]
}

const Toolbar = ({ clientRect }) => {

	const ref = React.useRef(null)

	const [x, setX] = React.useState(0)
	const [y, setY] = React.useState(0)

	React.useLayoutEffect(() => {
		if (!clientRect) {
			// No-op
			return
		}
		const [width, lineHeight] = must(getCurrentRowDimensions())
		const height = Math.ceil(lineHeight / 1.5)
		if (height - 4 < clientRect.height && height + 4 > clientRect.height) {
			setX(window.scrollX + clientRect.x + (clientRect.width - ref.current.offsetWidth) / 2)
			setY(window.scrollY + clientRect.y + clientRect.height - height - ref.current.offsetHeight)
		} else {
			setX(window.scrollX + clientRect.x + (width - ref.current.offsetWidth) / 2)
			setY(window.scrollY + clientRect.y - ref.current.offsetHeight)
		}
	}, [clientRect])

	return clientRect && (
		// <div ref={ref} className="absolute" style={{ transform: `translate(${x}px, ${y}px)` }}>
		<div ref={ref} className="absolute transition duration-300 ease-in-out" style={{ top: y, left: x }}>
			<div className="mb-0.5 px-2 py-1 bg-gray-100 w-32">
				Hello, world!
			</div>
		</div>
	)
}

export default Toolbar
