import React from "react"

export const AbsoluteTopTooltip = ({ children }) => (
	<div className="absolute bottom-full" style={{ left: "50%" }}>
		<div className="px-2 py-1 relative bg-gray-800 rounded shadow" style={{ left: "-50%" }}>
			<div className="absolute bottom-0 inset-x-0 flex flex-row justify-center">
				<div className="-mb-0.5 w-2 h-2 bg-gray-800 rounded-sm shadow transform rotate-45" />
			</div>
			{children}
		</div>
	</div>
)

export const AbsoluteBottomLeftToolTip = ({ children }) => (
	<div className="absolute top-full left-0">
		<div className="px-2 py-1 bg-gray-800 rounded shadow">
			<div className="absolute top-0 left-0">
				<div className="ml-3.5 -mt-0.5 w-2 h-2 bg-gray-800 rounded-sm shadow transform rotate-45" />
			</div>
			{children}
		</div>
	</div>
)

export const AbsoluteBottomRightToolTip = ({ children }) => (
	<div className="absolute top-full right-0">
		<div className="px-2 py-1 bg-gray-800 rounded shadow">
			<div className="absolute top-0 right-0">
				<div className="mr-3.5 -mt-0.5 w-2 h-2 bg-gray-800 rounded-sm shadow transform rotate-45" />
			</div>
			{children}
		</div>
	</div>
)
