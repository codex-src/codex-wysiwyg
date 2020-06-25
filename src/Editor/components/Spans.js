import attrs from "./attrs"
import React from "react"
import { SpanHOC as HOC } from "./HOC"

// TODO: Add bg-blue-100 or equivalent?
export const Em = ({ type, children }) => (
	<HOC type={type}>
		<span className="italic">
			{children}
		</span>
	</HOC>
)

export const Strong = ({ type, children }) => (
	<HOC type={type}>
		<span className="font-bold">
			{children}
		</span>
	</HOC>
)

export const Code = ({ type, children }) => (
	<HOC type={type}>
		<span className="px-1 py-px text-sm font-mono text-blue-600 bg-white border border-cool-gray-300 rounded" {...attrs.code}>
			{children}
		</span>
	</HOC>
)

export const Strike = ({ type, children }) => (
	<HOC type={type}>
		<span className="line-through text-gray-400">
			{children}
		</span>
	</HOC>
)

export const A = ({ type, href, children }) => (
	<HOC type={type} props={{ href }}>
		<span className="mx-px underline text-blue-600" {...attrs.a}>
			{children}
		</span>
	</HOC>
)
