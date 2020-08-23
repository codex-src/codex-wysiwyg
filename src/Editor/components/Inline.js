import disableAutoCorrect from "lib/x/disableAutoCorrect"
import React from "react"
import relNoopener from "lib/x/relNoopener"
import target_blank from "lib/x/target_blank"
import Type from "./HOC/Type"

// <em>
export const Em = ({ children }) => (
	<Type type="em">
		<span className="italic">
			{children}
		</span>
	</Type>
)

// <strong>
export const Strong = ({ children }) => (
	<Type type="strong">
		<span className="font-semibold">
			{children}
		</span>
	</Type>
)

// <code>
export const Code = ({ children }) => (
	<Type type="code">
		<span className="px-1 py-px text-sm font-mono text-blue-600 bg-white border border-gray-300 rounded" {...disableAutoCorrect}>
			{children}
		</span>
	</Type>
)

// <strike>
export const Strike = ({ children }) => (
	<Type type="strike">
		<span className="line-through text-gray-400" {...disableAutoCorrect}>
			{children}
		</span>
	</Type>
)

// <a href="...">
export const A = ({ href, children }) => (
	<Type type="a" props={{ href }}>
		<span className="mx-px underline text-blue-600" {...relNoopener}>
			{children}
		</span>
	</Type>
)
