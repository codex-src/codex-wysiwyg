import React from "react"
import T from "./T"

import { // Unsorted
	disableAutoCorrect,
	relNoopener,
} from "./miscProps"

// <em>
export const Em = ({ children }) => (
	<T type="em">
		<span className="italic">
			{children}
		</span>
	</T>
)

// <strong>
export const Strong = ({ children }) => (
	<T type="strong">
		<span className="font-semibold">
			{children}
		</span>
	</T>
)

// <code>
export const Code = ({ children }) => (
	<T type="code">
		<span className="px-1 py-px text-sm font-mono text-blue-600 bg-white border border-gray-300 rounded" {...disableAutoCorrect}>
			{children}
		</span>
	</T>
)

// <strike>
export const Strike = ({ children }) => (
	<T type="strike">
		<span className="line-through" {...disableAutoCorrect}>
			{children}
		</span>
	</T>
)

// <a href="...">
export const A = ({ href, children }) => (
	<T type="a" props={{ href }}>
		<span className="mx-px underline text-blue-600" {...relNoopener}>
			{children}
		</span>
	</T>
)
