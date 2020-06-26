import React from "react"

const Toolbar = ({ clientRect }) => (
	// console.log(clientRect && (clientRect.y + clientRect.height - 56)) ||
	console.log(clientRect) ||
	clientRect && (
		// NOTE: Uses clientRect.bottom because text is aligned
		// to the baseline
		// TODO: Normalize clientRect.top
		<div className="absolute" style={{ top: window.scrollY + clientRect.top, left: window.scrollX + clientRect.x }}>
			{/* <div className="relative"> */}
				{/* <div className="absolute bottom-full"> */}
					<div className="px-2 py-1 bg-gray-100 w-32">
						Hello, world!
					</div>
				{/* </div> */}
			{/* </div> */}
		</div>
	)
)

export default Toolbar
